const fs = require('fs');
const path = require('path');

const DISCOURSE_BASE_URL = 'https://discuss.meshery.io/directory_items.json';
const PERIODS = ['weekly', 'monthly', 'yearly', 'all'];
const GITHUB_API = 'https://api.github.com';
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';
const GITHUB_ORG = 'meshery';
// GITHUB_TOKEN (the Actions-provided token) is rate-limited to 1,000 req/hr
// per repository, not the 5,000 req/hr of a user PAT. Set GH_ACCESS_TOKEN
// (a personal access token) in CI to get the higher limit; GITHUB_TOKEN
// remains the local-dev fallback.
const GITHUB_TOKEN = process.env.GH_ACCESS_TOKEN || process.env.GITHUB_TOKEN || '';
const GITHUB_BOT_DENYLIST = new Set(['l5io']);

// Rolling period cutoff timestamps in ISO UTC format for exact boundary comparisons.
const PERIOD_SINCE = {
  weekly: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  monthly: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  yearly: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
  all: null
};

// isRealUser is the REST-shaped check, still used by fetchRepositories'
// pagination path if ever needed for REST data. GraphQL responses use
// __typename instead of `type` — see isRealGraphQLUser below.
function isRealUser(u) {
  return !!u && u.type === 'User' && !u.login.endsWith('[bot]') && !GITHUB_BOT_DENYLIST.has(u.login);
}

function isRealGraphQLUser(u) {
  return !!u && u.__typename === 'User' && !u.login.endsWith('[bot]') && !GITHUB_BOT_DENYLIST.has(u.login);
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

// --- GitHub Logic (REST — repo discovery only) ---

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

// Conservative floor until the first response tells us the real limit
// (1,000/hr for GITHUB_TOKEN, 5,000/hr for a PAT). Starting low means the
// headroom guard is safe either way instead of assuming the best case.
// Only used by the REST path (fetchRepositories).
let remainingRateLimit = 1000;

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
    if (remainingRateLimit < 200) {
      throw new Error(`GitHub API rate limit headroom exhausted (${remainingRateLimit} remaining) during repository discovery — failing safely to preserve previous valid leaderboard`);
    }
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

// --- GitHub Logic (GraphQL — issues, PRs, and reviews) ---

// Conservative floor until the first response tells us the real limit
// (1,000 points/hr for GITHUB_TOKEN, 5,000 points/hr for a PAT / GH_ACCESS_TOKEN).
// Starting low ensures the headroom guard is safe before the first call.
let remainingGraphQLPoints = 1000;

async function githubGraphQL(query, variables, attempt = 0) {
  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'User-Agent': 'meshery-leaderboard-bot/1.0',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GITHUB_TOKEN}`
    },
    body: JSON.stringify({ query, variables })
  });

  if (!res.ok) {
    if ((res.status === 429 || res.status === 403) && attempt < 2) {
      const retryAfter = res.headers.get('retry-after');
      const waitMs = retryAfter ? (parseInt(retryAfter, 10) + 2) * 1000 : 60000;
      console.warn(`GraphQL HTTP rate limit. Waiting ${Math.round(waitMs / 1000)}s before retry...`);
      await sleep(waitMs);
      return githubGraphQL(query, variables, attempt + 1);
    }
    const body = await res.text();
    throw new GitHubFetchError(`GraphQL HTTP error: ${res.status} - ${body.slice(0, 300)}`, res.status);
  }

  const json = await res.json();

  if (json.errors && json.errors.length) {
    const rateLimited = json.errors.some(e => e.type === 'RATE_LIMITED');
    if (rateLimited && attempt < 2) {
      console.warn('GraphQL query cost exceeded remaining budget. Waiting 60s before retry...');
      await sleep(60000);
      return githubGraphQL(query, variables, attempt + 1);
    }
    throw new GitHubFetchError(`GraphQL errors: ${JSON.stringify(json.errors).slice(0, 300)}`, 200);
  }

  if (json.data && json.data.rateLimit) {
    remainingGraphQLPoints = json.data.rateLimit.remaining;
  }

  return json.data;
}

const PR_REVIEWS_QUERY = `
  query($org: String!, $repo: String!, $cursor: String) {
    rateLimit { remaining cost resetAt }
    repository(owner: $org, name: $repo) {
      pullRequests(first: 50, after: $cursor, orderBy: {field: UPDATED_AT, direction: DESC}) {
        pageInfo { hasNextPage endCursor }
        nodes {
          number
          createdAt
          mergedAt
          updatedAt
          author { login avatarUrl url __typename }
          reviews(first: 30) {
            totalCount
            nodes {
              state
              submittedAt
              author { login avatarUrl url __typename }
            }
          }
        }
      }
    }
  }
`;

const ISSUES_QUERY = `
  query($org: String!, $repo: String!, $cursor: String) {
    rateLimit { remaining cost resetAt }
    repository(owner: $org, name: $repo) {
      issues(first: 75, after: $cursor, orderBy: {field: CREATED_AT, direction: DESC}) {
        pageInfo { hasNextPage endCursor }
        nodes {
          number
          createdAt
          author { login avatarUrl url __typename }
        }
      }
    }
  }
`;

async function fetchRepositoryPRsAndReviews(repoName) {
  const prs = [];
  const reviews = [];
  let cursor = null;
  while (true) {
    if (remainingGraphQLPoints < 200) {
      throw new Error(`GraphQL rate limit headroom exhausted (${remainingGraphQLPoints} points remaining) while fetching PRs for '${repoName}' — failing safely to preserve previous valid leaderboard`);
    }
    const data = await githubGraphQL(PR_REVIEWS_QUERY, { org: GITHUB_ORG, repo: repoName, cursor });
    const conn = data.repository.pullRequests;
    for (const pr of conn.nodes) {
      prs.push({
        number: pr.number,
        user: pr.author,
        created_at: pr.createdAt,
        updated_at: pr.updatedAt,
        merged_at: pr.mergedAt || null
      });
      if (pr.reviews.totalCount > pr.reviews.nodes.length) {
        console.warn(`'${repoName}' PR #${pr.number} has ${pr.reviews.totalCount} reviews, only first ${pr.reviews.nodes.length} counted.`);
      }
      for (const r of pr.reviews.nodes) {
        if (isRealGraphQLUser(r.author) && r.state !== 'PENDING') {
          reviews.push({ prNumber: pr.number, user: r.author, submitted_at: r.submittedAt, state: r.state });
        }
      }
    }
    if (!conn.pageInfo.hasNextPage) break;
    cursor = conn.pageInfo.endCursor;
  }
  return { prs, reviews };
}

