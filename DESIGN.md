---
version: alpha
name: Meshery.io
description: Meshery.io is the website for Meshery, an open-source, CNCF project that provides a self-service engineering platform for designing, managing, and operating cloud-native infrastructure and applications.

colors:
  brand-color-primary: '#00D3A9'
  brand-color-secondary: '#00B39F'
  brand-color-secondary-50: 'rgba(0, 179, 159, 0.5)'
  brand-color-tertiary: '#477E96'
  color-white: '#FFFFFF'

  color-primary-light: '#FFFFFF'
  color-primary-light-dark: '#D9E0E2'
  color-primary-medium-dark: '#FFFFFF'
  color-primary-medium: '#F8F9FA'
  color-primary-dark: '#F1F3F5'
  color-primary-extra-dark: '#B2B6BD'
  color-primary-super-dark: '#818C9A'

  color-secondary-light: '#495057'
  color-secondary-light-two: 'rgb(243, 255, 253)'
  color-secondary-medium: '#343A40'
  color-secondary-dark: '#212529'
  color-grey-light: '#868E96'

  color-primary-light-tbase: '#ECF0F3'
  color-primary-qmeta: '#777777'
  color-primary-qtext: 'rgb(0, 0, 0)'
  color-primary-testimonial-wrapper: 'rgb(250, 250, 250)'
  text-color-primary-fixed: 'rgb(0, 0, 0)'

  link-hover-color: '#00B39F'

  background-nav-fixed: '#E7EFF333'
  color-nav-fixed: '#000000'

  action-color-dark: '#EBC017'
  action-color-dark-hover: '#C09E0F'
  action-color-light: '#FFF3C5'

  color-summary-background: '#BAC1C8'
  color-summary-background-hover: '#8F949A'
  color-details-background: '#D3D8DD'
  color-components-background: '#F9F9F9'
  scrollbar-color: '#00B39F'

dark-mode:
  color-primary-light: '#212529'
  color-primary-light-dark: '#202020'
  color-primary-medium-dark: '#464D53'
  color-primary-medium: '#343A40'
  color-primary-dark: '#495057'
  color-primary-extra-dark: '#6C747E'
  color-primary-super-dark: '#818C9A'

  color-secondary-light: '#FFFFFF'
  color-secondary-light-two: 'rgba(0, 179, 159, 0.4)'
  color-secondary-medium: '#F1F3F5'
  color-secondary-dark: '#F1F3F5'
  color-grey-light: '#CED4DA'

  color-primary-light-tbase: '#212121'
  color-primary-qmeta: '#EEEEEE'
  color-primary-qtext: 'rgb(255, 255, 255)'
  color-primary-testimonial-wrapper: 'rgb(0, 0, 0)'

  background-nav-fixed: '#15272F80'
  color-nav-fixed: '#FFFFFF'

  color-summary-background: '#333333'
  color-summary-background-hover: '#666666'
  color-details-background: '#282828'
  color-components-background: '#202020'
  background-light-cards: 'linear-gradient(to right top, #3D3D3D, #343434, #2B2B2B, #222222, #1A1A1A, #181818, #161616, #141414, #181818, #1C1C1C, #212121, #252525)'
  scrollbar-color: '#00D3A9'

dark-mode-gradients:
  background-light: 'linear-gradient(to right top, #3D3D3D, #343434, #2B2B2B, #222222, #1A1A1A, #181818, #161616, #141414, #181818, #1C1C1C, #212121, #252525)'
  background-grey: 'linear-gradient(to right top, #868E96, #767E86, #676E76, #585F66, #495057)'
  background-grey-secondary: 'linear-gradient(to right bottom, #DEE2E6, #D2D7DC, #C5CBD1, #B9C0C7, #ADB5BD)'
  background-nav-dropdown: 'linear-gradient(to right top, #3D3D3D, #343434, #2B2B2B, #222222, #1A1A1A)'

