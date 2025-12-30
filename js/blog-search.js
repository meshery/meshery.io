/**
 * Blog search entry point
 * Imports separated modules for clean architecture
 */

(function() {
  'use strict';
  
  function initialize() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadSearch);
    } else {
      loadSearch();
    }
  }

  async function loadSearch() {
    try {
      const { initSearch, handleClearSearch } = await import('../src/hooks/useSearchEvents.js');
      await initSearch();
      if (window) {
        window.clearBlogSearch = handleClearSearch;
      }
    } catch (error) {
      if (console && console.warn) {
        console.warn('Failed to load search module:', error);
      }
    }
  }

  initialize();
})();
