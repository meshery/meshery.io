/**
 * Header scroll behavior hook
 */

import { getScrollPosition } from '../utils/scrollUtils.js';

export function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  const scrollBuffer = getScrollBuffer();
  
  function updateHeaderShadow() {
    const scrollTop = getScrollPosition();
    header.classList.toggle('header-shadow', scrollTop >= scrollBuffer);
  }

  let didScroll = false;

  window.addEventListener('scroll', function() {
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      didScroll = false;
      updateHeaderShadow();
    }
  }, 100);

  updateHeaderShadow();
}

function getScrollBuffer() {
  const path = window.location.pathname;
  if (path === '/' || path.includes('/programs')) {
    return 0;
  }
  return 50;
}

