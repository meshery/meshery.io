'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const catalogStore = fs.readFileSync(
  path.join(__dirname, '..', '_includes', 'catalog-store.html'),
  'utf8'
);
const catalogScript = catalogStore.match(/<script>\s*([\s\S]*?)\s*<\/script>/)[1];

function element(properties = {}) {
  const listeners = {};
  return {
    _listeners: listeners,
    children: [],
    dataset: {},
    hidden: false,
    style: {},
    ...properties,
    addEventListener(event, listener) {
      listeners[event] = listener;
    },
    dispatchEvent(event) {
      listeners[event.type]?.(event);
    },
    appendChild(child) {
      const index = this.children.indexOf(child);
      if (index !== -1) this.children.splice(index, 1);
      this.children.push(child);
      child.parentNode = this;
      return child;
    },
    querySelectorAll() {
      return [];
    },
  };
}

function runCatalog(cards, sortBy) {
  const grid = element();
  let gridCards = cards.slice();
  grid.querySelectorAll = (selector) => (selector === '.cstore-card' ? gridCards.slice() : []);
  grid.appendChild = (child) => {
    const index = gridCards.indexOf(child);
    if (index !== -1) gridCards.splice(index, 1);
    gridCards.push(child);
    child.parentNode = grid;
  };
  grid.order = () => gridCards.slice();
  gridCards.forEach((card) => { card.parentNode = grid; });

  const sort = element({ value: 'newest' });
  const more = element({ parentNode: element() });
  const elements = {
    'cstore-grid': grid,
    'cstore-search': element({ value: '' }),
    'cstore-sort': sort,
    'cstore-status': element(),
    'cstore-more': more,
    'cstore-empty': element(),
    'cstore-active': element(),
    'cstore-techs': element(),
    'cstore-tech-search': element({ value: '' }),
    'cstore-clear': element(),
    'cstore-empty-clear': element(),
  };
  const document = {
    getElementById(id) {
      return elements[id];
    },
    querySelector(selector) {
      return selector === '.cstore' ? element() : null;
    },
    querySelectorAll() {
      return [];
    },
    createElement() {
      return element();
    },
  };
  const location = { search: `?sort=${sortBy}`, pathname: '/catalog' };
  const context = {
    URLSearchParams,
    clearTimeout,
    document,
    history: { replaceState() {} },
    setTimeout,
    window: { location },
  };

  vm.runInNewContext(catalogScript, context);
  return { grid, sort };
}

function card(name, heading, sourceName = heading, identity = sourceName) {
  return element({
    dataset: { created: '2026-01-01', name, tech: '', text: '', type: '' },
    heading,
    identity,
    sourceName,
  });
}

function cardFromRawSource(sourceName, identity = sourceName) {
  const trimmedName = sourceName.trim();
  const heading = trimmedName.endsWith('.tgz')
    ? trimmedName.slice(0, -'.tgz'.length).trim()
    : trimmedName;
  return card(heading, heading, sourceName, identity);
}

test('Catalog name sorting uses normalized displayed design titles', () => {
  // This rendered-card fixture is the user-visible contract from issue #3270.
  // Its fixed order rejects the old raw, case-sensitive comparison: raw names
  // put the tab-prefixed title before A titles and order lowercase first.
  function catalogCards() {
    return [
      cardFromRawSource('\tOnline Polling Application '),
      cardFromRawSource('Alpha Zoo'),
      cardFromRawSource('alpha application'),
      cardFromRawSource(' Alpha.tgz ', 'suffix-normalized'),
      cardFromRawSource('Alpha 2'),
      cardFromRawSource('Beta', 'case-tie-upper'),
      cardFromRawSource('beta', 'case-tie-lower'),
      cardFromRawSource('Working with .tgz archives', 'middle-tgz-preserved'),
    ];
  }

  let cards = catalogCards();
  let { grid, sort } = runCatalog(cards, 'az');
  assert.equal(sort.value, 'az');
  assert.deepEqual(
    grid.order().map((item) => item.heading),
    [
      'Alpha',
      'Alpha 2',
      'alpha application',
      'Alpha Zoo',
      'Beta',
      'beta',
      'Online Polling Application',
      'Working with .tgz archives',
    ]
  );
  assert.equal(cards.find((item) => item.identity === 'suffix-normalized').dataset.name, 'Alpha');
  assert.equal(cards.find((item) => item.identity === 'suffix-normalized').heading, 'Alpha');
  assert.equal(
    cards.find((item) => item.identity === 'middle-tgz-preserved').heading,
    'Working with .tgz archives'
  );
  assert.deepEqual(
    grid.order()
      .filter((item) => item.identity.startsWith('case-tie-'))
      .map((item) => item.identity),
    ['case-tie-upper', 'case-tie-lower']
  );

  cards = catalogCards();
  ({ grid } = runCatalog(cards, 'za'));
  assert.deepEqual(
    grid.order().map((item) => item.heading),
    [
      'Working with .tgz archives',
      'Online Polling Application',
      'Beta',
      'beta',
      'Alpha Zoo',
      'alpha application',
      'Alpha 2',
      'Alpha',
    ]
  );
  assert.deepEqual(
    grid.order()
      .filter((item) => item.identity.startsWith('case-tie-'))
      .map((item) => item.identity),
    ['case-tie-upper', 'case-tie-lower']
  );
});
