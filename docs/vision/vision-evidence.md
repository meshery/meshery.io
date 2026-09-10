# Meshery.io vision evidence sheet

This sheet gives claim-by-claim traceability for every sentence in `VISION.md`. Each citation was resolved against `upstream/master` during authoring, and re-resolved on 2026-09-10 after review. Claims whose citations did not resolve, or which the citation did not actually support, were removed or narrowed rather than reworded; see the notes at the end.

Counts drift. Where a count is cited it carries an as-of date, and re-verifying it is part of any future revision.

---

## Identity and purpose

* **Claim**: "Meshery.io exists so that people evaluating, adopting, or contributing to Meshery can find what the project is, what it integrates with, and how to join it, without reading source code."
  * **Evidence**: `README.md` ("What is Meshery?"); `index.md` frontmatter (`layout: home`, title "Meshery | The Kubernetes and Cloud Native Manager"); the top-level `install/` and `integrations/` sections of the site.

* **Claim**: "It serves platform engineers and SREs assessing Meshery alongside the contributors and community programs that grow it, turning the Meshery model registry and community data into public web pages."
  * **Evidence**: `index.md` `description` field naming CNCF and multi-cluster Kubernetes management; `collections/_programs` and `collections/_handbook` declared in `_config.yml`; the MeshMate and community sections of `README.md`.

* **Claim**: "It owns exactly one thing: the public web presence of Meshery, including the rendering of registry and community data that other repositories produce."
  * **Evidence**: `_config.yml` `collections:` block declaring nine collections; `.github/workflows/jekyll.yml` building and deploying the site to GitHub Pages; the absence of any application or server code in the repository.

## Principle 1: The model registry is published here, not owned here

* **Claim**: "The 394 model pages under `collections/_models`, counted on 2026-09-10, are maintained by the `meshery-ci` bot rather than by contributors."
  * **Evidence**: `find collections/_models -name '*.md' | wc -l` returns 394 on 2026-09-10; `git log --format='%an' -- collections/_models` shows `meshery-ci` as the author of every recent change, with commit message "[Docs] Generated documentation for Integration".

* **Claim**: "`meshery/meshery/.github/workflows/integrations-updater.yml` drives that publish through `meshery-extensions/integrations-workflow`, which commits to five targets: this repository, `meshery/meshery` itself, `layer5io/layer5`, `layer5io/meshery-cloud`, and `tata-consulting/meshery-remote-provider`."
  * **Evidence**: `meshery/meshery/.github/workflows/integrations-updater.yml` line 25 calls `meshery-extensions/integrations-workflow/.github/workflows/publish.yml`. That workflow commits to five repositories: `repository: ./meshery.io` (line 126), `./l5` (145), `./meshery` (164), `./meshery-cloud` (183), and `./meshery-remote-provider` (202). The `./meshery` target receives generated model documentation at `docs/content/en/extensions/models` (line 154), which is the source of docs.meshery.io.

* **Claim**: "The registry data itself sits upstream of all five targets, behind `mesheryctl registry publish`, so a model's components, icons, and categories are not authored in this repository."
  * **Evidence**: `publish.yml` lines 72, 135, 154, 173, and 192 each invoke `./mesheryctl registry publish` against the same credential and spreadsheet id, writing to a different target's directories on each call. No step in this repository writes model component data.

* **Claim**: "A model whose registry data is wrong on meshery.io is wrong at the registry and is fixed there, while the template, permalink, and rendering of that page remain this repository's to fix."
  * **Evidence**: Scope split. Registry data: `publish.yml` line 72 passes only target directories to `mesheryctl registry publish website`, so component and category values originate upstream. Rendering: `_config.yml` sets the `models` permalink, model pages declare `layout: single-page-model`, and `_layouts/` and `_sass/` are maintained in this repository.

## Principle 2: Generated trees are rebuilt or bot-maintained, not hand-edited

* **Claim**: "`.github/workflows/update-catalog.yml` deletes every file under each `collections/_catalog` subdirectory before regenerating them, so an edit to a file under `collections/_catalog` is destroyed at the next scheduled run."
  * **Evidence**: `.github/workflows/update-catalog.yml` lines 45-48: `find $MESHERY_CATALOG_FILES_DIR ! -name 'index.html' ! -name 'artifacthub-repo.yml' -maxdepth 1 -type f -delete`, then `for dir in ./collections/_catalog/*/; do find "$dir" -maxdepth 1 -type f -delete`, followed by regeneration.

* **Claim**: "Model pages under `collections/_models` are updated in place by `meshery-ci` rather than deleted and rebuilt, so the tree is bot-maintained rather than disposable."
  * **Evidence**: Commit `11f9948` (`meshery-ci`, 2026-09-03) modifies `collections/_models/kube-arangodb/kube-arangodb.md` in place, appending one component entry and changing `componentsCount: 27` to `28` while leaving the rest of the file unchanged. No workflow deletes this tree; `update-catalog.yml` lines 45-48 target `collections/_catalog` only.

