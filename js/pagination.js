var url = window.location.href
var page = url.slice(-1)

var page1div = document.getElementById("page1")
var page2div = document.getElementById("page2")



if (page==2){
  page1div.style.display = "none"
  page2div.style.display = "block"
}
