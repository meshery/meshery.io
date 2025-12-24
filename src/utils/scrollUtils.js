/**
 * Scroll-related utility functions
 */

export function getScrollPosition() {
  return document.documentElement.scrollTop || document.body.scrollTop;
}

export function scrollToTop(speed = 0) {
  const htmlBody = document.querySelector('html, body');
  if (htmlBody && typeof $ !== 'undefined') {
    $(htmlBody).animate({ scrollTop: 0 }, speed);
  }
}