typography:
  headingPrimary:
    fontFamily: '"Qanelas Soft", "Open Sans", sans-serif'
    fontSize: '2.3em'
    fontWeight: 300
    lineHeight: '1.2'
    letterSpacing: 'normal'

  headingSecondary:
    fontFamily: '"Qanelas Soft", "Open Sans", sans-serif'
    fontSize: '2.2em'
    fontWeight: 300
    lineHeight: '1.2'
    letterSpacing: 'normal'

  headingTertiary:
    fontFamily: '"Qanelas Soft", "Open Sans", sans-serif'
    fontSize: '2rem'
    fontWeight: 400
    lineHeight: '1.2'
    letterSpacing: 'normal'

  bodyCopy:
    fontFamily: '"Qanelas Soft", "Open Sans", sans-serif'
    fontSize: '1.38em'
    fontWeight: 400
    lineHeight: '1.4em'
    letterSpacing: 'normal'

  strongHeading:
    fontFamily: '"Qanelas Soft", "Open Sans", sans-serif'
    fontWeight: 700
    lineHeight: '1.2'
    letterSpacing: 'normal'

  metadata:
    fontFamily: '"Qanelas Soft", "Open Sans", sans-serif'
    fontSize: '0.75rem'
    fontWeight: 400
    lineHeight: '1.5rem'
    letterSpacing: 'normal'

  codeInline:
    fontFamily: '"Courier New", Courier, monospace'
    fontSize: '1.1em'
    fontWeight: 400
    lineHeight: '1.5em'
    letterSpacing: 'normal'

rounded:
  xs: 3px
  sm: 5px
  md: 7px
  lg: 8px
  xl: 15px
  xxl: 20px
  full: 999px

spacing:
  base: 8px
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 32px
  xxxl: 40px

shadows:
  box-shadow-primary: 'var(--box-shadow-primary)'
  box-shadow-primary-quotes: 'var(--box-shadow-primary-quotes)'
  integrations-box-shadow: 'var(--integrations-box-shadow)'

gradients:
  background-primary: 'var(--background-primary)'
  background-primary-2: 'var(--background-primary-2)'
  background-light: 'var(--background-light)'
  background-light-cards: 'var(--background-light-cards)'
  background-grey: 'var(--background-grey)'
  background-grey-secondary: 'var(--background-grey-secondary)'
  background-nav-dropdown: 'var(--background-nav-dropdown)'

filters:
  image-color: 'var(--image-color)'
  image-filter-light: 'var(--image-filter-light)'
  image-filter-dark: 'var(--image-filter-dark)'
  logo-filter: 'var(--logo-filter)'

backgrounds:
  integrations-bg: 'var(--integrations-bg)'
  integrations-3d-bg: 'var(--integrations-3d-bg)'
  background-image-light: 'var(--background-image-light)'

components:
  primary-button:
    selector: '.button a, input[type=submit]'
    source: '_sass/forms.scss'
    backgroundColor: 'var(--brand-color-primary)'
    hoverBackgroundColor: 'var(--brand-color-secondary)'
    textColor: '#fff'
    rounded: 7px
    padding: '10px 30px'

  outlined-action:
    selector: '.button.alt a'
    source: '_sass/forms.scss'
    backgroundColor: 'rgba(255, 255, 255, 0.15)'
    border: '1px solid rgba(255, 255, 255, 0.3)'
    rounded: 3px
    padding: '16px 50px'

  cta-link:
    selector: '.button-para .link'
    source: '_sass/forms.scss'
    backgroundColor: '#00B39F'
    textColor: '#fff'
    rounded: 7px
    padding: '.5rem'
---

# Meshery Design System

## Overview

Meshery.io is a Jekyll-based site for engineers, operators, contributors, and the wider cloud-native community. Its visual system is content-led and Sass-driven: neutral surfaces establish structure, Qanelas Soft carries the voice, and teal and saffron provide focused emphasis.

