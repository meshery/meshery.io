const url = window.location.href;
const page = url.slice(-1);

const page1div = document.getElementById("page1");
const page2div = document.getElementById("page2");

if (page === "2") {
  page1div.style.display = "none";
  page2div.style.display = "block";
}
