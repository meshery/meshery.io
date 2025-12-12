# Meshery Blog Search with Meilisearch

This implementation adds search functionality to the Meshery blog using Meilisearch.

## Components

### 1. JSON Feed (`/blog/search.json`)
A Jekyll-generated JSON file containing all blog posts with their metadata. This file is used to index the blog content in Meilisearch.

### 2. Search JavaScript (`/js/blog-search.js`)
Client-side JavaScript that:
- Connects to the Meilisearch instance
- Handles search queries with debouncing
- Displays search results with highlighted matches
- Manages UI state (showing/hiding results)

### 3. Blog Page Updates (`/blog/index.html`)
Enhanced blog page with:
- Search input field
- Clear button
- Search results container
- Responsive styling

## Meilisearch Server Setup

### Prerequisites
- A Meilisearch server instance (self-hosted or cloud)
- Administrative access to create and manage indexes

### Installation Options

#### Option 1: Cloud (Meilisearch Cloud)
1. Sign up at https://cloud.meilisearch.com
2. Create a new project
3. Note the host URL and API keys

#### Option 2: Self-Hosted with Docker
```bash
docker run -d \
  --name meilisearch \
  -p 7700:7700 \
  -e MEILI_MASTER_KEY=YOUR_MASTER_KEY \
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:v1.5
```

#### Option 3: Self-Hosted Binary
Download from https://github.com/meilisearch/meilisearch/releases

### Indexing Blog Posts

1. **Create the index:**
```bash
curl -X POST 'http://localhost:7700/indexes' \
  -H 'Authorization: Bearer YOUR_MASTER_KEY' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "uid": "blog_posts",
    "primaryKey": "id"
  }'
```

2. **Configure searchable attributes:**
```bash
curl -X PUT 'http://localhost:7700/indexes/blog_posts/settings/searchable-attributes' \
  -H 'Authorization: Bearer YOUR_MASTER_KEY' \
  -H 'Content-Type: application/json' \
  --data-binary '[
    "title",
    "content",
    "excerpt",
    "categories",
    "author"
  ]'
```

3. **Configure ranking rules:**
```bash
curl -X PUT 'http://localhost:7700/indexes/blog_posts/settings/ranking-rules' \
  -H 'Authorization: Bearer YOUR_MASTER_KEY' \
  -H 'Content-Type: application/json' \
  --data-binary '[
    "words",
    "typo",
    "proximity",
    "attribute",
    "sort",
    "exactness",
    "date:desc"
  ]'
```

4. **Index the blog posts:**
```bash
curl -X POST 'http://localhost:7700/indexes/blog_posts/documents' \
  -H 'Authorization: Bearer YOUR_MASTER_KEY' \
  -H 'Content-Type: application/json' \
  --data-binary @blog/search.json
```

### Updating Configuration

Update the Meilisearch configuration in `/blog/index.html`:

```javascript
window.MEILISEARCH_CONFIG = {
  host: 'https://your-meilisearch-host.com', // Your Meilisearch server URL
  apiKey: 'your-public-search-key',          // Public search-only API key
  index: 'blog_posts'
};
```

### Creating API Keys

Generate a public search-only API key:

```bash
curl -X POST 'http://localhost:7700/keys' \
  -H 'Authorization: Bearer YOUR_MASTER_KEY' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "description": "Public search key for blog",
    "actions": ["search"],
    "indexes": ["blog_posts"],
    "expiresAt": null
  }'
```

## Automated Indexing

### GitHub Actions Workflow

Create `.github/workflows/update-search-index.yml`:

```yaml
name: Update Meilisearch Index

on:
  push:
    branches: [master, main]
    paths:
      - 'collections/_posts/**'
  workflow_dispatch:

jobs:
  update-index:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2.2'
          bundler-cache: true
      
      - name: Build Jekyll site
        run: |
          bundle install
          bundle exec jekyll build
      
      - name: Update Meilisearch Index
        env:
          MEILI_HOST: ${{ secrets.MEILISEARCH_HOST }}
          MEILI_MASTER_KEY: ${{ secrets.MEILISEARCH_MASTER_KEY }}
        run: |
          curl -X POST "${MEILI_HOST}/indexes/blog_posts/documents" \
            -H "Authorization: Bearer ${MEILI_MASTER_KEY}" \
            -H "Content-Type: application/json" \
            --data-binary @_site/blog/search.json
```

### Required GitHub Secrets

Add these secrets to your GitHub repository:
- `MEILISEARCH_HOST`: Your Meilisearch server URL
- `MEILISEARCH_MASTER_KEY`: Your Meilisearch master key

## Features

- **Real-time search**: Results appear as you type (with debouncing)
- **Highlighted matches**: Search terms are highlighted in results
- **Excerpt cropping**: Long content is truncated with relevant context
- **Responsive design**: Works on mobile and desktop
- **Clear functionality**: Easy to clear search and return to normal view
- **Pagination preserved**: Original pagination works when not searching

## Browser Support

- Modern browsers with ES6+ support
- Requires JavaScript enabled

## Performance

- Search queries are debounced (300ms) to reduce server load
- Results limited to 20 items
- Meilisearch provides sub-50ms search response times

## Troubleshooting

### Search not working
1. Check browser console for errors
2. Verify Meilisearch host is accessible
3. Confirm API key has search permissions
4. Ensure index is created and populated

### No results found
1. Verify blog posts are indexed
2. Check searchable attributes configuration
3. Test search directly on Meilisearch dashboard

### CORS errors
Configure CORS on your Meilisearch server to allow requests from meshery.io

## Resources

- [Meilisearch Documentation](https://www.meilisearch.com/docs)
- [Meilisearch JavaScript Client](https://github.com/meilisearch/meilisearch-js)
- [Meilisearch Cloud](https://cloud.meilisearch.com)
