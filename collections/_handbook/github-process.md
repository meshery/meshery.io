---
layout: page
title: GitHub Process
description: Meshery’s GitHub Process promotes consistency and efficiency across repositories by standardizing issue and pull request labels, templates, and workflows.
---

Meshery’s GitHub Process emphasizes standardization through labels, templates, bots, and workflows to streamline contributions and reduce CI overhead across its growing repository ecosystem.

---

## Overview

As the number of repositories under the [Meshery GitHub organization](https://github.com/meshery) grows, maintaining consistency becomes essential. Labels, templates, bots, and workflows are applied organization-wide to support continuous integration and contribution management.

For more about Meshery, visit [meshery.io](https://meshery.io).

---

## Issue and Pull Request Templates

Meshery repositories include predefined issue and pull request templates. These templates ensure contributors provide necessary context, enabling faster reviews and better collaboration.

Find them in the `.github` folder of each repository or explore templates on [github.com/meshery](https://github.com/meshery).

### Template Repositories

- [`meshery-repo-template`](https://github.com/layer5io/layer5-repo-template)
- [`meshery-adapter-template`](https://github.com/meshery/meshery-adapter-template)

---

## Branch Protection

The `master` branch is protected and requires at least one review from a project maintainer before merging.

---

<h2>Organization Secrets</h2>
<p>Secrets used across repositories for CI/CD workflows and integrations:</p>

<table class="label-table">
  <thead>
    <tr>
      <th>Secret Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>CYPRESS_RECORD_KEY</code></td><td>Cypress Dashboard recording key</td></tr>
    <tr><td><code>DOCKER_USERNAME</code>, <code>DOCKER_PASSWORD</code></td><td>Meshery CI Docker credentials</td></tr>
    <tr><td><code>NETLIFY_AUTH_TOKEN</code>, <code>NETLIFY_SITE_ID</code></td><td>Netlify deployment credentials</td></tr>
    <tr><td><code>RELEASEDRAFTER_PAT</code>, <code>RELEASE_NOTES_PAT</code></td><td>Release management tokens</td></tr>
    <tr><td><code>SLACK_BOT_TOKEN</code></td><td>Slack integration token</td></tr>
    <tr><td><code>GITHUB_TOKEN</code></td><td>For community repo commits/releases</td></tr>
    <tr><td><code>NODE_VERSION</code></td><td>Node.js version (<code>v18</code> as of Nov 15, 2022)</td></tr>
    <tr><td><code>GO_VERSION</code></td><td>Go version (<code>1.19</code>)</td></tr>
    <tr><td><code>PROVIDER_TOKEN</code></td><td>Meshery Cloud token</td></tr>
    <tr><td><code>NPM_TOKEN</code></td><td>Token for publishing npm packages</td></tr>
    <tr><td><code>INTEGRATION_SPREADSHEET_CRED</code></td><td>Google spreadsheet access</td></tr>
    <tr><td><code>PLAYGROUND_CONFIG</code></td><td>Playground kubeconfig</td></tr>
    <tr><td><code>METAL_SSH_KEY</code>, <code>METAL_AUTH_TOKEN</code></td><td>Metal CLI credentials</td></tr>
    <tr><td><code>METAL_SERVER1</code>, <code>METAL_SERVER2</code></td><td>Playground Metal server IDs</td></tr>
  </tbody>
</table>

---

## Issue & PR Labels

<p>The following list of GitHub issue labels are applied organization-wide. New repositories created as of June 13th, 2020 will contain these labels by default.</p>

<table class="label-table">
  <thead>
    <tr>
      <th>Label</th>
      <th>Description</th>
      <th>Color</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>area/ci</code></td>
      <td>Continuous integration | Build and release</td>
      <td><span style="background-color:#5319e1; color:white; padding:2px 8px; border-radius:4px;">#5319e1</span></td>
    </tr>
    <tr>
      <td><code>area/docs</code></td>
      <td>Improvements or additions to documentation</td>
      <td><span style="background-color:#5319e2; color:white; padding:2px 8px; border-radius:4px;">#5319e2</span></td>
    </tr>
    <tr>
      <td><code>area/lifecycle</code></td>
      <td>Lifecycle management (install, uninstall, configure) related</td>
      <td><span style="background-color:#5319e3; color:white; padding:2px 8px; border-radius:4px;">#5319e3</span></td>
    </tr>
    <tr>
      <td><code>area/performance</code></td>
      <td>Performance management</td>
      <td><span style="background-color:#5319e4; color:white; padding:2px 8px; border-radius:4px;">#5319e4</span></td>
    </tr>
    <tr>
      <td><code>area/tests</code></td>
      <td>Testing / quality assurance</td>
      <td><span style="background-color:#5319e5; color:white; padding:2px 8px; border-radius:4px;">#5319e5</span></td>
    </tr>
    <tr>
      <td><code>area/ui</code></td>
      <td>User Interface</td>
      <td><span style="background-color:#5319e6; color:white; padding:2px 8px; border-radius:4px;">#5319e6</span></td>
    </tr>
    <tr>
      <td><code>area/workloads</code></td>
      <td>Applications / services</td>
      <td><span style="background-color:#5319e7; color:white; padding:2px 8px; border-radius:4px;">#5319e7</span></td>
    </tr>
    <tr>
      <td><code>area/helm</code></td>
      <td>Helm charts issues</td>
      <td><span style="background-color:#5319e8; color:white; padding:2px 8px; border-radius:4px;">#5319e8</span></td>
    </tr>
    <tr>
      <td><code>component/api</code></td>
      <td>API related</td>
      <td><span style="background-color:#3a0485; color:white; padding:2px 8px; border-radius:4px;">#3a0485</span></td>
    </tr>
    <tr>
      <td><code>component/mesheryctl</code></td>
      <td>Meshery CLI related</td>
      <td><span style="background-color:#3a0486; color:white; padding:2px 8px; border-radius:4px;">#3a0486</span></td>
    </tr>
    <tr>
      <td><code>component/ui</code></td>
      <td></td>
      <td><span style="background-color:#3a0486; color:white; padding:2px 8px; border-radius:4px;">#3a0486</span></td>
    </tr>
    <tr>
      <td><code>component/filters</code></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><code>component/patterns</code></td>
      <td></td>
      <td><span style="background-color:#3a0486; color:white; padding:2px 8px; border-radius:4px;">#3a0486</span></td>
    </tr>
    <tr>
      <td><code>component/meshsync</code></td>
      <td>MeshSync related</td>
      <td><span style="background-color:#7a0487; color:white; padding:2px 8px; border-radius:4px;">#7a0487</span></td>
    </tr>
    <tr>
      <td><code>component/meshery-perf</code></td>
      <td>Meshery-perf related</td>
      <td><span style="background-color:#7a0488; color:white; padding:2px 8px; border-radius:4px;">#7a0488</span></td>
    </tr>
    <tr>
      <td><code>good first issue</code></td>
      <td>Good for newcomers</td>
      <td><span style="background-color:#7057ff; color:white; padding:2px 8px; border-radius:4px;">#7057ff</span></td>
    </tr>
    <tr>
      <td><code>help wanted</code></td>
      <td>Extra attention is needed</td>
      <td><span style="background-color:#35f48e; color:white; padding:2px 8px; border-radius:4px;">#35f48e</span></td>
    </tr>
        <tr>
      <td><code>kind/bug</code></td>
      <td>Something isn't working</td>
      <td><span style="background-color:#d73a4a; color:white; padding:2px 8px; border-radius:4px;">#d73a4a</span></td>
    </tr>
    <tr>
      <td><code>kind/cleanup</code></td>
      <td>Cleanup / code refactoring</td>
      <td><span style="background-color:#bfdadc; color:black; padding:2px 8px; border-radius:4px;">#bfdadc</span></td>
    </tr>
    <tr>
      <td><code>kind/documentation</code></td>
      <td>Documentation improvement</td>
      <td><span style="background-color:#0075ca; color:white; padding:2px 8px; border-radius:4px;">#0075ca</span></td>
    </tr>
    <tr>
      <td><code>kind/feature</code></td>
      <td>New feature or request</td>
      <td><span style="background-color:#a2eeef; color:black; padding:2px 8px; border-radius:4px;">#a2eeef</span></td>
    </tr>
    <tr>
      <td><code>kind/performance</code></td>
      <td>Performance related issue</td>
      <td><span style="background-color:#f9d0c4; color:black; padding:2px 8px; border-radius:4px;">#f9d0c4</span></td>
    </tr>
    <tr>
      <td><code>priority/urgent</code></td>
      <td>Requires immediate attention</td>
      <td><span style="background-color:#ff0000; color:white; padding:2px 8px; border-radius:4px;">#ff0000</span></td>
    </tr>
    <tr>
      <td><code>priority/high</code></td>
      <td>High priority</td>
      <td><span style="background-color:#e11d48; color:white; padding:2px 8px; border-radius:4px;">#e11d48</span></td>
    </tr>
    <tr>
      <td><code>priority/medium</code></td>
      <td>Medium priority</td>
      <td><span style="background-color:#facc15; color:black; padding:2px 8px; border-radius:4px;">#facc15</span></td>
    </tr>
    <tr>
      <td><code>priority/low</code></td>
      <td>Low priority</td>
      <td><span style="background-color:#22c55e; color:white; padding:2px 8px; border-radius:4px;">#22c55e</span></td>
    </tr>
    <tr>
      <td><code>size/XS</code></td>
      <td>Extra small task</td>
      <td><span style="background-color:#b4f8c8; color:black; padding:2px 8px; border-radius:4px;">#b4f8c8</span></td>
    </tr>
    <tr>
      <td><code>size/S</code></td>
      <td>Small task</td>
      <td><span style="background-color:#a0e7e5; color:black; padding:2px 8px; border-radius:4px;">#a0e7e5</span></td>
    </tr>
    <tr>
      <td><code>size/M</code></td>
      <td>Medium task</td>
      <td><span style="background-color:#ffc6ff; color:black; padding:2px 8px; border-radius:4px;">#ffc6ff</span></td>
    </tr>
    <tr>
      <td><code>size/L</code></td>
      <td>Large task</td>
      <td><span style="background-color:#ffffd1; color:black; padding:2px 8px; border-radius:4px;">#ffffd1</span></td>
    </tr>
    <tr>
      <td><code>size/XL</code></td>
      <td>Extra large task</td>
      <td><span style="background-color:#ffb5a7; color:black; padding:2px 8px; border-radius:4px;">#ffb5a7</span></td>
    </tr>
    <tr>
      <td><code>status/blocked</code></td>
      <td>Cannot proceed due to blockers</td>
      <td><span style="background-color:#f87171; color:white; padding:2px 8px; border-radius:4px;">#f87171</span></td>
    </tr>
    <tr>
      <td><code>status/in-progress</code></td>
      <td>Currently being worked on</td>
      <td><span style="background-color:#60a5fa; color:white; padding:2px 8px; border-radius:4px;">#60a5fa</span></td>
    </tr>
    <tr>
      <td><code>status/review</code></td>
      <td>Waiting for review</td>
      <td><span style="background-color:#34d399; color:black; padding:2px 8px; border-radius:4px;">#34d399</span></td>
    </tr>
    <tr>
      <td><code>status/ready-to-merge</code></td>
      <td>Approved and ready for merge</td>
      <td><span style="background-color:#fbbf24; color:black; padding:2px 8px; border-radius:4px;">#fbbf24</span></td>
    </tr>
    <tr>
      <td><code>status/merged</code></td>
      <td>Pull request has been merged</td>
      <td><span style="background-color:#a78bfa; color:white; padding:2px 8px; border-radius:4px;">#a78bfa</span></td>
    </tr>
    <tr>
      <td><code>status/closed</code></td>
      <td>Issue or PR is closed</td>
      <td><span style="background-color:#9ca3af; color:white; padding:2px 8px; border-radius:4px;">#9ca3af</span></td>
    </tr>
  </tbody>
</table>

## Pull Request Labels

These labels guide workflow execution and review processes:

- `Refactor`
- `Fix`
- `On-hold`
- `Dependabot`
- `release`
- `Draft`
- `Approved`: PR has passed required approvals
- `help wanted`: Needs contributor assistance
- `needs-ok-to-test`
- `awaiting review`

### CI Logic Labels

- `docs`: Builds [Meshery Docs](https://docs.meshery.io) site
- `component/mesheryctl`: Builds CLI
- `area/ui`: Builds UI
- `component/meshery-server`: Meshery Server (conditionally built)

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

_Meshery is an open source, community-driven project. This GitHub process ensures scalable and welcoming collaboration. Learn more at **[meshery.io](https://meshery.io)**._
