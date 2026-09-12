const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const { JSDOM } = require('jsdom');

const blogSearchScript = fs.readFileSync(
  path.join(__dirname, '..', 'js', 'blog-search.js'),
  'utf8'
);

const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

async function renderSearchResult(result, query) {
  const dom = new JSDOM(`
    <input id="blog-search-input">
    <button id="clear-search-btn"></button>
    <div id="search-summary"></div>
    <div id="search-results"></div>
    <div class="blog-posts"></div>
  `, { runScripts: 'dangerously', url: 'https://meshery.io/blog/' });

  const { document } = dom.window;

  dom.window.fetch = async () => ({
    ok: true,
    json: async () => [result]
  });

  const script = document.createElement('script');
  script.textContent = blogSearchScript;
  document.body.appendChild(script);
  document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
  await delay(0);

  const searchInput = document.getElementById('blog-search-input');
  searchInput.value = query;
  searchInput.dispatchEvent(new dom.window.Event('input'));
  await delay(350);

  return { dom, resultElement: document.querySelector('.search-result-item') };
}

test('renders HTML-like metadata as inert text without creating elements', async () => {
  const title = '<img src=x onerror=alert(1)> Safe title';
  const category = '<svg onload=alert(2)>Category';
  const author = '<script>alert(3)</script> Author';
  const excerpt = '<iframe src=javascript:alert(4)>Excerpt';
  const { dom, resultElement } = await renderSearchResult({
    title,
    url: '/blog/safe/',
    date: '2026-01-01',
    author,
    categories: [category],
    excerpt,
    content: `${title} ${category} ${author} ${excerpt}`
  }, 'safe');

  assert.ok(resultElement);
  assert.equal(resultElement.querySelector('img, svg, script, iframe'), null);
  assert.match(resultElement.textContent, /<img src=x onerror=alert\(1\)> Safe title/);
  assert.match(resultElement.textContent, /<svg onload=alert\(2\)>category/);
  assert.match(resultElement.textContent, /<script>alert\(3\)<\/script> Author/);
  assert.match(resultElement.textContent, /<iframe src=javascript:alert\(4\)>Excerpt/);

  dom.window.close();
});

test('only uses HTTP(S) URLs as result link destinations', async () => {
  for (const url of ['data:text/html,<script>alert(1)</script>', 'mailto:test@example.com', 'ftp://example.com/file']) {
    const { dom, resultElement } = await renderSearchResult({
      title: 'Safe title',
      url,
      categories: ['Category'],
      excerpt: 'Safe excerpt',
      content: 'Safe title Safe excerpt'
    }, 'safe');

    assert.ok(resultElement);
    const resultLinks = resultElement.querySelectorAll('h2 a, .link');
    assert.equal(resultLinks.length, 2);
    assert.equal([...resultLinks].every(link => !link.hasAttribute('href')), true);
    dom.window.close();
  }

  for (const url of ['http://example.com/blog/safe/', 'https://example.com/blog/safe/']) {
    const { dom, resultElement } = await renderSearchResult({
      title: 'Safe title',
      url,
      categories: ['Category'],
      excerpt: 'Safe excerpt',
      content: 'Safe title Safe excerpt'
    }, 'safe');

    assert.ok(resultElement);
    const resultLinks = resultElement.querySelectorAll('h2 a, .link');
    assert.equal(resultLinks.length, 2);
    assert.equal([...resultLinks].every(link => link.href === url), true);
    dom.window.close();
  }
});