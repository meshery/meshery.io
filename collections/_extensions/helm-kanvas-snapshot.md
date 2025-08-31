---
layout: single-page-extension
item-type: extension
name: Helm Plugin for Kanvas Snapshot 
kind: GitOps
userName: Meshery Authors
type: Configuration
compatibility: 
  - aws
  - kubernetes
  - helm
extensionId: 2d54f372-10e5-4c4e-8d23-b9c35c68ce96
whiteImage: /assets/images/helm-dark.svg
colorImage: /assets/images/helm-white.svg
image-light: /assets/images/helm-dark.svg
extensionInfo: |
  The Kanvas Snapshot Helm Plugin allows users to generate a visual snapshot of their Helm charts directly from the command line. It simplifies the process of creating Meshery Snapshots, providing a visual representation of packaged Helm charts. This plugin integrates with Meshery Cloud and GitHub Actions to automate the workflow of snapshot creation, which is especially useful for Helm users who need to quickly visualize their chart configurations.

  Helm charts can be complex, especially when custom configurations are applied via values.yaml files. This Meshery extension bridges the gap between Helm chart configurations and their visual representation by converting Helm charts into Kanvas Snapshots. These snapshots can be received either via email or as a URL displayed directly in the terminal.

extensionCaveats: |
  - Snapshot Generation: Create visual snapshots of Helm charts, complete with associated resources.
  - Synchronous/Asynchronous Delivery: Choose between receiving snapshots via email or directly in the terminal.
  - Seamless Integration: Leverages Meshery Cloud and GitHub Actions to handle snapshot rendering.
  - Support for Packaged Charts: Works with both packaged .tar.gz charts and unpackaged Helm charts.

docsURL: 'https://docs.meshery.io/extensions/helm-kanvas-snapshot'
---
