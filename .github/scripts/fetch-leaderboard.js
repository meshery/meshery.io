/* eslint-env node */
'use strict';

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://discuss.meshery.io/directory_items.json';
const PERIODS = ['weekly', 'monthly', 'all'];
const GITHUB_API = 'https://api.github.com';
const GITHUB_ORG = 'meshery';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_ACCESS_TOKEN || '';
const PERIOD_SINCE = {
  weekly: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  monthly: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  all: null
};

// Explicit mapping of verified Discourse username to GitHub username.
// Users not in this list will not have GitHub stats pulled.
const GITHUB_USERNAME_MAPPING = {
  "theBeginner86": "theBeginner86"
};

async function fetchUsers(period) {
  const headers = {
    'User-Agent': 'meshery-leaderboard-bot/1.0',
    'Accept': 'application/json'
  };

  const url = `${BASE_URL}?period=${period}&order=likes_received&limit=50`;
  const response = await fetch(url, { headers });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Discourse API error (period=${period}): ${response.status} - ${body.slice(0, 200)}`);
  }

  const data = await response.json();
  return data.directory_items;
}

function computeScore(item) {
  return (item.post_count || 0) +
    ((item.likes_received || 0) * 2) +
    ((item.solutions || 0) * 3);
}

function buildLeaderboard(items) {
  return (items || [])
    .filter(item => item && item.user && item.user.username && !item.user.username.startsWith('anon'))
    .map(item => ({
      rank: 0,
      username: item.user.username,
      avatar: item.user.avatar_template
        ? `https://discuss.meshery.io${item.user.avatar_template.replace('{size}', '200')}`
        : '',
      profile_url: `https://discuss.meshery.io/u/${item.user.username}`,
      posts: item.post_count || 0,
      likes: item.likes_received || 0,
      solutions: item.solutions || 0,
      score: computeScore(item)
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.username.localeCompare(b.username);
    })
    .map((user, index) => ({
      ...user,
      rank: index + 1
    }));
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function githubFetch(url, attempt) {
  if (attempt === undefined) attempt = 0;
  const headers = {
    'User-Agent': 'meshery-leaderboard-bot/1.0',
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }
  const res = await fetch(url, { headers });

  if (res.status === 404) return null;

  // Handle rate limiting
  const isRateLimited =
    res.status === 429 ||
    (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0') ||
    (res.status === 403 && res.headers.get('retry-after') !== null);

  if (isRateLimited && attempt < 2) {
    const retryAfter = res.headers.get('retry-after');
    const resetAt = res.headers.get('x-ratelimit-reset');
    let waitMs;
    if (retryAfter) {
      waitMs = (parseInt(retryAfter, 10) + 2) * 1000;
    } else if (resetAt) {
      waitMs = Math.max(0, (parseInt(resetAt, 10) * 1000) - Date.now()) + 2000;
    } else {
      waitMs = 60000; // default: wait 60 seconds
    }
    console.warn(`Rate limited by GitHub. Waiting ${Math.round(waitMs / 1000)}s before retry...`);
    await sleep(waitMs);
    return githubFetch(url, attempt + 1);
  }

  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${url}`);
  return res.json();
}

async function fetchPeriodStats(username, since, githubUser) {
  const sinceFilter = since ? `+created:>=${since}` : '';
  const ghUsername = githubUser.login;

  const issuesData = await githubFetch(
    `${GITHUB_API}/search/issues?q=author:${encodeURIComponent(ghUsername)}+org:${GITHUB_ORG}+type:issue${sinceFilter}&per_page=1`
  );
  const issues = issuesData ? (issuesData.total_count || 0) : 0;
  await sleep(120);

  const prsData = await githubFetch(
    `${GITHUB_API}/search/issues?q=author:${encodeURIComponent(ghUsername)}+org:${GITHUB_ORG}+is:pr${sinceFilter}&per_page=1`
  );
  const prs = prsData ? (prsData.total_count || 0) : 0;
  await sleep(120);

  const reviewsData = await githubFetch(
    `${GITHUB_API}/search/issues?q=reviewed-by:${encodeURIComponent(ghUsername)}+org:${GITHUB_ORG}+is:pr${sinceFilter}&per_page=1`
  );
  const reviews = reviewsData ? (reviewsData.total_count || 0) : 0;

  return {
    github_username: githubUser.login || '',
    github_profile_url: githubUser.html_url || '',
    github_issues: issues,
    github_prs: prs,
    github_reviews: reviews,
    github_score: (issues * 2) + (prs * 3) + (reviews * 2)
  };
}

async function buildAllPeriods() {
  const periods = {};

  for (const period of PERIODS) {
    const items = await fetchUsers(period);
    periods[period] = buildLeaderboard(items);
  }

  if (!periods.all.length) {
    throw new Error('all-time period empty — refusing to overwrite');
  }

  const allUsernames = [
    ...new Set([
      ...periods.weekly.map(u => u.username),
      ...periods.monthly.map(u => u.username),
      ...periods.all.map(u => u.username)
    ])
  ];

  console.log(`Fetching GitHub stats for ${allUsernames.length} users...`);

  const userCache = {}; // keyed by username -> { login, html_url } or null
  for (const username of allUsernames) {
    const mappedGithubUser = GITHUB_USERNAME_MAPPING[username];
    if (!mappedGithubUser) {
      userCache[username] = null;
      continue;
    }
    try {
      const user = await githubFetch(`${GITHUB_API}/users/${encodeURIComponent(mappedGithubUser)}`);
      userCache[username] = user;
      await sleep(100);
    } catch (err) {
      console.warn(`GitHub user lookup failed for ${username}: ${err.message}`);
      userCache[username] = null;
    }
  }

  const githubCache = {}; // keyed by "username:period"
  for (const period of PERIODS) {
    const since = PERIOD_SINCE[period];
    for (const username of allUsernames) {
      if (!userCache[username]) {
        githubCache[`${username}:${period}`] = null;
        continue;
      }
      const cacheKey = `${username}:${period}`;
      try {
        const stats = await fetchPeriodStats(username, since, userCache[username]);
        githubCache[cacheKey] = stats;
        console.log(
          `GitHub stats for ${username} (${period}):`,
          stats
            ? `issues=${stats.github_issues} prs=${stats.github_prs} reviews=${stats.github_reviews}`
            : 'not found on GitHub'
        );
      } catch (err) {
        console.warn(`Failed period stats for ${username} (${period}): ${err.message}`);
        githubCache[cacheKey] = null;
      }
      await sleep(200);
    }
  }

  for (const period of PERIODS) {
    periods[period] = periods[period]
      .map(user => {
        const gh = githubCache[`${user.username}:${period}`];
        const github_issues = gh ? (gh.github_issues || 0) : 0;
        const github_prs = gh ? (gh.github_prs || 0) : 0;
        const github_reviews = gh ? (gh.github_reviews || 0) : 0;
        const github_score = gh ? (gh.github_score || 0) : 0;
        const total_score = (user.score || 0) + github_score;
        return {
          ...user,
          github_username: gh ? (gh.github_username || '') : '',
          github_profile_url: gh ? (gh.github_profile_url || '') : '',
          github_issues,
          github_prs,
          github_reviews,
          github_score,
          total_score
        };
      })
      .sort((a, b) => b.total_score - a.total_score)
      .map((u, i) => ({ ...u, rank: i + 1 }));
  }

  return periods;
}

function saveJSON(periods) {
  const output = {
    last_updated: new Date().toISOString(),
    default_period: 'weekly',
    periods
  };

  const outputPath = path.join(__dirname, '../../_data/leaderboard.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  for (const [period, users] of Object.entries(periods)) {
    console.log(`Saved ${users.length} users for period=${period}`);
  }
}

async function main() {
  try {
    const periods = await buildAllPeriods();
    saveJSON(periods);
  } catch (err) {
    console.error('Leaderboard build failed:', err.message);
    process.exit(1);
  }
}

main();
