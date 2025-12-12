// Meilisearch blog search integration
// This script provides search functionality for the Meshery blog using Meilisearch

(function() {
  'use strict';

  // Configuration - these should be set via environment variables or site config
  const MEILISEARCH_HOST = window.MEILISEARCH_CONFIG?.host || 'https://search.meshery.io';
  const MEILISEARCH_API_KEY = window.MEILISEARCH_CONFIG?.apiKey || '';
  const MEILISEARCH_INDEX = window.MEILISEARCH_CONFIG?.index || 'blog_posts';

  let searchClient = null;
  let searchIndex = null;

  // Initialize Meilisearch client
  function initMeilisearch() {
    if (typeof MeiliSearch === 'undefined') {
      console.error('MeiliSearch library not loaded');
      return false;
    }

    try {
      searchClient = new MeiliSearch({
        host: MEILISEARCH_HOST,
        apiKey: MEILISEARCH_API_KEY
      });
      searchIndex = searchClient.index(MEILISEARCH_INDEX);
      return true;
    } catch (error) {
      console.error('Error initializing MeiliSearch:', error);
      return false;
    }
  }

  // Perform search
  async function performSearch(query) {
    if (!searchIndex) {
      console.error('Search index not initialized');
      return [];
    }

    try {
      const searchResults = await searchIndex.search(query, {
        limit: 20,
        attributesToHighlight: ['title', 'excerpt', 'content'],
        attributesToCrop: ['excerpt', 'content'],
        cropLength: 200,
        highlightPreTag: '<mark class="search-highlight">',
        highlightPostTag: '</mark>'
      });

      return searchResults.hits;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }

  // Render search results
  function renderResults(results, query) {
    const resultsContainer = document.getElementById('search-results');
    const blogPosts = document.querySelector('.blog-posts');
    const searchSummary = document.getElementById('search-summary');

    if (!resultsContainer) return;

    // Clear previous results
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
      searchSummary.textContent = `No results found for "${query}"`;
      searchSummary.style.display = 'block';
      resultsContainer.style.display = 'none';
      blogPosts.style.display = 'none';
      return;
    }

    searchSummary.textContent = `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`;
    searchSummary.style.display = 'block';
    blogPosts.style.display = 'none';
    resultsContainer.style.display = 'block';

    // Create result items
    const resultsList = document.createElement('ul');
    resultsList.className = 'blog-posts search-results-list';

    results.forEach(result => {
      const li = document.createElement('li');
      li.className = 'blog-post search-result-item';

      // Get highlighted or original content
      const title = result._formatted?.title || result.title;
      const excerpt = result._formatted?.excerpt || result.excerpt;
      const categories = result.categories || [];
      const date = result.date || '';
      const author = result.author || '';

      li.innerHTML = `
        <h2><a href="${result.url}">${title}</a></h2>
        <div class="post-meta">
          ${author ? `<span class="author">By ${author}</span>` : ''}
          ${date ? `<span class="date">${new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>` : ''}
          ${categories.length > 0 ? `<span class="categories">${categories.map(cat => `<span class="category-tag">${cat}</span>`).join(' ')}</span>` : ''}
        </div>
        <div class="post-content">
          <p>${excerpt}</p>
          <div class="button-para">
            <a class="link" href="${result.url}">Read More</a>
          </div>
        </div>
      `;

      resultsList.appendChild(li);
    });

    resultsContainer.appendChild(resultsList);
  }

  // Clear search and show original posts
  function clearSearch() {
    const resultsContainer = document.getElementById('search-results');
    const blogPosts = document.querySelector('.blog-posts');
    const searchSummary = document.getElementById('search-summary');
    const searchInput = document.getElementById('blog-search-input');
    const clearButton = document.getElementById('clear-search-btn');

    if (resultsContainer) resultsContainer.style.display = 'none';
    if (blogPosts) blogPosts.style.display = 'block';
    if (searchSummary) {
      searchSummary.textContent = '';
      searchSummary.style.display = 'none';
    }
    if (searchInput) searchInput.value = '';
    if (clearButton) clearButton.style.display = 'none';
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
  function initSearch() {
    const searchInput = document.getElementById('blog-search-input');
    const clearButton = document.getElementById('clear-search-btn');

    if (!searchInput) {
      console.warn('Search input not found');
      return;
    }

    // Initialize Meilisearch
    if (!initMeilisearch()) {
      console.warn('Meilisearch not available, search functionality disabled');
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
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }

  // Expose clear function globally for use in templates
  window.clearBlogSearch = clearSearch;
})();
