---
title: 📢 Meshery Designs Now Supported on Artifact Hub!
subheading: Working with Meshery Designs is easier than ever  
date: 2024-04-24
author: Chris Carrier, Lee Calcote
categories: 
  - designs
  - artifact-hub
redirect_from: /blog/designs-on-artifact-hub
featured-image: /assets/images/posts/2024-04-09-designs-on-artifacthub/meshery-designs-on-artifact-hub-featured.png
---

As a proud contributor to the Meshery project, I’m thrilled to announce that Artifact Hub has officially recognized Meshery Designs as a native artifact kind. 🎉 Meshery Designs allow you to create, manage, and deploy complex architectures seamlessly, which make them a great addition to the growing collection of Artifact Hub artifacts such as Helm charts, Argo templates, and <a href="https://artifacthub.io/docs/topics/repositories/" target="_blank">many more</a>.

<a href="https://artifacthub.io" target="_blank"><img alt="Artifact Hub Kinds" src="/assets/images/posts/2024-04-09-designs-on-artifacthub/meshery-designs-on-artifact-hub.png" width="50%" align="right" /></a>

## Artifact Hub's first Meshery Designs

[Meshery Catalog](/catalog) is the first repository to have it's Meshery Designs listed on Artifact Hub. Meshery Catalog functions much like a cloud marketplace, providing a user-friendly interface for browsing, discovering, and sharing configurations and patterns for cloud native infrastructure.

Learn more about [Meshery Catalog](https://docs.meshery.io/concepts/catalog).

You can now browse Meshery Designs in the [Artifact Hub search](https://artifacthub.io/packages/search?kind=24&sort=relevance&page=1).

## What Are Meshery Designs?

Meshery Designs provide a powerful way to represent and visualize cloud-native infrastructure. They offer a topological layout of Helm Charts, making it easier for contributors like us to understand the components within a chart and their relationships. Whether you’re a seasoned Kubernetes enthusiast or just diving into the containerized world, Meshery Designs bring clarity and insight.

For more information on how Designs work in Meshery visit the most recent <a href="/blog/lego-bricks-and-lego-instructions" target="_blank">blog post on the topic</a>.

## Getting Started

Ready to add your own Meshery Designs on Artifact Hub? Add your Meshery Designs repository to Artifact Hub by following the [repository setup guide](https://artifacthub.io/docs/topics/repositories/meshery-designs/). At a high-level, you will need:

1. **Repository Hosting**: Meshery Designs repositories should be hosted on GitHub, GitLab, or Bitbucket. The repository URL format is straightforward—just the path to your packages. No git hosting platform-specific parts needed!
2. **Repository Metadata**: A `artifacthub-repo.yml` file that describes the repository and its packages.
3. **Metadata Files**: Each Meshery design file needs an adjoining `artifacthub-pkg.yml` metadata file to fully characterize your Meshery design in a way in which Artifact Hub can understand.
4. **Official Documentation** See the [official Artifact Hub documentation](https://artifacthub.io/docs/topics/repositories/meshery-designs/) for further details.

Once you’ve set up your repository, new versions and packages will be automatically indexed and listed in Artifact Hub.

### Roadmap

Our collaboration with Artifact Hub doesn’t stop here. There is a proposed integration of Meshery Snapshots on the horizon. What does this mean? For every Helm Chart hosted on Artifact Hub, Meshery will create a visual snapshot — a visual diagram that captures the essence of the Helm Chart’s components. Exciting, right?

Follow the progress of this set of features on GitHub:

- Expand Meshery's Integration with Artifact Hub [#9966](https://github.com/meshery/meshery/issues/9966)

Making Meshery Designs available through Artifact Hub is an important milestone and was only possible through excellent support from the Artifact Hub team. We hope that you enjoy using Artifact Hub even more now that Meshery Designs are now available on Artifact Hub as a new artifact kind!