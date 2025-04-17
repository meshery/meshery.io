---
title: Meshery Ecosystem Expansion
subheading: Partitioning Platform From Extensions
author: Meshery Authors
date: 2025-04-18
categories: 
  - meshery
  - open-source
  - governance
  - extensions
featured-image: /assets/images/posts/2025/meshery-extensions-org/meshery-extensions-github-dark.png
permalink: /blog/2025/meshery-ecosystem-expansion
---
<link href="https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@600&display=swap" rel="stylesheet">

<style type="text/css">
  .highlighted-text {
    font-family: 'Baloo Bhaina 2', cursive;
    text-align: center;
  }
  ul, li { line-height: 1rem;}
  ol li { line-height: 1rem;}
  .circular-callout {
    height: content-fit;
    text-align: center;
    align-content: center;
    block-size: fit-content;
    background-color: var(--color-primary-super-dark);
    > p {
      margin: 1rem 3rem;
      color: var(--color-primary-dark-light);
    }
  }
</style>

Okay, let's break down the purpose of the [meshery-extensions](https://github.com/meshery-extensions) GitHub organization in the context of the Meshery project.

The primary reason for having a separate `meshery-extensions` organization is to **host and manage community-contributed and maintained components** related to the Meshery ecosystem, distinct from the core Meshery project and officially supported providers typically found in the main [Meshery](https://github.com/meshery) organization.

The collective rationale of Meshery Maintainers can be articulated as:

1. **Community Ownership and Maintenance:** Projects within `meshery-extensions` are generally initiated, developed, and maintained by members of the wider Meshery community, rather than the core Meshery maintainers. This allows the ecosystem to scale beyond what the core team can directly support.

2. **Scope and Focus:** The main `Meshery` organization focuses on the core Meshery runtime [meshery/meshery](https://github.com/meshery/meshery) repository and often hosts the primary, officially supported Models (like `provider-aws`, `provider-gcp`, `provider-azure`). `meshery-extensions` provides a dedicated space for a broader range of integrations, tools, and experiments.

3. **Provider Ecosystem Growth:** Meshery's power lies in its ability to manage *any* infrastructure via Providers. Since there are countless APIs and services, `meshery-extensions` serves as the place for the community to build and share Providers for less common cloud services, specific SaaS platforms, or even internal company APIs, without needing official endorsement or maintenance from the core maintainers.

4. **Incubation and Experimentation:** The separate organization acts as an incubator for new ideas, providers, or tooling related to Meshery. Projects might start here and, if they gain significant traction and stability, could potentially be considered for migration or closer integration with the core project (though this isn't always the goal or outcome).

5. **Clearer Support Expectations:** Separating community contributions makes it clearer that projects in `meshery-extensions` might have different maintenance levels, release cadences, and support guarantees compared to the core Meshery components. Users understand they are relying on community support for these specific integrations.

6. **Governance:** It allows for potentially different governance models or maintainer structures for community projects compared to the core project.

In essence, `meshery-extensions` fosters a vibrant ecosystem around Meshery by providing a designated, community-centric space for extensions, integrations, and tooling, keeping the core project focused and manageable while enabling broad community participation.

## Partitioning Platform from Extension

See the curent list of repositories under each organization: [meshery org repos](https://github.com/orgs/meshery/repositories) and [meshery-extensions org repos](https://github.com/orgs/meshery-extensions/repositories).

