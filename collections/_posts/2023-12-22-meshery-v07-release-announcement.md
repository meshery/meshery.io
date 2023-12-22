---
date: 2023-12-22 10:30:05 -0530
heading: Meshery v0.7
title: Release Announcement
author_contributor: Jeremiah Obikoya
categories:
  - Meshery
  - Open Source
layout: post
permalink: /blog/meshery-v07-release-announcement
---

v0.7.0 is the latest and most significant release of Meshery, the CNCF’s cloud native manager. In this latest release, ?? new feature areas entered beta. GitOps enabled, two API frameworks, completely new CLI commands, 200+ new integrations, and more are now generally available.

With loads of feedback from Meshery users, Meshery contributors have been extremely hard at work. We’ve been working so hard and with so many contributors, that Meshery is the 10th fastest growing project out of 200+ CNCF projects!!

No component of Meshery was left untouched in this release. Major architectural improvements to each component have been made. Let’s explore the highlights.

## New Feature Highlights

- [Meshery Catalog](/catalog)
- [Messaging Framework and Enhanced Notification Center]()
- [Scheduled Workflow]()
- [Basic Support for Tiered Discovery]()
- [Migration from OAM to Meshery Models]()
- [Meshery Screenshots Service](#meshery-screenshot-service)
- [New Plugins Support: Collaborators Extension Point]()
- [WASM Envoy Filter Management]()
- [SSL Support for Fortio]()
- [SMI Deprecation](#smi-deprecation)

### Meshery Catalog: Cloud native templates and deployment best practices

[Meshery Catalog](/catalog) is your marketplace for `configurations, filters, and patterns for cloud-native infrastructure, simplifying deployment, observation, traffic management, and more.

![meshery catalog](/assets/posts/v07-release/meshery-catalog-cards.png)

Now, you can streamline your development and operation process by using any services or designs in our catalog and selecting your desired technology without building from scratch.

Maintain a consistent design across your infrastructure and also have access to some of the best practices for creating cloud-native designs by enabling the Meshery Catalog. 

Can’t find a design you need in the catalog, then you can easily create and publish it to the catalog.
Enhanced Multi-Cluster Support for Streamlined Environments:
Effortlessly manage multiple Kubernetes clusters with enhanced multi-cluster support. Say goodbye to complexity and hello to operational efficiency. With Meshery, you have the control to simplify your multi-cluster configurations.

Take full control of your clusters with Meshery and avoid any issues if any one cluster goes down.

### Seamless Kubernetes Management with Design Deployment Dry-run:

Design Deployment Dry-run is here to make your Kubernetes management smoother. With the power of dry-run testing, you can safeguard your deployments, ensuring error-free operations and peace of mind.

Meshery integration with MeshMap enables you to visualize your dry-run testing process and be aware of everything.

### Meshery's Messaging Framework: Notification Center

<a href=”/assets/images/posts/v07-release/notification-center.png”><img src=”/assets/images/posts/v07-release/notification-center.png” width=”50%” /></a>

Meshery ensures you're equipped with the insights you need right in the notification tab, using advanced filters to address deployment issues or errors efficiently.

Never miss out on any issue with your cloud infrastructure.

### Meshery Screenshot Service: Automated Screenshots for Your GitOps Pipelines

Meshery's Screenshot Service captures screenshots of your infrasture changes on every commit and visuallay displays the changes on your pull requests. This enables you to easily review changes and ensure that your infrastructure is deployed as expected.
Read more at [Meshery Screenshot Service](/extensions/snapshot).

### Capabilities Registry / Formation of Models

Meshery's new capabilities registry captures the ability of 


Schema-driven design

New Extension Points:


Multi-tenancy with Organizations and Environments

### Gain Insights with the New System Dashboard

With Meshery's new System Dashboard, you can monitor and manage your system with ease. Gain insights into your service mesh's performance and health.

Get a graphical display of essential metrics and drop the best insight from your cloud infrastructure data.

### Expanded Object Synchronization with MeshSync

MeshSync now offers an expanded scope of object synchronization. Synchronize a broader range of objects and ensure data consistency in your service mesh operations and clusters.

Whether you are building a new infrastructure from scratch or managing an existing one, MeshSync watches your resources, providing up-to-date snapshots of your clusters while capturing essential characteristics you specify.

### Efficient WASM Envoy Filter Management in Meshery UI and CLI

Manage and customise WebAssembly (WASM) Envoy filters efficiently through Meshery's UI and CLI.

With Meshery, you can:

- Design a WASM Envoy Filter deployments
- Import or clone an existing filter
- Publish your custom filter binaries and filter configurations to Meshery Catalog
- View available filters from the web-based UI or CLI

All of these actions are available from both of Meshery’s clients: UI and CLI.

Gain control over your infrastructure with ease within Meshery.

#### Global Cluster Selection for Greater Control:

Whether you're dealing with one cluster or many, Meshery's global cluster selection feature gives you the control you need. Orchestrate your clusters on a global scale with confidence.

## Deprecations

- Meshery Adapter for Citrix Service Mesh
- Meshery Adapter for Open Service Mesh
- <a name=”#smi-deprecation”></a> Service Mesh Interface Conformance

2023 saw the passing of more than a couple CNCF projects, two of which were integrations supported by Meshery: Open Service Mesh and Service Mesh Interface.


## What’s Next? v0.8 Roadmap

Meshery Maintainers are dedicated to enhancing your ability to deliver engineering platforms to your teams. Let us know how we can continue serving you best by weighing in on the v0.8 roadmap. Let your voice be heard (please).

Link to discussion forjm...

For now, explore the unique features of Meshery V0.7 to expand your cloud infrastructure capabilities. Sign up to Meshery today and unlock a world of possibilities.