* **Claim**: "`_data/discuss/` is refetched from discuss.meshery.io on a daily schedule and `_data/leaderboard.json` is regenerated on its own daily schedule, while the remaining files under `_data/` are hand-maintained."
  * **Evidence**: `.github/workflows/discussions-data-files-update.yml` lines 21-22 curl `discuss.meshery.io` into `_data/discuss/`, committed with `file_pattern: _data/discuss/*.json` on `cron: '0 0 * * *'`; `.github/workflows/update-leaderboard.yml` commits `_data/leaderboard.json` on `cron: '30 1 * * *'`. No workflow writes the other 11 entries under `_data/` (`features.yml`, `footer.yml`, `integrations-data.json`, `navigation.yml`, `patterns.json`, `programs.yml`, `smi.json`, `talks.yml`, `testimonials.yml`, `tutorials.yml`, `wasm.json`).

* **Claim**: "Commits to these trees carry bot identities: `meshery-ci`, `l5io`, and `Discussions bot`."
  * **Evidence**: `publish.yml` line 125 (`commit_user_name: meshery-ci`); `.github/workflows/delete-catalog.yml` lines 56-57 (`commit_user_name: l5io`, `ci@meshery.io`); `update-leaderboard.yml` line 40 and `discussions-data-files-update.yml` line 31 (`commit_user_name: Discussions bot`).

* **Claim**: "`eslint.config.mjs` excludes `collections/`, `catalog/`, `integrations/`, and `assets/` from linting because their contents are not hand-written."
  * **Evidence**: `eslint.config.mjs` lines 6-17 `ignores` list, which includes `collections/**`, `catalog/**`, `integrations/**`, and `assets/**`.

## Principle 3: Meshery.io is the front door and docs.meshery.io is the manual

* **Claim**: "Every one of the 394 model pages carries a `docURL` pointing into `docs.meshery.io`, 377 of them under `/extensibility/integrations/` and the remaining 17 spread across adapter, installation, task, and guide paths, counted on 2026-09-10."
  * **Evidence**: `grep -l '^docURL: https://docs.meshery.io' collections/_models/*/*.md | wc -l` returns 394, matching `find collections/_models -name '*.md' | wc -l`. Narrowing with the same glob, `grep -l '^docURL: https://docs.meshery.io/extensibility/integrations/' collections/_models/*/*.md | wc -l` returns 377. The remaining 17 resolve to `/extensibility/adapters/` (8), `/installation/` paths (7, one of which contains a double slash and one a trailing space), `/tasks/performance/` (1), and `/guides/infrastructure-management/` (1). No model page lacks a `docURL`. Counted 2026-09-10.

* **Claim**: "Meshery.io shows that an integration exists and what it covers, and documentation of how to use it lives in `meshery/meshery/docs`."
  * **Evidence**: `docURL` frontmatter on every model page pointing at `docs.meshery.io/extensibility/integrations/<name>`; model page frontmatter carries `name`, `subtitle`, `category`, `subcategory`, and `components`, and no usage instructions.

* **Claim**: "The flow runs both ways: `.github/workflows/error-code-updater.yml` generates the Artifact Hub error reference in this repository and commits it into `meshery/meshery/docs/data/errorref/`."
  * **Evidence**: `.github/workflows/error-code-updater.yml` lines 56 and 66-68: builds `artifact-hub-pkg_errors_export.json` and runs `git add ./docs/data/errorref/...`, `git commit`, `git push origin master` against a checkout of `meshery/meshery`.

* **Claim**: "Governance and maintainership are not defined here either, since `GOVERNANCE.md` and `MAINTAINERS.md` are each a single line pointing at `meshery/meshery`."
  * **Evidence**: `GOVERNANCE.md` and `MAINTAINERS.md` are each a single line directing readers to `MAINTAINERS.md` in the `meshery/meshery` repository.

## Principle 4: Content types are Jekyll collections

* **Claim**: "`_config.yml` declares nine collections and sets `output` explicitly on each, with `permalink` on five of them and `sort_by` on three."
  * **Evidence**: `_config.yml` `collections:` block: nine collections (`charts`, `extensions`, `pages`, `programs`, `catalog`, `models`, `filters`, `handbook`, `custom-models`), nine `output:` keys, five `permalink:` keys (`extensions`, `models`, `filters`, `handbook`, `custom-models`), and three `sort_by:` keys. Note that `permalink` does not imply publication: `handbook` sets a permalink but `output: false`, and `pages`, `programs`, and `catalog` publish without declaring either key.

