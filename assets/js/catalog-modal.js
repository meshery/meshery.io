
document.addEventListener("DOMContentLoaded", function () {
  const contentElements = document.querySelectorAll(".contentdata");
  const readMoreElements = document.querySelectorAll(".read-more");

  for (let i = 0; i < contentElements.length; i++) {
    const content = contentElements[i];
    const readMore = readMoreElements[i];

    // Split text into words
    const words = content.textContent.trim().split(/\s+/);

    if (words.length > 80) { // hide content if more than 100 words
      const visibleContent = words.slice(0, 80).join(" ");
      const hiddenContent = words.slice(80).join(" ");

      content.innerHTML = `
        <span class="visible-content">${visibleContent}</span>
        <span class="hidden-content">${hiddenContent}</span>
      `;

      readMore.style.display = "inline"; 
      content.style.display = "inline"; 
    } else{
      readMore.style.display = "none"; 
      content.style.display = "inline";
    }
  }
});