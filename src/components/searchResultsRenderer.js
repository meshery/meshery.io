/**
 * UI rendering for search results
 */

import { slugify, formatDate } from '../utils/textUtils.js';

export function renderResults(results, query) {
  const resultsContainer = document.getElementById('search-results');
  const blogPosts = document.querySelector('.blog-posts');
  const searchSummary = document.getElementById('search-summary');

  if (!resultsContainer) return;

  resultsContainer.innerHTML = '';

  if (results.length === 0) {
    searchSummary.textContent = `No results found for "${query}"`;
    searchSummary.style.display = 'block';
    resultsContainer.style.display = 'none';
    if (blogPosts) blogPosts.style.display = 'none';
    return;
  }

  searchSummary.textContent = `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`;
  searchSummary.style.display = 'block';
  if (blogPosts) blogPosts.style.display = 'none';
  resultsContainer.style.display = 'block';

  const resultsList = createResultsList(results);
  resultsContainer.appendChild(resultsList);
}

function createResultsList(results) {
  const resultsList = document.createElement('ul');
  resultsList.className = 'blog-posts search-results-list';

  results.forEach(result => {
    const li = createResultItem(result);
    resultsList.appendChild(li);
  });

  return resultsList;
}

function createResultItem(result) {
  const li = document.createElement('li');
  li.className = 'blog-post search-result-item';

  const title = result._formatted?.title || result.title;
  const excerpt = result._formatted?.excerpt || result.excerpt;
  const categories = result.categories || [];
  const date = result.date || '';
  const author = result.author || '';

  const categoryHtml = buildCategoryHtml(categories);
  const formattedDate = formatDate(date);

  li.innerHTML = `
    <h2><a href="${result.url}">${title}</a></h2>
    <p class="post-details">
      ${categoryHtml}
      ${author ? `<span class="post-author">${author}</span>` : ''}
      ${formattedDate ? `<span class="post-date"> ${formattedDate}</span>` : ''}
    </p>
    <div class="post-content">
      <p>${excerpt}</p>
      <div class="button-para">
        <a class="link" href="${result.url}">Read More</a>
      </div>
    </div>
  `;

  return li;
}

function buildCategoryHtml(categories) {
  if (categories.length === 0) return '';
  
  let categoryHtml = '<span class="blog-filters">';
  categories.forEach(cat => {
    const slug = slugify(cat);
    categoryHtml += `<span class="blog-filter"><a href="/blog/category/${slug}/">${cat.toLowerCase()}</a></span>`;
  });
  categoryHtml += '</span>';
  
  return categoryHtml;
}

export function clearSearchResults() {
  const resultsContainer = document.getElementById('search-results');
  const blogPosts = document.querySelector('.blog-posts');
  const searchSummary = document.getElementById('search-summary');

  if (resultsContainer) resultsContainer.style.display = 'none';
  if (blogPosts) blogPosts.style.display = 'block';
  if (searchSummary) {
    searchSummary.textContent = '';
    searchSummary.style.display = 'none';
  }
}

