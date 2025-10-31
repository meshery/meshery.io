---
title: Meshery Relationships: The Backbone of Intelligent Cloud-Native Designs
author: Darshan Narasimha
date: 2025-10-31
categories: 
  - relationships
  - kanvas
  - models
featured-image: /assets/images/posts/2025-04-01-improving-mesherys-ui-e2e-tests/6-02.png
redirect_from: /blog/meshery-relationships-the-backbone-of-intelligent-cloud-native-designs
---

In the dynamic world of cloud-native infrastructure, understanding how components interact is as crucial as deploying them. Enter Meshery Relationships – the game-changing feature within Meshery that defines, visualizes, and automates connections between components of each model.

Relationships aren’t just about linking things, they automate how components interact, saving time and reducing manual errors. In this post, we’ll walk through how relationships are created in Meshery and the different ways you can test them to ensure your components work together just as you expect.

## Types of Relationships

Meshery supports several kinds of relationships to help you model real-world connections between your cloud native components:

1. Hierarchical Relationships: These are parent-child relationships, where one component depends on another.
<img src="assets/images/posts/2025-10-31-meshery-relationships/Hierarchical-relationship.png" />

2. Edge Relationships: These capture connections such as network links, storage mounts, or firewall rules between components.
Subtypes:

- Network
<img src="assets/images/posts/2025-10-31-meshery-relationships/Edge-network.png" />

- Firewall
<img src="aassets/images/posts/2025-10-31-meshery-relationships/Edge-firewall.png" />

- Mount
<img src="assets/images/posts/2025-10-31-meshery-relationships/Edge-Mount.png" />

- Permission
<img src="assets/images/posts/2025-10-31-meshery-relationships/Edge-Permission.png" />

- Reference
<img src="assets/images/posts/2025-10-31-meshery-relationships/Edge-reference.png" />

3. Sibling Relationships: These describe interactions between components at the same level, like two services in the same namespace that interact or share resources.
<img src="assets/images/posts/2025-10-31-meshery-relationships/Siblings.png" />

4. TagSets Relationships: These represent relationships between components of same Labels or Annotations key/value pairs. 
<img src="/assets/images/posts/2025-10-31-meshery-relationships/TagSet-relationship.png" />

Each relationship type is designed to reflect how components interact, inherit features, or communicate, making it easier to visualize and automate the flow of data and control within your environment. This approach improves visibility, enhances design decisions, and enables more flexible and automated configuration management in Meshery

## How can one create a Relationship between Components in a Model?

Well, there are two simple way in which one can start creating.

1. Creating Relationships in UI

Meshery’s UI offers a user-friendly way to create relationships. Toggle the menu button right next to your user profile in Kanvas. Head to registry and then relationships. Select the relationship button to start defining your relationship definition as shown below.

<img src="assets/images/posts/2025-10-31-meshery-relationships/relationship-ui.png" style="width:100%; max-width:750px;" />

for more precise information on defining your relationship, head to [Creating Relationship definition](https://docs.meshery.io/project/contributing/contributing-relationships).

2. Creating Relationships in CLI

Meshery’s command line interface, `mesheryctl`,  manages both the lifecyle of Meshery itself and to access and invoke any of Meshery’s application and cloud native management functions. For more information on mesheryctl checkout [Using Meshery's CLI](https://docs.meshery.io/guides/mesheryctl/working-with-mesheryctl).

Now for the sake of defining relationship, we'll focus on two CLI commands, `mesheryctl model init` & `mesheryctl model build` commands.
`mesheryctl model init`: Generates a folder structure and guides the user on model creation.
In the generated folder structure, head to the generated relationship.json file, and fill the required fields. Use this relationship file in your model folder. Once the required fields are filled use the build command.
`mesheryctl model build`: Create an OCI-compliant package from the model files.
Now import this generated OCI file into kanvas, and use your defined Relationship.

## Contribute and Collaborate with Meshery
Meshery thrives because of its active, welcoming community, and everyone is encouraged to get involved. Check out our existing models, pick one that interests you, and showcase your skills by creating new relationships, every contribution helps Meshery grow and evolve. Whether you’re just exploring or ready to dive in, your participation makes a real difference, so jump in and let’s build something great together.

Explore, create, and contribute together, let’s make Meshery more effective!