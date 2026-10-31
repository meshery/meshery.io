'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const {
  escapeHTML,
  decodeHTMLEntities,
  cleanToken,
  extractQueryTokens,
  escapeRegex,
  highlightText,
  slugify,
  withBaseUrl,
  getSafeResultUrl,
  renderResultItem,
  scorePost,
  performClientSearch,
  clearSearch,
  debounce,
  renderResults,
  showMoreResults,
  syncQueryToUrl,
  executeSearch,
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

test('scorePost assigns higher scores in order: Title > Categories > Excerpt', () => {
  const query = 'kubernetes';
  const tokens = ['kubernetes'];

  const titlePost = {
    title: 'Kubernetes Ingress Guide',
    categories: ['DevOps'],
    excerpt: 'An overview of network routing.',
  };
  const categoryPost = {
    title: 'Cluster Networking Guide',
    categories: ['Kubernetes'],
    excerpt: 'An overview of network routing.',
  };
  const excerptPost = {
    title: 'Cluster Networking Guide',
    categories: ['DevOps'],
    excerpt: 'An overview of kubernetes network routing.',
  };

  const titleScore = scorePost(titlePost, tokens, query).score;
  const categoryScore = scorePost(categoryPost, tokens, query).score;
  const excerptScore = scorePost(excerptPost, tokens, query).score;

  assert.ok(
    titleScore > categoryScore,
    `Title score (${titleScore}) must be greater than category score (${categoryScore})`
  );
  assert.ok(
    categoryScore > excerptScore,
    `Category score (${categoryScore}) must be greater than excerpt score (${excerptScore})`
  );
});

test('scorePost awards multi-token bonus when all tokens match', () => {
  const query = 'service mesh';
  const tokens = ['service', 'mesh'];

  const allMatchPost = {
    title: 'Service Mesh Architecture',
    categories: ['Cloud Native'],
    excerpt: 'Deep dive into service meshes.',
  };
  const partialMatchPost = {
    title: 'Service Accounts in Cloud Native',
    categories: ['Cloud Native'],
    excerpt: 'Managing service accounts.',
  };

  const allScore = scorePost(allMatchPost, tokens, query).score;
  const partialScore = scorePost(partialMatchPost, tokens, query).score;

  assert.ok(
    allScore > partialScore,
    `Post matching all tokens (${allScore}) must score higher than single-token match (${partialScore})`
  );
});

test('performClientSearch returns ranked posts deterministically (Title > Category > Excerpt)', () => {
  const sampleData = [
    {
      id: 'excerpt-post',
      title: 'Cloud Native Tooling',
      url: '/blog/cloud-native/',
      date: '2026-02-01',
      categories: ['Architecture'],
      excerpt: 'Guide featuring Istio deployment.',
    },
    {
      id: 'title-post',
      title: 'Istio Service Mesh Deep Dive',
      url: '/blog/istio-mesh/',
      date: '2026-01-01',
      categories: ['Architecture'],
      excerpt: 'A comprehensive study.',
    },
    {
      id: 'category-post',
      title: 'Managing Modern Clusters',
      url: '/blog/managing-clusters/',
      date: '2026-03-01',
      categories: ['Istio'],
      excerpt: 'A comprehensive study.',
    },
  ];

  const results = performClientSearch('Istio', sampleData);

  assert.equal(results.length, 3);
  assert.equal(results[0].id, 'title-post', 'Title match should rank first');
  assert.equal(results[1].id, 'category-post', 'Category match should rank second');
  assert.equal(results[2].id, 'excerpt-post', 'Excerpt match should rank third');
});

test('performClientSearch breaks ties deterministically by newer date and title', () => {
  const sampleData = [
    {
      id: 'older-post',
      title: 'Meshery Feature Overview',
      url: '/blog/older/',
      date: '2025-01-01',
      categories: ['Overview'],
      excerpt: 'Summary',
    },
    {
      id: 'newer-post',
      title: 'Meshery Feature Overview',
      url: '/blog/newer/',
      date: '2026-01-01',
      categories: ['Overview'],
      excerpt: 'Summary',
    },
  ];

  const results = performClientSearch('Meshery', sampleData);
  assert.equal(results[0].id, 'newer-post');
  assert.equal(results[1].id, 'older-post');
});

