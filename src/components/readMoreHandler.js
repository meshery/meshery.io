/**
 * Read more component handler
 */

import { getNumberOfLines } from '../utils/domUtils.js';

export function initReadMore() {
  const contentElements = document.querySelectorAll('.contentdata');
  
  contentElements.forEach(content => {
    const readMore = content.parentElement.querySelector('.read-more');
    if (!readMore) return;

    const numberOfLines = getNumberOfLines(content);

    if (numberOfLines > 3) {
      readMore.style.display = 'inline';
    } else {
      readMore.style.display = 'none';
    }
  });
}

