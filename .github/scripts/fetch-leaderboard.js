const fs = require('fs');
const path = require('path');

const API_KEY = process.env.DISCOURSE_API_KEY;
const API_URL = 'https://discuss.layer5.io/directory_items.json?period=all&order=solutions&limit=50';

async function fetchUsers() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`Discourse API error: ${response.status}`);
    }

    const data = await response.json();
    return data.directory_items;
}

function computeScore(item) {
    return (item.post_count * 1) +
        (item.likes_received * 2) +
        (item.solutions * 3);
}

function buildLeaderboard(items) {
    return items
        .filter(item => !item.user.username.startsWith('anon'))
        .map(item => ({
            rank: 0,
            username: item.user.username,
            name: item.user.name,
            avatar: `https://discuss.layer5.io${item.user.avatar_template.replace('{size}', '50')}`,
            profile_url: `https://discuss.layer5.io/u/${item.user.username}`,
            posts: item.post_count,
            likes: item.likes_received,
            solutions: item.solutions,
            score: computeScore(item)
        }))
        .sort((a, b) => b.score - a.score)
        .map((user, index) => ({
            ...user,
            rank: index + 1
        }));
}

function saveJSON(leaderboard) {
    const output = {
        last_updated: new Date().toISOString(),
        users: leaderboard
    };

    const outputPath = path.join(__dirname, '../../_data/leaderboard.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`Saved ${leaderboard.length} users`);
}

async function main() {
    const items = await fetchUsers();
    const leaderboard = buildLeaderboard(items);
    saveJSON(leaderboard);
}

main();