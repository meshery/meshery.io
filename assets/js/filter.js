/**
 * Filter functionality - refactored with separation of concerns
 */

import { createFilterState } from '../../src/hooks/useFilterState.js';
import { filterAndDisplayCards } from '../../src/components/cardFilter.js';

const filterState = createFilterState();

const allCheckboxes = document.querySelectorAll('input[type=checkbox]');
const allFilters = Array.from(document.querySelectorAll('.mesh'));
const checked = {};

function getChecked(name) {
  checked[name] = Array.from(document.querySelectorAll(`input[name=${name}]:checked`)).map(el => el.value);
}

getChecked('sType');
getChecked('sCategory');
getChecked('sTechnology');

Array.prototype.forEach.call(allCheckboxes, function(el) {
  el.addEventListener('change', toggleCheckbox);
});

function toggleCheckbox(e) {
  getChecked(e.target.name);
  setVisibility();
}

function setVisibility() {
  allFilters.forEach(el => {
    const sType = checked.sType.length ? 
      _.intersection(Array.from(el.classList), checked.sType).length : true;
    const sCategory = checked.sCategory.length ? 
      _.intersection(Array.from(el.classList), checked.sCategory).length : true;
    const sTechnology = checked.sTechnology.length ? 
      _.intersection(Array.from(el.classList), checked.sTechnology).length : true;
    
    if (sType && sCategory && sTechnology) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  });
}
