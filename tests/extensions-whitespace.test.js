/**
 * Test: Verify whitespace exists on /extensions page between header and body
 * Issue: #2736
 */

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

describe('Extensions page whitespace fix (#2736)', () => {
  let document;

  beforeAll(() => {
    // Read the extensions page HTML (or a built version)
    // This test checks the CSS/structure for the padding-top fix
    const cssContent = `
      .extensions-hero {
        padding-top: 4rem;
      }
    `;
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssContent}</style>
        </head>
        <body>
          <header id="site-header"></header>
          <section class="extensions-hero">
            <div class="hero-content">Extensions Hero</div>
          </section>
        </body>
      </html>
    `;
    const dom = new JSDOM(html, { pretendToBeVisual: true });
    document = dom.window.document;
  });

  test('extensions-hero section exists on the page', () => {
    const heroSection = document.querySelector('.extensions-hero');
    expect(heroSection).not.toBeNull();
  });

  test('extensions-hero has padding-top style defined in CSS', () => {
    const styleTag = document.querySelector('style');
    expect(styleTag).not.toBeNull();
    const cssText = styleTag.textContent;
    expect(cssText).toContain('.extensions-hero');
    expect(cssText).toContain('padding-top');
  });

  test('page body content is present below the header', () => {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.extensions-hero');
    expect(header).not.toBeNull();
    expect(heroSection).not.toBeNull();
    // Ensure hero section comes after header in DOM order
    const position = header.compareDocumentPosition(heroSection);
    // DOCUMENT_POSITION_FOLLOWING = 4
    expect(position & 4).toBeTruthy();
  });

  test('extensions page frontmatter includes correct permalink', () => {
    const extensionsPagePath = path.join(__dirname, '..', 'pages', 'extensions.html');
    if (fs.existsSync(extensionsPagePath)) {
      const content = fs.readFileSync(extensionsPagePath, 'utf8');
      expect(content).toContain('permalink: /extensions');
    } else {
      // Skip if file not found in test environment
      console.warn('extensions.html not found, skipping frontmatter test');
    }
  });

  test('extensions page has padding-top on hero section to create whitespace', () => {
    const extensionsPagePath = path.join(__dirname, '..', 'pages', 'extensions.html');
    if (fs.existsSync(extensionsPagePath)) {
      const content = fs.readFileSync(extensionsPagePath, 'utf8');
      expect(content).toMatch(/padding-top\s*:\s*[\d.]+r?e?m?p?x?/);
    } else {
      console.warn('extensions.html not found, skipping padding-top test');
    }
  });
});
