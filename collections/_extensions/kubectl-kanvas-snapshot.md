---
layout: single-page-extension
item-type: extension
name: Kubectl Plugin for Kanvas Snapshot 
kind: GitOps
userName: Meshery Authors
type: Configuration
compatibility: 
  - kubernetes
  - kanvas
# extensionId: 2d54f372-10e5-4c4e-8d23-b9c35c68ce96
whiteImage: /assets/images/kubernetes-namespace.svg
colorImage: /assets/images/kubernetes-namespace.svg
image-light: /assets/images/kubernetes-namespace.svg
status: coming-soon
extensionInfo: |
  The Kanvas Snapshot kubectl Plugin allows users to generate a visual snapshot of their Helm charts directly from the command line. It simplifies the process of creating Kanvas Snapshots, providing a visual representation of Kubernetes manifests. This plugin is especially useful for Kubernetes users who need to quickly visualize their cluster configurations.

  Kubernetes manifests, particularly collections of them, can be complex. This Meshery extension bridges the gap between Kubernetes cluster and workflow configurations and their visual representation into Kanvas Snapshots. These snapshots can be received either via email or as a URL displayed directly in the terminal.

extensionCaveats: |
  - Snapshot Generation: Create visual snapshots of Kubernetes manifests, complete with associated resources.
  - Synchronous/Asynchronous Delivery: Choose between receiving snapshots via email or directly in the terminal.
  - Seamless Integration: Leverages Layer5 Cloud and GitHub Actions to handle snapshot rendering.
  - Support for Kubernetes manifests: Works with a single manifest of a single resource, for entire namespaces, or single cluster visualizations.

docsURL: 'https://docs.meshery.io/extensions/kubectl-kanvas-snapshot'
---