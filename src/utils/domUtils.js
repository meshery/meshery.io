/**
 * DOM utility functions
 */

export function getNumberOfLines(element) {
  const clone = element.cloneNode(true);
  clone.style.visibility = 'hidden';
  clone.style.position = 'absolute';
  clone.style.overflow = 'visible';
  document.body.appendChild(clone);

  const lineHeight = parseFloat(window.getComputedStyle(clone).lineHeight);
  const height = clone.clientHeight;

  document.body.removeChild(clone);

  const numberOfLines = Math.round(height / lineHeight);
  return numberOfLines;
}

