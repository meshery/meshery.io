/**
 * Blog search entry point
 * Imports separated modules for clean architecture
 */

import { initSearch, handleClearSearch } from '../src/hooks/useSearchEvents.js';

function initialize() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
}

initialize();

window.clearBlogSearch = handleClearSearch;
