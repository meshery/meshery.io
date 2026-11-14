---
title: Helm Kanvas Snapshot
subheading: Visualize Helm Charts as Meshery Designs with helm kanvas snapshot
permalink: 
author: Ijeoma Eti, Lee Calcote
categories: 
  - Design
  - meshery
  - Helm
redirect_from: /blog/meshery-helm-kanvas-snapshot
featured-image: /assets/images/posts/2025-05-13-meshery-helm-kanvas-snapshot/Helm Kanvas.png
date: 2025-05-13
---

### Introduction

Helm Kanvas Snapshot is one of Meshery's extension that generates a snapshot of the visual representation a Helm chart. It makes it easier to understand, review and share your kubernetes deployments with peers without needing them to go through YAML files or set up a cluster. It provides a clear picture of every Kubernetes object in your chart, their component, and how they relate to each other all in a single, shareable view.

### Meshery Designs

At the core of this process is the <a href="https://docs.meshery.io/concepts/logical/designs" target="_blank" rel="noopener noreferrer">Meshery Designs</a>. A Meshery Design is a declarative representation of your infrastructure. It captures each component of your deployment, its properties, how the they are connected and interact with each other.

### How Helm Kanvas Snapshot Works

Helm kanvas snapshot plugin can only use **Helm Charts** as the deployment source. When you use the plugin, <a href="https://docs.meshery.io/extensions/kanvas-snapshot" target="_blank" rel="noopener noreferrer">Kanvas Snapshot</a> takes your chart, renders the manifests, and generates a Design from it based on Meshery’s declarative syntax. That Design is then stored and rendered as an immutable snapshot you can view through a public link.

The Helm kanvas snapshot is useful in many ways. You can start using this plugin without authentication, making it easy to get started. If you provide an email address, the snapshot is delivered directly to your inbox after generation, which is particularly helpful since rendering can take a few moments. Once created, the snapshot is immutable. This makes it a stable reference that you can share in Slack, attach to pull requests, or store alongside your deployment documentation.

### Getting Started

Start by ensuring Helm is installed on your machine, If it’s not present, you can follow the official <a href="https://helm.sh/docs/intro/install" target="_blank" rel="noopener noreferrer">Helm documentation</a> to install Helm for your system. To verify, run the command below

```bash
helm version
```

The plugin supports Linux, MacOS, and Windows. Once Helm is installed, you can install the plugin using:

```bash
helm plugin install https://github.com/meshery-extensions/helm-kanvas-snapshot
```

To generate a snapshot, use the following command:

```bash
helm helm-kanvas-snapshot -f https://meshery.io/charts/meshery-v0.8.12.tgz --name meshery-chart
```

This command takes your Helm chart and creates a Meshery Design snapshot from it. You’ll get a link to the snapshot in your terminal. If you provided an email, the snapshot link will also be sent to your inbox.

### What each flag means:
**-f, --file (required)** 
  The path or URL to your Helm chart. This is the deployment source the plugin will render and convert into a snapshot.

**-e, --email (optional but recommended)**  
  Your email address. If you provide this, the snapshot link will be sent to you once it’s ready. Useful if the chart is large and rendering takes time.

**--name (optional)**  
  A custom name for the Meshery Design. If you don't set this, a default name will be generated based on the chart.

**-h** 
  Shows help information about how to use the helm-kanvas-snapshot plugin.


### Helpful links

- <a href="https://docs.meshery.io/concepts/logical/designs" target="_blank" rel="noopener noreferrer">Meshery Designs Documentation</a>  
- <a href="https://docs.meshery.io/extensions/kanvas-snapshot" target="_blank" rel="noopener noreferrer">Kanvas Snapshot Documentation</a>  
- <a href="https://docs.meshery.io/extensions/helm-kanvas-snapshot" target="_blank" rel="noopener noreferrer">Helm Kanvas Snapshot Documentation</a>  
- <a href="https://github.com/meshery-extensions/helm-kanvas-snapshot" target="_blank" rel="noopener noreferrer">Helm Kanvas Snapshot Plugin Repository</a>


### Summary

Helm Kanvas Snapshot plugin gives you a fast and reliable way to visualize Helm chart deployments. By converting charts into Meshery Designs and generating snapshots, you can improve collaboration and maintain better visibility into your infrastructure.

