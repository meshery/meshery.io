const modal = document.getElementById("myModal");
const button = document.getElementById("myBtn");
const closeButton = document.getElementsByClassName("closed")[0];
let previouslyFocusedElement = null;

function setCatalogInteraction(enabled) {
  const catalogContent = document.querySelector(".feature-container");
  catalogContent.classList.toggle("modal-open", enabled);
}

button.onclick = function () {
  modal.style.display = "flex";
  setCatalogInteraction(true);
  previouslyFocusedElement = button;
  closeButton.focus();
};

closeButton.onclick = function () {
  modal.style.display = "none";
  setCatalogInteraction(false);
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
  }
};

modal.onkeydown = function (event) {
  if (event.key === "Escape") {
    event.preventDefault();
    modal.style.display = "none";
    setCatalogInteraction(false);
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    setCatalogInteraction(false);
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }
};
