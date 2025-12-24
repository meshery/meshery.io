/**
 * Card filtering and pagination component
 */

import { matchCardAgainstFilters } from '../utils/patternCardUtils.js';

const ITEMS_PER_PAGE = 11;

export function filterAndDisplayCards(technologyList, categoryList, patternTypeList) {
  const patternCards = Array.from(document.querySelectorAll('.patternCard'));
  let currentPage = 0;

  const matchingCards = patternCards.filter(card => {
    return matchCardAgainstFilters(card, technologyList, categoryList, patternTypeList);
  });

  patternCards.forEach(card => {
    card.style.display = 'none';
  });

  const noCard = document.getElementById('not-found');
  if (noCard) {
    noCard.style.display = matchingCards.length > 0 ? 'none' : 'block';
  }

  const paginationButtons = document.querySelector('.pagination');
  const prevButton = document.getElementById('designs-prev') ||
                     document.getElementById('models-prev') ||
                     document.getElementById('filters-prev');
  const nextButton = document.getElementById('designs-next') ||
                     document.getElementById('models-next') ||
                     document.getElementById('filters-next');

  function updatePagination() {
    const totalPages = Math.ceil(matchingCards.length / ITEMS_PER_PAGE);
    if (prevButton) prevButton.disabled = currentPage === 0;
    if (nextButton) nextButton.disabled = currentPage + 1 >= totalPages || totalPages === 0;
  }

  function showCardsForPage() {
    const start = currentPage * ITEMS_PER_PAGE;
    const end = Math.min(start + ITEMS_PER_PAGE, matchingCards.length);

    for (let i = 0; i < matchingCards.length; i++) {
      matchingCards[i].style.display = (i >= start && i < end) ? 'block' : 'none';
    }

    updatePagination();
  }

  if (prevButton) {
    prevButton.onclick = function() {
      if (currentPage > 0) {
        currentPage--;
        showCardsForPage();
      }
    };
  }

  if (nextButton) {
    nextButton.onclick = function() {
      const totalPages = Math.ceil(matchingCards.length / ITEMS_PER_PAGE);
      if (currentPage + 1 < totalPages) {
        currentPage++;
        showCardsForPage();
      }
    };
  }

  if (paginationButtons) {
    paginationButtons.style.display = matchingCards.length > ITEMS_PER_PAGE ? 'flex' : 'none';
  }

  currentPage = 0;
  showCardsForPage();

  return matchingCards.length;
}

