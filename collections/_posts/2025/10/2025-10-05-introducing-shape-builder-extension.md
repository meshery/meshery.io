---
title: Introducing the Shape Builder Extension for Meshery  
subheading: Creating Custom Polygon Shapes for Cloud Native Infrastructure Visualization  
author: Aastha Bhat  
date: 2025-10-04 12:00:00 -0500  
categories:  
  - community  
  - extension  
featured-image: /assets/images/posts/2025/shape-builder/site.png 
redirect_from: /blog/shape-builder-extension  
---

Meshery is proud to announce the release of the Shape Builder extension—a powerful tool that allows you to create custom polygon shapes to visually design and manage your cloud native infrastructure. This extension further enriches the Meshery platform, empowering users to craft detailed architecture diagrams that are tailored to their unique deployments.

<img src="https://raw.githubusercontent.com/meshery-extensions/shape-builder/98531eecdd2c5b01895f1d818f824bf186bf6077/.github/assets/images/site.png" width="100%" align="center" />

### 1. What is Shape Builder?

This Meshery extension offers an easy way to visually create polygons, outputting the format necessary for Kanvas to recognize and render your custom polygon shape. As a best practice, users are encouraged to select an existing or create a custom shape for their components to best visually signify the function of their component. See the [Components Shape Guide](https://docs.meshery.io/extensions/component-shape-guide) for a list of the built-in component shapes in Meshery.

Interactively, explore existing component shapes easily by looking in [Meshery Playground](https://play.meshery.io) in the Kanvas extension's on the dock at the bottom of the screen. You will see the different types of component shapes in the "Shapes" model as examples.

### 2. Features Overview

- **Custom Polygon Creation:** Draw and modify unique polygon shapes to encapsulate services or infrastructure components.
- **Component Grouping:** Organize related Meshery components visually with easy drag-and-drop layout support.
- **Seamless Integration:** Works natively within Meshery's dashboard for instant access with your existing cloud native observability tools.
- **Export & Share:** Export your shapes and diagrams for documentation, presentations, or team collaboration.

### 3. Getting Started

The Shape Builder extension is open source and can be enabled in the Meshery extensions marketplace. To start designing your custom infrastructure shapes, simply install and activate the extension from your Meshery dashboard.

## Usage

Once you have created your custom shape, export your matrix notation and use within a `polygon` shape in your Meshery Component. For example, the following is a plus icon:

#### Custom Shape Example
![Image](https://github.com/user-attachments/assets/4d022a7a-bb78-44e3-9c95-f36b47bd2c97)

```
-0.33 -1 0.33 -1 0.33 -0.33 1 -0.33 1 0.33 0.33 0.33 0.33 1 -0.33 1 -0.33 0.33 -1 0.33 -1 -0.33 -0.33 -0.33
```


### Additional Details

Anyone can create new components. When they do, they can use a predefined shape to represent their new component. Alternatively, they can define their own polygon; their own shape. The manner in which shapes are defined is based on a number matrix from negative one to positive one.

<div>&nbsp;</div>

### 4. Why Use Shape Builder?

Visual management is more than aesthetics — it's about clarity in complexity. Whether you're documenting microservices architecture or mapping dependencies, Shape Builder turns complex topologies into understandable visuals. This reduces operational overhead and speeds up troubleshooting and decision-making.

### 5. Join the Community and Contribute

Shape Builder is a community-driven effort. Contributions to code, documentation, and new features are warmly welcomed. To contribute, visit the [Shape Builder GitHub repository](https://github.com/meshery-extensions/shape-builder), follow the contributing guide, and jump into discussions on the Meshery Slack and forums.

### 6. Learn More

For detailed installation instructions, feature guides, and community resources, check out the official documentation at the [Shape Builder repository](https://github.com/meshery-extensions/shape-builder) and visit [shapes.meshery.io](https://shapes.meshery.io) for interactive examples.
