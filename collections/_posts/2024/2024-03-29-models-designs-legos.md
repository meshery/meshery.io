---
title: Lego Bricks and Lego Instructions
subheading: Comparing Meshery Models and Meshery Designs
date: 2024-03-29
author: Lee Calcote
categories: 
  - meshery
  - models
  - designs
redirect_from: /blog/lego-bricks-and-lego-instructions
featured-image: /assets/images/posts/2024-03-29-models-designs-legos/five-legos.png
---

In Meshery, two key concepts play a pivotal role in managing infrastructure and deployments: Meshery Models and Meshery Designs. Understanding their difference and their similarities will greatly increase your benefit from these two powerful, systems management paradigms.

## Meshery Models

<a href="https://docs.meshery.io/concepts/logical/models" target="_blank">Meshery Models</a> represent the fundamental building blocks of your infrastructure. Think of them as blueprints or templates that define the structure, components, and configurations of your deployments. These models encapsulate everything from network configurations to service definitions, making them essential for consistent and scalable deployments across environments.

## Meshery Designs

On the other hand, <a href="https://docs.meshery.io/concepts/logical/designs" target="_blank">Meshery Designs</a> are the practical implementations based on Meshery Models. They represent declarations of your infrastructure deployments, customized according to specific use cases, environments, and requirements. Meshery Designs allow you to create, manage, and deploy complex architectures seamlessly, leveraging the power and flexibility of Meshery Models as their foundation.


## Meshery Models (similar to Lego bricks)

Meshery Models are packages that contain infrastructure components with specific properties and functionalities. (e.g., standard bricks, window pieces, wheels). Models and their Components cannot be directly used to build something complete on their own, but are standardized and reused across different Lego sets (instructions).


- **Definition:** Building blocks for infrastructure definition.
- **Focus:** Describe how to manage specific infrastructure types and their interactions.
- **Content:** Define properties, capabilities, and relationships for infrastructure components.
- **Usability:** Not directly deployable, but used as building blocks within Designs.
- **Sharing:** Can be packaged and shared for others to use in their Designs.

<img alt="Meshery Catalog" src="/assets/images/posts/2024-03-29-models-designs-legos/five-legos-nobg.png" width="100%" />
Meshery Models are like the individual Lego bricks - they define the building blocks for infrastructure with specific characteristics.

## Meshery Designs (similar to Lego instructions)

Meshery Designs provide a collaborative blueprint for building a specific model using Lego bricks (Meshery Models). Designs define the structure and placement of the bricks to achieve the desired outcome. Desan be shared, versioned, and used as reference for building the same model.
In essence:

- **Definition:** Collaborative documents for infrastructure and application deployment.
- **Focus:** Describe the desired state of infrastructure for a specific deployment.
- **Content:** Use components (based on Models) and relationships to define your infrastructure.
- **Usability:** Designs are the deployable unit in Meshery.
- **Sharing:** Can be exported, versioned, shared, and published for reuse by others.


<img alt="Meshery Catalog" src="/assets/images/posts/2024-03-29-models-designs-legos/five-instructions.png" style="border: 0px; width: 179px; height: 300px; margin: 0px; float: right;" />
Meshery Designs are like the Lego instructions - they use Models (like bricks) to lay out the specific infrastructure deployment plan.

**Analogy:** Think of Models as Lego bricks (defining types of pieces) and Designs as Lego instructions (defining how to build something specific). In summary, Meshery Models serve as the theoretical frameworks, while Meshery Designs translate these frameworks into tangible deployments, enabling you to design, deploy, and manage your infrastructure efficiently within the cloud and cloud native ecosystem.