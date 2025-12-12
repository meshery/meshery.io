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
  let fallbackData = null;
  let useFallback = false;

  // Load fallback data for client-side search if Meilisearch is unavailable
  async function loadFallbackData() {
    try {
      const response = await fetch('/blog/search.json');
      if (!response.ok) throw new Error('Failed to load search data');
      fallbackData = await response.json();
      return true;
    } catch (error) {
      console.error('Error loading fallback search data:', error);
      return false;
    }
  }

  // Simple client-side search for fallback
  function fallbackSearch(query) {
    if (!fallbackData) return [];
    
    const lowerQuery = query.toLowerCase();
    const results = fallbackData
      .filter(post => {
        const titleMatch = post.title?.toLowerCase().includes(lowerQuery);
        const excerptMatch = post.excerpt?.toLowerCase().includes(lowerQuery);
        const contentMatch = post.content?.toLowerCase().includes(lowerQuery);
        const categoryMatch = post.categories?.some(cat => cat.toLowerCase().includes(lowerQuery));
        const authorMatch = post.author?.toLowerCase().includes(lowerQuery);
        
        return titleMatch || excerptMatch || contentMatch || categoryMatch || authorMatch;
      })
      .slice(0, 20);

    // Simple highlighting for fallback
    results.forEach(result => {
      if (!result._formatted) {
        result._formatted = {
          title: highlightText(result.title, query),
          excerpt: highlightText(result.excerpt, query)
        };
      }
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
    const escapedQuery = escapeRegex(query);
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  // Initialize Meilisearch client
  function initMeilisearch() {
    if (typeof MeiliSearch === 'undefined') {
      console.warn('MeiliSearch library not loaded, using fallback search');
      useFallback = true;
      return loadFallbackData();
    }

    try {
      searchClient = new MeiliSearch({
        host: MEILISEARCH_HOST,
        apiKey: MEILISEARCH_API_KEY
      });
      searchIndex = searchClient.index(MEILISEARCH_INDEX);
      return true;
    } catch (error) {
      console.warn('Error initializing MeiliSearch, using fallback:', error);
      useFallback = true;
      return loadFallbackData();
    }
  }

  // Perform search
  async function performSearch(query) {
    // Use fallback if Meilisearch is not available
    if (useFallback) {
      return fallbackSearch(query);
    }

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
      console.error('Search error, trying fallback:', error);
      // Try fallback on error
      if (!useFallback) {
        useFallback = true;
        await loadFallbackData();
        return fallbackSearch(query);
      }
      return [];
    }
  }

  // Convert text to URL-friendly slug
  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/[^\w\-]+/g, '')    // Remove non-word chars
      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start
      .replace(/-+$/, '');         // Trim - from end
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

    const fallbackNotice = useFallback ? ' (using client-side search)' : '';
    searchSummary.textContent = `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"${fallbackNotice}`;
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

      // Build category links
      let categoryHtml = '';
      if (categories.length > 0) {
        categoryHtml = '<span class="blog-filters">';
        categories.forEach(cat => {
          const slug = slugify(cat);
          categoryHtml += `<span class="blog-filter"><a href="/blog/category/${slug}/">${cat.toLowerCase()}</a></span>`;
        });
        categoryHtml += '</span>';
      }

      // Format date
      const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

      li.innerHTML = `
        <h2><a href="${result.url}">${title}</a></h2>
        <p class="post-details">
          ${categoryHtml}
          ${author ? `<span class="post-author">${author}</span>` : ''}
          ${formattedDate ? `<span class="post-date"> ${formattedDate}</span>` : ''}
        </p>
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
  async function initSearch() {
    const searchInput = document.getElementById('blog-search-input');
    const clearButton = document.getElementById('clear-search-btn');

    if (!searchInput) {
      console.warn('Search input not found');
      return;
    }

    // Initialize Meilisearch or fallback
    const initialized = await initMeilisearch();
    if (!initialized && !useFallback) {
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
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }

  // Expose clear function globally for use in templates
  window.clearBlogSearch = clearSearch;
})();
