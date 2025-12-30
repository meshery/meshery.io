/**
 * Scroll to top button hook
 */

import { scrollToTop } from '../utils/scrollUtils.js';

export function initScrollToTop() {
  const scrollButton = document.getElementById('button-scroll-to-up');
  if (!scrollButton || typeof $ === 'undefined') return;

  $(window).scroll(function() {
    if ($(window).scrollTop() > 0) {
      scrollButton.classList.add('show');
    } else {
      scrollButton.classList.remove('show');
    }
  });

  scrollButton.addEventListener('click', function(e) {
    e.preventDefault();
    scrollToTop(0);
  });
}

