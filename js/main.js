(function () {
	var header = document.getElementById("mainHeader");

	function changeHeader() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollBuffer = 50;
		if (window.location.pathname !== "/"){
			scrollBuffer = 0;
		}
		header.classList.toggle("header-background", scrollTop >= scrollBuffer || document.body.classList.contains("nav-open"));
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
    
    document.getElementById("open-nav").onclick = function () {
		document.body.classList.toggle("nav-open");
		changeHeader();
        return false;
    };
})();