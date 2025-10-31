---
title: Registry support in Meshery UI
author: Ijeoma Eti
date: 2025-10-31
categories: 
  - models
  - registry
featured-image: /assets/images/posts/2025/10/2025-10-31-registry-support-in-meshery-ui/meshery.png
---



## Introduction
The Meshery Registry serves as the backbone of Meshery’s knowledge system. It is the internal repository that stores structured information about cloud and cloud-native technologies, what systems exist, what components they contain, how those components relate, and the policies that define their behavior. This registry makes it possible for Meshery to visualize, manage, and interact intelligently with different platforms. Traditionally, much of this capability was accessed through the command-line interface using `mesheryctl registry`. However, Meshery now extends that same functionality to its UI, allowing users to explore, register, and manage models directly from a visual interface. This makes the Registry more approachable for teams that prefer graphical workflows, enabling them to understand and extend Meshery’s knowledge base without writing commands or YAML.

### Accessing the Registry in the UI

Meshery’s UI brings the Registry to life in a visual, intuitive way. Instead of managing definitions from the command line, you can now explore and modify the Registry directly from MeshMap on Kanvas. This integration makes it easy for teams to inspect what Meshery knows, add new models, or view existing relationships without ever switching contexts.

To access the Registry, open [https://kanvas.new/extension/meshmap](https://kanvas.new/extension/meshmap). Once the workspace loads, look toward the top-right corner of the screen and click the hamburger menu icon. From the dropdown, select Registry. This opens the Registry modal, a dedicated interface that exposes Meshery’s internal catalog of models, components, relationships, and registrants.

![Registry Selection](/assets/images/posts/2025/10/2025-10-31-registry-support-in-meshery-ui/registry-selection.png)

Inside this modal, you’re effectively stepping into Meshery’s knowledge base. The Registry view is divided into sections that mirror its internal structure, giving you a clear picture of what Meshery currently understands. The interface is interactive and allows you to browse through each section, inspect metadata, and understand the hierarchy between models and their components.

![Registrant](/assets/images/posts/2025/10/2025-10-31-registry-support-in-meshery-ui/registrant.png)

This visual entry point is particularly useful when working with teams that prefer collaborative exploration. You don’t need terminal access or configuration files, everything is accessible through a few clicks. Whether you’re exploring Meshery for the first time or managing a complex environment, the Registry UI gives you direct access to the same information that powers Meshery’s command-line experience, just presented in a more visual, approachable way.

### What the Registry Stores

At its core, the Meshery Registry acts as Meshery’s internal map of the cloud-native landscape. Everything Meshery knows about a system, whether it’s Istio, cert-manager, Prometheus, or a custom internal platform, comes from what’s stored in the Registry. This knowledge isn’t just a list of integrations, it’s a structured, layered representation of how systems are built and how they behave.

A model represents an entire technology or system. Think of a model as the blueprint that defines how Meshery should understand and interact with a particular platform. Each model captures the system’s identity, its capabilities, and its components. For example, the cert-manager model might define what a Certificate or Issuer looks like, how they relate, and what operations can be performed on them.

Inside a model are components, the individual building blocks or resources that make up the system. Components describe the smaller entities that belong to the model. In Kubernetes terms, these might correspond to CRDs or native resource types. Components carry metadata such as kind, version, API group, and category, allowing Meshery to render them visually and manage them intelligently.

Beyond individual components, the Registry also stores relationships. Relationships describe how components depend on or interact with one another. For example, a Service might connect to a Deployment, or a Certificate might require an Issuer. These links are what allow Meshery to visualize dependencies and represent systems accurately when you drag and drop them into MeshMap. Alongside relationships, Meshery also records policies. Policies define the rules, constraints, or standards that govern how a model or component should behave. They help Meshery reason about configurations, validating setups, detecting drift, or enforcing compliance in line with best practices.

### Registering a New Model in the Registry

![Create Model](/assets/images/posts/2025/10/2025-10-31-registry-support-in-meshery-ui/create-model.png)

When you click on the hamburger icon at the top-right corner of the Meshery UI and select **Registry**, a modal opens that gives you access to all models currently stored in Meshery’s internal registry. Within this modal, under the **Models** section, you can either create a new model or import an existing one. Clicking **Create Model** allows you to define a new system by including its source, such as a GitHub repository or an Artifact Hub package, where Meshery can learn the model’s structure and behavior. Alternatively, the **Import Model** option lets you bring in models that already exist elsewhere. Once the model source is specified, Meshery interprets its definitions, identifies components and relationships, and stores them in the Registry. This process makes the model immediately available for visualization, validation, and management in the UI, ensuring Meshery remains synchronized with the systems it represents.

### Understanding Registrants
Every piece of information in the Registry has an origin, and that origin is called a registrant. In the UI, the Registrants tab shows the sources Meshery has learned, which could be GitHub repositories, Artifact Hub packages, or even live Kubernetes clusters. Each registrant entry includes the number of models it contributed, the components discovered, and links back to the source itself. This traceability makes it clear where Meshery obtained its knowledge and helps users manage synchronization between Meshery and those sources. For instance, if a GitHub repository containing CRD definitions is updated, Meshery can re-fetch and update the corresponding models to stay current. Viewing registrants from the UI gives you full visibility into how Meshery keeps its internal registry accurate and aligned with real-world definitions.

### Ignoring an Entity

Meshery also gives you control over which entities in the Registry are active and available for use. If a particular model should not be used within a Meshery Server deployment, you can disable it directly in the UI. In the model’s detail view, toggle the **Enabled** switch to set the model as ignored. When a model is ignored, it remains stored in the Registry but becomes unavailable for deployment or interaction within that Meshery instance. This feature helps teams manage which technologies or platforms are active in their environment while keeping the full record of registered systems intact.

