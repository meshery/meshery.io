const fs = require('fs');
const path = require('path');

const { fetch, Agent } = require('undici');
const dispatcher = new Agent({ connect: { family: 4 } });

const API_KEY = process.env.DISCOURSE_API_KEY;
const API_USERNAME = process.env.DISCOURSE_API_USERNAME || 'system';
const BASE_URL = 'https://discuss.meshery.io/directory_items.json';

const PERIODS = ['weekly', 'monthly', 'all'];

async function fetchUsers(period) {
    const headers = {};
    if (API_KEY) {
        headers['Api-Key'] = API_KEY;
        headers['Api-Username'] = API_USERNAME;
    }

    const url = `${BASE_URL}?period=${period}&order=solutions&limit=50`;
    const response = await fetch(url, { headers, dispatcher });

    if (!response.ok) {
        throw new Error(`Discourse API error (period=${period}): ${response.status}`);
    }

    const data = await response.json();
    return data.directory_items;
}

function computeScore(item) {
    return ((item.post_count || 0) * 1) +
        ((item.likes_received || 0) * 2) +
        ((item.solutions || 0) * 3);
}

function buildLeaderboard(items) {
    return (items || [])
        .filter(item => item && item.user && item.user.username && !item.user.username.startsWith('anon'))
        .map(item => ({
            rank: 0,
            username: item.user.username,
            name: item.user.name || '',
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

async function buildAllPeriods() {
    const periods = {};

    for (const period of PERIODS) {
        const items = await fetchUsers(period);
        periods[period] = buildLeaderboard(items);
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
