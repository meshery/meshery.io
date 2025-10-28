---
title: Mesheryctl News (>v0.8.0)
subheading: Latest updates on Meshery CLI since lastest release
date: 2025-10-27
author: Matthieu Evrin
categories:
  - releases
  - cli
redirect_from: /blog/mesheryctl-2025-10-latest-news
---

## Summary

Since latest release, a large number of contributors improved Meshery's CLI experience, reliability, testing, and internal organization. We would like to highlight and thank you fall.

### New features

- **Model:** 2 new subcommands were adding
  - Init: Generates a folder structure and guides user on model creation.
  - Build: Create an OCI-compliant package from the model files.
- **Environment:** Move from experimental to promoted command.
- **End-To-End testing:** Starting to implemente2e tests for commands using Bash Automated Testing System.

### Enhancements

- **Schema-driven development:** Added to enforce consistency between Meshery’s components.
- **UX & ergonomics:** 
  - Clearer system messages 
  - Improved help text, better error messages across commands.
- **List Output & pagination:** 
  - List table output refactored
  - Many list commands now use pagination and shared fetch/list helpers.
- **Refactor & code quality:** 
  - Moved registry utilities to meshkit
  - Migrated dependencies from layer5io/* to meshery/* 
  - Modularized commands (component, model, workspace, connections, etc.).

### Fixes

- Improve Stability with fixes preventing panics
- Improving error-handling across CLI commands.
- Increasing tests coverage and success.
- Ensure component search queries are escaped. 
- Fix status codes and return errors where appropriate to give the best feedback to final users.

### Testing & CI
- Big investment in BATS-based e2e coverage and helper tooling (BATS libs, reusable functions, local-run helpers).
- CI stabilizations: fixed flaky workflows, upgraded Go toolchain & linters, streamlined mesheryctl CI steps.

### Chores, Documentation

- Repository renames from layer5/* to meshery/*
- Increase meshkit migration.
- Documentations improved 
  - CLI help
  - e2e contribution guide
  - registry subcommand docs.

### Upgrade notes

- Update references/hooks to meshery/meshsync and meshery/meshery-operator.
- Tooling: Go 1.24
- Tablewriter v1.0.x output differences may affect scripts that parse CLI output.
