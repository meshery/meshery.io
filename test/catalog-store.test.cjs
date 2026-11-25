'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const vm = require('node:vm');
const { test } = require('node:test');

const catalogStore = fs.readFileSync(
  path.join(__dirname, '..', '_includes', 'catalog-store.html'),
  'utf8'
);
const catalogScript = catalogStore.match(/<script>\s*([\s\S]*?)\s*<\/script>/)[1];
const liquidRenderer = `
require "jekyll"
require "json"

class TestSite
  def baseurl
    ""
  end

  def filter_cache
    @filter_cache ||= {}
  end
end

Liquid::Template.register_filter(Jekyll::Filters)
template = Liquid::Template.parse(STDIN.read)
context = { "site" => { "catalog" => JSON.parse(ARGV.fetch(0)) } }
print template.render!(context, registers: { site: TestSite.new })
`;
const liquidRendererAvailable = spawnSync('bundle', ['exec', 'ruby', '-e', 'require "jekyll"']).status === 0;

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

function card(name, heading, alt) {
  return element({
    dataset: { created: '2026-01-01', name, tech: '', text: '', type: '' },
    heading,
    alt,
  });
}

function renderCatalogCards(designs) {
  const result = spawnSync(
    'bundle',
    ['exec', 'ruby', '-e', liquidRenderer, JSON.stringify(designs)],
    { encoding: 'utf8', input: catalogStore }
  );
  assert.equal(result.error, undefined, result.error?.message);
  assert.equal(result.status, 0, result.stderr);
  return [...result.stdout.matchAll(
    /<li class="cstore-card" data-name="([^"]*)"[^>]*>[\s\S]*?<img alt="([^"]*)"[\s\S]*?<h3 class="cstore-name">([\s\S]*?)<\/h3>/g
  )].map(([, name, alt, heading]) => card(name, heading.trim(), alt));
}

test('Catalog name sorting uses normalized displayed design titles', { skip: !liquidRendererAvailable }, () => {
  const designs = [
    { name: '\tOnline Polling Application ', patternId: 'online', type: 'example', compatibility: [] },
    { name: 'Alpha Zoo', patternId: 'alpha-zoo', type: 'example', compatibility: [] },
    { name: 'alpha application', patternId: 'alpha-application', type: 'example', compatibility: [] },
    { name: ' Alpha.tgz ', patternId: 'suffix-normalized', type: 'example', compatibility: [] },
    { name: 'alpha', patternId: 'case-tie-lower', type: 'example', compatibility: [] },
    { name: 'Alpha 2', patternId: 'alpha-2', type: 'example', compatibility: [] },
    { name: 'Working with .tgz archives', patternId: 'middle-tgz-preserved', type: 'example', compatibility: [] },
  ];
  const expectedTitles = [
    'Online Polling Application',
    'Alpha Zoo',
    'alpha application',
    'Alpha',
    'alpha',
    'Alpha 2',
    'Working with .tgz archives',
  ];

  let cards = renderCatalogCards(designs);
  assert.deepEqual(cards.map((item) => item.dataset.name), expectedTitles);
  assert.deepEqual(cards.map((item) => item.heading), expectedTitles);
  assert.deepEqual(
    cards.map((item) => item.alt),
    expectedTitles.map((title) => `Snapshot of the ${title} design`)
  );
  let { grid, sort } = runCatalog(cards, 'az');
  assert.equal(sort.value, 'az');
  assert.deepEqual(
    grid.order().map((item) => item.heading),
    [
      'Alpha',
      'alpha',
      'Alpha 2',
      'alpha application',
      'Alpha Zoo',
      'Online Polling Application',
      'Working with .tgz archives',
    ]
  );
  assert.deepEqual(
    grid.order()
      .filter((item) => ['Alpha', 'alpha'].includes(item.heading))
      .map((item) => item.heading),
    ['Alpha', 'alpha']
  );

  cards = renderCatalogCards(designs);
  ({ grid } = runCatalog(cards, 'za'));
  assert.deepEqual(
    grid.order().map((item) => item.heading),
    [
      'Working with .tgz archives',
      'Online Polling Application',
      'Alpha Zoo',
      'alpha application',
      'Alpha 2',
      'Alpha',
      'alpha',
    ]
  );
  assert.deepEqual(
    grid.order()
      .filter((item) => ['Alpha', 'alpha'].includes(item.heading))
      .map((item) => item.heading),
    ['Alpha', 'alpha']
  );
});
