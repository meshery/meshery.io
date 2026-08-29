const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://discuss.meshery.io/directory_items.json';
const PERIODS = ['weekly', 'monthly', 'yearly', 'all'];

/**
 * Fetches user directory items for a given leaderboard period from Discourse API.
 * Uses Discourse's pre-aggregated directory items endpoint.
 *
 * @param {string} period - The timeframe period ('weekly', 'monthly', 'yearly', 'all').
 * @returns {Promise<Array>} Array of user directory items.
 */
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

/**
 * Computes the total weighted leaderboard score for a user item.
 * Formula: posts + (likes * 2) + (solutions * 3)
 *
 * @param {Object} item - User directory item.
 * @returns {number} Weighted score.
 */
function computeScore(item) {
  return (item.post_count || 0) +
        ((item.likes_received || 0) * 2) +
        ((item.solutions || 0) * 3);
}

/**
 * Transforms raw Discourse directory items into ranked leaderboard entries.
 *
 * @param {Array} items - Raw directory items.
 * @returns {Array} Ranked user objects.
 */
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
    .sort((a, b) => b.score - a.score)
    .map((user, index) => ({
      ...user,
      rank: index + 1
    }));
}

/**
 * Fetches and builds leaderboard entries for all configured periods.
 *
 * @returns {Promise<Object>} Map of period keys to arrays of ranked user objects.
 */
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

/**
 * Saves generated leaderboard data to _data/leaderboard.json.
 *
 * @param {Object} periods - Compiled periods leaderboard map.
 */
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

/**
 * Main execution entry point for updating leaderboard data.
 */
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
