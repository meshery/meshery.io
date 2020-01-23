(function () {
	var header = document.getElementById("mainHeader");

	function changeHeader() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollBuffer = 50;
		if (window.location.pathname !== "/"){
			scrollBuffer = 0;
		}
		header.classList.toggle("header-background", scrollTop >= scrollBuffer);
	}

	var didScroll = false;

	window.addEventListener('scroll', function() {
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			didScroll = false;
			changeHeader();
		}
	}, 100);

    changeHeader();
})();