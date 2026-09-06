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
const GITHUB_USERNAME_MAPPING = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../_data/github_mappings.json'), 'utf8')
);

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
  if (GITHUB_TOKEN && url.startsWith(GITHUB_API)) {
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

async function fetchPeriodStats(since, githubUser, prReviewsCache) {
  const ghUsername = githubUser.login;

  // Issues opened
  const issuesSinceFilter = since ? `+created:>=${since}` : '';
  const issuesData = await githubFetch(
    `${GITHUB_API}/search/issues?q=author:${encodeURIComponent(ghUsername)}+org:${GITHUB_ORG}+type:issue${issuesSinceFilter}&per_page=1&advanced_search=true`
  );
  const issues = issuesData ? (issuesData.total_count || 0) : 0;
  await sleep(2000);

  // PRs opened
  const prsData = await githubFetch(
    `${GITHUB_API}/search/issues?q=author:${encodeURIComponent(ghUsername)}+org:${GITHUB_ORG}+is:pr${issuesSinceFilter}&per_page=1&advanced_search=true`
  );
  const prs = prsData ? (prsData.total_count || 0) : 0;
  await sleep(2000);

  // PRs reviewed
  let verifiedReviewsCount = 0;
  if (since) {
    // For bounded periods, find candidate PRs the user reviewed that were updated in the period
    const reviewsData = await githubFetch(
      `${GITHUB_API}/search/issues?q=reviewed-by:${encodeURIComponent(ghUsername)}+org:${GITHUB_ORG}+is:pr+updated:>=${since}&per_page=100&advanced_search=true`
    );
    await sleep(2000);
    const candidatePrs = reviewsData && reviewsData.items ? reviewsData.items : [];

    for (const pr of candidatePrs) {
      if (!pr.pull_request || !pr.pull_request.url) continue;
      const prUrl = pr.pull_request.url;

      if (!prReviewsCache[prUrl]) {
        prReviewsCache[prUrl] = await githubFetch(`${prUrl}/reviews`);
        await sleep(1000); // 1000ms pacing for normal API (max 3600/hr)
      }

      const reviews = prReviewsCache[prUrl] || [];
      const hasValidReview = reviews.some(r =>
        r.user &&
        r.user.login === ghUsername &&
        r.submitted_at &&
        new Date(r.submitted_at) >= new Date(since)
      );

      if (hasValidReview) {
        verifiedReviewsCount++;
      }
    }
  } else {
    // For all-time, we can safely use the total count without fetching individual review timestamps
    const reviewsData = await githubFetch(
      `${GITHUB_API}/search/issues?q=reviewed-by:${encodeURIComponent(ghUsername)}+org:${GITHUB_ORG}+is:pr&per_page=1&advanced_search=true`
    );
    verifiedReviewsCount = reviewsData ? (reviewsData.total_count || 0) : 0;
    await sleep(2000);
  }

  return {
    github_username: githubUser.login || '',
    github_profile_url: githubUser.html_url || '',
    github_issues: issues,
    github_prs: prs,
    github_prs_reviewed: verifiedReviewsCount
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

  // Pre-fetch GitHub User objects to get verified profile URLs
  const userCache = {}; // keyed by username -> { login, html_url } or null
  const allUsernames = [
    ...new Set([
      ...periods.weekly.map(u => u.username),
      ...periods.monthly.map(u => u.username),
      ...periods.all.map(u => u.username)
    ])
  ];

  console.log(`Verifying GitHub users...`);
  for (const username of allUsernames) {
    const mappedGithubUser = GITHUB_USERNAME_MAPPING[username];
    if (!mappedGithubUser) {
      userCache[username] = null;
      continue;
    }
    const user = await githubFetch(`${GITHUB_API}/users/${encodeURIComponent(mappedGithubUser)}`);
    userCache[username] = user;
    await sleep(1000); // 1000ms pacing for normal API
  }

  const githubCache = {}; // keyed by "username:period"
  const prReviewsCache = {}; // keyed by PR url to avoid redundant /reviews requests

  for (const period of PERIODS) {
    const since = PERIOD_SINCE[period];
    const usersInPeriod = periods[period].map(u => u.username);

    for (const username of usersInPeriod) {
      if (!userCache[username]) {
        githubCache[`${username}:${period}`] = null;
        continue;
      }
      const cacheKey = `${username}:${period}`;
      const stats = await fetchPeriodStats(since, userCache[username], prReviewsCache);
      githubCache[cacheKey] = stats;
    }
  }

  for (const period of PERIODS) {
    periods[period] = periods[period].map(user => {
      const gh = githubCache[`${user.username}:${period}`];
      return {
        ...user,
        github_username: gh ? (gh.github_username || '') : '',
        github_profile_url: gh ? (gh.github_profile_url || '') : '',
        github_issues: gh ? (gh.github_issues || 0) : 0,
        github_prs: gh ? (gh.github_prs || 0) : 0,
        github_prs_reviewed: gh ? (gh.github_prs_reviewed || 0) : 0
      };
    });
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
