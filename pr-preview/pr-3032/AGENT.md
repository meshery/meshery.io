# AGENT.md — Meshery.io guide for AI agents

This file is a short operating guide for AI agents working in this repository. It complements the project docs rather than repeating them.

## Start with the authoritative sources

Use the document that owns the relevant concern:

* [README.md](README.md) for the project overview, stack, and local development workflow
* [CONTRIBUTING.md](CONTRIBUTING.md) for contribution and pull request workflow
* [VISION.md](VISION.md) for the purpose, boundaries, and decision framework of this site
* [DESIGN.md](DESIGN.md) for UI and design-system guidance
* [SECURITY.md](SECURITY.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), [GOVERNANCE.md](GOVERNANCE.md), and [MAINTAINERS.md](MAINTAINERS.md) for their specific domains

If guidance already exists in one of these files, follow it and link to it instead of restating it here.

## Operating rules for agents

1. Read the relevant implementation and the owning documentation before editing.
2. Search for an existing pattern before introducing a new one.
3. Prefer the narrowest correct source layer: page content, include, layout, Sass partial, JavaScript, data file, or the source that generates an artifact.
4. Keep changes focused and avoid unrelated cleanup.
5. When a decision is unclear, use [VISION.md](VISION.md) to decide whether the change belongs here or elsewhere.
6. When documentation and implementation appear to conflict, do not silently invent a new rule. Identify the applicable source of truth and flag the discrepancy when appropriate.

## Repository boundaries

Keep these constraints in mind:

* Meshery.io is a public-facing website, not the canonical source for product documentation.
* Long-form product instructions and detailed reference material belong to docs.meshery.io, not this repository.
* Generated output should be updated at its source rather than by manual edits when automation exists.
* This site should reflect the ecosystem and point readers onward, not duplicate the source of truth for other Meshery projects.

## Styling and UI guidance

For visual or interface work, treat [DESIGN.md](DESIGN.md) as the source of truth.

Until `DESIGN.md` is available in the repository, follow the existing Sass, include, and layout patterns and reuse established tokens or values before introducing new ones.

Do not add arbitrary colors, spacing values, breakpoints, or CSS variables when a repository pattern already exists.

Preserve existing light/dark theme behavior when changing colors, images, or UI components.

## Validation

Use the repository's existing commands from [README.md](README.md) and the current project tooling. Validate the portion of the project affected by the change and do not claim a result that was not actually checked.

## Final rule

This document exists to help agents locate the right source of truth and stay aligned with the repository's structure. It is not a replacement for [README.md](README.md), [CONTRIBUTING.md](CONTRIBUTING.md), [VISION.md](VISION.md), or [DESIGN.md](DESIGN.md).