The front matter is a human-readable reference, not a source file consumed by the site. Implemented Sass is authoritative: use `_sass/rootvariables.scss` for CSS custom properties, `_sass/variables.scss` for shared Sass variables, and component partials for actual selector behavior. This document summarizes those sources and calls out where the implementation is inconsistent.

### How theming works

The values in the front matter's `colors` and `gradients` sections describe the default values declared in `:root`; they are not necessarily the initial appearance. `_includes/header.html` renders the body with `.dark-mode` by default and removes that class when the saved preference is `light-mode`. `_sass/rootvariables.scss` then overrides theme-dependent custom properties under `.dark-mode`. Use the CSS custom properties in component styles rather than copying a value from this reference, especially for surfaces, shadows, and image filters.

### Design character

- technical and readable rather than glossy
- open-source and welcoming without becoming playful
- editorial enough for blogs and community content
- structured enough for catalogs, tables, forms, and documentation
- consistent across light mode, dark mode, and responsive layouts

## Color and surface usage

Use the brand teal values for primary interaction and for links or selected controls where the existing component uses them. Use saffron for action emphasis and classification, not as a replacement for the primary teal action.

Neutral values carry most of the interface. Light mode uses white, off-white, and cool gray surfaces. Dark mode uses charcoal and blue-gray layers with white or pale gray text. The `background-*` custom properties are established project treatments for page chrome and panels; they should not be added merely as decoration.

The Sass does not define a complete semantic status-color palette. Do not infer status tokens from colors that happen to be used by individual components. Avoid teal, saffron, or red as general-purpose text colors when neutral text is sufficient, and preserve contrast between the surface and content first.

The shipped primary button uses white text on `var(--brand-color-primary)` (`#00D3A9`), which does not provide sufficient contrast for normal-sized text. Treat that as a known accessibility gap, not as evidence that white-on-teal is a recommended text pairing. Saffron (`#EBC017`) also needs dark foreground text when used as a button background.

## Typography

Qanelas Soft is the primary typeface for headings and body copy. Form controls (`textarea`, `input`, `button`, and `select`) use Open Sans in `_sass/forms.scss`. Inline code uses `'Courier New', Courier, monospace` in `_sass/layout.scss`. The loaded Qanelas Soft weights range from thin through black, but the existing site primarily uses light headings, regular body copy, and bold emphasis.

The `typography` reference describes common implemented sizes and hierarchy; consult the owning Sass selector for exact page-specific behavior:

- Major headings use `2.3em` and `2.2em` at weight `300`.
- Tertiary headings use `2rem` at weight `400`.
- Paragraphs use `1.38em` with `1.4em` line height.
- Metadata commonly uses `0.75rem` with a `1.5rem` line height. Inline code uses `1.1em` with `1.5em` line height.

Keep the type hierarchy stable across content types. Do not introduce a second display face, excessive tracking, or a dense dashboard type scale for isolated components.

## Layout and spacing

Meshery.io uses a practical 8px-based rhythm, with 4px, 8px, 12px, 16px, 20px, 24px, 32px, and 40px appearing throughout the Sass. The token names describe increasing scale, but component source remains authoritative when a legacy or page-specific value is required.

### Containers and grids

- `.container` is constrained to `1140px` on wide layouts.
- `.text-container` is constrained to `750px` for readable text blocks.
- Text containers use `1.5rem` horizontal padding.
- Catalog, blog, and program surfaces may use their own grid and spacing rules; preserve their local density when extending them.

### Whitespace

Use whitespace to separate content groups and establish reading order. Avoid adding large marketing-style gaps to dense catalog, table, or form surfaces. Prefer the smallest token that clearly separates adjacent controls, then move to 24px, 32px, or 40px for section-level separation.

## Elevation and depth

Meshery separates surfaces primarily through color, borders, gradients, and restrained shadows. The shadow values come from CSS custom properties and should be used according to context. The primary and quote shadow properties change under `.dark-mode`; integrations have one property that is also theme-dependent.

