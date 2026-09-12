// Client-side blog search
// This script provides client-side search functionality for the Meshery blog

(function() {
'use strict';

let searchData = null;
const siteBaseUrl = window.siteBaseUrl || '';

function withBaseUrl(path) {
  if (!path || typeof path !== 'string') return path;
  if (/^(?:[a-z]+:)?\/\//i.test(path)) return path;
  if (!path.startsWith('/')) return path;
  return `${siteBaseUrl}${path}`;
}

function getSafeResultUrl(path) {
  const url = withBaseUrl(path);
  if (!url || typeof url !== 'string') return null;

  try {
    const parsedUrl = new URL(url, window.location.href);
    return ['http:', 'https:'].includes(parsedUrl.protocol) ? url : null;
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

  return results;
}

// Escape special regex characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Simple text highlighting function
function highlightText(text, query) {
  if (!text) return document.createDocumentFragment();

  const fragment = document.createDocumentFragment();
  const escapedQuery = escapeRegex(query);
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  let lastIndex = 0;

  text.replace(regex, (match, _group, offset) => {
    fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)));

    const highlight = document.createElement('mark');
    highlight.className = 'search-highlight';
    highlight.textContent = match;
    fragment.appendChild(highlight);

    lastIndex = offset + match.length;
    return match;
  });

  fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
  return fragment;
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

// Render search results
function renderResults(results, query) {
  const resultsContainer = document.getElementById('search-results');
  const blogPosts = document.querySelector('.blog-posts');
  const searchSummary = document.getElementById('search-summary');

  if (!resultsContainer) return;

  // Clear previous results and summary
  resultsContainer.replaceChildren();
  if (searchSummary) {
    searchSummary.replaceChildren();
  }

  if (results.length === 0) {
    if (searchSummary) {
      const mainMessage = document.createElement('div');
      mainMessage.className = 'search-main-message';
      mainMessage.appendChild(document.createTextNode('No results found for "'));
      const querySpan = document.createElement('span');
      querySpan.className = 'search-summary-query';
      querySpan.textContent = query;
      mainMessage.appendChild(querySpan);
      mainMessage.appendChild(document.createTextNode('"'));

      const helperText = document.createElement('div');
      helperText.className = 'search-helper-text';
      helperText.textContent = 'Try another keyword or browse categories below.';

      searchSummary.appendChild(mainMessage);
      searchSummary.appendChild(helperText);
      searchSummary.style.display = 'flex';
    }
    resultsContainer.style.display = 'none';
    if (blogPosts) {
      blogPosts.style.display = 'none';
    }
    return;
  }

  if (searchSummary) {
    const mainMessage = document.createElement('div');
    mainMessage.className = 'search-main-message';
    mainMessage.appendChild(document.createTextNode(`Found ${results.length} result${results.length !== 1 ? 's' : ''} for "`));
    const querySpan = document.createElement('span');
    querySpan.className = 'search-summary-query';
    querySpan.textContent = query;
    mainMessage.appendChild(querySpan);
    mainMessage.appendChild(document.createTextNode('"'));

    searchSummary.appendChild(mainMessage);
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

    const title = result.title || '';
    const excerpt = result.excerpt || '';
    const categories = result.categories || [];
    const date = result.date || '';
    const author = result.author || '';

    const titleLink = document.createElement('a');
    const resultUrl = getSafeResultUrl(result.url);
    if (resultUrl) {
      titleLink.href = resultUrl;
    }
    titleLink.appendChild(highlightText(title, query));

    const heading = document.createElement('h2');
    heading.appendChild(titleLink);

    const details = document.createElement('p');
    details.className = 'post-details';

    if (categories.length > 0) {
      const categoryList = document.createElement('span');
      categoryList.className = 'blog-filters';
      categories.forEach(cat => {
        const slug = slugify(cat);
        const category = document.createElement('span');
        category.className = 'blog-filter';

        const categoryLink = document.createElement('a');
        categoryLink.href = withBaseUrl(`/blog/category/${slug}/`);
        categoryLink.textContent = cat.toLowerCase();

        category.appendChild(categoryLink);
        categoryList.appendChild(category);
      });
      details.appendChild(categoryList);
    }

    // Format date
    const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
    if (author) {
      const authorElement = document.createElement('span');
      authorElement.className = 'post-author';
      authorElement.textContent = author;
      details.appendChild(authorElement);
    }
    if (formattedDate) {
      const dateElement = document.createElement('span');
      dateElement.className = 'post-date';
      dateElement.textContent = ` ${formattedDate}`;
      details.appendChild(dateElement);
    }

    const excerptElement = document.createElement('p');
    excerptElement.appendChild(highlightText(excerpt, query));

    const content = document.createElement('div');
    content.className = 'post-content';
    content.appendChild(excerptElement);

    const readMore = document.createElement('a');
    readMore.className = 'link';
    if (resultUrl) {
      readMore.href = resultUrl;
    }
    readMore.textContent = 'Read More';

    const buttonParagraph = document.createElement('div');
    buttonParagraph.className = 'button-para';
    buttonParagraph.appendChild(readMore);
    content.appendChild(buttonParagraph);

    li.appendChild(heading);
    li.appendChild(details);
    li.appendChild(content);

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
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSearch);
} else {
  initSearch();
}

// Expose clear function globally for use in templates
window.clearBlogSearch = clearSearch;
})();
