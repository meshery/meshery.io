---
title: Share Your Meshery Models
subheading: A Guide to Contributing to the Meshery Catalog
date: 2024-11-06
author: Meshery Authors
categories:
  - meshery
  - mesheryctl
  - models
redirect_from: /blog/share-your-meshery-models
featured-image: /assets/images/posts/2024/2024-11-06-share-your-meshery-models/meshery-catalog-blog.webp
---

Participating in the Meshery Catalog is an excellent opportunity to enhance and share your cloud native configurations with the community. By contributing your models and patterns, you not only showcase your work but also empower others to leverage your innovations. This guide provides a defined approach to using mesheryctl for uploading your models and patterns to the Catalog, ensuring a smooth and efficient contribution process.

## Understanding Components and Models

Before we dive into the contribution process, let's understand two key concepts:

### Models in Meshery

Models are packages that organize resources (apps, services, infrastructure) for easy management. They are:

- Portable, versioned units
- OCI-compatible images that can be imported/exported
- Containers for components, policies, and connections

### Components in Meshery

Components represent entities in the Meshery ecosystem, exposing capabilities of the underlying platform. They can be:

- Registered, created, and used by users and operators
- Defined through definitions, instances, and associated metadata
- Identified by their kind, apiVersion, and model.name attributes (components sharing these are considered duplicates)

<img src="/assets/images/posts/2024/2024-11-06-share-your-meshery-models/meshery-models-breakdown.png" alt="Meshery Models and Components" style="max-width: 100%; height: auto;" />

## Contributing with mesheryctl

1. **Generate a Model from Google Sheets**  
   If your configurations are stored in Google Sheets, you can import them directly into the Catalog with:

   ```bash
   mesheryctl registry generate
    --spreadsheet-id "1DZHnzxYWOlJ69Oguz4LkRVTFM79kC2tuvdwizOJmeMw"
    --spreadsheet-cred "[spreadsheet-credential-file]"
   ```

2. **Generate Models Using Connection and Credential Definitions**  
   For other supported sources, you can specify a connection and credential file to generate models:

   ```bash
   mesheryctl registry generate
    --registrant-def [path-to-connection-definition]
    --registrant-cred [path-to-credential-definition]
   ```

3. **Upload a Specific Model from Google Sheets**  
   To upload just one model from Google Sheets, use:

   ```bash
   mesheryctl registry generate
    --spreadsheet-id "1DZHnzxYWOlJ69Oguz4LkRVTFM79kC2tuvdwizOJmeMw"
    --spreadsheet-cred "[spreadsheet-credential-file]"
    --model "[model-name]"
   ```

4. **Import Models from Local CSV Files**  
   Download model and component CSV templates, place them in a local folder, then run:

   ```bash
   mesheryctl registry generate
    --directory "[local-path-to-directory]"
   ```

   This will generate the model as a package - `.tar` file.

5. **Test Locally and Submit**  
   After generating and testing your models (you can import them into your account by using the Import button located on [playground.meshery.io](https://playground.meshery.io) under Settings > Registry > Models or by running the command below):
   ```bash
   mesheryctl model import
    -f "[local-path-to-model-tar-file]"
   ```
   Submit a pull request by first forking the meshery/meshery.io repository on GitHub and adding the tar file to the `collections/_models/` folder.

## Model Generation Wizard Tool (Coming Soon)

A new Model Generation Wizard Tool is coming soon to simplify these steps, making it even easier to add your work to the Meshery Catalog.

By contributing, you help the community save time and standardize configurations!