test('highlightText highlights all tokens in multi-word queries', () => {
  const highlighted = highlightText('Meshery is a multi-service mesh manager', 'meshery mesh');
  assert.equal(
    highlighted,
    '<mark class="search-highlight">Meshery</mark> is a multi-service <mark class="search-highlight">mesh</mark> manager'
  );
});

test('clearSearch smoothly resets DOM elements without reloading the page', () => {
  const inputEl = { value: 'service mesh' };
  const clearBtnEl = { style: { display: 'block' } };
  const resultsContainerEl = { innerHTML: '<div>results</div>', style: { display: 'block' } };
  const summaryEl = { innerHTML: '<span>Found 1</span>', style: { display: 'flex' } };
  const blogPostsEl = { style: { display: 'none' } };
  const paginationEl = { style: { display: 'none' } };

  global.document = {
    getElementById(id) {
      if (id === 'blog-search-input') return inputEl;
      if (id === 'clear-search-btn') return clearBtnEl;
      if (id === 'search-results') return resultsContainerEl;
      if (id === 'search-summary') return summaryEl;
      return null;
    },
    querySelector(sel) {
      if (sel === '.blog-posts') return blogPostsEl;
      if (sel === '.pagination') return paginationEl;
      return null;
    },
  };

  try {
    clearSearch();

    assert.equal(inputEl.value, '');
    assert.equal(clearBtnEl.style.display, 'none');
    assert.equal(resultsContainerEl.style.display, 'none');
    assert.equal(resultsContainerEl.innerHTML, '');
    assert.equal(summaryEl.style.display, 'none');
    assert.equal(summaryEl.innerHTML, '');
    assert.equal(blogPostsEl.style.display, '');
    assert.equal(paginationEl.style.display, '');
  } finally {
    delete global.document;
  }
});

test('performClientSearch returns empty array for empty or whitespace query', () => {
  const sampleData = [{ title: 'Post 1', excerpt: 'Excerpt 1' }];
  assert.deepEqual(performClientSearch('', sampleData), []);
  assert.deepEqual(performClientSearch('   ', sampleData), []);
  assert.deepEqual(performClientSearch(null, sampleData), []);
});

test('performClientSearch gives highest priority to exact title match', () => {
  const sampleData = [
    {
      id: 'contains-title',
      title: 'Introduction to Kubernetes in Meshery',
      url: '/blog/post-1/',
      excerpt: 'Post about kubernetes',
    },
    {
      id: 'exact-title',
      title: 'Kubernetes',
      url: '/blog/kubernetes/',
      excerpt: 'General overview',
    },
    {
      id: 'snippet-post',
      title: 'Cloud Native Ecosystem',
      url: '/blog/ecosystem/',
      snippet: 'Kubernetes is widely used across organizations.',
    },
  ];

  const results = performClientSearch('Kubernetes', sampleData);
  assert.equal(results[0].id, 'exact-title', 'Exact title match should rank first');
});

test('performClientSearch finds articles by keywords in article snippet', () => {
  const sampleData = [
    {
      id: 'post-with-snippet',
      title: 'Cloud Architecture Patterns',
      url: '/blog/cloud-patterns/',
      snippet: 'This guide covers eBPF instrumentation and kernel tracing.',
    },
    {
      id: 'other-post',
      title: 'Docker Containers',
      url: '/blog/docker/',
      snippet: 'Docker image building and registries.',
    },
  ];

  const results = performClientSearch('eBPF', sampleData);
  assert.equal(results.length, 1);
  assert.equal(results[0].id, 'post-with-snippet');
});

test('extractQueryTokens deduplicates tokens and filters punctuation safely', () => {
  const tokens = extractQueryTokens('mesh mesh (service) "mesh"');
  assert.deepEqual(tokens, ['mesh', 'service']);
});

test('extractQueryTokens preserves technical terms like C++', () => {
  const tokens = extractQueryTokens('C++ performance');
  assert.ok(tokens.includes('c++'));
  assert.ok(tokens.includes('performance'));
});

