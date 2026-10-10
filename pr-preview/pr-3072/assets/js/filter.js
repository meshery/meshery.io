var allCheckboxes = document.querySelectorAll('input[type=checkbox]');
var allFilters = Array.from(document.querySelectorAll('.mesh'));
var checked = {};

getChecked('sType');
getChecked('sCategory');
getChecked('sTechnology');

Array.prototype.forEach.call(allCheckboxes, function (el) {
  el.addEventListener('change', toggleCheckbox);
});

function toggleCheckbox(e) {
  getChecked(e.target.name);
  setVisibility();
}

function getChecked(name) {
  checked[name] = Array.from(document.querySelectorAll('input[name=' + name + ']:checked')).map(function (el) {
    return el.value;
  });
}

function setVisibility() {
  allFilters.map(function (el) {
    var sType = checked.sType.length ? _.intersection(Array.from(el.classList), checked.sType).length : true;
    var sCategory = checked.sCategory.length ? _.intersection(Array.from(el.classList), checked.sCategory).length : true;
    var sTechnology = checked.sTechnology.length ? _.intersection(Array.from(el.classList), checked.sTechnology).length : true;
    if (sType && sCategory && sTechnology) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  });
}