---
layout: single-page-extension
item-type: extension
name: Kubectl Plugin for MeshSync Snapshot 
kind: GitOps
userName: Meshery Authors
type: Configuration
compatibility: 
  - kubernetes
  - kanvas
#extensionId: 2d54f372-10e5-4c4e-8d23-b9c35c68ce96
logo: /assets/images/logos/meshsync.svg
whiteImage: /assets/images/logos/meshsync.svg
colorImage: /assets/images/logos/meshsync-white.svg
image-light: /assets/images/logos/meshsync-white.svg
extensionInfo: |
  The MeshSync Snapshot kubectl plugin allows you to capture the state of your clusters directly from the command line. This plugin simplifies the process of deploying <a href="https://docs.meshery.io/concepts/architecture/meshsync">MeshSync</a> to your clusters, but instead starts and stops an instance of MeshSync long enough to capture a list and details of your cluster's resources.

  This snapshot of state of your Kubernetes clusters can then be imported into Meshery for offline management of your systems, so that you can easy perform static configuration and visualization of your clusters. This Meshery extension bridges the gap between full-blown Meshery Operator deployment with MeshSync and Meshery Broker to each Kubernetes cluster and the enablement of your Meshery Server deployment's understand of the state and configuration of your infrastructure.

extensionCaveats: |
  - Simplify Networking: Overcome common networking challenges between your infrastructure (e.g Kuberentes cluster) and your Meshery Server deployment. - Simplify Access Level Requirements: Overcome the need privileged, write access required by a full Meshery deployment, using read-only access to generate a MeshSync snapshot.
  - Snapshot Capture: Works with a single manifest of a single resource, for entire namespaces, or single cluster visualizations.

docsURL: 'https://docs.meshery.io/extensions/kubectl-meshsync-snapshot'
---

{{ page.extensionCaveats }}
