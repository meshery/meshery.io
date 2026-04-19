---
title: "Harnessing Organizations for Multi-Tenancy in Meshery"
subheading: "How Platform Engineers Leverage Organizations to Facilitate Collaboration"
date: 2025-02-17
author: Meshery Authors
draft: false
published: true
categories:
  - collaboration
  - platform-engineering
  - multi-tenancy
redirect_from: /blog/harnessing-organizations-for-multi-tenancy
featured-image: /assets/images/posts/2026/02/17-organizations-in-meshery/organizations-hero.svg
---

In today's cloud native landscape, platform engineers face an increasingly complex challenge: how do you enable multiple teams to work independently yet collaboratively on shared infrastructure? The answer lies in effective multi-tenancy, and Meshery's Organizations provide the foundational framework to make this a reality.

## What Are Organizations in Meshery?

Organizations serve as the fundamental unit of multi-tenancy within Meshery. They provide a structured way to group users, control access to resources, and establish clear boundaries between different tenants—whether those tenants are separate business units, customer organizations, or project teams.

At their core, Organizations in Meshery enable platform engineers to:

- **Establish tenant boundaries**: Create isolated spaces where teams can work without interfering with each other's infrastructure
- **Organize hierarchically**: Structure users into teams within organizations, reflecting your actual organizational structure
- **Control resource ownership**: All resources created by users—including Workspaces, Designs, Environments, and Connections—are owned by their Organization
- **Enable collaboration at scale**: Allow users to belong to multiple organizations and teams simultaneously, facilitating cross-functional work

## The Multi-Tenancy Architecture

Organizations form the top layer of Meshery's multi-tenancy model. Here's how the hierarchy works:

**Organizations** → **Teams** → **Users** → **Workspaces** → **Resources**

- An Organization can have any number of teams
- Teams can have any number of users
- Users can belong to multiple teams and organizations
- Teams control access to Workspaces and their resources (Environments, Designs, Connections)

This flexible structure allows platform engineers to model complex real-world scenarios. For example, a user might belong to both the "Platform Engineering" organization for infrastructure work and the "Product Development" organization for application deployment, with different permissions in each context.

## Why Platform Engineers Choose Organizations

### 1. True Multi-Tenancy

Organizations provide genuine tenant isolation. When a SaaS provider uses Meshery to offer managed Kubernetes services to multiple customers, each customer's Organization ensures complete separation of:

- Infrastructure designs and deployment patterns
- Environment configurations
- Kubernetes cluster connections
- User access and permissions
- Audit trails and activity logs

### 2. Simplified Access Control

Rather than managing permissions on individual resources, platform engineers can grant access at the Organization and Team level. Teams receive permissions to Workspaces, which in turn contain Environments and Connections. This hierarchical approach dramatically reduces administrative overhead while maintaining security.

### 3. Resource Organization and Discoverability

Organizations naturally group related resources together. A platform engineering team supporting multiple product lines can create separate Organizations for each, ensuring that:

- Designs and patterns are easily discoverable by the right teams
- Workspaces reflect actual project boundaries
- Connections to infrastructure are logically grouped
- Reporting and cost allocation follow organizational lines

### 4. Collaboration Without Chaos

The multi-organization membership model enables controlled collaboration. A security team member can participate in multiple Organizations to enforce policies, while developers remain focused on their specific product domains. Platform engineers can create shared Organizations for common infrastructure while maintaining separate Organizations for sensitive workloads.

## Organizations in Practice: A Real-World Example

Consider a platform engineering team at a financial services company managing infrastructure for three business units: Retail Banking, Commercial Lending, and Investment Services. Here's how they might leverage Organizations:

### Setup

1. **Create three Organizations**: `retail-banking`, `commercial-lending`, and `investment-services`
2. **Establish Teams within each**:
   - `retail-banking` Organization: `mobile-app-team`, `core-banking-team`, `compliance-team`
   - Similar team structures for other Organizations
3. **Assign Workspaces**: Each team gets Workspaces for development, staging, and production
4. **Configure Environments**: Link appropriate Kubernetes clusters and monitoring tools to each Workspace

### Collaboration Flow

The platform engineering team creates a standardized [PCI-DSS compliance design pattern](https://docs.meshery.io/concepts/logical/designs) and publishes it to the [Meshery Catalog](https://docs.meshery.io/concepts/architecture/catalog). Each business unit Organization can then:

1. Clone the design into their Workspace
2. Customize it for their specific requirements
3. Deploy it to their isolated Environments
4. Share feedback that improves the base pattern for all Organizations

Meanwhile, a security architect who belongs to all three Organizations can audit configurations across the board, ensuring consistent policy enforcement while respecting tenant boundaries.

### The Benefits

- **Isolation**: Each business unit's infrastructure remains separate, meeting regulatory requirements
- **Efficiency**: Common patterns are shared through the Catalog rather than duplicated
- **Governance**: The platform team maintains oversight across Organizations
- **Autonomy**: Individual teams can innovate within their domains without bottlenecks

For more details on managing Organizations, including creating, editing, and inviting members, refer to the [Meshery Workspaces documentation](https://docs.meshery.io/concepts/logical/workspaces).

## Getting Started: Clone a Design into Your Organization

Ready to experience the power of Organizations firsthand? The Meshery Catalog contains hundreds of production-ready designs created by the community. Here's your challenge:

1. **Browse the [Meshery Catalog](https://meshery.io/catalog)** and find a design that matches your infrastructure needs—perhaps a Kubernetes monitoring stack, a service mesh configuration, or a security policy template
2. **Clone it into your Organization's Workspace** with a single click
3. **Customize it** to fit your specific requirements using Meshery's visual designer
4. **Deploy it** to your Environment and see how Organizations streamline the process
5. **Share your enhanced version** back to the Catalog to help others in the community

Organizations aren't just about isolation—they're about building a collaborative ecosystem where best practices flow freely while security and boundaries remain intact.

## Conclusion

As cloud native infrastructure grows more complex, the need for robust multi-tenancy becomes critical. Meshery's Organizations provide platform engineers with the tools to create secure, scalable, and collaborative environments that mirror real-world organizational structures.

Whether you're a SaaS provider serving multiple customers, an enterprise managing multiple business units, or a platform team supporting diverse product teams, Organizations offer the foundation for sustainable infrastructure management at scale.

The true power of Organizations emerges when combined with Meshery's other features—[Workspaces](https://docs.meshery.io/concepts/logical/workspaces) for collaboration, [Designs](https://docs.meshery.io/concepts/logical/designs) for infrastructure as code, [Environments](https://docs.meshery.io/concepts/logical/environments) for deployment targets, and the [Catalog](https://docs.meshery.io/concepts/architecture/catalog) for knowledge sharing.

Start building your multi-tenant infrastructure today. Join the [Meshery community](https://slack.meshery.io), explore the Catalog, and discover how Organizations can transform your platform engineering practice.
