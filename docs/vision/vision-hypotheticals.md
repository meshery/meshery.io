# Meshery.io vision hypotheticals and calibration record

Ten stress tests used to calibrate `VISION.md`. Each records what the proposal was, which principle it pressures, the honest case on both sides, and the verdict.

Verdicts come in two kinds, and the distinction matters:

* **Derived from repository behavior.** The repository already settles the question, and a workflow or config file is the answer. The citation is given inline. These are mechanics, not judgment.
* **Maintainer verdict.** A judgment call about what the project wants, answered by a maintainer and quoted verbatim. Questions still awaiting one are marked `Open`, and this file is updated as answers arrive rather than filled in by guesswork.

Six of the ten below are open. They are posted for maintainer input on meshery/meshery.io#2957.

---

## Hypothetical 1: Hand-filled descriptions on generated model pages

* **Proposal**: 386 of the 394 pages under `collections/_models` have an empty `description:` in frontmatter, so catalog pages render with no summary text. Allow contributors to write descriptions directly into those files, marked with a comment the publish workflow is taught to preserve.
* **Tests**: Principle 1, Principle 2
* **For**: A visible defect on 98% of the catalog, and the highest-leverage content fix available on the site. The registry spreadsheet is not open to most contributors, so routing the fix upstream means it never happens.
* **Against**: Two writers for one file, and `collections/_models` stops being safely regenerable. The same registry publishes to four other targets, which would still render blanks.
* **Verdict (derived from repository behavior)**: **RESIST**. `meshery-extensions/integrations-workflow/.github/workflows/publish.yml` line 90 regenerates `collections/_models` wholesale on each run, and the sibling `.github/workflows/update-catalog.yml` lines 45-48 delete every file in each catalog subdirectory before regenerating. Text typed into these files is destroyed on the next run. Whether the generator should learn to preserve a field is a decision for the registry workflow, not for this repository.
* **Changelog**: Produced "An edit to a file in `collections/_models`, `collections/_catalog`, or `_data/` is destroyed at the next scheduled run" in Principle 2, and "A model that renders wrong on meshery.io is wrong in the registry, and it is fixed there" in Principle 1.

---

## Hypothetical 2: Full integration documentation on meshery.io

* **Proposal**: Model pages carry component lists, icons, and categories but link out to `docs.meshery.io` for anything a reader can act on. Render full integration documentation on meshery.io instead, since the registry data is already here.
* **Tests**: Principle 3
* **For**: The reader is already on the page, and the docURL hop loses them. The site holds the structured component data that documentation pages describe in prose, so it could render better reference material than the docs site does.
* **Against**: Splits documentation across two properties with two publishing pipelines and two review cultures, and the version of a page that ranks in search becomes a coin flip.
* **Verdict**: Open - awaiting maintainer.
* **Changelog**: Pending.

---

## Hypothetical 3: A launch-week override for one catalog entry

* **Proposal**: A KubeCon launch needs one catalog entry to carry a custom hero image and longer copy than the registry emits. Add a per-entry override file that the catalog workflow merges on top of generated content.
* **Tests**: Principle 2
* **For**: A single, time-boxed exception for a high-visibility moment, and the mechanism is contained to one entry rather than opening the whole tree.
* **Against**: An override layer is permanent once it exists, and every future generator change has to honor it or silently drop content.
* **Verdict (derived from repository behavior)**: **RESIST**. `.github/workflows/update-catalog.yml` lines 45-48 delete files before regenerating, and `.github/workflows/delete-catalog.yml` removes entries on `repository_dispatch` from upstream. No merge step exists at either point, so an override file has nowhere to be applied. `collections/_custom-models` already holds the supported escape hatch for hand-authored entries, including `kubecon-2025.md`.
* **Changelog**: No new sentence. Confirmed Principle 2 as drafted, and confirmed that `collections/_custom-models` belongs in the collections list in Principle 4 rather than being treated as an anomaly.

---

## Hypothetical 4: A new content type as loose pages

* **Proposal**: Add customer case studies as a top-level `case-studies/` directory of HTML pages, rather than declaring another Jekyll collection.
* **Tests**: Principle 4
* **For**: Faster for a contributor who wants three pages published this week, with no `_config.yml` change and no layout to write.
* **Against**: Loose pages get no permalink scheme, no sort order, and no collection-level rendering, so they drift from every other content type on the site.
* **Verdict (derived from repository behavior)**: **RESIST**. `_config.yml` declares nine collections, and every published content type on the site is one of them, each with explicit `output` and, where published, `permalink` and `sort_by`. `collections/_pages` exists precisely so that standalone pages are still collection members.
* **Changelog**: Produced "A content type that needs a public URL is declared in the `_config.yml` `collections:` block with a layout, not added as a loose directory of pages" in Principle 4.

