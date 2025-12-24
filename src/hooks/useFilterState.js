/**
 * Filter state management hook
 */

export function createFilterState() {
  let globalTechnologyList = [];
  let globalCategoryList = [];
  let globalPatternTypeList = [];

  return {
    getTechnologyList: () => globalTechnologyList,
    getCategoryList: () => globalCategoryList,
    getPatternTypeList: () => globalPatternTypeList,
    updateTechnology: function(value) {
      if (globalTechnologyList.includes(value)) {
        globalTechnologyList = globalTechnologyList.filter(item => item !== value);
      } else {
        globalTechnologyList.push(value);
      }
    },
    updateCategory: function(value, isChecked) {
      if (isChecked) {
        globalCategoryList.push(value);
      } else {
        globalCategoryList = globalCategoryList.filter(item => item !== value);
        if (globalCategoryList.length === 0) {
          globalCategoryList = [];
        }
      }
    },
    updatePatternType: function(value) {
      if (globalPatternTypeList.includes(value)) {
        globalPatternTypeList = globalPatternTypeList.filter(item => item !== value);
      } else {
        globalPatternTypeList.push(value);
      }
    },
    reset: function() {
      globalTechnologyList = [];
      globalCategoryList = [];
      globalPatternTypeList = [];
    }
  };
}

