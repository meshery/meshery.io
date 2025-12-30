document.addEventListener("DOMContentLoaded", function () {
  const contentElements = document.querySelectorAll(".contentdata");
  contentElements.forEach(content => {
    const readMore = content.parentElement.querySelector(".read-more");


  for (let i = 0; i < contentElements.length; i++) {
    const content = contentElements[i];
    const readMore = readMoreElements[i];
    if (!readMore) continue;

    const numberOfLines = getNumberOfLines(content);

    if (numberOfLines > 3) {
      readMore.style.display = 'inline';
    } else {
      readMore.style.display = 'none';
    }
  });
});

function getNumberOfLines(element) {
  const clone = element.cloneNode(true);
  clone.style.visibility = 'hidden';
  clone.style.position = 'absolute';
  clone.style.overflow = 'visible';
  document.body.appendChild(clone);

  const lineHeight = parseFloat(window.getComputedStyle(clone).lineHeight);
  const height = clone.clientHeight;

  document.body.removeChild(clone);

  const numberOfLines = Math.round(height / lineHeight);
  return numberOfLines;
}
