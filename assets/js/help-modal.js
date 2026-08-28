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

modal.querySelectorAll(".btn[data-clipboard-text]").forEach(function (button) {
  button.addEventListener("click", async function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    var copied = false;
    var text = button.dataset.clipboardText;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        copied = true;
      }
    } catch (error) {
      console.error("Clipboard API copy failed:", error);
    }

    if (!copied) {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        copied = document.execCommand("copy");
      } catch (error) {
        console.error("Clipboard fallback failed:", error);
      }
      textarea.remove();
    }

    if (copied) {
      button.querySelector(".tooltiptext").innerHTML = "Copied!";
    }
  });
});
