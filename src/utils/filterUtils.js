/**
 * Filter processing utilities
 */

export function categorizeFilters(filters, categories, compatibility, technology) {
  const categoryData = [];
  const compData = [];
  const techData = [];

  filters.forEach((x) => {
    if (categories.includes(x)) {
      categoryData.push(x);
    }
    if (compatibility.includes(x)) {
      compData.push(x);
    }
    if (technology.includes(x)) {
      techData.push(x);
    }
  });

  return { categoryData, compData, techData };
}

export function filterByCategory(allPatterns, categoryData) {
  if (categoryData.length === 0) return allPatterns;
  
  const filtered = [];
  allPatterns.forEach((pattern) => {
    categoryData.forEach((category) => {
      if (pattern.filters?.type === category) {
        filtered.push(pattern);
      }
    });
  });
  return filtered;
}

export function filterByCompatibility(allPatterns, compData) {
  if (compData.length === 0) return allPatterns;
  
  const filtered = [];
  allPatterns.forEach((pattern) => {
    compData.forEach((compatibility) => {
      const patternCompat = pattern.filters?.compatibility || [];
      for (let i = 0; i < patternCompat.length; i++) {
        if (patternCompat[i] === compatibility) {
          filtered.push(pattern);
          break;
        }
      }
    });
  });
  return filtered;
}

export function filterByTechnology(allPatterns, techData) {
  if (techData.length === 0) return allPatterns;
  
  const filtered = [];
  allPatterns.forEach((pattern) => {
    techData.forEach((tech) => {
      if (pattern.filters?.technology === tech) {
        filtered.push(pattern);
      }
    });
  });
  return filtered;
}

export function intersectFilters(...filterArrays) {
  return filterArrays.reduce((a, b) => a.filter(c => b.includes(c)));
}

export function compareByName(a, b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  if (nameA > nameB) return 1;
  if (nameA < nameB) return -1;
  return 0;
}

