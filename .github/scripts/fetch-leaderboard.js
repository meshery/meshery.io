const fs = require('fs');
const path = require('path');

const DISCOURSE_BASE_URL = 'https://discuss.meshery.io/directory_items.json';
const PERIODS = ['weekly', 'monthly', 'all'];
const GITHUB_API = 'https://api.github.com';
const GITHUB_ORG = 'meshery';
const GITHUB_BOT_DENYLIST = new Set(['l5io']); // known automation accounts that are User-typed, not Bot-typed
// GH_ACCESS_TOKEN is a local-run convenience only (e.g. `GH_ACCESS_TOKEN=xxx node ...`).
// In CI, GITHUB_TOKEN is always set by the workflow and takes precedence.
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_ACCESS_TOKEN || '';

// NOTE: "monthly" and "all" periods are backed by GitHub's Search API, which
// caps results at 1,000 items per query. For an active org, "all" in practice
// returns only the most recent items within that cap, not true all-time totals.
const PERIOD_SINCE = {
  weekly: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  monthly: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  all: null
};

function isRealUser(u) {
  return !!u && u.type === 'User' && !GITHUB_BOT_DENYLIST.has(u.login);
}

// --- Discourse Logic ---

async function fetchDiscourseUsers(period) {
  const headers = {
    'User-Agent': 'meshery-leaderboard-bot/1.0',
    'Accept': 'application/json'
  };

  const url = `${DISCOURSE_BASE_URL}?period=${period}&order=likes_received&limit=50`;
  const response = await fetch(url, { headers });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Discourse API error (period=${period}): ${response.status} - ${body.slice(0, 200)}`);
  }

  const data = await response.json();
  return data.directory_items;
}

function computeDiscourseScore(item) {
  return (item.post_count || 0) +
    ((item.likes_received || 0) * 2) +
    ((item.solutions || 0) * 3);
}

function buildDiscourseLeaderboard(items) {
  return (items || [])
    .filter(item => item && item.user && item.user.username && !item.user.username.startsWith('anon'))
    .map(item => ({
      rank: 0,
      username: item.user.username,
      avatar: item.user.avatar_template ? `https://discuss.meshery.io${item.user.avatar_template.replace('{size}', '200')}` : '',
      profile_url: `https://discuss.meshery.io/u/${item.user.username}`,
      posts: item.post_count || 0,
      likes: item.likes_received || 0,
      solutions: item.solutions || 0,
      score: computeDiscourseScore(item)
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

async function buildAllDiscoursePeriods() {
  const periods = {};
  for (const period of PERIODS) {
    const items = await fetchDiscourseUsers(period);
    periods[period] = buildDiscourseLeaderboard(items);
  }
  if (!periods.all.length) {
    throw new Error('Discourse all-time period empty — refusing to overwrite');
  }
  return periods;
}

// --- GitHub Logic ---

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function githubFetch(url, attempt = 0) {
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

  const isRateLimited =
    res.status === 429 ||
    (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0') ||
    (res.status === 403 && res.headers.get('retry-after') !== null);

  if (isRateLimited && attempt < 2) {
    const retryAfter = res.headers.get('retry-after');
    const resetAt = res.headers.get('x-ratelimit-reset');
    let waitMs = 60000;
    if (retryAfter) waitMs = (parseInt(retryAfter, 10) + 2) * 1000;
    else if (resetAt) waitMs = Math.max(0, (parseInt(resetAt, 10) * 1000) - Date.now()) + 2000;

    console.warn(`Rate limited by GitHub. Waiting ${Math.round(waitMs / 1000)}s before retry...`);
    await sleep(waitMs);
    return githubFetch(url, attempt + 1);
  }

  if (isRateLimited) {
    throw new Error(`GitHub API error: rate limited after retries, giving up (${url})`);
  }

  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${url}`);
  return res.json();
}

async function searchAll(query, maxPages) {
  const items = [];
  let page = 1;
  while (page <= maxPages) {
    const data = await githubFetch(`${GITHUB_API}/search/issues?q=${query}&sort=created&order=desc&per_page=100&page=${page}&advanced_search=true`);
    if (!data || !data.items || data.items.length === 0) break;
    items.push(...data.items);
    if (data.items.length < 100) break;
    page++;
    await sleep(2000);
  }
  return items;
}

async function fetchAllReviews(prUrl) {
  const reviews = [];
  let page = 1;
  while (true) {
    const data = await githubFetch(`${prUrl}/reviews?per_page=100&page=${page}`);
    if (!data || !Array.isArray(data) || data.length === 0) break;
    reviews.push(...data);
    if (data.length < 100) break;
    page++;
    await sleep(1000);
  }
  return reviews;
}

async function collectGitHubContributors(since, prReviewsCache) {
  const userStats = {};
  const initUser = (u) => {
    if (!userStats[u.login]) {
      userStats[u.login] = {
        github_username: u.login,
        avatar_url: u.avatar_url,
        profile_url: u.html_url,
        issues: 0, prs: 0, reviews: 0
      };
    }
  };

  const dateFilter = since ? `+created:${encodeURIComponent('>=' + since)}` : '';
  const updatedFilter = since ? `+updated:${encodeURIComponent('>=' + since)}` : '';
  const mergedDateFilter = since ? `+merged:${encodeURIComponent('>=' + since)}` : '';

  // 1. Issues
  const issueItems = await searchAll(`org:${GITHUB_ORG}+is:issue${dateFilter}`, 5);
  for (const item of issueItems) {
    if (isRealUser(item.user)) {
      initUser(item.user);
      userStats[item.user.login].issues++;
    }
  }

  // 2. PRs merged in the period — queried directly via GitHub's `is:merged`
  // qualifier so we don't miss PRs merged outside the recent-activity window.
  const mergedPrs = await searchAll(`org:${GITHUB_ORG}+is:pr+is:merged${mergedDateFilter}`, 10);
  for (const item of mergedPrs) {
    if (isRealUser(item.user)) {
      initUser(item.user);
      userStats[item.user.login].prs++;
    }
  }

  // 3. Reviews — separate, broader candidate set since a review can land on
  // any PR (open, closed, or merged), not just ones merged in this period.
  const reviewCandidatePrs = await searchAll(`org:${GITHUB_ORG}+is:pr${updatedFilter}`, 2);

  for (const pr of reviewCandidatePrs) {
    if (!pr.pull_request || !pr.pull_request.url) continue;
    const prUrl = pr.pull_request.url;

    if (!(prUrl in prReviewsCache)) {
      prReviewsCache[prUrl] = await fetchAllReviews(prUrl);
    }

    const reviews = prReviewsCache[prUrl];
    if (!reviews || !Array.isArray(reviews)) continue;

    const reviewedUsers = new Set();
    for (const r of reviews) {
      if (isRealUser(r.user) && r.state !== 'PENDING') {
        if (!since || (r.submitted_at && new Date(r.submitted_at) >= new Date(since))) {
          reviewedUsers.add(r.user.login);
          initUser(r.user);
        }
      }
    }
    for (const username of reviewedUsers) {
      userStats[username].reviews++;
    }
  }

  return userStats;
}

// GitHub activity score: 3 points per PR merged, 2 per issue opened,
// 1 per formal PR review.
function buildGitHubLeaderboard(userStats) {
  return Object.values(userStats)
    .map(user => ({
      ...user,
      github_score: (3 * user.prs) + (2 * user.issues) + user.reviews
    }))
    .sort((a, b) => {
      if (b.github_score !== a.github_score) return b.github_score - a.github_score;
      return a.github_username.localeCompare(b.github_username);
    })
    .slice(0, 50)
    .map((user, index) => ({
      ...user,
      rank: index + 1
    }));
}

async function buildAllGitHubPeriods() {
  const periods = {};
  const prReviewsCache = {}; // Cache to avoid redundant API calls across periods
  for (const period of PERIODS) {
    console.log(`Fetching GitHub stats for period: ${period}`);
    const since = PERIOD_SINCE[period];
    const userStats = await collectGitHubContributors(since, prReviewsCache);
    periods[period] = buildGitHubLeaderboard(userStats);
  }
  if (!periods.all.length) {
    throw new Error('GitHub all-time period empty — refusing to overwrite');
  }
  return periods;
}

// --- Save Data ---

function saveJSON(filename, periods, defaultPeriod) {
  const output = {
    last_updated: new Date().toISOString(),
    ...(defaultPeriod ? { default_period: defaultPeriod } : {}),
    periods
  };
  const outputPath = path.join(__dirname, '../../_data', filename);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  for (const [period, users] of Object.entries(periods)) {
    console.log(`Saved ${users.length} users to ${filename} for period=${period}`);
  }
}

async function main() {
  let hadError = false;

  try {
    const discoursePeriods = await buildAllDiscoursePeriods();
    saveJSON('leaderboard.json', discoursePeriods, 'weekly');
  } catch (err) {
    console.error('Discourse leaderboard build failed:', err.message);
    hadError = true;
  }

  if (GITHUB_TOKEN) {
    try {
      const githubPeriods = await buildAllGitHubPeriods();
      saveJSON('github_leaderboard.json', githubPeriods, null);
    } catch (err) {
      console.error('GitHub leaderboard build failed:', err.message);
      hadError = true;
    }
  } else {
    console.warn('No GITHUB_TOKEN provided, skipping GitHub stats generation.');
  }

  if (hadError) process.exit(1);
}

main();
