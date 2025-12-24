/**
 * Main entry point - refactored with separation of concerns
 */

import { initHeaderScroll } from '../src/hooks/useHeaderScroll.js';
import { initScrollToTop } from '../src/hooks/useScrollToTop.js';
import { initSlider } from '../src/components/sliderHandler.js';

function initialize() {
  initHeaderScroll();
  initScrollToTop();
  initSlider();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
