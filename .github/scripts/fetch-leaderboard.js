const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://discuss.meshery.io/directory_items.json';
const PERIODS = ['weekly', 'monthly', 'yearly', 'all'];

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
  if (!items) return [];

  const leaderboard = [];
  for (const item of items) {
    if (!item || !item.user || !item.user.username || item.user.username.startsWith('anon')) {
      continue;
    }
    leaderboard.push({
      rank: 0,
      username: item.user.username,
      avatar: item.user.avatar_template ? `https://discuss.meshery.io${item.user.avatar_template.replace('{size}', '200')}` : '',
      profile_url: `https://discuss.meshery.io/u/${item.user.username}`,
      posts: item.post_count || 0,
      likes: item.likes_received || 0,
      solutions: item.solutions || 0,
      score: computeScore(item)
    });
  }

  leaderboard.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.username.localeCompare(b.username);
  });

  for (let i = 0; i < leaderboard.length; i++) {
    leaderboard[i].rank = i + 1;
  }

  return leaderboard;
}

async function buildAllPeriods() {
  const entries = await Promise.all(
    PERIODS.map(async (period) => {
      const items = await fetchUsers(period);
      return [period, buildLeaderboard(items)];
    })
  );

  const periods = Object.fromEntries(entries);

  if (!periods.all || !periods.all.length) {
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
  await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.promises.writeFile(outputPath, JSON.stringify(output, null, 2));

  for (const [period, users] of Object.entries(periods)) {
    console.log(`Saved ${users.length} users for period=${period}`);
  }
}

async function main() {
  try {
    const periods = await buildAllPeriods();
    await saveJSON(periods);
  } catch (err) {
    console.error('Leaderboard build failed:', err.message);
    process.exit(1);
  }
}

main();
