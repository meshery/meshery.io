# Vision

Meshery.io exists so that people evaluating, adopting, or contributing to Meshery can find what the project is, what it integrates with, and how to join it, without reading source code.
It serves platform engineers and SREs assessing Meshery alongside the contributors and community programs that grow it, turning the Meshery model registry and community data into public web pages.
It owns exactly one thing: the public web presence of Meshery, including the rendering of registry and community data that other repositories produce.

## The model registry is published here, not owned here

The 394 model pages under `collections/_models` are written by the `meshery-ci` bot, not by contributors.
`mesheryctl registry publish website` generates them from the Meshery model registry.
`meshery/meshery/.github/workflows/integrations-updater.yml` triggers that publish, and meshery.io is one of several targets it writes to, alongside `layer5io/layer5`, `layer5io/meshery-cloud`, and `tata-consulting/meshery-remote-provider`.
A model that renders wrong on meshery.io is wrong in the registry, and it is fixed there.

## Generated trees are rebuilt, not edited

`.github/workflows/update-catalog.yml` deletes every file under each `collections/_catalog` subdirectory before regenerating them.
`_data/discuss/` is refetched from discuss.meshery.io on a daily schedule, and `_data/leaderboard.json` is regenerated on its own daily schedule.
Commits to these trees carry bot identities: `meshery-ci`, `l5io`, and `Discussions bot`.
`eslint.config.mjs` excludes `collections/`, `catalog/`, `integrations/`, and `assets/` from linting because their contents are not hand-written.
An edit to a file in `collections/_models`, `collections/_catalog`, or `_data/` is destroyed at the next scheduled run.

## Meshery.io is the front door and docs.meshery.io is the manual

Every one of the 394 model pages carries a `docURL` pointing at `docs.meshery.io/extensibility/integrations/`.
Meshery.io shows that an integration exists and what it covers, and documentation of how to use it lives in `meshery/meshery/docs`.
The flow runs both ways: `.github/workflows/error-code-updater.yml` generates the Artifact Hub error reference in this repository and commits it into `meshery/meshery/docs/data/errorref/`.
Governance and maintainership are not defined here either, since `GOVERNANCE.md` and `MAINTAINERS.md` are each a single line pointing at `meshery/meshery`.

## Content types are Jekyll collections

`_config.yml` declares nine collections, each with explicit output, permalink, and sort behavior.
A content type that needs a public URL is declared in the `_config.yml` `collections:` block with a layout, not added as a loose directory of pages.
`collections/_handbook` and `charts` set `output: false` where their entries are composed into other pages rather than published directly.
`_plugins/catalog_page_metadata.rb` derives catalog page titles from registry `name` fields at render time rather than requiring a hand-written title on each entry.

## Scope

Meshery.io is not the Meshery documentation site.
Meshery.io is not the source of truth for the model registry.
Meshery.io is not the Meshery application, and it ships as a static Jekyll build deployed to GitHub Pages.
Meshery.io is not where project governance or maintainership is defined.
Meshery.io is not a hand-maintained catalog of integrations.

A change aligns when it improves how the site presents data that other repositories own, keeps generated trees regenerable, adds new content as a declared collection, or sends readers to docs.meshery.io for documentation.
A change should be resisted when it hand-edits a generated tree, duplicates content that docs.meshery.io owns, moves registry authority into this repository, or publishes a content type outside the collections declared in `_config.yml`.
