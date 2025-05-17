---
title: Helm Kanvas Snapshot
subheading: Visualize Helm Charts as Meshery Designs with helm-kanvas-snapshot
permalink: 
author: Ijeoma Eti, Lee Calcote
categories: 
  - Design
  - meshery
  - Helm
redirect_from: /blog/meshery-helm-kanvas-snapshot
featured-image: /assets/images/posts/2025-3-25-meshery-reaches-7000-stars/meshery-reaches-7000-stars.png
date: 2025-05-13
---


Helm Kanvas Snapshot is one of Meshery's extension that generates a snapshot of the visual representation a Helm chart. It makes it easier to understand, review and share your kubernetes deployments with peers without needing them to go through YAML files or set up a cluster. Showing a clear picture of every Kubernetes object in your chart, their component, and how they relate to each other all in a single, shareable view.

At the core of this process is the [Meshery Designs](https://docs.meshery.io/concepts/logical/designs). A Meshery Design is a declarative representation of your infrastructure. It captures each component of your deployment, its properties, how the they are connected and interact with each other.

As the name implies, Helm kanvas snapshot plugin can only use **Helm** as the deployment source. When you use the plugin, [Kanvas Snapshot](https://docs.meshery.io/extensions/kanvas-snapshot) takes your chart, renders the manifests, and generates a Design from it based on Meshery’s declarative syntax. That Design is then stored and rendered as an immutable snapshot you can view through a public link.

The Helm kanvas snapshot is useful in many ways. It doesn't require you to be authenticated to use the plugin, so it's very quick to get started. Also, if you provide a valid email address, the snapshot is sent directly to your inbox after it is generated, this is most helpful as it can take a few moment to render. One thing to note is that, Once created, the snapshot is immutable. This makes it a stable reference that you can share in Slack, attach to pull requests, or store alongside your deployment documentation.

To get started, you’ll need to ensure Helm is installed on your machine, You can follow the official Helm documentation to install Helm for your system. To verify run the command below;

```bash
helm version
```

The plugin supports Linux, macOS, and Windows. So, Once Helm is installed, you can install the plugin using:

```bash
helm plugin install https://github.com/meshery-extensions/helm-kanvas-snapshot
```

To generate a snapshot, use the following command:

```bash
helm helm-kanvas-snapshot -f helm helm-kanvas-snapshot -f https://meshery.io/charts/meshery-v0.8.12.tgz --name meshery-chart
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

* [Meshery Designs Documentation](https://docs.meshery.io/concepts/logical/designs)
* [Kanvas Snapshot Documentation](https://docs.meshery.io/extensions/kanvas-snapshot)
* [Helm Kanvas Snapshot Documentation](https://docs.meshery.io/extensions/helm-kanvas-snapshot)
* [Helm Kanvas Snapshot Plugin Repository](https://github.com/meshery-extensions/helm-kanvas-snapshot)

### Summary

In summary, the Helm Kanvas Snapshot plugin gives you a fast and reliable way to visualize Helm chart deployments. By converting charts into Meshery Designs and generating snapshots, you can improve collaboration and maintain better visibility into your infrastructure.

