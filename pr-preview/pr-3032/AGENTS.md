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

The paths below are known generated outputs; this list may not cover every generated file. Do not hand-edit these outputs. Fix the upstream source or the workflow that produces them; manual edits may be overwritten.

| Generated paths | Source and workflow |
| --- | --- |
| `assets/images/integration/`, `integrations/data.js` | Integration data is sourced from the Meshery integrations spreadsheet and published by [`meshery-extensions/integrations-workflow`](https://github.com/meshery-extensions/integrations-workflow) using `mesheryctl registry publish website`. The nightly updater is in [`meshery/meshery`](https://github.com/meshery/meshery/blob/master/.github/workflows/integrations-updater.yml). Change the spreadsheet or publishing workflow, not these outputs. |
| `collections/_catalog/`, `catalog/` | Catalog automation in [update-catalog.yml](.github/workflows/update-catalog.yml) and [delete-catalog.yml](.github/workflows/delete-catalog.yml) publishes catalog data. If catalog content is incorrect, inspect the workflow inputs and upstream catalog owner to locate the source of truth before proposing a correction; do not edit generated files directly. |
| `_data/leaderboard.json` | [update-leaderboard.yml](.github/workflows/update-leaderboard.yml) fetches this data using `.github/scripts/fetch-leaderboard.js`. Fix the source data or fetching workflow. |
| `_data/discuss/*.json` | [discussions-data-files-update.yml](.github/workflows/discussions-data-files-update.yml) fetches the Meshery tag feed from [discuss.meshery.io](https://discuss.meshery.io/tag/meshery.json). Fix the source discussion or workflow. |

When an apparent generated path is not listed here, treat the list as incomplete: inspect its workflow and source before editing it, and confirm whether it is generated.

### Model pages

Every night, the integration publish step rewrites the entire `collections/_models/<name>/<name>.md` page, and its icons, for every model marked `publishToSites` in the Meshery integrations spreadsheet. It commits as `meshery-ci`, but only when the output changes. A page with no `meshery-ci` commits may therefore still be generated, and any manual edit to it is overwritten the next time that model changes in the spreadsheet.

- Do not hand-edit an existing model page. Correct the model in the integrations spreadsheet or the model registry. If you cannot, open an issue describing the needed change instead of editing the page.
- New custom models that are not in the spreadsheet are added through a pull request, as described in the [Meshery model contribution guide](https://github.com/meshery/meshery/blob/master/docs/content/en/project/contributing/models/contributing-models-quick-start.md).
- A custom model's downloadable package, `assets/modelsFiles/<name>.tar`, is committed by the contributor and built with `mesheryctl model build`. The publish workflow can build a missing package, but it never replaces an existing one, and every package in the repository so far was committed by hand. Do not rely on CI to create or refresh it.

## Styling and UI guidance

- [DESIGN.md](DESIGN.md) splits authority by kind of decision. For values (colors, sizes, radii, shadows, breakpoints), the Sass is authoritative; if DESIGN.md disagrees, follow the Sass and update DESIGN.md in the same PR. For usage rules with no Sass equivalent (contrast, motion, color roles, the UI change checklist), follow DESIGN.md for new work.
- Theme custom properties are defined in `_sass/rootvariables.scss`: `:root` contains the light values, and `.dark-mode` overrides theme-dependent values. Dark mode is the default; `_includes/header.html` removes the class when a saved light-mode preference is applied.
- Reuse `var(--token)` for theme-dependent styling. Do not introduce CSS variables when an existing custom property fits. See [CONTRIBUTING.md — Working with themes](CONTRIBUTING.md#working-with-themes).
- Theme-aware organization images use the `logo-dark-light` ID and `data-logo-for-dark` / `data-logo-for-light` attributes. See [CONTRIBUTING.md — Changing images according to the theme](CONTRIBUTING.md#changing-images-according-to-the-theme).
- Add a new Sass partial to `css/screen.scss` with the existing `@use` pattern so the styles are compiled.
- Preserve existing light/dark behavior and responsive patterns; check the owning partial before introducing values or selectors.

## Build and validate

- Local preview: `make site`. The Makefile uses Docker when available and running; otherwise local Ruby gems are required. See [README.md — Serve the site](README.md#3-serve-the-site).
- Site build: `bundle exec jekyll build`.
- CI deploy build: `.github/workflows/jekyll.yml` runs `JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config.ci.yml`; the workflow creates `_config.ci.yml` before the build.
- JavaScript under `js/`: run `npm test` (Node's built-in test runner, tests in `test/`) and `npm run lint` (ESLint). CI does not run these, so run them locally.
- Run the smallest relevant validation for the change and report the exact command and result. Do not claim checks that were not run.

## Pull requests and commits

- Prefix PR titles with the component in brackets, for example `[Catalog] Fix catalog filter`.
- Sign off every commit for DCO: `git commit -s -m "Describe the change"`.
- Follow the repository's [pull request template](.github/PULL_REQUEST_TEMPLATE.md).

## Repository boundaries

Meshery.io is a public-facing website, not the canonical source for product documentation, the Meshery application, catalog data, or project governance. Use [VISION.md](VISION.md#principles) and [VISION.md](VISION.md#boundaries-and-non-goals) for the full scope and decision framework.

Use code and tests to establish current behavior; use the issue or user request to establish intended behavior. For a bug fix or requested behavior change, do not preserve existing behavior merely because it is implemented. Follow [VISION.md](VISION.md) for project scope. If code, tests, docs, or requested behavior conflict and the right resolution is unclear, investigate and explain the discrepancy in the PR description rather than silently choosing a new rule.
