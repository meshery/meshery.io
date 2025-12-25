/**
 * Data fetching hook for search functionality
 */

import { preprocessSearchData } from '../utils/searchUtils.js';

let searchDataCache = null;

export async function loadSearchData() {
  if (searchDataCache) {
    return { success: true, data: searchDataCache };
  }

  try {
    const response = await fetch('/blog/search.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch search data: ${response.status} ${response.statusText}`);
    }
    
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      throw new Error('Invalid JSON format in search data');
    }
    
    searchDataCache = preprocessSearchData(data);
    return { success: true, data: searchDataCache };
  } catch (error) {
    console.error('Error loading search data:', error.message);
    return { success: false, error: error.message };
  }
}

export function getSearchData() {
  return searchDataCache;
}

