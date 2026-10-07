(function (global) {
  'use strict';

  var IMAGE_EXTENSION_RE = /\.(png|jpe?g|gif|webp|svg|bmp|avif)(\?.*)?(#.*)?$/i;
  var CONTENT_SELECTOR = '.post-content, .page';
  var LIGHTBOXABLE_CLASS = 'img-lightboxable';

  function isImageUrl(url) {
    if (!url || typeof url !== 'string') {
      return false;
    }
    var clean = url.split('?')[0].split('#')[0];
    return IMAGE_EXTENSION_RE.test(clean);
  }

  function isImageElement(img) {
    if (typeof HTMLImageElement !== 'undefined') {
      return img instanceof HTMLImageElement;
    }
    return !!img && img.tagName === 'IMG';
  }

  function shouldSkipImage(img) {
    if (!img || !isImageElement(img)) {
      return true;
    }
    // Existing dedicated viewers handle these; do not double-handle.
    if (img.hasAttribute('onclick')) {
      return true;
    }
    if (img.closest('#open-modal')) {
      return true;
    }
    if (img.closest('[data-fancybox]')) {
      return true;
    }
    if (img.hasAttribute('data-fancybox')) {
      return true;
    }
    // Theme-aware logos and UI icons are not content images.
    if (img.id === 'logo-dark-light') {
      return true;
    }
    if (img.classList.contains('logo-dark-light')) {
      return true;
    }
    if (img.hasAttribute('data-logo-for-dark') || img.hasAttribute('data-logo-for-light')) {
      return true;
    }
    if (img.hasAttribute('data-no-modal')) {
      return true;
    }
    if (img.classList.contains('internal-link')) {
      return true;
    }
    // Only enhance images inside main content areas.
    if (!img.closest(CONTENT_SELECTOR)) {
      return true;
    }
    return false;
  }

  function resolveImageSrc(img, anchor) {
    // Prefer the link target when the link itself points at an image
    // (e.g. <a href="...png"><img ...></a>). This gives the full-size
    // asset instead of a possibly resized thumbnail.
    if (anchor && anchor.href && isImageUrl(anchor.getAttribute('href'))) {
      return anchor.href;
    }
    return img.currentSrc || img.src;
  }

  function getModal() {
    return document.getElementById('img-lightbox');
  }

  function createModal() {
    var overlay = document.createElement('div');
    overlay.id = 'img-lightbox';
    overlay.className = 'img-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image viewer');
    overlay.setAttribute('aria-hidden', 'true');

    var figure = document.createElement('figure');
    figure.className = 'img-lightbox__figure';

    var image = document.createElement('img');
    image.className = 'img-lightbox__img';
    image.id = 'img-lightbox-img';
    image.alt = '';

    var caption = document.createElement('figcaption');
    caption.className = 'img-lightbox__caption';
    caption.id = 'img-lightbox-caption';
    caption.hidden = true;

    var closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'img-lightbox__close';
    closeButton.setAttribute('aria-label', 'Close image viewer');
    closeButton.textContent = '\u00D7';

    closeButton.addEventListener('click', function (event) {
      event.stopPropagation();
      closeModal();
    });

    overlay.addEventListener('click', function (event) {
      // Clicking outside the image (on the backdrop) closes the modal.
      // Clicks on the image/figure itself keep it open.
      if (event.target === overlay) {
        closeModal();
      }
    });

    figure.appendChild(image);
    figure.appendChild(caption);
    overlay.appendChild(figure);
    overlay.appendChild(closeButton);
    document.body.appendChild(overlay);
    return overlay;
  }

  var lastFocusedElement = null;
  var previousBodyOverflow = '';

  function openModal(src, alt) {
    var overlay = getModal() || createModal();
    var image = overlay.querySelector('#img-lightbox-img');
    var caption = overlay.querySelector('#img-lightbox-caption');

    image.src = src;
    image.alt = alt || 'Enlarged image';

    if (alt) {
      caption.textContent = alt;
      caption.hidden = false;
    } else {
      caption.textContent = '';
      caption.hidden = true;
    }

    lastFocusedElement = document.activeElement;
    previousBodyOverflow = document.body.style.overflow;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    var closeButton = overlay.querySelector('.img-lightbox__close');
    if (closeButton) {
      closeButton.focus();
    }
  }

  function closeModal() {
    var overlay = getModal();
    if (!overlay || !overlay.classList.contains('is-open')) {
      return;
    }
    var image = overlay.querySelector('#img-lightbox-img');
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = previousBodyOverflow;
    if (image) {
      image.removeAttribute('src');
    }
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
    lastFocusedElement = null;
  }

  function markLightboxableImages() {
    var images = document.querySelectorAll(CONTENT_SELECTOR + ' img');
    images.forEach(function (img) {
      if (shouldSkipImage(img)) {
        return;
      }
      var anchor = img.closest('a');
      var anchorHref = anchor ? anchor.getAttribute('href') : null;
      // If the image is wrapped in a link to a non-image destination
      // (e.g. a credential page or external article), leave navigation alone.
      if (anchor && anchorHref && !isImageUrl(anchorHref)) {
        return;
      }
      img.classList.add(LIGHTBOXABLE_CLASS);
      if (!img.hasAttribute('tabindex')) {
        img.setAttribute('tabindex', '0');
      }
    });
  }

  function handleTrigger(img) {
    if (shouldSkipImage(img)) {
      return false;
    }
    var anchor = img.closest('a');
    var anchorHref = anchor ? anchor.getAttribute('href') : null;
    if (anchor && anchorHref && !isImageUrl(anchorHref)) {
      return false;
    }
    var src = resolveImageSrc(img, anchor);
    if (!src) {
      return false;
    }
    openModal(src, img.getAttribute('alt') || '');
    return true;
  }

  function initBrowser() {
    document.addEventListener('click', function (event) {
      var overlay = getModal();
      if (overlay && overlay.classList.contains('is-open')) {
        return;
      }
      var target = event.target;
      if (!isImageElement(target)) {
        return;
      }
      var anchor = target.closest('a');
      // Intercept only image links; let fancybox and existing viewers work.
      if (anchor && anchor.hasAttribute('data-fancybox')) {
        return;
      }
      if (anchor && anchor.getAttribute('href') && isImageUrl(anchor.getAttribute('href'))) {
        event.preventDefault();
        handleTrigger(target);
        return;
      }
      if (handleTrigger(target)) {
        event.preventDefault();
      }
    });

    document.addEventListener('keydown', function (event) {
      var overlay = getModal();
      if (event.key === 'Escape' && overlay && overlay.classList.contains('is-open')) {
        closeModal();
        return;
      }
      if ((event.key === 'Enter' || event.key === ' ') && isImageElement(event.target)) {
        if (event.target.classList.contains(LIGHTBOXABLE_CLASS)) {
          event.preventDefault();
          handleTrigger(event.target);
        }
      }
    });

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', markLightboxableImages);
    } else {
      markLightboxableImages();
    }
  }

  var api = {
    isImageUrl: isImageUrl,
    shouldSkipImage: shouldSkipImage,
    resolveImageSrc: resolveImageSrc,
    openModal: openModal,
    closeModal: closeModal,
    CONTENT_SELECTOR: CONTENT_SELECTOR,
    LIGHTBOXABLE_CLASS: LIGHTBOXABLE_CLASS
  };

  if (typeof document !== 'undefined') {
    initBrowser();
  }

  if (typeof global !== 'undefined') {
    global.__imageModal = api;
  }

  /* global module */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
