(function () {
var header = document.getElementById("mainHeader");
function changeHeader() {
  var scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
  var scrollBuffer = 50;

  if (
    window.location.pathname === "/" ||
      window.location.pathname.includes("/programs")
  ) {
    scrollBuffer = 0;
  }
  header.classList.toggle("header-shadow", scrollTop >= scrollBuffer);
}

var didScroll = false;

window.addEventListener("scroll", function () {
  didScroll = true;
});

setInterval(function () {
  if (didScroll) {
    didScroll = false;
    changeHeader();
  }
}, 100);

changeHeader();
})();

(function () {
var logoLink = document.querySelector("[data-homepage-logo]");
if (!logoLink) return;

logoLink.addEventListener("click", function (event) {
  if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      logoLink.target === "_blank"
  ) {
    return;
  }

  if (Math.round(window.scrollY) <= 0) return;

  event.preventDefault();

  // Clear the URL hash while preserving the path and query parameters.
  if (window.location.hash) {
    history.pushState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? "auto" : "smooth"
  });
});
})();

var btnscroll = $('#button-scroll-to-up');

$(window).scroll(function() {
  if ($(window).scrollTop() > 0) {
    btnscroll.addClass('show');
  } else {
    btnscroll.removeClass('show');
  }
});

btnscroll.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, '0');
});



$("#slider").on("input change", (e) => {
  const sliderPos = e.target.value;
  $('.foreground-img').css('width', `${sliderPos}%`)
  $('.slider-button').css('left', `calc(${sliderPos}% - 18px)`)
});

