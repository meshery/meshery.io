// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("video-modal");

// Get the video control
var vid = document.getElementById("video");

// Get the <h3> element that closes the modal
var cross = document.getElementsByClassName("close-video")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
  vid.play();
};

// When the user clicks on <h3> (x), close the modal
cross.addEventListener(
  "click",
  function () {
    vid.pause();
    modal.style.display = "none";
    while (cross.firstChild) {
      cross.removeChild(cross.firstChild);
    }
  },
  false
);

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    vid.pause();
    modal.style.display = "none";
  }
};
