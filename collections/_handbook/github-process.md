---
layout: page
title: GitHub Process
description: Layer5’s GitHub Process promotes consistency and efficiency across repositories by standardizing issue and pull request labels, templates, and workflows.
---

Layer5’s GitHub Process emphasizes standardization through labels, templates, bots, and workflows to streamline contributions and reduce CI overhead across its growing repository ecosystem.

---

## Overview

As the number of repositories under the [Layer5 GitHub organization](https://github.com/layer5io) grows, maintaining consistency becomes essential. Labels, templates, bots, and workflows are applied organization-wide to support continuous integration and contribution management.

---

## Issue and Pull Request Templates

Layer5 repositories include predefined issue and pull request templates. These templates ensure contributors provide necessary context, enabling faster reviews and better collaboration.

Find them in the `.github` folder of each repository.

### Template Repositories

- `layer5-repo-template`
- `meshery-adapter-template`

---

## Branch Protection

The `master` branch is protected and requires at least one review from a project maintainer before merging.

---

## Organization Secrets

Secrets used across repositories for CI/CD workflows and integrations:

| Secret Name                               | Description                                |
| ----------------------------------------- | ------------------------------------------ |
| `CYPRESS_RECORD_KEY`                      | Cypress Dashboard recording key            |
| `DOCKER_USERNAME`, `DOCKER_PASSWORD`      | Meshery CI Docker credentials              |
| `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`   | Netlify deployment credentials             |
| `RELEASEDRAFTER_PAT`, `RELEASE_NOTES_PAT` | Release management tokens                  |
| `SLACK_BOT_TOKEN`                         | Slack integration token                    |
| `GITHUB_TOKEN`                            | For community repo commits/releases        |
| `NODE_VERSION`                            | Node.js version (`v18` as of Nov 15, 2022) |
| `GO_VERSION`                              | Go version (`1.19`)                        |
| `PROVIDER_TOKEN`                          | Meshery Cloud token                        |
| `NPM_TOKEN`                               | Token for publishing npm packages          |
| `INTEGRATION_SPREADSHEET_CRED`            | Google spreadsheet access                  |
| `PLAYGROUND_CONFIG`                       | Playground kubeconfig                      |
| `METAL_SSH_KEY`, `METAL_AUTH_TOKEN`       | Metal CLI credentials                      |
| `METAL_SERVER1`, `METAL_SERVER2`          | Playground Metal server IDs                |

---

## Issue Labels

Organization-wide standard labels help classify and triage issues:

**Area Labels**

- `area/ci`: CI / Build & release
- `area/docs`: Documentation
- `area/lifecycle`: Install/configure lifecycle
- `area/performance`: Performance optimization
- `area/tests`: Testing & QA
- `area/ui`: User interface
- `area/workloads`: Workload-related
- `area/helm`: Helm charts

**Component Labels**

- `component/api`, `component/mesheryctl`, `component/ui`
- `component/filters`, `component/patterns`, `component/meshsync`
- `component/meshery-perf`

**Issue Type & Status**

- `good first issue`, `help wanted`
- `issue/invite`, `issue/blocked`, `issue/design required`
- `issue/duplicate`, `issue/invalid`, `issue/stale`
- `issue/tweet`, `issue/remind`, `issue/willfix`

**Kind**

- `kind/bug`, `kind/chore`, `kind/enhancement`
- `kind/feature`, `kind/proposal`, `kind/question`
- `kind/child`, `kind/epic`

**Language**

- `language/go`, `language/javascript`, `language/ruby`

**Priority**

- `priority/urgent`, `priority/high`, `priority/low`

**Service Meshes**

- `service-mesh/istio`, `service-mesh/linkerd`, `service-mesh/consul`, etc.

---

## Pull Request Labels

These labels guide workflow execution and review processes:

- `Refactor`, `Fix`, `On-hold`, `Dependabot`, `release`, `Draft`
- `Approved`: PR has passed required approvals
- `help wanted`: Needs contributor assistance
- `needs-ok-to-test`, `awaiting review`

**CI Logic Labels**

- `docs`: Builds Meshery docs site
- `component/mesheryctl`: Builds CLI
- `area/ui`: Builds UI
- `component/meshery-server`: Meshery Server (may be skipped conditionally)

---

## Bots Used

Automation via GitHub bots:

- **Triage Bot** – for assigning and labeling
- **Stale Bot** – for flagging inactive issues
- **Welcome Bot** – greets new contributors
- **DCO Bot** – enforces Developer Certificate of Origin (DCO)

---

## Actions in Use

GitHub Actions manage workflow automation:

- `labeler.yml`: Auto-label issues/PRs
- `label-commenter.yml`: Adds helpful bot comments
- Other custom workflows for CI/CD pipelines

**More info:** [Awesome GitHub Actions](https://github.com/sdras/awesome-actions#pull-requests)

---

_Every contribution to Layer5 benefits from a streamlined, consistent GitHub process. Thank you for being part of it._
