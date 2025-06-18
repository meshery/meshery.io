---
title: Creating Relationships in Meshery
subheading: A guide to create relationships
date: 2025-06-16
author: Yogendar Singh
categories: 
  - relationships
  - kanvas
  - models
redirect_from: /blog/creating-relationships-in-meshery
featured-image: /assets/images/logos/meshery-logo-dark-text-side.svg
---

**Hey Folks** 👋

Relationships in Meshery are what make it smarter by quickly connecting the necessary components to each other. This ability gives Meshery an edge in modeling and managing complex cloud native environments. Relationships aren’t just about linking things, they automate how components interact, saving time and reducing manual errors. In this post, we’ll walk through how relationships are created in Meshery and the different ways you can test them to ensure your components work together just as you expect.

## What are the different kinds of relationships?

Meshery supports several kinds of relationships to help you model real-world connections between your cloud native components:

- **Hierarchical Relationships:** These are parent-child relationships, where one component depends on another  (for example, a Namespace being the parent of Pods).

- **Edge Relationships:** These capture connections such as network links, storage mounts, or firewall rules between components.

- **Sibling Relationships:** These describe interactions between components at the same level, like two services in the same namespace that interact or share resources.

Each relationship type is designed to reflect how components interact, inherit features, or communicate, making it easier to visualize and automate the flow of data and control within your environment. This approach improves visibility, enhances design decisions, and enables more flexible and automated configuration management in Meshery

## How to create relationships

#### Creating Relationships Using the CLI

You can create relationships in Meshery using the `mesheryctl registry generate` command, which takes a spreadsheet as input and generates your models and relationships automatically. To get started, either create a copy of the Meshery integration spreadsheet and add your own entries, or download three separate CSV files named Models, Components, and Relationships with strict naming conventions. This method is ideal if you prefer working from the command line and want to manage your relationships programmatically.


**Using Google spreadsheet**

```bash
   mesheryctl registry generate --spreadsheet-id "1DZHnzxYWOlJ69Oguz4LkRVTFM79kC2tuvdwizOJmeMw 
   --spreadsheet-cred "[spreadsheet-credential-file]"
```

**Using local csv files**

```bash
    mesheryctl registry generate --directory <path-to-directory>
```

#### Creating Relationships Using the UI

Meshery’s UI offers a user-friendly way to create relationships as well. You can upload your CSV files directly through the interface in Kanvas or from the registry, or if you have OCI artifact files for your models, you can upload those too. This approach is great for users who prefer a visual workflow or want to quickly import and manage relationships without using CLI commands. 

<img alt="Registry import option" src="/assets/images/posts/2025-06-16-creating-relationships-in-meshery/registry-import.png" style="padding:.5rem;" width="100%">

<img alt="Kanvas Import Option" src="/assets/images/posts/2025-06-16-creating-relationships-in-meshery/kanvas-import.png" style="padding:.5rem;" width="100%">

## How to test/debug relationships

- Head to Settings and look under the Registry section. Dive into the details of your model—you’ll see a count of all the available relationships for that model.

- Jump into Kanvas and start building out your design. Add components and check if your intended relationships are working as expected.

- Try creating an edge relationship between components, then see if those components update or interact as you planned after the relationship is set up.

- Open the configuration for any component, and in the Relationship section, you’ll find a summary showing the number of existing and active relationships for that specific component.

- Review the evaluation history generated while you’re building designs—this log gives you insight into how your relationships are being applied and whether they’re functioning as intended.

- Use the Layers button in Kanvas to get a visual overview: it displays all components, as well as both active and available relationships in your current design.

- From the Layers panel, you can also toggle relationships on and off, making it easy to see how changes affect your architecture in real time.

Use these checks to quickly determine if your relationships in Meshery are functioning as intended or need adjustments. This will ensure that your Meshery designs behave as expected and relationships between components are accurately established

## Troubleshooting Common Relationship Issues in Meshery

#### Parent-Child (Hierarchical) Relationship Not Working?

Double-check that your parent component’s schema includes the genealogy property set to parent. Without this, Meshery won’t recognize the component as a valid parent in the hierarchy.

#### Edge Relationship Not Behaving as Expected?

Make sure you’ve correctly set the mutatedRef and mutatorRef in your component implementation. The mutatedRef is the placeholder where values from the mutatorRef path will appear after the relationship is established.

#### Verify Relationship Paths

Check that the paths you’ve specified under both mutatedRef and mutatorRef are accurate and match the intended configuration fields in your components. Incorrect paths can prevent relationships from being properly formed or updated.

#### General Debugging Tip

If you’re still running into issues, review your model and relationship definitions for typos or missing fields, and check Meshery’s evaluation history logs or UI feedback for more specific messages.

## Need more information

Refer to our docs section for more details:

Get started with the [Contributor's Guide](https://docs.meshery.io/project/contributing/contributing-relationships)

Refer to [User Guide](#)

## Contribute and Collaborate with Meshery

Meshery thrives because of its active, welcoming community, and everyone is encouraged to get involved. Check out our existing models, pick one that interests you, and showcase your skills by creating new relationships, every contribution helps Meshery grow and evolve. Whether you’re just exploring or ready to dive in, your participation makes a real difference, so jump in and let’s build something great together

Explore, create, and contribute together, let’s make Meshery more effective!
