document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to run the function on window resize

  var navLinks = document.querySelectorAll("#nav-fixed .header-link");

  // Add click event listener to each link
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent the default anchor link behavior

      var targetId = this.getAttribute("href"); // Get the href attribute of the clicked link
      smoothScroll(targetId, 1000); // Call the smoothScroll function with the targetId and duration
    });
  });
});

function smoothScroll(target, duration) {
  var targetElement = document.querySelector(target);
  if (!targetElement) {
    console.error("SmoothScroll target not found: ", target);
    return;
  }

  var targetPosition = targetElement.getBoundingClientRect().top;
  var startPosition = window.pageYOffset;
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
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}
