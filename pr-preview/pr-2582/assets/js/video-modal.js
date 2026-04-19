// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("video-modal");

// Get the video control
var video = document.getElementById("video");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-video")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "flex"; 
  video.play();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  video.pause();
  modal.style.display = "none";

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    video.pause();
    modal.style.display = "none";
  }
}