- `--box-shadow-primary` supports raised content surfaces
- `--box-shadow-primary-quotes` supports testimonial treatments
- `--integrations-box-shadow` supports integration surfaces
- gradients provide structural framing for navigation, headers, and panels

Do not layer multiple strong shadows on ordinary cards. A card should first be understandable through its surface, border, spacing, and type.

## Shapes

The project uses measured rounding rather than one universal radius:

- `3px` to `5px` for controls, links, and small details
- `7px` to `8px` for buttons, inputs, modals, and compact UI
- `15px` to `20px` for catalog cards and larger panels
- `999px` for fully rounded filter pills in the current filter implementation
- `50%` remains appropriate for avatars and circular icons where the component requires it

These are observed values, not centralized radius tokens. A `999px` radius appears on filter pills; do not assume that every badge or pill shares that treatment. Use larger radii for catalog, feature, and independently framed surfaces, and keep utility controls modestly rounded so tables, forms, and navigation remain crisp.

## Components

The component entries in the front matter identify existing selectors and their source; they are not framework components or generated design tokens. Prefer the closest existing selector when implementing a similar role.

### Buttons and actions

The `.button a, input[type=submit]` selector uses `var(--brand-color-primary)`, white text, `7px` rounding, and `10px 30px` padding; its hover background uses `var(--brand-color-secondary)`. This shipped white-on-teal pairing has a contrast gap (see above). The `.button.alt a` action is translucent white with a `1px` translucent border, `3px` rounding, and `16px 50px` padding. The `.button-para .link` CTA uses a hard-coded teal background, white text, `7px` rounding, and `.5rem` padding. Saffron is an action color, not a documented shared secondary-button variant; use dark text on saffron backgrounds.

Secondary actions may use the transparent white treatment and `1px` translucent border documented in the token layer. The outlined action uses `3px` rounding and `16px 50px` padding; check the owning Sass before documenting catalog-action values.

### Cards, panels, and catalog surfaces

Card surfaces and padding vary by page. Catalog components commonly use `15px` rounding, but check the component Sass before assuming that a card has a particular surface, radius, padding, or shadow.

Floating panels and modals do not share a documented universal gradient, radius, or padding. Follow their existing component styles and use theme-aware surface variables where available.

### Forms and inputs

Inputs and textareas are full-width and use `10px` padding in `_sass/forms.scss`; the global form-control font is Open Sans. Border radius and dimensions vary by component, so do not assume a universal `8px` radius or `14px 22px` padding. Preserve visible labels, focus treatment, and enough padding for touch interaction.

Checkboxes and compact controls use small radii. Do not turn utility fields into pills.

### Navigation, modals, and tables

Navigation layout and spacing are owned by `_sass/navigation.scss` and `_sass/header.scss`. Preserve the existing mobile collapse behavior instead of adding a second navigation pattern.

Modal styles are component-specific; there is no documented shared gradient header treatment. Table headers should remain neutral and readable; color should support scanning rather than replace row structure.

### Badges and classification

Badge styling is not represented by a consistent set of named variants in the shared design reference. Check the owning component before reusing a badge's color, padding, or radius; do not create badge colors solely to decorate a card.

## Motion and interaction

Existing transitions commonly use `.2s`, `.3s`, or `.4s`, but there is no centralized motion-token contract. Use motion for feedback, avoid layout shifts, and ensure new animations respect `prefers-reduced-motion`.

- Keep hover movement small and avoid layout shifts.
- Make focus states visible without relying on hover.
- Respect `prefers-reduced-motion` when introducing new animation; do not assume all existing components already do so.
- Do not animate content simply to make a static page feel active.

## Accessibility

Accessibility is part of the visual system, not a later layer.

- Maintain readable contrast in both theme modes.
- Never communicate status with color alone; pair it with text, icons, or shape.
- Keep interactive controls large enough for touch use.
- Preserve visible keyboard focus.
- Keep headings, landmarks, labels, and link text semantically meaningful.
- Test long labels and translated or user-generated content without allowing layout overlap.

