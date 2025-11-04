---
title: The Meshery Umbrella Expands
subheading: Partitioning Platform From Extensions
author: Lee Calcote, Sangram Rath, Matthieu Evrin, Mia Grenell
date: 2025-04-17
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
Meshery, a high-velocity Cloud Native Computing Foundation (CNCF) project, serves as a cloud native management platform facilitating multi-player collaboration in designing and operating modern infrastructure. As part of its ecosystem expansion, Meshery maintainers have opted to partition its numerous GitHub repositories into two distinct organizations: [Meshery](https://github.com/meshery) for the core platform and [Meshery Extensions](https://github.com/meshery-extensions) for extensions. This strategic move aims to enhance the project's structure, manageability, scalability, and community engagement. This post outlines the rationale, suggested governance structure, support expectations, and project mechanics behind this decision, drawing parallels with similar strategies employed by other graduated projects.

## Rationale for Repository Partitioning

The decision to split Meshery’s repositories into two GitHub organizations is driven by several strategic considerations.

### Project Architecture

Meshery's architectural project structure is that of a highly extensible, self-service, management platform. With every feature developed, rigorous consideration is given to extensibility, as is evident by the ubiquity of [extension points](https://docs.meshery.io/extensibility#extension-points).

### Modularity and Focus

Separating the core platform from extensions allows the Meshery core team to concentrate on maintaining and enhancing the primary platform, which includes critical components like Meshery Operator and MeshSync. Extensions, such as adapters for specific cloud native technologies, can be developed and maintained independently by community contributors or specialized teams. This modularity ensures that the core platform remains robust and focused.

### Project Scalability

As Meshery supports over 300 integrations and continues to grow, the number of extensions is expected to increase. Managing these within a single organization could become unwieldy. A separate organization for extensions simplifies permission management, contribution processes, and release cycles, making the ecosystem more scalable.

* **Community Ownership and Maintenance:** Projects within `meshery-extensions` are generally initiated, developed, and maintained by members of the wider Meshery community, rather than the core Meshery maintainers. This allows the ecosystem to scale beyond what the core team can directly support.  
* **Clearer Support Expectations:** Separating community contributions makes it clearer that projects in `meshery-extensions` might have different maintenance levels, release cadences, and support guarantees compared to the core Meshery components. Users understand they are relying on community support for these specific integrations.

### Community Engagement

By providing a dedicated space for extensions, Meshery encourages community contributions. Developers can create and maintain extensions without needing deep involvement in the core platform’s development, fostering a vibrant ecosystem. This approach aligns with Meshery’s emphasis on collaborative design and operation, as highlighted in its documentation (Meshery Overview). In essence, `meshery-extensions` fosters a vibrant ecosystem around Meshery by providing a designated, community-centric space for extensions, integrations, and tooling, keeping the core project focused and manageable while enabling broad community participation.

* **Incubation and Experimentation:** The separate organization acts as an incubator for new ideas, providers, or tooling related to Meshery. Projects might start here and, if they gain significant traction and stability, could potentially be considered for migration or closer integration with the core project.  
* **Ecosystem Growth:** Part of Meshery's power lies in its ability to manage *any* infrastructure via Providers, [Models](https://docs.meshery.io/concepts/logical/models), Adapters, and its other extension points. Since there are countless APIs and services, `meshery-extensions` serves as the place for the community to build and share Providers for less common cloud services, specific SaaS platforms, or even internal company APIs, without needing official endorsement or maintenance from the core maintainers.

## Governance Structure

This expansion allows for different governance models or maintainer structures for community projects compared to the core project. To effectively manage the two organizations, Meshery can adopt a governance model that balances control over the core platform with flexibility for extensions, drawing from its existing governance (Meshery Governance) and Kubernetes’ SIG model.

### Core Platform ([github.com/meshery](https://github.com/meshery))

* **Governance**: Governed by the core Meshery maintainers, as outlined in the project’s governance document. Roles include contributors, organization members, and maintainers, with clear processes for becoming a maintainer (e.g., nomination, voting by existing maintainers).  
* **Responsibilities**: Maintainers review, approve, and merge pull requests, manage releases, and ensure the platform’s stability and alignment with CNCF standards.  
* **Decision-Making**: Decisions are made through consensus among maintainers, with regular meetings and transparent communication via Slack and community forums.

### Extensions ([github.com/meshery-extensions](https://github.com/meshery-extensions))

* **Governance**: Each extension may have its own maintainers, potentially with a lighter governance structure to encourage innovation. A review process by the core team ensures extensions meet quality and compatibility standards.  
* **Maintainer Selection**: Extension maintainers can be nominated by community members or self-nominated, with approval from the core team based on contribution history and technical expertise.  
* **Autonomy**: Extension teams have autonomy over their development processes, provided they adhere to Meshery’s code of conduct and integration guidelines.

### Oversight and Coordination

* **Steering Committee**: A steering committee, comprising core maintainers and representatives from active extension teams, could oversee cross-organization alignment, resolve conflicts, and approve new extensions.  
* **Transparency**: Both organizations should maintain open communication, with public meeting notes, discussion forums, and regular updates to the community.

| Aspect | Core Platform | Extensions |
| ----- | ----- | ----- |
| **Governance** | Structured, led by core maintainers | Flexible, per-extension maintainers |
| **Maintainer Selection** | Nomination, 2/3rds majority vote | Nomination, core team approval |
| **Decision-Making** | Consensus among maintainers | Extension team consensus, core oversight |
| **Communication** | Public meetings, Slack, forums | Public issues, Slack, optional meetings |

## Delineated Support Expectations

Support expectations differ between the core platform and extensions to reflect their distinct roles and maintenance models.

### Core Platform

* **Full Support**: The core team provides regular updates, bug fixes, and feature enhancements, ensuring stability for critical components like Meshery Operator and MeshSync.  
* **Documentation**: Comprehensive guides, such as installation instructions and CLI usage, are maintained (Meshery Documentation).  
* **Community Support**: Active engagement through Slack, forums, and weekly newcomer meetings supports users and contributors.

### Extensions

* **Variable Support**: Support depends on the extension’s maintainers. Core team-maintained extensions (e.g., Istio adapter) receive robust support, while community-maintained ones may have limited support.  
* **Clear Labeling**: Documentation should indicate the support level (e.g., “Official” vs. “Community”) for each extension to set user expectations.  
* **Integration Support**: The core platform provides stable APIs and extension points, ensuring compatibility, with guidelines for developers (Meshery Extensions).

### User Guidance

* **Documentation**: Both core and extension documentation should be accessible, with clear instructions on installation, usage, and troubleshooting.  
* **Community Channels**: Users can seek help via Slack, GitHub issues, or the [discussion forum](https://layer5.io/community).

## Project Mechanics

The mechanics of managing two organizations involve distinct development, testing, and integration processes to ensure a cohesive ecosystem.Development Process

* **Platform**: Follows a structured release cycle with [stable and edge channels](https://docs.meshery.io/project/contributing/build-and-release). Changes undergo rigorous review to maintain stability. Notify platform extenders and system integrators of upcoming changes in the underlying framework to ensure time is afforded to maintain compatibility.  
* **Extensions**: Operate on independent release cycles, allowing rapid iteration. Developers use Meshery’s extension points to integrate with the core platform, following [contribution guidelines](https://docs.meshery.io/project/contributing).

### Integration Testing

* **Compatibility Testing**: Extensions are tested against multiple core platform versions to ensure compatibility, using tools like MeshSync for resource discovery.  
* **Automated Pipelines**: GitHub Actions automate testing and snapshot generation, as seen in extensions like [Helm Kanvas Snapshot](https://meshery.io/blog/2024/meshery-v0.8.0-release).  
* **Performance Testing**: Meshery’s performance management features can be used to benchmark extensions, ensuring they meet efficiency standards.

### Documentation and Onboarding

* **Comprehensive Guides**: Documentation covers core platform usage, extension development, and integration ([Meshery Docs](https://docs.meshery.io)). The Newcomers’ Guide and MeshMates program aid onboarding ([Meshery Community](https://meshery.io/community)).  
* **Catalog and Templates**: Meshery’s catalog of design templates includes extension configurations, promoting best practices ([See Meshery Catalog](https://meshery.io/catalog)).  
* **Community Resources**: Weekly meetings, Slack channels, and the [community handbook](https://docs.meshery.io/community/handbook) provide ongoing support.

## Reflections on Other Projects

Meshery's expansion strategy mirrors successful models in other CNCF projects. BuildPacks and Argo ([https://github.com/argoproj-labs](https://github.com/argoproj-labs)). Crossplane uses [github.com/crossplane](https://github.com/crossplane) for its core platform and [github.com/crossplane-contrib](https://github.com/crossplane-contrib) for community-contributed providers and functions. Similarly, Kubernetes maintains [github.com/kubernetes](https://github.com/kubernetes) for core components and [github.com/kubernetes-sigs](https://github.com/kubernetes-sigs) for Special Interest Groups (SIGs). These separations enable focused development, decentralized governance, and easier contribution, which Meshery aims to emulate.

### Argo and Crossplane

Extension teams have autonomy over their development processes, provided they adhere to Meshery’s code of conduct and integration guidelines, akin to Argo’s labs model where projects operate independently but align with broader project goals. Crossplane’s separation of [github.com/crossplane](https://github.com/crossplane) and [github.com/crossplane-contrib](https://github.com/crossplane-contrib) facilitates a clear distinction between the core platform and community contributions. Providers and functions in the contrib organization allow third-party developers to extend Crossplane’s capabilities without impacting core stability. This model supports Meshery’s approach by demonstrating how a separate organization can foster innovation while maintaining a reliable core.

### Kubernetes

Kubernetes’ use of [github.com/kubernetes](https://github.com/kubernetes) for core components and [github.com/kubernetes-sigs](https://github.com/kubernetes-sigs) for SIGs provides a robust model for decentralized governance. Each SIG operates as a mini-community with its own charter, leadership, and processes, yet aligns with overarching project goals ([Kubernetes Governance](https://github.com/kubernetes/community/blob/master/governance.md)). Meshery’s extension organization can adopt a similar approach, allowing extension teams to function autonomously within defined guidelines.

## Meshery Umbrella Expands

See the current list of repositories under each organization: [meshery org repos](https://github.com/orgs/meshery/repositories) and [meshery-extensions org repos](https://github.com/orgs/meshery-extensions/repositories).

Meshery’s partitioning of repositories into [github.com/meshery](https://github.com/meshery) and [github.com/meshery-extensions](https://github.com/meshery-extensions) is a strategic move to enhance modularity, scalability, and community engagement. By adopting a governance structure that balances control and flexibility, delineating clear support expectations, and implementing robust project mechanics, Meshery can effectively manage its growing ecosystem. Drawing inspiration from graduated projects, this approach positions Meshery to remain a leading CNCF project, empowering collaborative cloud native management.  