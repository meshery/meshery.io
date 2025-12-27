/**
 * Event handling for search functionality
 */

import { loadSearchData, getSearchData } from './useSearchData.js';
import { performClientSearch } from '../utils/searchUtils.js';
import { renderResults, clearSearchResults } from '../components/searchResultsRenderer.js';
import { debounce } from '../utils/debounce.js';

let isInitialized = false;

function handleSearchInput(event) {
  const query = event.target.value.trim();
  const clearButton = document.getElementById('clear-search-btn');

  if (clearButton) {
    clearButton.style.display = query.length > 0 ? 'block' : 'none';
  }

  if (query.length === 0) {
    handleClearSearch();
    return;
  }

  if (query.length < 2) {
    return;
  }

  const searchData = getSearchData();
  if (!searchData) {
    console.warn('Search data not loaded');
    return;
  }

  const results = performClientSearch(query, searchData);
  renderResults(results, query);
}

const debouncedSearchInput = debounce(handleSearchInput, 300);

export const handleClearSearch = function() {
  const searchInput = document.getElementById('blog-search-input');
  const clearButton = document.getElementById('clear-search-btn');

  clearSearchResults();
  
  if (searchInput) searchInput.value = '';
  if (clearButton) clearButton.style.display = 'none';
}

export async function initSearch() {
  const searchInput = document.getElementById('blog-search-input');
  const clearButton = document.getElementById('clear-search-btn');

  if (!searchInput) {
    console.warn('Search input not found');
    return;
  }

  if (isInitialized) return;
  
  const { success } = await loadSearchData();
  if (!success) {
    console.warn('Search functionality not available');
    return;
  }

  searchInput.addEventListener('input', debouncedSearchInput);

  if (clearButton) {
    clearButton.addEventListener('click', handleClearSearch);
  }

  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  });

  isInitialized = true;
}

