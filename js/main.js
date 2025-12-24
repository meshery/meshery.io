/**
 * Main entry point - refactored with separation of concerns
 */

(function() {
  'use strict';
  
  async function initialize() {
    try {
      const { initHeaderScroll } = await import('../src/hooks/useHeaderScroll.js');
      const { initScrollToTop } = await import('../src/hooks/useScrollToTop.js');
      const { initSlider } = await import('../src/components/sliderHandler.js');
      
      initHeaderScroll();
      initScrollToTop();
      initSlider();
    } catch (error) {
      if (console && console.warn) {
        console.warn('Failed to load main modules:', error);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
