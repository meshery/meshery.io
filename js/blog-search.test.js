const {
  slugify,
  escapeRegex,
  highlightText,
  debounce,
  performClientSearch
} = require('./blog-search');

// Testing slugify
describe('slugify', () => {
  test('converts spaces to hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });
  test('converts to lowercase', () => {
    expect(slugify('HELLO')).toBe('hello');
  });
  test('removes special characters', () => {
    expect(slugify('hello@world!')).toBe('helloworld');
  });
  test('handles multiple spaces', () => {
    expect(slugify('hello   world')).toBe('hello-world');
  });
});

// Testing escapeRegex
describe('escapeRegex', () => {
  test('escapes special regex characters', () => {
    expect(escapeRegex('hello.world')).toBe('hello\\.world');
  });
  test('escapes asterisk', () => {
    expect(escapeRegex('hello*world')).toBe('hello\\*world');
  });
  test('returns normal string unchanged', () => {
    expect(escapeRegex('helloworld')).toBe('helloworld');
  });
});

// Testing the highlightText function
describe('highlightText', () => {
  test('wraps matching text in mark tag', () => {
    expect(highlightText('hello world', 'world'))
      .toBe('hello <mark class="search-highlight">world</mark>');
  });
  test('returns empty string if no text', () => {
    expect(highlightText('', 'world')).toBe('');
  });
  test('is case insensitive', () => {
    expect(highlightText('Hello World', 'hello'))
      .toBe('<mark class="search-highlight">Hello</mark> World');
  });
});

//  debounce Testing
describe('debounce', () => {
  test('calls function after delay', (done) => {
    let called = false;
    const debounced = debounce(() => { called = true; }, 100);
    debounced();
    expect(called).toBe(false);
    setTimeout(() => {
      expect(called).toBe(true);
      done();
    }, 150);
  });
});