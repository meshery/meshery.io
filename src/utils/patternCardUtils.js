/**
 * Pattern card data extraction utilities
 */

export function extractCardData(patternCards) {
  const cardType = new Set();
  const cardPatternType = new Set();
  const cardTechnology = new Set();
  const cardCompatibility = [];
  const categoryCardCount = {};
  const patternTypeCardCount = {};

  for (let i = 0; i < patternCards.length; i++) {
    const type = patternCards[i].getAttribute('type');
    const patternType = patternCards[i].getAttribute('patternType');
    const technology = patternCards[i].getAttribute('technology');

    if (type && type !== 'wasm filter') {
      const lowerCaseType = type.toLowerCase();
      cardType.add(lowerCaseType);
      categoryCardCount[lowerCaseType] = (categoryCardCount[lowerCaseType] || 0) + 1;
    }

    if (patternType) {
      const lowerCasePatternType = patternType.toLowerCase();
      cardPatternType.add(lowerCasePatternType);
      patternTypeCardCount[lowerCasePatternType] = (patternTypeCardCount[lowerCasePatternType] || 0) + 1;
    }

    if (technology) {
      try {
        const techArray = JSON.parse(technology);
        for (let j = 0; j < techArray.length; j++) {
          cardTechnology.add(techArray[j]);
          cardCompatibility.push(techArray[j]);
        }
      } catch (e) {
        console.warn('Failed to parse technology attribute:', e);
      }
    }
  }

  return {
    cardType: Array.from(cardType),
    cardPatternType: Array.from(cardPatternType),
    cardTechnology: Array.from(cardTechnology),
    cardCompatibility,
    categoryCardCount,
    patternTypeCardCount
  };
}

export function matchCardAgainstFilters(card, technologyList, categoryList, patternTypeList) {
  const type = card.getAttribute('type')?.toLowerCase();
  const technologyAttr = card.getAttribute('technology');
  const patternType = card.getAttribute('patternType')?.toLowerCase();

  let technologies = [];
  if (technologyAttr) {
    try {
      technologies = JSON.parse(technologyAttr);
    } catch (e) {
      console.warn('Failed to parse technology attribute:', e);
    }
  }

  const showCardTech = technologyList.length === 0 ||
                      technologyList.some(tech => technologies.includes(tech));

  const showCardCat = categoryList.length === 0 ||
                     categoryList.some(cat => type?.includes(cat));

  const showCardPatternType = patternTypeList.length === 0 ||
                             patternTypeList.some(pt => patternType?.includes(pt));

  return showCardTech && showCardCat && showCardPatternType;
}

