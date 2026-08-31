const modal = document.getElementById("myModal");
const button = document.getElementById("myBtn");
const closeButton = document.getElementsByClassName("closed")[0];

function setCatalogInteraction(enabled) {
  const catalogContent = document.querySelector(".feature-container");
  catalogContent.classList.toggle("modal-open", enabled);
}

button.onclick = function () {
  modal.style.display = "flex";
  setCatalogInteraction(true);
};

closeButton.onclick = function () {
  modal.style.display = "none";
  setCatalogInteraction(false);
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    setCatalogInteraction(false);
  }
};
