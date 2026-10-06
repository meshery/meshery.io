// Client-side blog search
// This script provides client-side search functionality for the Meshery blog

(function() {
'use strict';

let searchData = null;
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

// Load search data for client-side search
async function loadSearchData() {
  try {
    const response = await fetch(withBaseUrl('/blog/search.json'));
    if (!response.ok) {
      throw new Error(`Failed to fetch search data: ${response.status} ${response.statusText}`);
    }

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error('Invalid JSON format in search data');
    }

    // Pre-process data for faster searching (store only search fields + original post)
    searchData = data.map(post => ({
      // Original data for display
      id: post.id,
      title: post.title,
      url: post.url,
      date: post.date,
      author: post.author,
      categories: post.categories,
      excerpt: post.excerpt,
      // Pre-computed lowercase fields for fast searching
      _searchTitle: post.title?.toLowerCase() || '',
      _searchExcerpt: post.excerpt?.toLowerCase() || '',
      _searchContent: post.content?.toLowerCase() || '',
      _searchCategories: post.categories?.map(cat => cat.toLowerCase()) || [],
      _searchAuthor: post.author?.toLowerCase() || ''
    }));

    return true;
  } catch (error) {
    console.error('Error loading search data:', error.message);
    return false;
  }
}

// Client-side search
function performClientSearch(query) {
  if (!searchData) return [];

  const lowerQuery = query.toLowerCase();
  const results = searchData
    .filter(post => {
      const titleMatch = post._searchTitle.includes(lowerQuery);
      const excerptMatch = post._searchExcerpt.includes(lowerQuery);
      const contentMatch = post._searchContent.includes(lowerQuery);
      const categoryMatch = post._searchCategories.some(cat => cat.includes(lowerQuery));
      const authorMatch = post._searchAuthor.includes(lowerQuery);

      return titleMatch || excerptMatch || contentMatch || categoryMatch || authorMatch;
    })
    .slice(0, 20);

  // Highlighting for search results
  results.forEach(result => {
    result._formatted = {
      title: highlightText(result.title, query),
      excerpt: highlightText(result.excerpt, query)
    };
  });

  return results;
}

// Escape special regex characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Simple text highlighting function
function highlightText(text, query) {
  if (!text) return '';
  if (!query) return escapeHTML(text);

  const escapedQuery = escapeRegex(query);
  const regex = new RegExp(escapedQuery, 'gi');
  let result = '';
  let lastIndex = 0;

  for (const match of String(text).matchAll(regex)) {
    result += escapeHTML(text.slice(lastIndex, match.index));
    result += `<mark class="search-highlight">${escapeHTML(match[0])}</mark>`;
    lastIndex = match.index + match[0].length;
  }

  result += escapeHTML(text.slice(lastIndex));
  return result;
}

// Perform search
async function performSearch(query) {
  return performClientSearch(query);
}

// Convert text to URL-friendly slug
function slugify(text) {
  return text
    .toString()
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
      categoryHtml += `<span class="blog-filter"><a href="${escapeHTML(withBaseUrl(`/blog/category/${slug}/`))}">${escapeHTML(cat.toLowerCase())}</a></span>`;
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

// Render search results
function renderResults(results, query) {
  const resultsContainer = document.getElementById('search-results');
  const blogPosts = document.querySelector('.blog-posts');
  const searchSummary = document.getElementById('search-summary');

  if (!resultsContainer) return;

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
    return;
  }

  if (searchSummary) {
    searchSummary.innerHTML = `
      <div class="search-main-message">Found ${results.length} result${results.length !== 1 ? 's' : ''} for "<span class="search-summary-query">${escapeHTML(query)}</span>"</div>
    `;
    searchSummary.style.display = 'flex';
  }
  if (blogPosts) {
    blogPosts.style.display = 'none';
  }
  resultsContainer.style.display = 'block';

  // Create result items
  const resultsList = document.createElement('ul');
  resultsList.className = 'blog-posts search-results-list';

  results.forEach(result => {
    const li = document.createElement('li');
    li.className = 'blog-post search-result-item';
    li.innerHTML = renderResultItem(result, query);
    resultsList.appendChild(li);
  });

  resultsContainer.appendChild(resultsList);
}

// Clear search and show original posts
function clearSearch() {
  const currentPath = window.location.pathname;

  if (currentPath.includes('/blog')) {
    window.location.href = (window.siteBaseUrl || '') + '/blog';
    return;
  }
}

// Debounce function to limit search requests
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle search input
const handleSearchInput = debounce(async function(event) {
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

  const results = await performSearch(query);
  renderResults(results, query);
}, 300);

// Initialize search when DOM is ready
async function initSearch() {
  const searchInput = document.getElementById('blog-search-input');
  const clearButton = document.getElementById('clear-search-btn');

  if (!searchInput) {
    console.warn('Search input not found');
    return;
  }

  // Load search data
  const initialized = await loadSearchData();
  if (!initialized) {
    console.warn('Search functionality not available');
    // Optionally hide the search box or show a message
    return;
  }

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
    escapeRegex,
    highlightText,
    slugify,
    withBaseUrl,
    getSafeResultUrl,
    renderResultItem,
  };
}
})();
