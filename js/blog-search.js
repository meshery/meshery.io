// Client-side blog search
// This script provides client-side search functionality for the Meshery blog

(function() {
'use strict';

let searchData = null;
let searchDataPromise = null;
let currentSearchVersion = 0;

// Pagination state
const RESULTS_PER_PAGE = 20;
let currentSearchResults = [];
let currentRenderedCount = 0;
let activeSearchQuery = '';

const siteBaseUrl = (typeof window !== 'undefined' && window.siteBaseUrl) || '';

function withBaseUrl(path, customBaseUrl = siteBaseUrl) {
  if (!path || typeof path !== 'string') return path;
  if (/^(?:[a-z]+:)?\/\//i.test(path)) return path;
  if (!path.startsWith('/')) return path;
  if (customBaseUrl && (path === customBaseUrl || path.startsWith(`${customBaseUrl}/`))) {
    return path;
  }
  return `${customBaseUrl}${path}`;
}

// Safely decode common HTML entities before indexing or searching
function decodeHTMLEntities(str) {
  if (!str || typeof str !== 'string') return '';
  const entityMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x27;': "'",
    '&#x2f;': '/',
    '&#47;': '/',
    '&nbsp;': ' '
  };
  return str.replace(/&(?:amp|lt|gt|quot|#39|#x27|#x2f|#47|nbsp);/gi, match => entityMap[match.toLowerCase()] || match);
}

function escapeHTML(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function getSafeResultUrl(path, customBaseUrl = siteBaseUrl) {
  if (!path || typeof path !== 'string') return null;

  try {
    const origin = typeof window !== 'undefined' && window.location && window.location.origin
      ? window.location.origin
      : 'https://meshery.io';
    const href = typeof window !== 'undefined' && window.location && window.location.href
      ? window.location.href
      : 'https://meshery.io/blog/';

    if (path.trim().startsWith('//')) return null;

    const parsedUrl = new URL(path, href);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return null;
    }

    const isCurrentOrigin = parsedUrl.origin === origin;
    const isProductionOrigin =
      parsedUrl.origin === 'https://meshery.io' || parsedUrl.origin === 'http://meshery.io';

    if (!isCurrentOrigin && !isProductionOrigin) {
      return null;
    }

    if (isCurrentOrigin) {
      return path.startsWith('/') ? withBaseUrl(path, customBaseUrl) : path;
    }

    return withBaseUrl(parsedUrl.pathname + parsedUrl.search + parsedUrl.hash, customBaseUrl);
  } catch {
    return null;
  }
}

// Strip outer punctuation while preserving technical tokens like c++
function cleanToken(token) {
  if (!token || typeof token !== 'string') return '';
  return token.replace(/^[()[\]{}",':;?!]+|[()[\]{}",':;?!]+$/g, '');
}

// Tokenize query into normalized, deduplicated search tokens
function extractQueryTokens(query) {
  if (!query || typeof query !== 'string') return [];
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  const rawTokens = lowerQuery
    .split(/\s+/)
    .map(cleanToken)
    .filter(Boolean);

  // Deduplicate tokens using Set
  const uniqueTokens = [...new Set(rawTokens)];

  // Ignore single-character tokens unless all tokens are single-character
  const multiCharTokens = uniqueTokens.filter(t => t.length > 1);
  const candidateTokens = multiCharTokens.length > 0 ? multiCharTokens : uniqueTokens;

  // Limit processing to a reasonable maximum of 10 tokens
  return candidateTokens.slice(0, 10);
}

// Load search data for client-side search with precomputed cached fields
async function loadSearchData() {
  try {
    const version = (typeof window !== 'undefined' && window.blogSearchIndexVersion)
      ? encodeURIComponent(window.blogSearchIndexVersion)
      : '1';
    const searchUrl = withBaseUrl(`/blog/search.json?v=${version}`);
    const response = await fetch(searchUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch search data: ${response.status} ${response.statusText}`);
    }

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error('Invalid JSON format in search data');
    }

    // Pre-process and cache normalized fields once to avoid redundant string operations
    searchData = data.map(post => {
      const decodedTitle = decodeHTMLEntities(post.title || '');
      const decodedExcerpt = decodeHTMLEntities(post.excerpt || '');
      const decodedSnippet = decodeHTMLEntities(post.snippet || decodedExcerpt);
      const decodedAuthor = decodeHTMLEntities(post.author || '');
      const decodedCategories = Array.isArray(post.categories)
        ? post.categories.map(cat => decodeHTMLEntities(String(cat)))
        : [];

      const lowerTitle = decodedTitle.toLowerCase();
      const lowerExcerpt = decodedExcerpt.toLowerCase();
      const lowerSnippet = decodedSnippet.toLowerCase();
      const lowerAuthor = decodedAuthor.toLowerCase();
      const lowerCategories = decodedCategories.map(c => c.toLowerCase());

      // Precompute word sets for fast word-boundary checking
      const titleWords = new Set(lowerTitle.split(/[^a-z0-9+]+/).filter(Boolean));
      const snippetWords = new Set(lowerSnippet.split(/[^a-z0-9+]+/).filter(Boolean));

      return {
        id: post.id,
        title: decodedTitle,
        url: post.url,
        date: post.date,
        author: decodedAuthor,
        categories: decodedCategories,
        excerpt: decodedExcerpt,
        snippet: decodedSnippet,
        // Precomputed normalized fields
        _searchTitle: lowerTitle,
        _searchExcerpt: lowerExcerpt,
        _searchSnippet: lowerSnippet,
        _searchCategories: lowerCategories,
        _searchAuthor: lowerAuthor,
        _titleWords: titleWords,
        _snippetWords: snippetWords
      };
    });

    return true;
  } catch (error) {
    console.error('Error loading search data:', error.message);
    return false;
  }
}

// Lazy loader: ensures search index is loaded once on demand with retry capability
function ensureSearchDataLoaded() {
  if (searchData) {
    return Promise.resolve(true);
  }
  if (!searchDataPromise) {
    searchDataPromise = loadSearchData().then(success => {
      if (!success) {
        searchDataPromise = null; // allow safe retry
        return false;
      }
      return true;
    }).catch(error => {
      console.error('Error in search data initialization:', error);
      searchDataPromise = null; // allow safe retry
      return false;
    });
  }
  return searchDataPromise;
}

function getSearchFields(post) {
  const title = post._searchTitle ?? decodeHTMLEntities(post.title || '').toLowerCase();
  const snippet = post._searchSnippet ?? post._searchExcerpt ?? decodeHTMLEntities(post.snippet || post.excerpt || '').toLowerCase();
  const excerpt = post._searchExcerpt ?? decodeHTMLEntities(post.excerpt || '').toLowerCase();
  const categories = post._searchCategories ?? (Array.isArray(post.categories) ? post.categories.map(c => decodeHTMLEntities(String(c)).toLowerCase()) : []);
  const author = post._searchAuthor ?? decodeHTMLEntities(post.author || '').toLowerCase();
  const titleWords = post._titleWords ?? new Set(title.split(/[^a-z0-9+]+/).filter(Boolean));
  const snippetWords = post._snippetWords ?? new Set(snippet.split(/[^a-z0-9+]+/).filter(Boolean));

  return {
    title,
    snippet,
    excerpt,
    categories,
    author,
    titleWords,
    snippetWords
  };
}

// Relevance scoring: Title > Categories > Author > Snippet/Excerpt
function scorePost(post, tokens, lowerQuery) {
  const fields = getSearchFields(post);
  let score = 0;
  let matchedTokens = 0;

  // 1. Exact full query matches (highest priority)
  if (lowerQuery) {
    if (fields.title === lowerQuery) {
      score += 150;
    } else if (fields.title.includes(lowerQuery)) {
      score += 60;
    }

    if (fields.snippet.includes(lowerQuery)) {
      score += 5;
    }
  }

  // 2. Token-level scoring
  for (const token of tokens) {
    let tokenMatched = false;

    // Title matching (prioritize exact word-boundary matches)
    if (fields.title.includes(token)) {
      tokenMatched = true;
      const isWholeWord = fields.titleWords.has(token);
      score += isWholeWord ? 40 : 30;
    }

    // Category / Tag matching
    if (fields.categories.some(cat => cat.includes(token))) {
      tokenMatched = true;
      const exactCategory = fields.categories.some(cat => cat === token);
      score += exactCategory ? 25 : 18;
    }

    // Author matching
    if (fields.author.includes(token)) {
      tokenMatched = true;
      score += 5;
    }

    // Article body snippet matching
    if (fields.snippet.includes(token)) {
      tokenMatched = true;
      const isWholeWord = fields.snippetWords.has(token);
      score += isWholeWord ? 5 : 2;
    }

    if (tokenMatched) {
      matchedTokens++;
    }
  }

  // 3. AND Semantics Bonus: Boost posts containing all search tokens
  const isCompleteMatch = tokens.length > 0 && matchedTokens === tokens.length;
  if (tokens.length > 1 && isCompleteMatch) {
    score += 40;
  }

  return {
    score,
    matchedTokens,
    isCompleteMatch
  };
}

// Client-side search with tokenized weighted ranking and AND/OR semantics
function performClientSearch(query, data = searchData) {
  if (!data || !query) return [];

  const lowerQuery = query.toLowerCase().trim();
  const tokens = extractQueryTokens(lowerQuery);
  if (tokens.length === 0) return [];

  const scoredPosts = [];

  for (const post of data) {
    const { score, matchedTokens, isCompleteMatch } = scorePost(post, tokens, lowerQuery);
    if (score > 0 && matchedTokens > 0) {
      scoredPosts.push({
        ...post,
        _score: score,
        _matchedTokens: matchedTokens,
        _isCompleteMatch: isCompleteMatch
      });
    }
  }

  // Deterministic sorting:
  // 1. Complete matches (matching all tokens) strictly rank above partial matches
  // 2. Score descending
  // 3. Publication date descending (newer first)
  // 4. Title alphabetical
  scoredPosts.sort((a, b) => {
    if (tokens.length > 1) {
      const aComplete = a._isCompleteMatch ? 1 : 0;
      const bComplete = b._isCompleteMatch ? 1 : 0;
      if (bComplete !== aComplete) {
        return bComplete - aComplete;
      }
    }

    if (b._score !== a._score) {
      return b._score - a._score;
    }

    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    if (dateB !== dateA) {
      return dateB - dateA;
    }

    return (a.title || '').localeCompare(b.title || '');
  });

  // Attach highlight formatting for each result
  for (const result of scoredPosts) {
    result._formatted = {
      title: highlightText(result.title, query),
      excerpt: highlightText(result.excerpt, query)
    };
  }

  return scoredPosts;
}

// Escape special regex characters
function escapeRegex(string) {
  return String(string ?? '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Text highlighting function supporting multi-word queries safely
function highlightText(text, query) {
  const safeText = String(text ?? '');
  if (!safeText) return '';
  if (!query) return escapeHTML(safeText);

  const tokens = extractQueryTokens(query);
  if (tokens.length === 0) return escapeHTML(safeText);

  const pattern = tokens
    .map(escapeRegex)
    .sort((a, b) => b.length - a.length)
    .join('|');

  if (!pattern) return escapeHTML(safeText);

  const regex = new RegExp(`(${pattern})`, 'gi');
  let result = '';
  let lastIndex = 0;

  for (const match of safeText.matchAll(regex)) {
    result += escapeHTML(safeText.slice(lastIndex, match.index));
    result += `<mark class="search-highlight">${escapeHTML(match[0])}</mark>`;
    lastIndex = match.index + match[0].length;
  }

  result += escapeHTML(safeText.slice(lastIndex));
  return result;
}

// Perform search
async function performSearch(query) {
  return performClientSearch(query);
}

// Convert text to URL-friendly slug
function slugify(text) {
  return String(text ?? '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w-]+/g, '')    // Remove non-word chars
    .replace(/--+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start
    .replace(/-+$/, '');         // Trim - from end
}

function renderResultItem(result, query) {
  const title = result._formatted?.title || highlightText(result.title, query);
  const excerpt = result._formatted?.excerpt || highlightText(result.excerpt, query);
  const categories = result.categories || [];
  const date = result.date || '';
  const author = result.author || '';
  const safeUrl = getSafeResultUrl(result.url);

  let categoryHtml = '';
  if (categories.length > 0) {
    categoryHtml = '<span class="blog-filters">';
    categories.forEach(cat => {
      const slug = slugify(cat);
      categoryHtml += `<span class="blog-filter"><a href="${escapeHTML(withBaseUrl(`/blog/category/${slug}/`))}">${escapeHTML(String(cat).toLowerCase())}</a></span>`;
    });
    categoryHtml += '</span>';
  }

  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const titleLink = safeUrl
    ? `<a href="${escapeHTML(safeUrl)}">${title}</a>`
    : `<a>${title}</a>`;
  const readMore = safeUrl
    ? `<div class="button-para"><a class="link" href="${escapeHTML(safeUrl)}">Read More</a></div>`
    : '';

  return `
        <h2>${titleLink}</h2>
        <p class="post-details">
          ${categoryHtml}
          ${author ? `<span class="post-author">${escapeHTML(author)}</span>` : ''}
          ${formattedDate ? `<span class="post-date"> ${escapeHTML(formattedDate)}</span>` : ''}
        </p>
        <div class="post-content">
          <p>${excerpt}</p>
          ${readMore}
        </div>
      `;
}

// Render search results with functional "Show More" pagination
function renderResults(results, query) {
  const resultsContainer = document.getElementById('search-results');
  const blogPosts = document.querySelector('.blog-posts');
  const searchSummary = document.getElementById('search-summary');
  const pagination = document.querySelector('.pagination');

  if (!resultsContainer) return;

  activeSearchQuery = query;
  currentSearchResults = results;
  currentRenderedCount = Math.min(results.length, RESULTS_PER_PAGE);

  resultsContainer.innerHTML = '';
  if (searchSummary) {
    searchSummary.innerHTML = '';
  }

  if (results.length === 0) {
    if (searchSummary) {
      searchSummary.innerHTML = `
        <div class="search-main-message">No results found for "<span class="search-summary-query">${escapeHTML(query)}</span>"</div>
        <div class="search-helper-text">Try another keyword or browse categories below.</div>
      `;
      searchSummary.style.display = 'flex';
    }
    resultsContainer.style.display = 'none';
    if (blogPosts) {
      blogPosts.style.display = 'none';
    }
    if (pagination) {
      pagination.style.display = 'none';
    }
    return;
  }

  // Summary with total results count
  if (searchSummary) {
    if (results.length > RESULTS_PER_PAGE) {
      searchSummary.innerHTML = `
        <div class="search-main-message">Showing ${currentRenderedCount} of ${results.length} results for "<span class="search-summary-query">${escapeHTML(query)}</span>"</div>
      `;
    } else {
      searchSummary.innerHTML = `
        <div class="search-main-message">Found ${results.length} result${results.length !== 1 ? 's' : ''} for "<span class="search-summary-query">${escapeHTML(query)}</span>"</div>
      `;
    }
    searchSummary.style.display = 'flex';
  }

  if (blogPosts) {
    blogPosts.style.display = 'none';
  }
  if (pagination) {
    pagination.style.display = 'none';
  }
  resultsContainer.style.display = 'block';

  // Create initial result items
  const resultsList = document.createElement('ul');
  resultsList.className = 'blog-posts search-results-list';

  const initialItems = results.slice(0, currentRenderedCount);
  initialItems.forEach(result => {
    const li = document.createElement('li');
    li.className = 'blog-post search-result-item';
    li.innerHTML = renderResultItem(result, query);
    resultsList.appendChild(li);
  });

  resultsContainer.appendChild(resultsList);

  // Add "Show More" button if there are more results than the first page
  if (results.length > currentRenderedCount) {
    const showMoreContainer = document.createElement('div');
    showMoreContainer.className = 'search-show-more-container';

    const showMoreButton = document.createElement('button');
    showMoreButton.id = 'search-show-more-btn';
    showMoreButton.className = 'button search-show-more-btn';
    showMoreButton.textContent = 'Show More Results';
    showMoreButton.addEventListener('click', () => {
      showMoreResults(resultsList, showMoreContainer);
    });

    showMoreContainer.appendChild(showMoreButton);
    resultsContainer.appendChild(showMoreContainer);
  }
}

// Progressively load next page of search results
function showMoreResults(resultsList, showMoreContainer) {
  const searchSummary = document.getElementById('search-summary');
  const nextRenderedCount = Math.min(currentSearchResults.length, currentRenderedCount + RESULTS_PER_PAGE);
  const nextItems = currentSearchResults.slice(currentRenderedCount, nextRenderedCount);

  nextItems.forEach(result => {
    const li = document.createElement('li');
    li.className = 'blog-post search-result-item';
    li.innerHTML = renderResultItem(result, activeSearchQuery);
    resultsList.appendChild(li);
  });

  currentRenderedCount = nextRenderedCount;

  // Update summary
  if (searchSummary) {
    if (currentSearchResults.length > currentRenderedCount) {
      searchSummary.innerHTML = `
        <div class="search-main-message">Showing ${currentRenderedCount} of ${currentSearchResults.length} results for "<span class="search-summary-query">${escapeHTML(activeSearchQuery)}</span>"</div>
      `;
    } else {
      searchSummary.innerHTML = `
        <div class="search-main-message">Showing all ${currentSearchResults.length} results for "<span class="search-summary-query">${escapeHTML(activeSearchQuery)}</span>"</div>
      `;
    }
  }

  // Remove Show More button once all results are displayed
  if (currentRenderedCount >= currentSearchResults.length && showMoreContainer) {
    showMoreContainer.remove();
  }
}

// Synchronize search query with URL parameter (?q=)
function syncQueryToUrl(query) {
  if (typeof window === 'undefined' || !window.history || !window.location) return;
  try {
    const url = new URL(window.location.href);
    if (query && query.length >= 2) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({ search: query }, '', url.toString());
  } catch {
    // Ignore URL serialization errors in restricted environments
  }
}

// Clear search and show original posts without page reload
function clearSearch() {
  // Cancel pending debounce and invalidate in-flight searches
  if (typeof handleSearchInput?.cancel === 'function') {
    handleSearchInput.cancel();
  }
  currentSearchVersion++;

  currentSearchResults = [];
  currentRenderedCount = 0;
  activeSearchQuery = '';

  const searchInput = document.getElementById('blog-search-input');
  const clearButton = document.getElementById('clear-search-btn');
  const resultsContainer = document.getElementById('search-results');
  const blogPosts = document.querySelector('.blog-posts');
  const searchSummary = document.getElementById('search-summary');
  const pagination = document.querySelector('.pagination');

  if (searchInput && searchInput.value !== '') {
    searchInput.value = '';
  }

  if (clearButton) {
    clearButton.style.display = 'none';
  }

  if (searchSummary) {
    searchSummary.innerHTML = '';
    searchSummary.style.display = 'none';
  }

  if (resultsContainer) {
    resultsContainer.innerHTML = '';
    resultsContainer.style.display = 'none';
  }

  if (blogPosts) {
    blogPosts.style.display = '';
  }

  if (pagination) {
    pagination.style.display = '';
  }

  syncQueryToUrl('');

  // Return focus to the search input after clearing
  if (searchInput && typeof searchInput.focus === 'function') {
    searchInput.focus();
  }
}

// Debounce function with cancel capability
function debounce(func, wait) {
  let timeout = null;
  const executedFunction = function(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };

  executedFunction.cancel = function() {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return executedFunction;
}

// Execute search for a specific query string
async function executeSearch(query) {
  try {
    const searchVersion = ++currentSearchVersion;
    const searchSummary = document.getElementById('search-summary');
    const blogPosts = document.querySelector('.blog-posts');
    const pagination = document.querySelector('.pagination');

    // Display loading state while search data is being fetched
    if (!searchData) {
      if (searchSummary) {
        searchSummary.innerHTML = `
          <div class="search-main-message">Searching blog posts...</div>
        `;
        searchSummary.style.display = 'flex';
      }
      if (blogPosts) blogPosts.style.display = 'none';
      if (pagination) pagination.style.display = 'none';
    }

    const loaded = await ensureSearchDataLoaded();

    // Guard against stale asynchronous searches or cleared search
    if (searchVersion !== currentSearchVersion) {
      return;
    }

    if (!loaded) {
      if (searchSummary) {
        searchSummary.innerHTML = `
          <div class="search-main-message">Unable to load search index.</div>
          <div class="search-helper-text">Please check your network connection and try again.</div>
        `;
        searchSummary.style.display = 'flex';
      }
      return;
    }

    // Verify that the current input value still matches this query
    const searchInput = document.getElementById('blog-search-input');
    const currentQuery = (searchInput ? searchInput.value : query).trim();
    if (currentQuery.length < 2) {
      clearSearch();
      return;
    }

    const results = await performSearch(currentQuery);

    // Final check for stale response before rendering
    if (searchVersion !== currentSearchVersion) {
      return;
    }

    renderResults(results, currentQuery);
    syncQueryToUrl(currentQuery);
  } catch (error) {
    console.error('Search execution error:', error);
  }
}

// Handle search input
const handleSearchInput = debounce(function(event) {
  const query = event.target.value.trim();
  const clearButton = document.getElementById('clear-search-btn');

  // Show/hide clear button based on input
  if (clearButton) {
    clearButton.style.display = query.length > 0 ? 'block' : 'none';
  }

  if (query.length === 0) {
    clearSearch();
    return;
  }

  if (query.length < 2) {
    // Don't search for single characters
    return;
  }

  executeSearch(query).catch(err => {
    console.error('Search execution failed:', err);
  });
}, 300);

// Initialize search when DOM is ready
function initSearch() {
  const searchInput = document.getElementById('blog-search-input');
  const clearButton = document.getElementById('clear-search-btn');

  if (!searchInput) {
    return;
  }

  // Preload data if input is already focused on page load
  if (typeof document !== 'undefined' && document.activeElement === searchInput) {
    ensureSearchDataLoaded();
  }

  // Preload data on pointer hover or focus
  searchInput.addEventListener('pointerenter', () => {
    ensureSearchDataLoaded();
  }, { once: true });

  searchInput.addEventListener('focus', () => {
    ensureSearchDataLoaded();
  }, { once: true });

  // Add event listeners
  searchInput.addEventListener('input', handleSearchInput);

  if (clearButton) {
    clearButton.addEventListener('click', clearSearch);
  }

  // Handle enter key
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  });

  // Restore search state from URL query parameter (?q=)
  if (typeof window !== 'undefined' && window.location) {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const initialQuery = (urlParams.get('q') || '').trim();
      if (initialQuery.length >= 2) {
        searchInput.value = initialQuery;
        if (clearButton) {
          clearButton.style.display = 'block';
        }
        executeSearch(initialQuery).catch(err => {
          console.error('Initial search execution failed:', err);
        });
      }
    } catch {
      // Ignore URL parsing errors
    }

    // Support browser back/forward navigation
    window.addEventListener('popstate', () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const query = (urlParams.get('q') || '').trim();
        if (query.length >= 2) {
          searchInput.value = query;
          if (clearButton) clearButton.style.display = 'block';
          executeSearch(query).catch(err => {
            console.error('Popstate search execution failed:', err);
          });
        } else {
          clearSearch();
        }
      } catch {
        // Ignore popstate errors
      }
    });
  }
}

// Initialize when DOM is loaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
}

// Expose clear function globally for use in templates
if (typeof window !== 'undefined') {
  window.clearBlogSearch = clearSearch;
}

/* global module */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
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
    ensureSearchDataLoaded,
    renderResults,
    showMoreResults,
    syncQueryToUrl,
    executeSearch,
  };
}
})();
