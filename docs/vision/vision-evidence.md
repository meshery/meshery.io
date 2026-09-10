# Meshery.io vision evidence sheet

This sheet gives claim-by-claim traceability for every sentence in `VISION.md`. Each citation was resolved against `upstream/master` on 2026-09-10 during authoring. Claims whose citations did not resolve were removed from `VISION.md` rather than reworded; see the note at the end.

Counts drift. Where a count is cited it is dated, and re-verifying it is part of any future revision.

---

## Identity and purpose

* **Claim**: "Meshery.io exists so that people evaluating, adopting, or contributing to Meshery can find what the project is, what it integrates with, and how to join it, without reading source code."
  * **Evidence**: `README.md` ("What is Meshery?"); `index.md` frontmatter (`layout: home`, title "Meshery | The Kubernetes and Cloud Native Manager"); the top-level `install/` and `integrations/` sections of the site.

* **Claim**: "It serves platform engineers and SREs assessing Meshery alongside the contributors and community programs that grow it, turning the Meshery model registry and community data into public web pages."
  * **Evidence**: `index.md` `description` field naming CNCF and multi-cluster Kubernetes management; `collections/_programs` and `collections/_handbook` declared in `_config.yml`; the MeshMate and community sections of `README.md`.

* **Claim**: "It owns exactly one thing: the public web presence of Meshery, including the rendering of registry and community data that other repositories produce."
  * **Evidence**: `_config.yml` `collections:` block declaring nine collections; `.github/workflows/jekyll.yml` building and deploying the site to GitHub Pages; the absence of any application or server code in the repository.

## Principle 1: The model registry is published here, not owned here

* **Claim**: "The 394 model pages under `collections/_models` are written by the `meshery-ci` bot, not by contributors."
  * **Evidence**: `find collections/_models -name '*.md' | wc -l` returns 394 as of 2026-09-10; `git log --format='%an' -- collections/_models` shows `meshery-ci` with commit message "[Docs] Generated documentation for Integration".

* **Claim**: "`mesheryctl registry publish website` generates them from the Meshery model registry."
  * **Evidence**: `meshery-extensions/integrations-workflow/.github/workflows/publish.yml` line 90 sets `PAGES_DIR="../../meshery.io/collections/_models"`; line 72 runs `./mesheryctl registry publish website` against the site's `integrations` and image directories.

* **Claim**: "`meshery/meshery/.github/workflows/integrations-updater.yml` triggers that publish, and meshery.io is one of several targets it writes to, alongside `layer5io/layer5`, `layer5io/meshery-cloud`, and `tata-consulting/meshery-remote-provider`."
  * **Evidence**: `meshery/meshery/.github/workflows/integrations-updater.yml` line 25 calls the reusable workflow; `publish.yml` lines 34-62 check out `meshery/meshery`, `layer5io/layer5`, `meshery/meshery.io`, `layer5io/meshery-cloud`, and `tata-consulting/meshery-remote-provider` as publish targets.

* **Claim**: "A model that renders wrong on meshery.io is wrong in the registry, and it is fixed there."
  * **Evidence**: `publish.yml` lines 90-119 regenerate the page directory on each run, so page content is whatever the registry emitted. Registry gaps surface verbatim: 386 of the 394 model pages carry an empty `description:` field as of 2026-09-10.

## Principle 2: Generated trees are rebuilt, not edited

* **Claim**: "`.github/workflows/update-catalog.yml` deletes every file under each `collections/_catalog` subdirectory before regenerating them."
  * **Evidence**: `.github/workflows/update-catalog.yml` lines 45-48: `find $MESHERY_CATALOG_FILES_DIR ! -name 'index.html' ! -name 'artifacthub-repo.yml' -maxdepth 1 -type f -delete`, then `for dir in ./collections/_catalog/*/; do find "$dir" -maxdepth 1 -type f -delete`.

* **Claim**: "`_data/discuss/` is refetched from discuss.meshery.io on a daily schedule, and `_data/leaderboard.json` is regenerated on its own daily schedule."
  * **Evidence**: `.github/workflows/discussions-data-files-update.yml` lines 21-22 curl `discuss.meshery.io` into `_data/discuss/`, committed with `file_pattern: _data/discuss/*.json` on `cron: '0 0 * * *'`; `.github/workflows/update-leaderboard.yml` commits `_data/leaderboard.json` on `cron: '30 1 * * *'`.

* **Claim**: "Commits to these trees carry bot identities: `meshery-ci`, `l5io`, and `Discussions bot`."
  * **Evidence**: `publish.yml` line 125 (`commit_user_name: meshery-ci`); `.github/workflows/delete-catalog.yml` lines 56-57 (`commit_user_name: l5io`, `ci@meshery.io`); `update-leaderboard.yml` line 40 and `discussions-data-files-update.yml` line 31 (`commit_user_name: Discussions bot`).

* **Claim**: "`eslint.config.mjs` excludes `collections/`, `catalog/`, `integrations/`, and `assets/` from linting because their contents are not hand-written."
  * **Evidence**: `eslint.config.mjs` lines 6-17 `ignores` list, which includes `collections/**`, `catalog/**`, `integrations/**`, and `assets/**`.

* **Claim**: "An edit to a file in `collections/_models`, `collections/_catalog`, or `_data/` is destroyed at the next scheduled run."
  * **Evidence**: Consequence of the delete-then-regenerate step in `update-catalog.yml` lines 45-48 combined with its `cron: "30 0 * * *"` schedule and `repository_dispatch` trigger.

## Principle 3: Meshery.io is the front door and docs.meshery.io is the manual

