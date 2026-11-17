function generateTableOfContents(contentSelector, tocSelector) {
    const content = document.querySelector(contentSelector);
    const toc = document.querySelector(tocSelector);
    const headings = content.querySelectorAll('h2, h3');

    let tocHTML = '<h2>Table of Contents</h2><ul>';
    headings.forEach((heading, index) => {
        const id = `toc-${index}`;
        heading.id = id;
        const level = parseInt(heading.tagName.substring(1));
        tocHTML += `<li style="margin-left: ${(level - 2) * 10}px;"><a href="#${id}">${heading.textContent}</a></li>`;
    });
    tocHTML += '</ul>';
    toc.innerHTML = tocHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    generateTableOfContents('#content', '#toc');
});