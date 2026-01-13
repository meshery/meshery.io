url = window.location.href;

page = url.slice(-1);

page1div = document.getElementById("page1");
page2div = document.getElementById("page2");

if (page == 2) {
	page1div.style.display = "none";
	page2div.style.display = "block";
}