* **Claim**: "Every one of the 394 model pages carries a `docURL` pointing at `docs.meshery.io/extensibility/integrations/`."
  * **Evidence**: `grep -l "docURL: https://docs.meshery.io" collections/_models/*/*.md | wc -l` returns 394, matching the total page count, as of 2026-09-10.

* **Claim**: "Meshery.io shows that an integration exists and what it covers, and documentation of how to use it lives in `meshery/meshery/docs`."
  * **Evidence**: `docURL` frontmatter on every model page pointing at `docs.meshery.io/extensibility/integrations/<name>`; model page frontmatter carries `name`, `subtitle`, `category`, `subcategory`, and `components`, and no usage instructions.

* **Claim**: "The flow runs both ways: `.github/workflows/error-code-updater.yml` generates the Artifact Hub error reference in this repository and commits it into `meshery/meshery/docs/data/errorref/`."
  * **Evidence**: `.github/workflows/error-code-updater.yml` lines 56 and 66-68: builds `artifact-hub-pkg_errors_export.json` and runs `git add ./docs/data/errorref/...`, `git commit`, `git push origin master` against a checkout of `meshery/meshery`.

* **Claim**: "Governance and maintainership are not defined here either, since `GOVERNANCE.md` and `MAINTAINERS.md` are each a single line pointing at `meshery/meshery`."
  * **Evidence**: `GOVERNANCE.md` and `MAINTAINERS.md` are each a single line directing readers to `MAINTAINERS.md` in the `meshery/meshery` repository.

## Principle 4: Content types are Jekyll collections

* **Claim**: "`_config.yml` declares nine collections, each with explicit output, permalink, and sort behavior."
  * **Evidence**: `_config.yml` `collections:` block declaring `charts`, `extensions`, `pages`, `programs`, `catalog`, `models`, `filters`, `handbook`, and `custom-models`, each with `output` and, where published, `permalink` and `sort_by`.

* **Claim**: "A content type that needs a public URL is declared in the `_config.yml` `collections:` block with a layout, not added as a loose directory of pages."
  * **Evidence**: `_config.yml` permalinks (`models` and `filters` at `/catalog/:collection/:name`, `extensions` at `/:collection/:name`, `custom-models` at `/catalog/models/:name`); model pages declare `layout: single-page-model`.

* **Claim**: "`collections/_handbook` and `charts` set `output: false` where their entries are composed into other pages rather than published directly."
  * **Evidence**: `_config.yml`: `charts` sets `output: false`, and `handbook` sets `output: false` with `permalink: /community/:collection/:name`.

* **Claim**: "`_plugins/catalog_page_metadata.rb` derives catalog page titles from registry `name` fields at render time rather than requiring a hand-written title on each entry."
  * **Evidence**: `_plugins/catalog_page_metadata.rb` registers a `:documents, :pre_render` hook that sets `document.data["title"]` from `document.data["name"]` for documents in the `catalog` collection.

## Scope and non-goals

* **Claim**: "Meshery.io is not the Meshery documentation site."
  * **Evidence**: Every model page defers to `docs.meshery.io` via `docURL` (394 of 394); `error-code-updater.yml` pushes reference content into `meshery/meshery/docs/` rather than publishing it here.

* **Claim**: "Meshery.io is not the source of truth for the model registry."
  * **Evidence**: `publish.yml` lines 34-62 show the registry published from `meshery/meshery` to five targets, of which this repository is one; `mesheryctl registry publish website` (line 72) reads from a registry credential and spreadsheet id, not from this repository.

* **Claim**: "Meshery.io is not the Meshery application, and it ships as a static Jekyll build deployed to GitHub Pages."
  * **Evidence**: `.github/workflows/jekyll.yml` builds with Jekyll and deploys via `JamesIves/github-pages-deploy-action`; the repository contains no server, API, or application source.

* **Claim**: "Meshery.io is not where project governance or maintainership is defined."
  * **Evidence**: `GOVERNANCE.md` and `MAINTAINERS.md`, each a one-line pointer to `meshery/meshery`.

* **Claim**: "Meshery.io is not a hand-maintained catalog of integrations."
  * **Evidence**: `update-catalog.yml` lines 45-48 delete catalog entries before regeneration; `publish.yml` line 90 regenerates `collections/_models`; commits across both trees carry bot identities rather than contributor ones.

## Alignment and resistance criteria

* **Claim**: "A change aligns when it improves how the site presents data that other repositories own, keeps generated trees regenerable, adds new content as a declared collection, or sends readers to docs.meshery.io for documentation."
  * **Evidence**: Derived from the four principles above and the evidence cited for each. Applied as review criteria in `CONTRIBUTING.md` ("Reviewing Pull Requests", DOs and DON'Ts).

* **Claim**: "A change should be resisted when it hand-edits a generated tree, duplicates content that docs.meshery.io owns, moves registry authority into this repository, or publishes a content type outside the collections declared in `_config.yml`."
  * **Evidence**: Derived from the four principles above. The hand-edit case is settled mechanically by `update-catalog.yml` lines 45-48 and `publish.yml` line 90; the documentation-duplication case by the 394 `docURL` fields; the collection case by the `_config.yml` `collections:` block.

---

## Claims removed during verification

* **Removed**: "Every page ships as a public artifact, so page weight, accessibility, and SEO are review criteria."
  * **Reason**: No supporting evidence exists. `grep -rilE "lighthouse|axe-core|pa11y|accessibility" .github/ package.json Makefile` returns no matches, and `.github/workflows/jekyll.yml` runs no audit step. The claim was deleted rather than softened into a statement of values, which would have been unfalsifiable.

* **Corrected**: an earlier draft cited 788 model pages, 365 catalog pages, and 80 blog posts.
  * **Reason**: those were git tree path counts including directories and image assets. The `.md` page counts are 394, 357, and 43 respectively as of 2026-09-10.