async function fetchRepositoryIssuesGraphQL(repoName) {
  const issues = [];
  let cursor = null;
  while (true) {
    if (remainingGraphQLPoints < 200) {
      throw new Error(`GraphQL rate limit headroom exhausted (${remainingGraphQLPoints} points remaining) while fetching issues for '${repoName}' — failing safely to preserve previous valid leaderboard`);
    }
    const data = await githubGraphQL(ISSUES_QUERY, { org: GITHUB_ORG, repo: repoName, cursor });
    const conn = data.repository.issues;
    for (const issue of conn.nodes) {
      issues.push({ number: issue.number, user: issue.author, created_at: issue.createdAt });
    }
    if (!conn.pageInfo.hasNextPage) break;
    cursor = conn.pageInfo.endCursor;
  }
  return issues;
}

async function fetchGitHubActivity() {
  const activity = {
    issues: [],
    prs: [],
    reviews: []
  };

  // Repo discovery stays on REST (fetchRepositories) — it's cheap and not
  // worth converting.
  const repos = await fetchRepositories();
  console.log(`Discovered ${repos.length} non-fork repositories in org '${GITHUB_ORG}'.`);

  for (const repo of repos) {
    const issues = await fetchRepositoryIssuesGraphQL(repo.name);
    const { prs, reviews } = await fetchRepositoryPRsAndReviews(repo.name);
    activity.issues.push(...issues);
    activity.prs.push(...prs);
    activity.reviews.push(...reviews);
  }
  console.log(`Loaded ${activity.issues.length} issues, ${activity.prs.length} PRs, ${activity.reviews.length} reviews across all repos and all history.`);

  return activity;
}

// GitHub activity score: 3 points per PR merged, 2 per issue opened,
// 1 per formal PR review. GraphQL fetches full history for every repo (no
// recency window), so review data is complete for every period — no
// reviewsReliable masking needed.
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
          avatar_url: u.avatarUrl,
          profile_url: u.url,
          issues: 0, prs: 0, reviews: 0
        };
      }
    };

    // 1. Issues opened (classified strictly by created_at)
    for (const issue of activity.issues) {
      if (sinceMs !== null && (!issue.created_at || new Date(issue.created_at).getTime() < sinceMs)) continue;
      if (isRealGraphQLUser(issue.user)) {
        initUser(issue.user);
        userStats[issue.user.login].issues++;
      }
    }

    // 2. PRs merged (classified strictly by merged_at)
    for (const pr of activity.prs) {
      if (!pr.merged_at) continue; // unmerged PRs are never counted
      if (sinceMs !== null && new Date(pr.merged_at).getTime() < sinceMs) continue;
      if (isRealGraphQLUser(pr.user)) {
        initUser(pr.user);
        userStats[pr.user.login].prs++;
      }
    }

    // 3. Reviews submitted (1 per reviewer per PR, classified by submitted_at)
    const reviewedByPr = {};
    for (const r of activity.reviews) {
      if (!isRealGraphQLUser(r.user)) continue;
      if (sinceMs !== null && (!r.submitted_at || new Date(r.submitted_at).getTime() < sinceMs)) continue;
      const key = r.prNumber + ':' + r.user.login;
      if (reviewedByPr[key]) continue;
      reviewedByPr[key] = true;
      initUser(r.user);
      userStats[r.user.login].reviews++;
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
  let discourseFailed = false;

  try {
    const discoursePeriods = await buildAllDiscoursePeriods();
    saveJSON('discuss_leaderboard.json', discoursePeriods, 'weekly');
  } catch (err) {
    console.error('Discourse leaderboard build failed:', err.message);
    if (err.cause) console.error('Cause:', err.cause);
    discourseFailed = true;
  }

  if (GITHUB_TOKEN) {
    try {
      const githubPeriods = await buildAllGitHubPeriods();
      saveJSON('github_leaderboard.json', githubPeriods, 'weekly');
    } catch (err) {
      // Non-fatal for the process exit code: a GitHub-only failure must not
      // block the Discourse update from being committed. The workflow's
      // commit step still needs `if: always()` so it runs even when this
      // exits 1 for a Discourse failure.
      console.error('GitHub leaderboard build failed:', err.message);
    }
  } else {
    console.warn('No GITHUB_TOKEN provided, skipping GitHub stats generation.');
  }

  if (discourseFailed) process.exit(1);
}

// Export for unit/mock testing
if (typeof module !== 'undefined') {
  module.exports = {
    isRealUser,
    isRealGraphQLUser,
    PERIODS,
    PERIOD_SINCE,
    fetchRepositories,
    fetchRepositoryPRsAndReviews,
    fetchRepositoryIssuesGraphQL,
    fetchGitHubActivity,
    buildGitHubLeaderboard,
    aggregateGitHubPeriods,
    GitHubFetchError
  };
}

if (require.main === module) {
  main();
}
