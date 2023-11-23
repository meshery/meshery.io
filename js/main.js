(function () {
  var header = document.getElementById("mainHeader");
  function changeHeader() {
    var scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    var scrollBuffer = 50;

    if (
      window.location.pathname == "/" &&
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
  $('html, body').animate({scrollTop:0}, '0');
});

const container = document.querySelector('.container-div');
document.querySelector('.slider').addEventListener('input', (e) => {
  container.style.setProperty('--position', `${e.target.value}%`);
})