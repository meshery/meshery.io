const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://discuss.meshery.io/directory_items.json';
const PERIODS = ['weekly', 'monthly', 'all'];
const GITHUB_API = 'https://api.github.com';
const GITHUB_ORG = 'meshery';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_ACCESS_TOKEN || '';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function githubFetch(url) {
  const headers = {
    'User-Agent': 'meshery-leaderboard-bot/1.0',
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (GITHUB_TOKEN) headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  const res = await fetch(url, { headers });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${url}`);
  return res.json();
}

async function fetchGitHubStats(username) {
  const user = await githubFetch(`${GITHUB_API}/users/${encodeURIComponent(username)}`);
  if (!user) return null;

  await sleep(120);

  const issuesData = await githubFetch(
    `${GITHUB_API}/search/issues?q=author:${encodeURIComponent(username)}+org:${GITHUB_ORG}+type:issue&per_page=1`
  );
  const issues = issuesData ? (issuesData.total_count || 0) : 0;
  await sleep(120);

  const prsData = await githubFetch(
    `${GITHUB_API}/search/issues?q=author:${encodeURIComponent(username)}+org:${GITHUB_ORG}+is:pr&per_page=1`
  );
  const prs = prsData ? (prsData.total_count || 0) : 0;
  await sleep(120);

  const reviewsData = await githubFetch(
    `${GITHUB_API}/search/issues?q=reviewed-by:${encodeURIComponent(username)}+org:${GITHUB_ORG}+is:pr&per_page=1`
  );
  const reviews = reviewsData ? (reviewsData.total_count || 0) : 0;

  return {
    github_username: user.login,
    github_profile_url: user.html_url,
    github_issues: issues,
    github_prs: prs,
    github_reviews: reviews,
    github_score: (issues * 2) + (prs * 3) + (reviews * 2),
  };
}

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
      avatar: item.user.avatar_template ? `https://discuss.meshery.io${item.user.avatar_template.replace('{size}', '200')}` : '',
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

async function buildAllPeriods() {
  const periods = {};

  for (const period of PERIODS) {
    const items = await fetchUsers(period);
    periods[period] = buildLeaderboard(items);
  }

  if (!periods.all.length) {
    throw new Error('all-time period empty — refusing to overwrite');
  }

  const allUsernames = [...new Set(periods.all.map(u => u.username))];
  const githubCache = {};

  for (const username of allUsernames) {
    try {
      const stats = await fetchGitHubStats(username);
      githubCache[username] = stats;
      console.log(`GitHub stats for ${username}:`, stats ? `issues=${stats.github_issues} prs=${stats.github_prs} reviews=${stats.github_reviews}` : 'not found');
    } catch (err) {
      console.warn(`Failed GitHub stats for ${username}: ${err.message}`);
      githubCache[username] = null;
    }
    await sleep(200);
  }

  for (const period of PERIODS) {
    periods[period] = periods[period].map(user => {
      const gh = githubCache[user.username];
      const github_issues = gh ? Math.max(0, parseInt(gh.github_issues) || 0) : 0;
      const github_prs = gh ? Math.max(0, parseInt(gh.github_prs) || 0) : 0;
      const github_reviews = gh ? Math.max(0, parseInt(gh.github_reviews) || 0) : 0;
      const github_score = gh ? Math.max(0, parseInt(gh.github_score) || 0) : 0;
      const total_score = user.score + github_score;
      return {
        ...user,
        github_username: gh ? gh.github_username : '',
        github_profile_url: gh ? gh.github_profile_url : '',
        github_issues,
        github_prs,
        github_reviews,
        github_score,
        total_score,
      };
    }).sort((a, b) => b.total_score - a.total_score)
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
