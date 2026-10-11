document.addEventListener("DOMContentLoaded", function () {
  const contentElements = document.querySelectorAll(".contentdata");
  contentElements.forEach(content => {
    const readMore = content.parentElement.querySelector(".read-more");

    if (!readMore) return;

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
