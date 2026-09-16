const fs = require('fs');
const path = require('path');

const DISCOURSE_BASE_URL = 'https://discuss.meshery.io/directory_items.json';
const PERIODS = ['weekly', 'monthly', 'yearly', 'all'];
const GITHUB_API = 'https://api.github.com';
const GITHUB_ORG = 'meshery';
// GH_ACCESS_TOKEN is only a fallback for local development runs. The CI
// workflow always sets GITHUB_TOKEN, so this branch is never reached there.
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_ACCESS_TOKEN || '';
const GITHUB_BOT_DENYLIST = new Set(['l5io']);

// Rolling period cutoff timestamps in ISO UTC format for exact boundary comparisons.
const PERIOD_SINCE = {
  weekly: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  monthly: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  yearly: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
  all: null
};

function isRealUser(u) {
  return !!u && u.type === 'User' && !u.login.endsWith('[bot]') && !GITHUB_BOT_DENYLIST.has(u.login);
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

// Explicit error type so callers can distinguish "the request failed" from
// "the resource legitimately doesn't exist" (status 404) without githubFetch
// silently deciding that for them.
class GitHubFetchError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'GitHubFetchError';
    this.status = status;
  }
}

let remainingRateLimit = 5000;

// Single contract: resolves with parsed JSON on success, always throws
// GitHubFetchError on any non-OK response (including 404) after handling
// bounded rate-limit retries. Callers that need to treat a specific status as
// meaningful (e.g. 404 = "no reviews") catch it explicitly at the call site.
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

  const ratelimitRem = res.headers.get('x-ratelimit-remaining');
  if (ratelimitRem !== null) {
    remainingRateLimit = parseInt(ratelimitRem, 10);
  }

  const isRateLimited =
    res.status === 429 ||
    (res.status === 403 && ratelimitRem === '0') ||
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
    throw new GitHubFetchError(`rate limited after retries, giving up (${url})`, res.status);
  }

  if (!res.ok) {
    throw new GitHubFetchError(`GitHub API error: ${res.status} ${url}`, res.status);
  }

  return res.json();
}

async function fetchRepositories() {
  const repos = [];
  let page = 1;
  while (true) {
    const data = await githubFetch(`${GITHUB_API}/orgs/${GITHUB_ORG}/repos?per_page=100&page=${page}`);
    if (!Array.isArray(data) || data.length === 0) break;
    for (const repo of data) {
      if (!repo.fork && !repo.disabled) {
        repos.push({ name: repo.name });
      }
    }
    if (data.length < 100) break;
    page++;
    await sleep(200);
  }
  return repos;
}

// Single paginated source for issues and pull requests per repository.
// GET /repos/{owner}/{repo}/issues returns both ordinary issues and PRs.
// PR items contain a pull_request object with merged_at and url, avoiding
// the need for a duplicate fetch from the /pulls endpoint.
async function fetchRepositoryActivity(repoName) {
  const issues = [];
  const prs = [];
  let page = 1;
  while (true) {
    const data = await githubFetch(`${GITHUB_API}/repos/${GITHUB_ORG}/${repoName}/issues?state=all&per_page=100&page=${page}`);
    if (!Array.isArray(data) || data.length === 0) break;
    for (const item of data) {
      if (item.pull_request) {
        prs.push({
          number: item.number,
          user: item.user,
          created_at: item.created_at,
          updated_at: item.updated_at,
          merged_at: item.pull_request.merged_at || null,
          url: item.pull_request.url
        });
      } else {
        issues.push({
          number: item.number,
          user: item.user,
          created_at: item.created_at
        });
      }
    }
    if (data.length < 100) break;
    page++;
    await sleep(200);
  }
  return { issues, prs };
}

async function fetchPullRequestReviews(prUrl) {
  const reviews = [];
  let page = 1;
  while (true) {
    let data;
    try {
      data = await githubFetch(`${prUrl}/reviews?per_page=100&page=${page}`);
    } catch (err) {
      // Only status 404 (e.g. PR removed or reviews endpoint missing) is treated as empty.
      if (err instanceof GitHubFetchError && err.status === 404) break;
      // All other failures (rate-limit, 5xx, network) must throw so they are fatal!
      throw err;
    }
    if (!Array.isArray(data) || data.length === 0) break;
    reviews.push(...data);
    if (data.length < 100) break;
    page++;
    await sleep(150);
  }
  return reviews;
}

// Bounded review candidate window (30 days = ~767 PRs in org:meshery).
// With ~314 repo/issue calls + ~767 review calls = ~1,081 total calls, this
// ensures 100% complete Weekly and Monthly reviews within the 5,000 req/hr rate limit.
const REVIEW_CANDIDATE_DAYS = 30;

