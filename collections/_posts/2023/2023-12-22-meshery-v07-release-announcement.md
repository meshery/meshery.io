---
date: 2023-12-22 10:30:05 -0530
subheading: Release Announcement
title: Meshery v0.7
author: Jeremiah Obikoya, Pranav Singh, Hauwa'u Ismail
categories:
  - announcements
  - releases
  - milestones
layout: post
featured-image: /assets/images/posts/2023/2023-12-22-v07-release/meshery-v07-release-announcement.webp
redirect_from: /blog/meshery-v07-release-announcement
---
v0.7.0 is the latest and most significant release of Meshery, the CNCF’s cloud native manager. Included in this release is GitOps-enablement, a complete GraphQL API (in addition to the REST API), completely new CLI commands, a number of new resources with an internal capabilities registry, 200+ new integrations, and much more is now generally available.

With loads of feedback from Meshery users, Meshery contributors have been extremely hard at work. We’ve been working so hard, and with so many contributors, that Meshery is the 10th fastest-growing project out of 200+ CNCF projects!!

No component of Meshery was left untouched in this release. Major architectural improvements to each component have been made. Let’s explore the highlights.

## New Feature Highlights

- [Meshery Catalog](/catalog)
- [Multi-cluster Management](#enhanced-multi-cluster-support-for-environments)
- [Kubernetes Management with Design Deployment Dry-run](#kubernetes-management-with-design-deployment-dry-run)
- [Messaging Framework and Enhanced Notification Center](#mesherys-messaging-framework-notification-center)
- [Meshery Screenshots Service](#meshery-screenshot-service-automated-screenshots-for-your-gitops-pipelines)
- [Capabilities Registry and Meshery Models](#capabilities-registry-and-meshery-models)
- [New Meshery Extension Points](#new-meshery-extension-points)
- [Multi-tenancy with Organizations and Environments](#multi-tenancy-with-organizations-and-environments)
- [Gain Insights with the New System Dashboard](#gain-insights-with-the-new-system-dashboard)
- [Expanded Object Synchronization with MeshSync](#expanded-object-synchronization-with-meshsync)
- [WASM Envoy Filter Management](#efficient-wasm-envoy-filter-management)
- [Basic Support for Tiered Discovery](#)
- [Migration from OAM to Meshery Models](#)
- [New Plugins Support](#)
- [Certificate support in Performance Profiles](#)
- [Dry Running Design Deployments](#)

### Meshery Catalog: Cloud native templates and deployment best practices

[Meshery Catalog](/catalog) is your marketplace for configurations, filters, and patterns for cloud native infrastructure, simplifying deployment, observation, traffic management, and more.

<img alt="Meshery Extension Points" src="/assets/images/posts/2023/2023-12-22-v07-release/meshery-catalog-cards.png" width="100%" />

Now, you can streamline your development and operation process by using any services or designs in our catalog and selecting your desired technology without building from scratch.

Maintain a consistent design across your infrastructure and also have access to some of the best practices for creating cloud native designs by enabling the Meshery Catalog. If you don't see a design you need, you can easily create and publish your own to the catalog.

### Enhanced Multi-Cluster Support for Environments

Meshery now supports multi-cluster management. Effortlessly manage multiple Kubernetes clusters from a single Meshery deployment with enhanced multi-cluster support. Say goodbye to complexity and hello to operational efficiency. With Meshery, you have the control to simplify your multi-cluster configurations.

Take full control of your clusters with Meshery and avoid any issues if any one cluster goes down.

### Kubernetes Management with Design Deployment Dry-run

Deployment dry-runs for designs are here to make your Kubernetes management smoother. First validate, then dry-run, and you can safeguard your deployments, ensuring error-free operations and peace of mind.

Meshery integration with Kanvas enables you to visualize your dry-run testing process and be aware of everything.

### Meshery's Messaging Framework: Notification Center

<a href="https://docs.meshery.io/guides/events-management">
  <img alt="Meshery Extension Points" src="/assets/images/posts/2023/2023-12-22-v07-release/notification-center-overview.png" width="100%" />
</a>

Meshery ensures you're equipped with the insights you need right in the notification tab, using advanced filters to address deployment issues or errors efficiently.

Never miss out on any issue with your cloud infrastructure.

Learn more about [Notification Center](https://docs.meshery.io/guides/events-management)

### Meshery Screenshot Service: Automated Screenshots for Your GitOps Pipelines

Meshery's Screenshot Service captures screenshots of your infrastructure changes on every commit and visually displays the changes on your pull requests. This enables you to easily review changes and ensure that your infrastructure is deployed as expected. 

Read more about [Meshery Screenshot Service](https://docs.meshery.io/extensions/snapshot).

### Capabilities Registry and Meshery Models

Meshery's new capabilities registry captures the ability of your Meshery deployment to integrate with a number of different cloud native technologies. This registry uses Models, Components, Connections, Relationships, and Policies to articulate the capabilities of your Meshery deployment.

A new capability register browser is added to Meshery's UI to help you explore the capabilities of your Meshery deployment. This can be explored under the settings page of your Meshery UI.

Read more about [Meshery Models](https://docs.meshery.io/concepts/logical/models)

### New Meshery Extension Points

A handful of new extension points have been added to Meshery in this release.

- User Account Management: This enables you to manage your user account, your organization, teams, and users.
- Collaborators: the ability for Remote Providers to offer real-time presence of Meshery users to facilitate user collaboration and awareness.

Read more about [Meshery Extension Points](https://docs.meshery.io/extensibility#extension-points)

### Multi-tenancy with Organizations and Environments

Meshery now supports multi-tenancy through the use of Organizations. This allows multiple users of your organization to share resources like connections and configurations. This not only helps facilitate collaboration but also ensures that your organization is using the same configurations and connections across your organization.

Environment is a logical group of your organization's resources. This allows you to group your resources by environment. For example, you can have a production environment and a staging environment. This allows you to easily switch between environments and ensure that you are using the correct resources for your environment. Each of your environments can have a number of connections, like Kubernetes clusters, Prometheus, Grafana, Jaeger, etc.

Read more about [Environments](https://docs.meshery.io/concepts/logical/environments)

### Gain Insights with the New System Dashboard

With Meshery's new System Dashboard, you can monitor and manage your system with ease. Gain insights into your cloud native infrastructure and make informed decisions. This dashboard also provides a high-level summarization of your Meshery's deployment capabilities, that is, registered Meshery models, components, connections, relationships, and policies.

The new dashboard comes with enhanced fine-tuned summaries of your Kubernetes workloads. You can now filter your workloads based on all types of Kubernetes API resources.

### Expanded Object Synchronization with MeshSync

MeshSync is now capable of discovering all types of Kubernetes API resources. This is further enhanced by the ability to fingerprint the discovered resources with the help of knowledge of different cloud native technologies through Meshery's new capabilities registry.

<a href="https://docs.meshery.io/concepts/architecture/operator">
  <img alt="Meshery Extension Points" src="/assets/images/posts/2023/2023-12-22-v07-release/meshery-operator-v07.png" width="100%" />
</a>

Meshery also captures the discovered CRDs in the available Kubernetes clusters through MeshSync enhanced discovery capabilities. This allows Meshery to register these CRDs as Meshery Models and capture them inside the capabilities registry. This is known as **Dynamic Registration** of Meshery Models.

Read more about [MeshSync](https://docs.meshery.io/concepts/architecture/meshsync).

### Efficient WASM Envoy Filter Management

Manage and customise WebAssembly (WASM) Envoy filters efficiently through Meshery's UI and CLI.

With Meshery, you can:

- Design a WASM Envoy Filter deployments
- Import or clone an existing filter
- Publish your custom filter binaries and filter configurations to Meshery Catalog
- View available filters from the web-based UI or CLI

These actions are available from both of Meshery’s clients: UI and CLI.

Gain control over your infrastructure with ease within Meshery.

Read more about [WASM Envoy Filter Management](https://docs.meshery.io/tasks/filter-management)

#### Kubernetes Multi-Cluster Management

Meshery now supports multi-cluster management. This allows you to manage multiple Kubernetes clusters from a single Meshery deployment.

<h2>Deprecations</h2><a name="deprecations"></a>

- Meshery Adapter for Citrix Service Mesh
- Meshery Adapter for Open Service Mesh
- Service Mesh Interface Conformance

2023 saw the passing of more than a couple of CNCF projects, two of which had integrations supported by Meshery: Open Service Mesh and Service Mesh Interface.

## What’s Next? v0.8 Roadmap

Meshery Maintainers are dedicated to enhancing your ability to deliver engineering platforms to your teams. Let us know how we can continue serving you best by weighing in on the v0.8 Roadmap. Let your voice be heard (please).

[v0.8.0 Release Planning](/community#discussion-forums/t/meshery-v0-8-0-roadmap/4336)

*Try the latest v0.7.0 features of Meshery at [play.meshery.io](https://play.meshery.io).*
