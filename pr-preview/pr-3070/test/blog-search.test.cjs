'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const {
  escapeHTML,
  highlightText,
  slugify,
  withBaseUrl,
  getSafeResultUrl,
  renderResultItem,
} = require('../js/blog-search.js');

test('escapeHTML turns HTML special chars into entities', () => {
  assert.equal(escapeHTML('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;');
  assert.equal(escapeHTML('<img src=x onerror=alert(1)>'), '&lt;img src=x onerror=alert(1)&gt;');
  assert.equal(escapeHTML('"quoted" & \'apostrophe\''), '&quot;quoted&quot; &amp; &#39;apostrophe&#39;');
  assert.equal(escapeHTML('plain text'), 'plain text');
  assert.equal(escapeHTML(''), '');
  assert.equal(escapeHTML(null), '');
  assert.equal(escapeHTML(undefined), '');
});

test('withBaseUrl correctly prefixes baseurl and avoids duplicate prefixes', () => {
  assert.equal(withBaseUrl('/blog/safe/', ''), '/blog/safe/');
  assert.equal(withBaseUrl('/blog/safe/', '/meshery.io'), '/meshery.io/blog/safe/');
  assert.equal(withBaseUrl('/meshery.io/blog/safe/', '/meshery.io'), '/meshery.io/blog/safe/');
  assert.equal(withBaseUrl('https://meshery.io/blog/safe/', '/meshery.io'), 'https://meshery.io/blog/safe/');
  assert.equal(withBaseUrl('//evil.com/x', '/meshery.io'), '//evil.com/x');
});

test('highlightText returns plain escaped text when query is empty', () => {
  assert.equal(highlightText('Hello world', ''), 'Hello world');
  assert.equal(highlightText('<b>Hello</b>', ''), '&lt;b&gt;Hello&lt;/b&gt;');
});

test('highlightText wraps matches in mark tags and leaves surroundings plain', () => {
  assert.equal(
    highlightText('Hello world', 'world'),
    'Hello <mark class="search-highlight">world</mark>'
  );
});

test('highlightText is case-insensitive', () => {
  assert.equal(
    highlightText('Hello WORLD', 'world'),
    'Hello <mark class="search-highlight">WORLD</mark>'
  );
});

test('highlightText handles multiple matches', () => {
  assert.equal(
    highlightText('foo bar foo', 'foo'),
    '<mark class="search-highlight">foo</mark> bar <mark class="search-highlight">foo</mark>'
  );
});

test('highlightText escapes regex special characters in query', () => {
  assert.equal(
    highlightText('price: $5.00 (five dollars)', '$5.00'),
    'price: <mark class="search-highlight">$5.00</mark> (five dollars)'
  );
});

test('highlightText treats HTML-like content as plain text', () => {
  assert.equal(
    highlightText('<img src=x onerror=alert(1)> Safe title', 'safe'),
    '&lt;img src=x onerror=alert(1)&gt; <mark class="search-highlight">Safe</mark> title'
  );
});

test('getSafeResultUrl rejects non-HTTP(S) and cross-origin URLs', () => {
  for (const url of [
    'javascript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'mailto:test@example.com',
    'ftp://example.com/file',
    '//evil.com/x',
    'https://evil.com/x',
  ]) {
    assert.equal(getSafeResultUrl(url), null, `Expected null for: ${url}`);
  }
});

test('getSafeResultUrl allows same-origin relative and absolute paths', () => {
  assert.equal(getSafeResultUrl('/blog/safe/'), '/blog/safe/');
  assert.equal(getSafeResultUrl('https://meshery.io/blog/safe/'), 'https://meshery.io/blog/safe/');
});

test('getSafeResultUrl respects configured baseurl without duplicate prefixing', () => {
  assert.equal(getSafeResultUrl('/blog/safe/', '/meshery.io'), '/meshery.io/blog/safe/');
  assert.equal(getSafeResultUrl('/meshery.io/blog/safe/', '/meshery.io'), '/meshery.io/blog/safe/');
});

test('getSafeResultUrl resolves production URLs to safe paths on deploy previews and localhost', () => {
  global.window = {
    location: {
      origin: 'https://deploy-preview-123.netlify.app',
      href: 'https://deploy-preview-123.netlify.app/blog/'
    }
  };
  try {
    assert.equal(getSafeResultUrl('https://meshery.io/blog/safe/'), '/blog/safe/');
    assert.equal(getSafeResultUrl('/blog/safe/'), '/blog/safe/');
  } finally {
    delete global.window;
  }
});

test('slugify converts a category name to a URL-safe slug', () => {
  assert.equal(slugify('Service Mesh'), 'service-mesh');
  assert.equal(slugify('  Hello  World!  '), 'hello-world');
  assert.equal(slugify('foo--bar'), 'foo-bar');
});

test('renderResultItem escapes HTML metadata and prevents XSS markup', () => {
  const html = renderResultItem({
    title: '<img src=x onerror=alert(1)> Safe title',
    url: '/blog/safe/',
    date: '2026-01-01',
    author: '<script>alert(3)</script> Author',
    categories: ['<svg onload=alert(2)>Category'],
    excerpt: '<iframe src=javascript:alert(4)>Excerpt',
  }, 'safe');

  assert.ok(!html.includes('<img'));
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('<svg'));
  assert.ok(!html.includes('<iframe'));
  assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert.ok(html.includes('&lt;script&gt;alert(3)&lt;/script&gt;'));
  assert.ok(html.includes('&lt;svg onload=alert(2)&gt;'));
  assert.ok(html.includes('&lt;iframe src=javascript:alert(4)&gt;'));
});

test('browser renders escaped metadata safely as plain text rather than executing code', () => {
  const rawAuthor = '<script>alert("xss")</script>';
  const rawExcerpt = '<img src=x onerror="steal()">Malicious text';

  const html = renderResultItem({
    title: 'Post Title',
    url: '/blog/safe/',
    author: rawAuthor,
    excerpt: rawExcerpt,
  }, '');

  const authorMatch = html.match(/<span class="post-author">(.*?)<\/span>/);
  assert.ok(authorMatch, 'Author span should exist');

  const decodedAuthor = authorMatch[1]
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');

  assert.equal(decodedAuthor, rawAuthor);
  assert.ok(!authorMatch[1].includes('<script>'), 'Markup should not contain unescaped <script>');
});

test('renderResultItem omits href for unsafe URLs and includes href for safe URLs', () => {
  for (const url of [
    'data:text/html,<script>alert(1)</script>',
    'mailto:test@example.com',
    'ftp://example.com/file',
    'javascript:alert(1)',
    '//evil.com/x',
    'https://evil.com/x',
  ]) {
    const html = renderResultItem({
      title: 'Safe title',
      url,
      categories: ['Category'],
      excerpt: 'Safe excerpt',
    }, 'safe');

    assert.ok(html.includes('<h2><a>'), `Expected unlinked anchor for: ${url}`);
    assert.ok(!html.includes('<h2><a href='), `Expected no href in title for: ${url}`);
    assert.ok(!html.includes('Read More'), `Expected no Read More link for: ${url}`);
  }

  for (const url of ['/blog/safe/', 'https://meshery.io/blog/safe/']) {
    const html = renderResultItem({
      title: 'Safe title',
      url,
      categories: ['Category'],
      excerpt: 'Safe excerpt',
    }, 'safe');

    assert.ok(html.includes(`href="${url}"`), `Expected linked anchor for: ${url}`);
    assert.ok(html.includes('Read More'), `Expected Read More link for: ${url}`);
  }
});