test('decodeHTMLEntities properly decodes common HTML entities', () => {
  assert.equal(
    decodeHTMLEntities('&amp; &lt; &gt; &quot; &#39; &#x27;'),
    '& < > " \' \''
  );
  assert.equal(decodeHTMLEntities('Plain Text'), 'Plain Text');
  assert.equal(decodeHTMLEntities(''), '');
  assert.equal(decodeHTMLEntities(null), '');
});

test('highlightText safely handles special characters like C++ and parenthesis', () => {
  const text = 'Developing in C++ with (high) efficiency';
  const highlighted = highlightText(text, 'C++ (high)');
  assert.ok(highlighted.includes('<mark class="search-highlight">C++</mark>'));
  assert.ok(highlighted.includes('<mark class="search-highlight">high</mark>'));
});

test('performClientSearch prioritizes multi-token complete matches (AND) over partial matches', () => {
  const sampleData = [
    {
      id: 'partial-match',
      title: 'Service Accounts and Permissions in Meshery',
      url: '/blog/service-accounts/',
      date: '2026-03-01',
      excerpt: 'Details on accounts.',
    },
    {
      id: 'complete-match',
      title: 'Modern Service Mesh Architecture',
      url: '/blog/service-mesh/',
      date: '2026-01-01',
      excerpt: 'A complete guide to service mesh design.',
    },
  ];

  const results = performClientSearch('service mesh', sampleData);
  assert.equal(results.length, 2);
  assert.equal(results[0].id, 'complete-match', 'Post matching all tokens should rank before partial match');
  assert.equal(results[1].id, 'partial-match');
});

test('debounce properly executes and cancel method prevents delayed invocation', async () => {
  let callCount = 0;
  const debounced = debounce(() => {
    callCount++;
  }, 50);

  debounced();
  debounced.cancel();

  await new Promise(resolve => setTimeout(resolve, 80));
  assert.equal(callCount, 0, 'Cancelled debounce should not execute');

  debounced();
  await new Promise(resolve => setTimeout(resolve, 80));
  assert.equal(callCount, 1, 'Uncancelled debounce should execute');
});

test('renderResults shows first page and functional Show More button for >20 results', () => {
  const mockSummary = { innerHTML: '', style: {} };
  const mockResultsContainer = {
    innerHTML: '',
    style: {},
    appendChild(child) {
      this.children = this.children || [];
      this.children.push(child);
    },
  };
  const mockBlogPosts = { style: {} };

  global.document = {
    getElementById(id) {
      if (id === 'search-summary') return mockSummary;
      if (id === 'search-results') return mockResultsContainer;
      return null;
    },
    querySelector(sel) {
      if (sel === '.blog-posts') return mockBlogPosts;
      return null;
    },
    createElement(tag) {
      return {
        tagName: tag,
        className: '',
        innerHTML: '',
        style: {},
        children: [],
        appendChild(child) {
          this.children.push(child);
        },
        addEventListener() {},
      };
    },
  };

  try {
    const fakeResults = Array.from({ length: 25 }, (_, i) => ({
      id: `post-${i}`,
      title: `Blog Post ${i}`,
      url: `/blog/post-${i}/`,
      date: '2026-01-01',
      categories: ['Mesh'],
      excerpt: `Excerpt for post ${i}`,
    }));

    renderResults(fakeResults, 'post');

    assert.ok(mockSummary.innerHTML.includes('Showing 20 of 25 results'));
    assert.equal(mockResultsContainer.style.display, 'block');
    assert.equal(mockBlogPosts.style.display, 'none');

    // Results container has the list and the show-more button container
    assert.equal(mockResultsContainer.children.length, 2);
    const list = mockResultsContainer.children[0];
    assert.equal(list.children.length, 20, 'First page should render exactly 20 items');
  } finally {
    delete global.document;
  }
});

test('syncQueryToUrl sets and clears the URL query parameter ?q=', () => {
  let replacedUrl = null;
  global.window = {
    history: {
      replaceState(_state, _title, url) {
        replacedUrl = url;
      },
    },
    location: {
      href: 'https://meshery.io/blog/',
    },
  };

  try {
    syncQueryToUrl('kubernetes');
    assert.ok(replacedUrl.includes('?q=kubernetes'));

    syncQueryToUrl('');
    assert.ok(!replacedUrl.includes('?q='));
  } finally {
    delete global.window;
  }
});


