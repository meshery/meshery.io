function toggleFullScreenImage(patternId, patternType) {
  var fullScreenContainer = document.getElementById(
    `fullScreenContainer${patternId}`
  );

  if (!fullScreenContainer) {
    createFullScreenContainer(patternId, patternType);
    document.body.style.overflow = "hidden";
  } else {
    document.body.removeChild(fullScreenContainer);
    document.body.style.overflow = "auto";
  }
}

function createFullScreenContainer(patternId, patternType){
  var fullScreenContainer = document.createElement("div");
  fullScreenContainer.id = `fullScreenImageContainer${patternId}`;
  fullScreenContainer.style.position = "fixed";
  fullScreenContainer.style.top = "0";
  fullScreenContainer.style.left = "0";
  fullScreenContainer.style.width = "100%";
  fullScreenContainer.style.height = "100%";
  fullScreenContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  fullScreenContainer.style.zIndex = "9999";
  fullScreenContainer.style.backdropFilter = "blur(10px)";
  fullScreenContainer.style.display = "flex";
  fullScreenContainer.style.alignItems = "center";
  fullScreenContainer.style.justifyContent = "center";

  var fullScreenImage = document.createElement("img");
  fullScreenImage.id = `fullScreenImage${patternId}`;
  fullScreenImage.className = "image-class";
  fullScreenImage.alt = "Full Screen Image";
  switch(patternType) {
    case 'model':
      fullScreenImage.src = '' + patternId // patternId is the image path
      break;
    case 'extension':
      fullScreenImage.src = `${patternId}`; // patternId is the image path
      break;
    default:
      fullScreenImage.src =
      "https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/action-assets/design-assets/" +
      patternId +
      ".png";
      break;
  }

  fullScreenImage.onerror = function () {
    this.src = "/assets/images/patterns/service-mesh.svg";
  };
  fullScreenImage.loading = "lazy";
  fullScreenImage.style.maxHeight = "75vh";  
  fullScreenImage.style.maxWidth = "75vw";   

  fullScreenContainer.appendChild(fullScreenImage);

  document.body.appendChild(fullScreenContainer);
  fullScreenContainer.onclick = function () {
    document.body.removeChild(fullScreenContainer);
    document.body.style.overflow = "auto";
  };
}