* **Claim**: "A content type that needs a public URL is declared in the `_config.yml` `collections:` block rather than added as a loose directory of pages."
  * **Evidence**: Every published content type on the site is a member of that `collections:` block; `collections/_pages` exists so that standalone pages are still collection members rather than loose files.

* **Claim**: "`collections/_handbook` and `charts` set `output: false` where their entries are composed into other pages rather than published directly."
  * **Evidence**: `_config.yml`: `charts` sets `output: false`, and `handbook` sets `output: false` with `permalink: /community/:collection/:name`.

* **Claim**: "`_plugins/catalog_page_metadata.rb` derives catalog page titles from registry `name` fields at render time rather than requiring a hand-written title on each entry."
  * **Evidence**: `_plugins/catalog_page_metadata.rb` registers a `:documents, :pre_render` hook that sets `document.data["title"]` from `document.data["name"]` for documents in the `catalog` collection.

## Scope and non-goals

* **Claim**: "Meshery.io is not the Meshery documentation site."
  * **Evidence**: Every model page defers to `docs.meshery.io` via `docURL` (394 of 394 on 2026-09-10, 377 of them under `/extensibility/integrations/` and 17 across other documentation paths); `error-code-updater.yml` pushes reference content into `meshery/meshery/docs/` rather than publishing it here.

* **Claim**: "Meshery.io is not the source of truth for the model registry."
  * **Evidence**: `publish.yml` lines 31-62 and 72-192 show the registry published from `meshery/meshery` to five targets, of which this repository is one; `mesheryctl registry publish` (line 72) reads from a registry credential and spreadsheet id, not from this repository.

* **Claim**: "Meshery.io is not the Meshery application, and it ships as a static Jekyll build deployed to GitHub Pages."
  * **Evidence**: `.github/workflows/jekyll.yml` builds with Jekyll and deploys via `JamesIves/github-pages-deploy-action`; the repository contains no server, API, or application source.

* **Claim**: "Meshery.io is not where project governance or maintainership is defined."
  * **Evidence**: `GOVERNANCE.md` and `MAINTAINERS.md`, each a one-line pointer to `meshery/meshery`.

* **Claim**: "Meshery.io is not a hand-maintained catalog of integrations."
  * **Evidence**: `update-catalog.yml` lines 45-48 delete catalog entries before regeneration; commit `11f9948` shows `meshery-ci` maintaining model pages in place; commits across both trees carry bot identities rather than contributor ones.

## Alignment and resistance criteria

* **Claim**: "A change aligns when it improves how the site presents data that other repositories own, leaves generated trees to the workflows that maintain them, adds new content as a declared collection, or sends readers to docs.meshery.io for documentation."
  * **Evidence**: Derived from the four principles above and the evidence cited for each. Applied as review criteria in `CONTRIBUTING.md` ("Reviewing Pull Requests", DOs and DON'Ts).

* **Claim**: "A change should be resisted when it hand-edits a tree a workflow maintains, duplicates content that docs.meshery.io owns, moves registry authority into this repository, or publishes a content type outside the collections declared in `_config.yml`."
  * **Evidence**: Derived from the four principles above. The hand-edit case is settled for `collections/_catalog` by `update-catalog.yml` lines 45-48; the documentation-duplication case by the 394 `docURL` fields; the collection case by the `_config.yml` `collections:` block.

---

## Claims removed or narrowed during verification

* **Removed**: "Every page ships as a public artifact, so page weight, accessibility, and SEO are review criteria."
  * **Reason**: No supporting evidence exists. `grep -rilE "lighthouse|axe-core|pa11y|accessibility" .github/ package.json Makefile` returns no matches, and `.github/workflows/jekyll.yml` runs no audit step. Deleted rather than softened into a statement of values, which would have been unfalsifiable.

* **Corrected**: an earlier draft cited 788 model pages, 365 catalog pages, and 80 blog posts.
  * **Reason**: those were git tree path counts including directories and image assets. The `.md` page counts are 394, 357, and 43 respectively on 2026-09-10.

* **Narrowed**: an earlier draft claimed `mesheryctl registry publish website` generates the pages under `collections/_models`, and that an edit anywhere in `collections/_models`, `collections/_catalog`, or `_data/` is destroyed at the next scheduled run.
  * **Reason**: the cited line (`publish.yml` line 90, `PAGES_DIR`) reads existing model pages to build OCI artifacts; it does not write them. Commit `11f9948` shows `meshery-ci` editing a model page in place rather than regenerating it, so hand-written content in `collections/_models` is not necessarily destroyed. The delete-then-rebuild behavior is specific to `collections/_catalog`. The `_data/` claim covered 13 files when only 2 have a producing workflow.

* **Narrowed**: an earlier draft claimed every collection is declared with explicit output, permalink, and sort behavior.
  * **Reason**: the `collections:` block sets `output` on all nine, `permalink` on five, and `sort_by` on three.
