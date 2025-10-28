---
title: Mesheryctl News (> v0.8.0)
subheading: Updates to the Meshery CLI since the latest release
date: 2025-10-27
author: Matthieu Evrin
categories:
  - releases
  - mesheryctl
redirect_from: /blog/mesheryctl-2025-10-latest-news
published: true
---

Since the latest release, many contributors have improved Meshery's CLI experience, reliability, testing, and internal organization. We would like to thank them all.

## New features

- **Model:** Two new subcommands were added.
  - Init: Generates a folder structure and guides the user through model creation.
  - Build: Creates an OCI-compliant package from the model files.
- **Environment:** Moved from experimental to promoted.

## Enhancements

- **Schema-driven development:** Added to enforce consistency across Meshery's components.
- **UX & ergonomics:** 
  - Clearer system messages.
  - Improved help text and better error messages across commands.
- **List output & pagination:** 
  - Refactored list table output.
  - Many list commands now use pagination and shared fetch/list helpers.
- **Refactor & code quality:** 
  - Moved registry utilities to meshkit.
  - Improved error output across commands.

## Fixes

- Improved stability with fixes that prevent panics.
- Improved error handling across CLI commands.
- Increased test coverage and reliability.
- Ensured component search queries are escaped.
- Fixed status codes and return errors where appropriate to provide better feedback to end users.

## Testing & CI

- Significant investment in BATS-based e2e coverage and helper tooling (BATS libs, reusable functions, local-run helpers).
- CI stabilizations: fixed flaky workflows, upgraded the Go toolchain and linters, and streamlined mesheryctl CI steps.

## Chores & documentation

- Repository renames from layer5/* to meshery/*.
- Continued meshkit migration.
- Improved documentation CLI documentation.

## Upgrade notes

- Updated references/hooks to meshery/meshsync and meshery/meshery-operator.
- Tooling: Go 1.24.
- Tablewriter v1.0.x output differences may affect scripts that parse CLI output.

