const modal = document.getElementById("myModal");
const button = document.getElementById("myBtn");
const closeButton = document.getElementsByClassName("closed")[0];

button.onclick = function () {
  modal.showModal();
};

closeButton.onclick = function () {
  modal.close();
};

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.close();
  }
});
