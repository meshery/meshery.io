var currentAnimationId = null;

function getHeaderOffset() {
  var header = document.querySelector("#mainHeader") || document.querySelector("header");
  var banner = document.querySelector(".sitewide-banner:not(.hidden)");
  var headerHeight = header ? header.offsetHeight : 90;
  var bannerHeight = (banner && banner.offsetHeight) ? banner.offsetHeight : 0;
  return headerHeight + bannerHeight + 20; // 20px extra breathing room for the section title
}

function cancelAnimation() {
  if (currentAnimationId !== null) {
    cancelAnimationFrame(currentAnimationId);
    currentAnimationId = null;
  }
}

window.addEventListener("wheel", cancelAnimation, { passive: true });
window.addEventListener("touchmove", cancelAnimation, { passive: true });

document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll("#nav-fixed .header-link");

  // Add click event listener to each link
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent the default anchor link behavior

      var targetId = this.getAttribute("href"); // Get the href attribute of the clicked link
      if (history.pushState) {
        history.pushState(null, null, targetId);
      }
      smoothScroll(targetId, 800); // Call the smoothScroll function with the targetId and duration
    });
  });
});

function smoothScroll(target, duration) {
  var targetElement = document.querySelector(target);
  if (!targetElement) {
    console.error("SmoothScroll target not found: ", target);
    return;
  }

  cancelAnimation();

  var headerOffset = getHeaderOffset();
  var targetPosition = targetElement.getBoundingClientRect().top - headerOffset;
  var startPosition = window.pageYOffset || document.documentElement.scrollTop;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = easeInOutQuad(
      timeElapsed,
      startPosition,
      targetPosition,
      duration
    );
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      currentAnimationId = requestAnimationFrame(animation);
    } else {
      currentAnimationId = null;
    }
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  currentAnimationId = requestAnimationFrame(animation);
}
