---
title: "Solution architecture diagramming with Exoscale"
subheading: "Announcing the new Exoscale (Crossplane) model"
date: 2026-08-21 09:00:00 -0500
author: Meshery Authors
categories:
  - meshery
  - models
  - exoscale
featured-image: /assets/images/integration/crossplane-provider-exoscale/icons/color/crossplane-provider-exoscale-color.svg
redirect_from: /blog/solution-architecture-diagramming-with-exoscale
---

As cloud environments become increasingly distributed, infrastructure diagrams frequently lose touch with the actual resources they represent. Traditional design diagrams are often treated as static drawings—pictures that quickly become stale as deployment configurations drift.

To bridge this gap, modern platform engineering teams require architecture diagrams to be more than static visual assets. A design should act as a direct blueprint of the underlying infrastructure, reflecting real components, their configuration properties, and their relationships. Meshery addresses this by introducing schema-driven design models that directly connect diagramming to deployable infrastructure definitions.

With the release of the new **Exoscale (Crossplane)** model, users can now visually model and design Exoscale cloud infrastructure directly within the Meshery Canvas.

## Where Meshery Models Fit

To understand how Meshery manages this infrastructure, it helps to distinguish the building blocks from the final layout. In Meshery's terminology:
* **Models** represent a packaged collection or toolbox of reusable building blocks defining the schema, category, and properties of a specific integration.
* **Components** are the individual, concrete instances of those blocks (such as a database or storage service) configured with specific API properties.
* **Designs** are the collaborative blueprints assembled from those components, mapping out how they connect and interact.

By separating models (definitions) from designs (deployable architectures), Meshery ensures that cloud configurations remain standardized, reusable, and version-controlled.

## Extending Meshery with Exoscale

Meshery maintains a Registry that organizes models from a wide variety of cloud-native and cloud provider ecosystems. This extensibility allows new integrations to be registered on demand. 

The new **Exoscale (Crossplane)** model demonstrates this extensibility. Rather than writing custom integration code for every cloud provider, Meshery leverages the Crossplane provider ecosystem to import resource schemas. By translating Exoscale Crossplane Provider resource definitions into Meshery Components, Meshery inherits representation and configuration capabilities for provisioning and managing Exoscale infrastructure.

## Meet the Exoscale (Crossplane) Model

The newly registered model contains **9 components** representing Exoscale’s managed cloud services, storage, and configuration:

### Managed Data Services
* **`my-sql`**: Deploy and configure managed MySQL database instances.
* **`postgre-sql`**: Manage scalable PostgreSQL database clusters.
* **`redis`**: Provision high-performance Redis cache and store instances.
* **`kafka`**: Model distributed streaming architectures with managed Apache Kafka.
* **`open-search`**: Deploy OpenSearch clusters for analytics and search.

### Storage & Identity
* **`bucket`**: Define Object Storage buckets for media, backups, and static files.
* **`iam-key`**: Configure Identity and Access Management credentials to secure resource operations.

### Configuration
* **`provider-config`**: Configure connection credentials for the Crossplane provider to authenticate and manage resources on Exoscale.
* **`provider-config-usage`**: Track provider configuration utilization across different resources.

These components are generated and registered in the Meshery Registry, making them available as design elements on the Meshery Canvas.

## A Simple Exoscale Architecture in Meshery

Since the model is integrated into the Registry, you can design Exoscale architectures directly. Below is a conceptual layout and diagram for a standard multi-tier application:

<div style="text-align: center;">
  <img src="/assets/images/posts/2026/08/solution-architecture-diagramming-with-exoscale/exoscale-architecture.jpg" alt="Exoscale Solution Architecture in Meshery" style="max-width:100%; height:auto; margin: 20px 0;" />
  <br />
  <em>Figure 1: Meshery Design architecture mapping runtime traffic and Crossplane provisioning configuration references.</em>
</div>

In this architecture:
1. **Kubernetes Web App**: Represents the running application service.
2. **Exoscale PostgreSQL (`postgre-sql`)**: Represents the managed database backend.
3. **Exoscale Bucket (`bucket`)**: Represents the object storage for static files.
4. **Exoscale Provider Config (`provider-config`)**: Represents the Crossplane configuration that references the credentials required to provision the PostgreSQL and Bucket resources on Exoscale. Note that this is a configuration dependency for the infrastructure components (used at provisioning time), not a runtime data-flow link for the Web App.

## Why Model Extensibility Matters

By bringing Exoscale components into Meshery Canvas, teams can collaborate visually to plan their infrastructure changes while maintaining structural integrity. Behind the scenes, Meshery validates these visual configurations against the schemas defined by the Exoscale Crossplane Provider. This helps identify schema and structural configuration errors during the design phase before any deployment pipeline runs.

## Explore Exoscale Further

To learn more about the integration and start designing:
* Check out the [Meshery Exoscale Integration Documentation](https://docs.meshery.io/extensibility/integrations/crossplane-provider-exoscale).
* Explore the official [Exoscale Homepage](https://exoscale.com/) to learn about their European cloud infrastructure services.
* Visit the [Exoscale Academy](https://www.exoscale.com/academy/) to dive deeper into managed services, Kubernetes orchestration, and cloud certifications.

---
*Open Meshery Canvas today to start modeling your Exoscale cloud-native architectures!*

