'use strict';

const assert = require('node:assert/strict');
const { test, beforeEach, afterEach } = require('node:test');

const { fetchUsers } = require('../.github/scripts/fetch-leaderboard.js');

const originalFetch = global.fetch;
let calls;

function mockFetch(responses) {
  global.fetch = async (url, options) => {
    calls.push(options);
    return responses.shift();
  };
}

beforeEach(() => { calls = []; });
afterEach(() => { global.fetch = originalFetch; });

test('fetchUsers retries a transient 5xx and passes a timeout signal', async () => {
  mockFetch([
    new Response('unavailable', { status: 503 }),
    Response.json({ directory_items: [{ id: 1 }] }),
  ]);

  const items = await fetchUsers('weekly');

  assert.deepEqual(items, [{ id: 1 }]);
  assert.equal(calls.length, 2);
  assert.ok(calls[0].signal instanceof AbortSignal);
  assert.equal(calls[0].headers['Accept-Encoding'], 'gzip, deflate, br');
});

test('fetchUsers does not retry a non-transient 4xx', async () => {
  mockFetch([new Response('not found', { status: 404 })]);

  await assert.rejects(fetchUsers('weekly'), /404 - not found/);
  assert.equal(calls.length, 1);
});

test('fetchUsers retries when reading a successful response body fails', async () => {
  const broken = new Response('{}');
  broken.text = async () => { throw new Error('terminated'); };
  mockFetch([broken, Response.json({ directory_items: [{ id: 2 }] })]);

  const items = await fetchUsers('weekly');

  assert.deepEqual(items, [{ id: 2 }]);
  assert.equal(calls.length, 2);
});

test('fetchUsers retries when a successful response body is not JSON', async () => {
  mockFetch([
    new Response('<html>error</html>', { status: 200 }),
    Response.json({ directory_items: [{ id: 3 }] }),
  ]);

  const items = await fetchUsers('weekly');

  assert.deepEqual(items, [{ id: 3 }]);
  assert.equal(calls.length, 2);
});
