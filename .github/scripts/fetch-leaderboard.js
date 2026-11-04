const fs = require('node:fs/promises');
const path = require('node:path');

const BASE_URL = 'https://discuss.meshery.io/directory_items.json';
const PERIODS = ['weekly', 'monthly', 'yearly', 'all'];
const REQUEST_TIMEOUT_MS = 10000;
const MAX_RETRIES = 2;
const RETRY_BASE_DELAY_MS = 1000;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchUsers(period) {
  const headers = {
    'User-Agent': 'meshery-leaderboard-bot/1.0',
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br'
  };

  const url = `${BASE_URL}?period=${period}&order=likes_received&limit=50`;

  for (let attempt = 0; ; attempt++) {
    let response;
    try {
      response = await fetch(url, { headers, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
    } catch (err) {
      // Network errors and timeouts are transient; retry them like 5xx/429.
      if (attempt >= MAX_RETRIES) throw err;
      console.warn(`Request failed (period=${period}): ${err.message}; retrying`);
      await sleep(RETRY_BASE_DELAY_MS * 2 ** attempt);
      continue;
    }

    if (response.ok) {
      let data;
      try {
        data = JSON.parse(await response.text());
      } catch (err) {
        if (attempt >= MAX_RETRIES) throw err;
        console.warn(`Response read/parse failed (period=${period}): ${err.message}; retrying`);
        await sleep(RETRY_BASE_DELAY_MS * 2 ** attempt);
        continue;
      }
      return data.directory_items;
    }

    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable || attempt >= MAX_RETRIES) {
      const body = await response.text();
      throw new Error(`Discourse API error (period=${period}): ${response.status} - ${body.slice(0, 200)}`);
    }

    console.warn(`Discourse API returned ${response.status} (period=${period}); retrying`);
    await sleep(RETRY_BASE_DELAY_MS * 2 ** attempt);
  }
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

  return periods;
}

async function saveJSON(periods) {
  const output = {
    last_updated: new Date().toISOString(),
    default_period: 'weekly',
    periods
  };

  const outputPath = path.join(__dirname, '../../_data/leaderboard.json');
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(output, null, 2));

  for (const [period, users] of Object.entries(periods)) {
    console.log(`Saved ${users.length} users for period=${period}`);
  }
}

async function main() {
  const start = performance.now();
  try {
    const periods = await buildAllPeriods();
    await saveJSON(periods);
    console.log(`Leaderboard build completed in ${(performance.now() - start).toFixed(0)}ms`);
  } catch (err) {
    console.error(`Leaderboard build failed after ${(performance.now() - start).toFixed(0)}ms:`, err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { fetchUsers };
