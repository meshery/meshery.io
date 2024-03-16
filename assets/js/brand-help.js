document.addEventListener("DOMContentLoaded", function () {
  updateHeroImages();
  // Add event listener to run the function on window resize
  
});

window.addEventListener("resize", updateHeroImages);

function updateHeroImages() {
  const screenWidth = window.innerWidth;
  const heroLeftImg = document.querySelector(".hero-left img");
  const heroLeftDiv = document.querySelector(".hero-left");
  const heroRightImg = document.querySelector(".hero-right img");
  const heroRightDiv = document.querySelector(".hero-right");

  if (screenWidth < 768) {
    // Update the src attribute for smaller screens for hero-left
    heroLeftImg.src = "../assets/images/rect-mobile-dark-left.svg";
    heroLeftImg.dataset.logoForDark =
      "../assets/images/rect-mobile-dark-left.svg";
    heroLeftImg.dataset.logoForLight =
      "../assets/images/rect-mobile-light-left.svg";

    // Update the src attribute for smaller screens for hero-right
    heroRightImg.src = "../assets/images/rect-mobile-dark-right.svg";
    heroRightImg.dataset.logoForDark =
      "../assets/images/rect-mobile-dark-right.svg";
    heroRightImg.dataset.logoForLight =
      "../assets/images/rect-mobile-light-right.svg";

    if (heroLeftDiv) {
      heroLeftDiv.style.marginTop = "-30%";
    }

    if (heroRightDiv) {
      heroRightDiv.style.marginLeft = "20%";
    }
  } else {
    // Revert to the original images for larger screens for hero-left
    heroLeftImg.src = "../assets/images/rect-left.png";
    heroLeftImg.dataset.logoForDark = "../assets/images/rect-left.png";
    heroLeftImg.dataset.logoForLight = "../assets/images/rect-left-light.svg";

    // Revert to the original images for larger screens for hero-right
    heroRightImg.src = "../assets/images/rect-right.png";
    heroRightImg.dataset.logoForDark = "../assets/images/rect-right.png";
    heroRightImg.dataset.logoForLight = "../assets/images/rect-right-light.svg";

    if (heroLeftDiv) {
      heroLeftDiv.style.marginLeft = "-16%";
      heroLeftDiv.style.marginTop = "0";
    }

    if (heroRightDiv) {
      heroRightDiv.style.marginLeft = "20%";
    }
  }
}

window.smoothScroll = function smoothScroll(target, duration) {
  var targetElement = document.querySelector(target);
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
};
