# AGENTS.md — Meshery.io guide for AI agents

Use this guide to find the repository-specific source, workflow, or command for a change. Read the owning implementation and documentation before editing, reuse nearby patterns, and keep changes focused.

## Documentation map

| Need | Start here |
| --- | --- |
| Project purpose, scope, and content boundaries | [VISION.md](VISION.md) — especially Principles and Boundaries and Non-Goals |
| Site setup and local preview | [README.md](README.md) |
| Contribution and theme instructions | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Design-system guidance | [DESIGN.md](DESIGN.md) |
| Security, conduct, governance, or maintainership | [SECURITY.md](SECURITY.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), [GOVERNANCE.md](GOVERNANCE.md), or [MAINTAINERS.md](MAINTAINERS.md) |

Link to these sources rather than duplicating guidance that already belongs there.

## Repository map

| Content or implementation | Common location |
| --- | --- |
| Collection content | `collections/_*` |
| Page templates and shared markup | `_layouts/`, `_includes/` |
| Sass styles | `_sass/`; main entry point: `css/screen.scss` |
| Site data | `_data/` |
| Build and automation workflows | `.github/workflows/` |

Prefer changing the narrowest correct source layer. New Sass partials must be included from `css/screen.scss` to be compiled.

## Generated content

Do not hand-edit generated outputs listed below. Fix the upstream source or the workflow that produces them; manual edits may be overwritten.

| Generated paths | Source and workflow |
| --- | --- |
| `collections/_models/`, `assets/images/integration/`, `integrations/data.js`, `assets/modelsFiles/*.tar` | Integration content is sourced from the Meshery integrations spreadsheet and published by [`meshery-extensions/integrations-workflow`](https://github.com/meshery-extensions/integrations-workflow) using `mesheryctl registry publish website`. The nightly updater is in [`meshery/meshery`](https://github.com/meshery/meshery/blob/master/.github/workflows/integrations-updater.yml). Change the spreadsheet or upstream publishing workflow, not these outputs. |
| `collections/_catalog/`, `catalog/` | Catalog automation in [update-catalog.yml](.github/workflows/update-catalog.yml) and [delete-catalog.yml](.github/workflows/delete-catalog.yml) publishes catalog data. Correct the catalog entry at its source or change the responsible workflow, not the generated files. |
| `_data/leaderboard.json` | [update-leaderboard.yml](.github/workflows/update-leaderboard.yml) fetches this data using `.github/scripts/fetch-leaderboard.js`. Fix the source data or fetching workflow. |
| `_data/discuss/*.json` | [discussions-data-files-update.yml](.github/workflows/discussions-data-files-update.yml) fetches the Meshery tag feed from [discuss.meshery.io](https://discuss.meshery.io/tag/meshery.json). Fix the source discussion or workflow. |

When an apparent generated path is not listed here, inspect its workflow and source before editing it.

## Styling and UI guidance

- Sass is authoritative for implemented values and behavior. [DESIGN.md](DESIGN.md) explains how to apply the design system; if it disagrees with Sass, follow the Sass and mention the documentation mismatch in the PR.
- Theme custom properties are defined in `_sass/rootvariables.scss`: `:root` contains the light values, and `.dark-mode` overrides theme-dependent values. The site starts in dark mode; `_includes/header.html` removes the class when the saved preference is light mode.
- Reuse `var(--token)` for theme-dependent styling. Do not introduce CSS variables when an existing token fits. See [CONTRIBUTING.md — Working with themes](CONTRIBUTING.md#working-with-themes).
- Theme-aware organization images use the `logo-dark-light` ID and `data-logo-for-dark` / `data-logo-for-light` attributes. See [CONTRIBUTING.md — Changing images according to the theme](CONTRIBUTING.md#changing-images-according-to-the-theme).
- Add a new Sass partial to `css/screen.scss` with the existing `@use` pattern so the styles are compiled.
- Preserve existing light/dark behavior and responsive patterns; check the owning partial before introducing values or selectors.

## Build and validate

- Local preview: `make site`. The Makefile uses Docker when available and running; otherwise local Ruby gems are required. See [README.md — Serve the site](README.md#3-serve-the-site).
- Site build: `bundle exec jekyll build`.
- CI deploy build: `.github/workflows/jekyll.yml` runs `JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config.ci.yml`; the workflow creates `_config.ci.yml` before the build.
- Run the smallest relevant validation for the change and report the exact command and result. Do not claim checks that were not run.

## Pull requests and commits

- Prefix PR titles with the component in brackets, for example `[Catalog] Fix catalog filter`.
- Sign off every commit for DCO: `git commit -s -m "Describe the change"`.
- Follow the repository's [pull request template](.github/PULL_REQUEST_TEMPLATE.md).

## Repository boundaries

Meshery.io is a public-facing website, not the canonical source for product documentation, the Meshery application, catalog data, or project governance. Use [VISION.md](VISION.md#principles) and [VISION.md](VISION.md#boundaries-and-non-goals) for the full scope and decision framework.

When guidance conflicts, current behavior is defined by the code and project scope by [VISION.md](VISION.md). Follow the code for behavior and mention a documentation mismatch in the PR description.