async function fetchGitHubActivity() {
  const activity = {
    issues: [],
    prs: [],
    reviews: []
  };

  const repos = await fetchRepositories();
  console.log(`Discovered ${repos.length} non-fork repositories in org '${GITHUB_ORG}'.`);

  for (const repo of repos) {
    const { issues, prs } = await fetchRepositoryActivity(repo.name);
    activity.issues.push(...issues);
    activity.prs.push(...prs);
  }
  console.log(`Loaded ${activity.issues.length} total issues and ${activity.prs.length} total PRs.`);

  // To protect the 5,000 req/hr GitHub rate limit, review candidates are selected
  // from PRs updated in the active review window (last 30 days) and sorted newest first.
  // Weekly and Monthly review sets are guaranteed complete. Yearly and All-Time reviews
  // encompass reviews observed in this active window.
  const reviewCutoff = new Date(Date.now() - REVIEW_CANDIDATE_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const reviewCandidates = activity.prs
    .filter(pr => pr.updated_at && pr.updated_at >= reviewCutoff)
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at));

  console.log(`Evaluating reviews for ${reviewCandidates.length} candidate PRs updated since ${reviewCutoff}...`);

  for (const pr of reviewCandidates) {
    if (remainingRateLimit < 200) {
      throw new Error(`GitHub API rate limit headroom exhausted (${remainingRateLimit} remaining) during review collection — failing safely to preserve previous valid leaderboard`);
    }
    if (!pr.url) continue;
    const reviews = await fetchPullRequestReviews(pr.url);
    if (reviews.length > 0) {
      activity.reviews.push({ prUrl: pr.url, reviews });
    }
  }

  return activity;
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

function aggregateGitHubPeriods(activity) {
  const periodsData = {};

  for (const period of PERIODS) {
    const since = PERIOD_SINCE[period];
    const sinceMs = since ? new Date(since).getTime() : null;
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

    // 1. Issues opened (classified strictly by created_at)
    for (const issue of activity.issues) {
      if (sinceMs !== null && (!issue.created_at || new Date(issue.created_at).getTime() < sinceMs)) continue;
      if (isRealUser(issue.user)) {
        initUser(issue.user);
        userStats[issue.user.login].issues++;
      }
    }

    // 2. PRs merged (classified strictly by merged_at)
    for (const pr of activity.prs) {
      if (!pr.merged_at) continue; // unmerged PRs are never counted
      if (sinceMs !== null && new Date(pr.merged_at).getTime() < sinceMs) continue;
      if (isRealUser(pr.user)) {
        initUser(pr.user);
        userStats[pr.user.login].prs++;
      }
    }

    // 3. Reviews submitted (classified strictly by submitted_at, 1 per reviewer per PR)
    for (const candidate of activity.reviews) {
      const reviewedUsers = new Set();
      for (const r of candidate.reviews) {
        if (isRealUser(r.user) && r.state !== 'PENDING') {
          if (sinceMs === null || (r.submitted_at && new Date(r.submitted_at).getTime() >= sinceMs)) {
            reviewedUsers.add(r.user.login);
            initUser(r.user);
          }
        }
      }
      for (const username of reviewedUsers) {
        userStats[username].reviews++;
      }
    }

    periodsData[period] = buildGitHubLeaderboard(userStats);
  }

  return periodsData;
}

async function buildAllGitHubPeriods() {
  console.log('Fetching raw GitHub activity across all repositories...');
  const activity = await fetchGitHubActivity();

  console.log('Aggregating activity into periods...');
  const periods = aggregateGitHubPeriods(activity);

  if (!periods.all || !periods.all.length) {
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
    if (err.cause) console.error('Cause:', err.cause);
    hadError = true;
  }

  if (GITHUB_TOKEN) {
    try {
      const githubPeriods = await buildAllGitHubPeriods();
      saveJSON('github_leaderboard.json', githubPeriods, 'weekly');
    } catch (err) {
      console.error('GitHub leaderboard build failed:', err.message);
      hadError = true;
    }
  } else {
    console.warn('No GITHUB_TOKEN provided, skipping GitHub stats generation.');
  }

  if (hadError) process.exit(1);
}

// Export for unit/mock testing
if (typeof module !== 'undefined') {
  module.exports = {
    isRealUser,
    PERIODS,
    PERIOD_SINCE,
    fetchRepositories,
    fetchRepositoryActivity,
    fetchPullRequestReviews,
    fetchGitHubActivity,
    buildGitHubLeaderboard,
    aggregateGitHubPeriods,
    GitHubFetchError
  };
}

if (require.main === module) {
  main();
}
