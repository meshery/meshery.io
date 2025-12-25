/**
 * Search logic utilities
 */

import { highlightText } from './textUtils.js';

export function performClientSearch(query, searchData) {
  if (!searchData || !query) return [];
  
  const lowerQuery = query.toLowerCase();
  const results = searchData
    .filter(post => {
      const titleMatch = post._searchTitle?.includes(lowerQuery);
      const excerptMatch = post._searchExcerpt?.includes(lowerQuery);
      const contentMatch = post._searchContent?.includes(lowerQuery);
      const categoryMatch = post._searchCategories?.some(cat => cat.includes(lowerQuery));
      const authorMatch = post._searchAuthor?.includes(lowerQuery);
      
      return titleMatch || excerptMatch || contentMatch || categoryMatch || authorMatch;
    })
    .slice(0, 20);

  results.forEach(result => {
    result._formatted = {
      title: highlightText(result.title, query),
      excerpt: highlightText(result.excerpt, query)
    };
  });

  return results;
}

export function preprocessSearchData(data) {
  return data.map(post => ({
    id: post.id,
    title: post.title,
    url: post.url,
    date: post.date,
    author: post.author,
    categories: post.categories,
    excerpt: post.excerpt,
    _searchTitle: post.title?.toLowerCase() || '',
    _searchExcerpt: post.excerpt?.toLowerCase() || '',
    _searchContent: post.content?.toLowerCase() || '',
    _searchCategories: post.categories?.map(cat => cat.toLowerCase()) || [],
    _searchAuthor: post.author?.toLowerCase() || ''
  }));
}
