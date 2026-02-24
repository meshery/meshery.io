(function () {
  "use strict";
  var CLOSE_SVG =
  '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
  '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z"/>' +
  "</svg>";

  function buildPopup() {
    var el = document.createElement("div");
    el.className = "community-corner-popup";

    el.innerHTML =
      '<div class="popup">' +
      '<button class="close-btn" aria-label="Close popup">' + CLOSE_SVG +'</button>' +

      '<div class="popup-text">' +
      '<h3>New Here?</h3>' +
      '<p>Welcome! Fill in the community member form to receive updates about meetings and resources.</p>' +
      '</div>' +

      '<a class="popup-button" href="https://meshery.io/newcomers" target="_blank"><p class="popup-button-text">Community Forum</p></a>' +
      '</div>';

    el.querySelector(".close-btn").addEventListener("click", function () {
      el.remove();
    });

    return el;
  }

  function show() {
    var el = buildPopup();
    document.body.appendChild(el);

    requestAnimationFrame(function () {
      el.classList.add("visible");
    });
  }

  function init() {
    show(); // load immediately
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();