## Responsive behavior

The site uses responsive Sass media queries rather than a single application breakpoint. Layouts should progressively reduce columns, wrap navigation, and preserve content order as the viewport narrows.

- Shared Sass breakpoint variables are `$mobile` (max-width `420px`), `$tablet` (min-width `450px`), `$mid-point` (min-width `620px`), and `$desktop` (min-width `768px`) in `_sass/variables.scss`.
- These variables are not a complete site-wide contract: many legacy partials still use literal media-query widths. Check nearby styles before choosing a breakpoint.
- Keep the `1140px` container constraint on wide screens.
- Reduce horizontal padding before reducing readable type size.
- Stack cards, catalog controls, and multi-column sections when their content becomes cramped.
- Preserve the hierarchy of headings, metadata, and actions on mobile.
- Keep buttons and form fields usable without requiring precision tapping.

## Do and do not

### Do

- Check the Sass source for an existing custom property, variable, or component value before adding a new value.
- Prefer existing Sass variables and selectors in `_sass/`.
- Use teal for primary interaction and saffron for deliberate action emphasis.
- Let typography, spacing, and neutral surfaces create hierarchy.
- Keep catalog and editorial surfaces related while respecting their different densities.
- Add a documented component variant when a pattern recurs.

### Do not

- Do not introduce generic placeholder tokens that are not defined in this file.
- Do not replace project colors with a new framework palette.
- Do not make every component pill-shaped or heavily rounded.
- Do not use gradients or shadows on every surface.
- Do not treat dark mode as a simple color inversion.
- Do not make content-heavy pages behave like marketing hero pages.

## Implementation guidance

This repository is a Jekyll site with layouts, Liquid includes, and Sass partials. `css/screen.scss` is the main Sass entry point; a Sass partial must be included there with `@use "<partial>" as *;` to be compiled into the site stylesheet. Apply design changes in the smallest owning layer:

- shared CSS custom properties and theme overrides belong in `_sass/rootvariables.scss`
- shared Sass variables belong in `_sass/variables.scss`; its current z-index variables are `$z-index-nav: 1000` and `$z-index-header: 2001`
- shared type and element behavior belongs in `_sass/elements.scss` and `_sass/fonts.scss`
- global containers and structural layout belong in `_sass/layout.scss`
- component-specific behavior belongs in the nearest Sass partial or shared include
- this document should describe stable implemented behavior, not aspirational values

Before documenting a new token, search `_sass/`, `_includes/`, and the relevant layout for an existing value. If the implementation is inconsistent, document the dominant pattern and name the exception rather than hiding the inconsistency.

### Selector-to-role reference

| Role | Existing selector | Source |
| --- | --- | --- |
| Primary button | `.button a, input[type=submit]` | `_sass/forms.scss` |
| Outlined action | `.button.alt a` | `_sass/forms.scss` |
| CTA link | `.button-para .link` | `_sass/forms.scss` |
| Main content container | `.container` | `_sass/layout.scss` |
| Readable text container | `.text-container` | `_sass/layout.scss` |
| Heading and body typography | `h1`–`h6`, `p` | `_sass/elements.scss` |

## Known gaps

- This front matter is documentation metadata, not a generated or enforced token system. Sass remains authoritative.
- The project has many page-specific spacing, radius, and color values; the shared variables do not replace component Sass.
- Some components use hard-coded colors while others use CSS custom properties; new work should prefer theme-aware shared properties.
- Badge variants and status colors are not consistently represented by shared named selectors or tokens.
- Responsive behavior is distributed across Sass partials, and many media queries do not use the shared breakpoint variables.
- White text on the primary teal button and saffron action backgrounds needs a contrast review.

## Final intent

Meshery.io should feel like a credible cloud-native project site built for real technical reading and real community work: calm neutral surfaces, expressive but controlled teal and saffron accents, Qanelas Soft typography, measured depth, and layouts that stay useful as content grows.