---

## Hypothetical 5: Moving the registry source of truth into this repository

* **Proposal**: Check the model registry into meshery.io as YAML and generate the other publish targets from here, replacing the spreadsheet that `mesheryctl registry publish website` currently reads.
* **Tests**: Principle 1, Scope
* **For**: Puts registry data under pull request review with normal git history, and removes a credentialed spreadsheet from the critical path of five downstream sites.
* **Against**: Makes a website repository the authority for data that the Meshery application and four other properties consume, and inverts the direction every current workflow runs in.
* **Verdict**: Open - awaiting maintainer.
* **Changelog**: Pending.

---

## Hypothetical 6: Retiring the thin collections

* **Proposal**: `collections/_filters` holds 10 files and `collections/_custom-models` holds 3, both far smaller than the collections around them. Remove them and fold their contents into `collections/_catalog` and `collections/_models`.
* **Tests**: Principle 4
* **For**: Four collections covering catalog-shaped content is three more than a contributor can keep straight, and the small ones are where stale entries hide.
* **Against**: `_custom-models` is the only supported home for hand-authored entries in an otherwise generated area, and removing it would push that content into a tree that gets wiped.
* **Verdict**: Open - awaiting maintainer.
* **Changelog**: Pending.

---

## Hypothetical 7: Tutorial posts that duplicate the documentation

* **Proposal**: Blog posts under `collections/_posts` regularly carry `mesheryctl` command sequences that also appear in `docs.meshery.io`. Rule that operational instructions belong only in the docs site, and that posts link rather than repeat.
* **Tests**: Principle 3
* **For**: Two copies of an install sequence means one of them is wrong within a release, and the blog copy is the one nobody re-tests.
* **Against**: A tutorial post that cannot show a command is not a tutorial, and the blog is where most readers meet the project for the first time.
* **Verdict**: Open - awaiting maintainer.
* **Changelog**: Pending.

---

## Hypothetical 8: An accessibility and page weight gate in CI

* **Proposal**: Add a Lighthouse or axe-core check to the build so that accessibility and page weight regressions fail a pull request.
* **Tests**: Scope. This was drafted as a fifth principle and removed during verification for lack of evidence.
* **For**: A public marketing site is the project's most-viewed artifact, and it currently ships with no automated accessibility or performance check of any kind.
* **Against**: It is a real change to CI rather than a description of how the project already behaves, so it belongs in an issue and a pull request rather than in a document that describes current state.
* **Verdict**: Open - awaiting maintainer. If a maintainer affirms it as intended direction, it returns to `VISION.md` marked `Direction, not shipped state.` rather than as a statement of fact.
* **Changelog**: Removal is recorded under "Claims removed during verification" in `vision-evidence.md`.

---

## Hypothetical 9: Serving rendered pages to another property

* **Proposal**: A partner property wants Meshery integration content and asks to consume meshery.io's rendered catalog pages, rather than running its own `mesheryctl registry publish website` step as the existing four targets do.
* **Tests**: Principle 1, Scope
* **For**: One rendering path instead of five, and the partner gets styling and structure for free.
* **Against**: Turns a static Jekyll site into an interface with consumers and compatibility expectations, and any layout change becomes a breaking change for someone else.
* **Verdict**: Open - awaiting maintainer.
* **Changelog**: Pending.

---

## Hypothetical 10: Site-specific governance in this repository

* **Proposal**: `GOVERNANCE.md` and `MAINTAINERS.md` are each a single line pointing at `meshery/meshery`. Replace them with a web-specific reviewer group and content approval rules defined here.
* **Tests**: Principle 3, Scope
* **For**: Content review on a marketing site is a different skill from reviewing Go, and the people doing it are not the people listed upstream.
* **Against**: A second governance document is a second place for governance to be out of date, and the project has already chosen a single home for it.
* **Verdict (derived from repository behavior)**: **RESIST**. Both `GOVERNANCE.md` and `MAINTAINERS.md` in this repository are one-line pointers to `meshery/meshery`. The question of where governance lives has already been decided and recorded; restating it here would duplicate it, and `VISION.md` covers purpose and boundaries rather than governance.
* **Changelog**: Produced "Governance and maintainership are not defined here either, since `GOVERNANCE.md` and `MAINTAINERS.md` are each a single line pointing at `meshery/meshery`" in Principle 3, and "Meshery.io is not where project governance or maintainership is defined" in Scope.
