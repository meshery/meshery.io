function toggleFullScreenImage(patternId) {
    var fullScreenContainer = document.getElementById(`fullScreenContainer${patternId}`);

    if (!fullScreenContainer) {
      createFullScreenContainer(patternId);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.removeChild(fullScreenContainer);
      document.body.style.overflow = 'auto';
    }
  }

  function createFullScreenContainer(patternId) {
    var fullScreenContainer = document.createElement('div');
    fullScreenContainer.id = `fullScreenImageContainer${patternId}`;
    fullScreenContainer.style.position = 'fixed';
    fullScreenContainer.style.top = '0';
    fullScreenContainer.style.left = '0';
    fullScreenContainer.style.width = '100%';
    fullScreenContainer.style.height = '100%';
    fullScreenContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    fullScreenContainer.style.zIndex = '9999';
    fullScreenContainer.style.backdropFilter = 'blur(10px)';

    var fullScreenImage = document.createElement('img');
    fullScreenImage.id = `fullScreenImage${patternId}`;
    fullScreenImage.className = 'image-class';
    fullScreenImage.alt = 'Full Screen Image';
    fullScreenImage.src = 'https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/action-assets/design-assets/' + patternId + '.png';

    fullScreenImage.onerror = function () {
     this.src = '/assets/images/patterns/service-mesh.svg';
    };
    fullScreenImage.loading = 'lazy';
    fullScreenImage.style.height = '50%';
    fullScreenImage.style.width = '50%';
    fullScreenImage.style.position = 'absolute';
    fullScreenImage.style.left = '50%';
    fullScreenImage.style.top = '45%';
    fullScreenImage.style.transform = 'translate(-50%, -50%)';
    fullScreenContainer.style.cursor = "pointer";


    fullScreenContainer.appendChild(fullScreenImage);

    document.body.appendChild(fullScreenContainer);
    fullScreenContainer.onclick = function () {
      document.body.removeChild(fullScreenContainer);
      document.body.style.overflow = 'auto';
    };
  }