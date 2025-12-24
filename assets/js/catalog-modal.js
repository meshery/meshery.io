/**
 * Catalog modal - refactored with separation of concerns
 */

document.addEventListener('DOMContentLoaded', function() {
  // Use dynamic import with error handling for better compatibility
  import('../../src/components/readMoreHandler.js')
    .then(module => {
      module.initReadMore();
    })
    .catch(error => {
      console.warn('Failed to load readMoreHandler module:', error);
      // Fallback: Basic read-more functionality without module
      const contentElements = document.querySelectorAll('.contentdata');
      contentElements.forEach(content => {
        const readMore = content.parentElement.querySelector('.read-more');
        if (!readMore) return;
        
        const clone = content.cloneNode(true);
        clone.style.visibility = 'hidden';
        clone.style.position = 'absolute';
        clone.style.overflow = 'visible';
        document.body.appendChild(clone);
        
        const lineHeight = parseFloat(window.getComputedStyle(clone).lineHeight);
        const height = clone.clientHeight;
        document.body.removeChild(clone);
        
        const numberOfLines = Math.round(height / lineHeight);
        readMore.style.display = numberOfLines > 3 ? 'inline' : 'none';
      });
    });
});
