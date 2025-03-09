document.addEventListener("DOMContentLoaded", function () {
  // Regex pattern to match [text](link)
  const linkPattern = /\[([^\]]+)\]\(([^\)]+)\)/g;

  // Find all elements that might contain the [label](url) pattern
  const elementsToReplace = document.querySelectorAll(".replace-links");

  elementsToReplace.forEach((el) => {
    const originalText = el.textContent;
    const newHTML = originalText.replace(linkPattern, (match, label, url) => {
      return `<a href="${url}">${label}</a>`;
    });
    el.innerHTML = newHTML;
  });
});
