---
title: mesheryctl model init and build explained
subheading: How to start a new model from scratch using mesheryctl
date: 2025-10-29
author: Matthieu Evrin
categories:
  - releases
  - mesheryctl
featured-image: /assets/images/posts/2025/mesheryctl-model-init/mesheryctl-model-cmds.png
redirect_from: /blog/mesheryctl-model-init-explained
published: true
---

If you are new to the Meshery ecosystem and want to create your own models, this post will show you how to do so using Meshery CLI (mesheryctl).

> **What is a Meshery Model?**  
> Meshery models are reusable definitions of cloud-native infrastructure and workloads. They help you describe, package, and share your architecture.  
> [Learn more about Meshery models](https://docs.meshery.io/concepts/logical/models).

## Quick start a new model — a two‑step story

You have an idea and want to try it quickly with Meshery. In this short tutorial you will:

1. scaffold a new model with mesheryctl, then
2. build it into a runnable artifact.

Treat this as a skeleton: commands, expected behavior, and places to expand. Fill in examples, flags, and troubleshooting later.

### Step 1 — scaffold: `mesheryctl model init`

**Purpose:** Generates a folder structure and guides the user on model creation.

**Documentation:** <https://docs.meshery.io/reference/mesheryctl/model/init>

In our example we will create a new model in a dedicated path in a specific format using the following values:

- **name:** my-awesome-model
- **path:** my-awesome-models
- **format:** json

#### Create

**Example:**

In my destination path, nothing is present.

```shell
$ ~/my-awesome-models$ ls -l
total 0
```

Now you can create your scaffold by running the following command

```shell
$ mesheryctl model init my-awesome-model --path ./my-awesome-models --output-format json

Creating new Meshery model: my-awesome-model
Creating directory structure...
Generating model definition...
Adding sample components...
Creating sample relationships...
Adding sample connections...
Creating sample credentials...
Created my-awesome-model model at my-awesome-models/my-awesome-model
```

This command creates a new model named `my-awesome-model` in the `my-awesome-models` directory with the following structure:

```shell
$ my-awesome-models/
└── my-awesome-model
    └── v0.1.0
        ├── components
        │   └── component.json
        ├── connections
        ├── credentials
        ├── model.json
        └── relationships
            └── relationship.json

6 directories, 3 files
```

You can see that the required folders/files have been created.

Next steps:

1. `cd /home/user/my-awesome-models/my-awesome-model`
2. Edit `model.json` to customize your model configuration
3. Add your components in the `components/` directory
4. Define relationships in the `relationships/` directory
5. Add your connections in the `connections/` directory
6. Define credentials in the `credentials/` directory
7. Use `mesheryctl model build` to package your model

To import this model into Meshery:

```shell
$ mesheryctl model import /home/user/my-awesome-models/my-awesome-model
```

To export this model as OCI image:

```shell
mesheryctl model build my-awesome-model/v0.1.0 --path /home/user/my-awesome-models
```

Detailed guide: <https://docs.meshery.io/guides/creating-new-model-with-mesheryctl>

What this does (high level):

- creates a directory with the model name and a subdirectory with the version of the model
- generates the files needed for a valid model
- Details each step
- gives you the next actions to take

Let's see what we have in the `my-awesome-models` folder

```shell
.
└── my-awesome-model
    └── v0.1.0
        ├── components
        │   └── component.json
        ├── connections
        ├── credentials
        ├── model.json
        └── relationships
            └── relationship.json

6 directories, 3 files
```

You can see that the required folders/files have been created.

#### Customize

Now customize the generated files to represent your model. If you need more than one component or relationship, copy the existing file(s) and adjust them accordingly.

Below are the contents of the generated files; they are provided only to show what is required.

<details><summary><b>model.json</b></summary>

<div class="highlight">
  <pre class="highlight">
  <code json>
{
  "id": "00000000-0000-0000-0000-000000000000",
  "schemaVersion": "models.meshery.io/v1beta1",
  "version": "v0.0.1",
  "name": "untitled-model",
  "displayName": "Untitled Model",
  "description": "A new Meshery model.",
  "status": "enabled",
  "registrant": {
    "id": "00000000-0000-0000-0000-000000000000",
    "name": "",
    "credential_id": "00000000-0000-0000-0000-000000000000",
    "type": "",
    "sub_type": "",
    "kind": "artifacthub",
    "status": "",
    "user_id": "00000000-0000-0000-0000-000000000000",
    "created_at": "0001-01-01T00:00:00Z",
    "updated_at": "0001-01-01T00:00:00Z",
    "deleted_at": null,
    "schemaVersion": "connections.meshery.io/v1beta1",
    "environments": [
      {
        "id": "00000000-0000-0000-0000-000000000000",
        "name": "",
        "description": "",
        "organization_id": "00000000-0000-0000-0000-000000000000",
        "owner": "00000000-0000-0000-0000-000000000000",
        "created_at": "0001-01-01T00:00:00Z",
        "updated_at": "0001-01-01T00:00:00Z",
        "deleted_at": null,
        "schemaVersion": "environments.meshery.io/v1beta1"
      }
    ]
  },
  "metadata": {
    "capabilities": [],
    "primaryColor": "#00b39f",
    "secondaryColor": "#00D3A9",
    "svgWhite": "<svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"<http://www.w3.org/2000/svg\">><path d=\"M16.405 8.732v6.57l5.694-3.297-5.694-3.273Zm0 7.942v6.602l5.747-3.285-5.747-3.317Z\" fill=\"#fff\"/><path d=\"M15.586 15.256v-6.47l-5.622 3.225 5.622 3.245ZM4.307 23.252a13.809 13.809 0 0 0 4.362 4.39v-6.914l-4.362 2.524Zm11.279-.008v-6.52L9.95 19.985l5.636 3.258Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"m9.49 27.23 5.707-3.263-5.707-3.3v6.563Z\" fill=\"#fff\"/><path d=\"M22.54 27.265v-6.553l-5.699 3.259 5.7 3.294Zm5.58-4.773a13.697 13.697 0 0 0 1.612-5.895l-5.934 3.397 4.323 2.498Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"m23.362 19.298 5.728-3.276-5.728-3.291v6.567Z\" fill=\"#fff\"/><path d=\"M22.541 11.315V4.8l-5.673 3.253 5.673 3.262Zm0 7.955v-6.574l-5.685 3.292 5.685 3.281Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M9.49 12.684v6.622l5.728-3.316-5.728-3.306Z\" fill=\"#fff\"/><path d=\"M15.586 2.25a13.69 13.69 0 0 0-6.037 1.595l6.037 3.463V2.25Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M9.49 4.756v6.583l5.732-3.288L9.49 4.756Z\" fill=\"#fff\"/><path d=\"M8.669 4.356a13.83 13.83 0 0 0-4.362 4.39l4.362 2.518V4.356Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M22.504 3.88a13.695 13.695 0 0 0-6.099-1.63v5.123l6.1-3.493ZM2.25 16.483c.071 2.12.634 4.196 1.644 6.062l4.418-2.559-6.062-3.503Zm1.644-7.028a13.68 13.68 0 0 0-1.644 6.036l6.068-3.482-4.424-2.554Z\" fill=\"#fff\"/><path d=\"M9.539 28.147a13.673 13.673 0 0 0 6.047 1.603v-5.062L9.54 28.147Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M27.697 8.768a13.83 13.83 0 0 0-4.335-4.383v6.889l4.335-2.506ZM23.362 27.62a13.851 13.851 0 0 0 4.351-4.417l-4.351-2.514v6.93Z\" fill=\"#fff\"/><path d=\"M29.75 15.452a13.659 13.659 0 0 0-1.63-5.979l-4.381 2.53 6.011 3.45Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M16.405 29.75a13.673 13.673 0 0 0 6.036-1.595l-6.036-3.498v5.093Z\" fill=\"#fff\"/><path d=\"M8.669 19.247v-6.494L3.03 15.986l5.639 3.261Z\" fill=\"#fff\" fill-opacity=\".8\"/></svg>",
    "svgColor": "<svg xmlns=\"<http://www.w3.org/2000/svg\>" id=\"Layer_1\" data-name=\"Layer 1\" viewBox=\"0 0 134.95 135.02\"><defs><style>.cls-1{fill:#00d3a9}.cls-2{fill:#00b39f}</style></defs><title>meshery-logo-light</title><polygon points=\"69.49 31.82 69.49 64.07 97.44 47.89 69.49 31.82\" class=\"cls-1\"/><polygon points=\"69.49 70.81 69.49 103.22 97.7 87.09 69.49 70.81\" class=\"cls-1\"/><polygon points=\"65.47 63.85 65.47 32.09 37.87 47.92 65.47 63.85\" class=\"cls-2\"/><path d=\"M10.1,103.1a67.79,67.79,0,0,0,21.41,21.55V90.71Z\" class=\"cls-2\"/><polygon points=\"65.47 103.06 65.47 71.05 37.8 87.07 65.47 103.06\" class=\"cls-2\"/><polygon points=\"35.54 122.63 63.56 106.61 35.54 90.41 35.54 122.63\" class=\"cls-1\"/><polygon points=\"99.61 122.8 99.61 90.63 71.63 106.63 99.61 122.8\" class=\"cls-2\"/><path d=\"M127,99.37a67.22,67.22,0,0,0,7.91-28.94L105.78,87.11Z\" class=\"cls-2\"/><polygon points=\"103.64 83.69 131.76 67.61 103.64 51.45 103.64 83.69\" class=\"cls-1\"/><polygon points=\"99.61 44.5 99.61 12.52 71.76 28.49 99.61 44.5\" class=\"cls-2\"/><polygon points=\"99.61 83.55 99.61 51.28 71.7 67.44 99.61 83.55\" class=\"cls-2\"/><polygon points=\"67.48 135.02 67.49 135.02 67.48 135.02 67.48 135.02\" class=\"cls-2\"/><polygon points=\"35.54 51.22 35.54 83.73 63.66 67.45 35.54 51.22\" class=\"cls-1\"/><path d=\"M65.47,0A67.2,67.2,0,0,0,35.83,7.83l29.64,17Z\" class=\"cls-2\"/><polygon points=\"35.54 12.3 35.54 44.62 63.68 28.48 35.54 12.3\" class=\"cls-1\"/><path d=\"M31.51,10.34A67.89,67.89,0,0,0,10.1,31.89L31.51,44.25Z\" class=\"cls-2\"/><path d=\"M99.43,8A67.23,67.23,0,0,0,69.49,0V25.15Z\" class=\"cls-1\"/><path d=\"M0,69.87A67.27,67.27,0,0,0,8.07,99.63L29.76,87.07Z\" class=\"cls-1\"/><path d=\"M8.07,35.37A67.16,67.16,0,0,0,0,65L29.79,47.91Z\" class=\"cls-1\"/><path d=\"M35.78,127.13A67.13,67.13,0,0,0,65.47,135V110.15Z\" class=\"cls-2\"/><path d=\"M124.92,32a67.9,67.9,0,0,0-21.28-21.52V44.3Z\" class=\"cls-1\"/><path d=\"M103.64,124.54A68,68,0,0,0,125,102.86L103.64,90.52Z\" class=\"cls-1\"/><path d=\"M135,64.81a67.06,67.06,0,0,0-8-29.35L105.49,47.88Z\" class=\"cls-2\"/><path d=\"M69.49,135a67.12,67.12,0,0,0,29.63-7.83L69.49,110Z\" class=\"cls-1\"/><polygon points=\"31.51 83.44 31.51 51.56 3.83 67.43 31.51 83.44\" class=\"cls-2\"/></svg>",
    "svgComplete": "",
    "shape": "circle",
    "isAnnotation": false
  },
  "registrantId": "00000000-0000-0000-0000-000000000000",
  "categoryId": "00000000-0000-0000-0000-000000000000",
  "category": {
    "id": "00000000-0000-0000-0000-000000000000",
    "name": "Uncategorized"
  },
  "subCategory": "Uncategorized",
  "model": {
    "version": "v0.0.1"
  },
  "componentsCount": 0,
  "relationshipsCount": 0
}

  </code>
  </pre>
</div>

</details>

<details><summary><b>component.json</b></summary>

<div class="highlight">
  <pre class="highlight">
  <code json>
  {
    "id": "00000000-0000-0000-0000-000000000000",
    "schemaVersion": "components.meshery.io/v1beta1",
    "version": "v0.0.1",
    "displayName": "Untitled Component",
    "description": "A new Meshery Component.",
    "format": "JSON",
    "model": {
      "id": "00000000-0000-0000-0000-000000000000",
      "schemaVersion": "models.meshery.io/v1beta1",
      "version": "v0.0.1",
      "name": "untitled-model",
      "displayName": "Untitled Model",
      "description": "A new Meshery model.",
      "status": "enabled",
      ...
    },
    ...
  }
{
  "id": "00000000-0000-0000-0000-000000000000",
  "schemaVersion": "components.meshery.io/v1beta1",
  "version": "v0.0.1",
  "displayName": "Untitled Component",
  "description": "A new Meshery Component.",
  "format": "JSON",
  "model": {
    "id": "00000000-0000-0000-0000-000000000000",
    "schemaVersion": "models.meshery.io/v1beta1",
    "version": "v0.0.1",
    "name": "untitled-model",
    "displayName": "Untitled Model",
    "description": "A new Meshery model.",
    "status": "enabled",
    "registrant": {
      "id": "00000000-0000-0000-0000-000000000000",
      "name": "",
      "credential_id": "00000000-0000-0000-0000-000000000000",
      "type": "",
      "sub_type": "",
      "kind": "artifacthub",
      "status": "",
      "user_id": "00000000-0000-0000-0000-000000000000",
      "created_at": "0001-01-01T00:00:00Z",
      "updated_at": "0001-01-01T00:00:00Z",
      "deleted_at": null,
      "schemaVersion": "connections.meshery.io/v1beta1",
      "environments": [
        {
          "id": "00000000-0000-0000-0000-000000000000",
          "name": "",
          "description": "",
          "organization_id": "00000000-0000-0000-0000-000000000000",
          "owner": "00000000-0000-0000-0000-000000000000",
          "created_at": "0001-01-01T00:00:00Z",
          "updated_at": "0001-01-01T00:00:00Z",
          "deleted_at": null,
          "schemaVersion": "environments.meshery.io/v1beta1"
        }
      ]
    },
    "metadata": {
      "capabilities": [],
      "primaryColor": "#00b39f",
      "secondaryColor": "#00D3A9",
      "svgWhite": "<svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"<http://www.w3.org/2000/svg\">><path d=\"M16.405 8.732v6.57l5.694-3.297-5.694-3.273Zm0 7.942v6.602l5.747-3.285-5.747-3.317Z\" fill=\"#fff\"/><path d=\"M15.586 15.256v-6.47l-5.622 3.225 5.622 3.245ZM4.307 23.252a13.809 13.809 0 0 0 4.362 4.39v-6.914l-4.362 2.524Zm11.279-.008v-6.52L9.95 19.985l5.636 3.258Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"m9.49 27.23 5.707-3.263-5.707-3.3v6.563Z\" fill=\"#fff\"/><path d=\"M22.54 27.265v-6.553l-5.699 3.259 5.7 3.294Zm5.58-4.773a13.697 13.697 0 0 0 1.612-5.895l-5.934 3.397 4.323 2.498Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"m23.362 19.298 5.728-3.276-5.728-3.291v6.567Z\" fill=\"#fff\"/><path d=\"M22.541 11.315V4.8l-5.673 3.253 5.673 3.262Zm0 7.955v-6.574l-5.685 3.292 5.685 3.281Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M9.49 12.684v6.622l5.728-3.316-5.728-3.306Z\" fill=\"#fff\"/><path d=\"M15.586 2.25a13.69 13.69 0 0 0-6.037 1.595l6.037 3.463V2.25Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M9.49 4.756v6.583l5.732-3.288L9.49 4.756Z\" fill=\"#fff\"/><path d=\"M8.669 4.356a13.83 13.83 0 0 0-4.362 4.39l4.362 2.518V4.356Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M22.504 3.88a13.695 13.695 0 0 0-6.099-1.63v5.123l6.1-3.493ZM2.25 16.483c.071 2.12.634 4.196 1.644 6.062l4.418-2.559-6.062-3.503Zm1.644-7.028a13.68 13.68 0 0 0-1.644 6.036l6.068-3.482-4.424-2.554Z\" fill=\"#fff\"/><path d=\"M9.539 28.147a13.673 13.673 0 0 0 6.047 1.603v-5.062L9.54 28.147Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M27.697 8.768a13.83 13.83 0 0 0-4.335-4.383v6.889l4.335-2.506ZM23.362 27.62a13.851 13.851 0 0 0 4.351-4.417l-4.351-2.514v6.93Z\" fill=\"#fff\"/><path d=\"M29.75 15.452a13.659 13.659 0 0 0-1.63-5.979l-4.381 2.53 6.011 3.45Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M16.405 29.75a13.673 13.673 0 0 0 6.036-1.595l-6.036-3.498v5.093Z\" fill=\"#fff\"/><path d=\"M8.669 19.247v-6.494L3.03 15.986l5.639 3.261Z\" fill=\"#fff\" fill-opacity=\".8\"/></svg>",
      "svgColor": "<svg xmlns=\"<http://www.w3.org/2000/svg\>" id=\"Layer_1\" data-name=\"Layer 1\" viewBox=\"0 0 134.95 135.02\"><defs><style>.cls-1{fill:#00d3a9}.cls-2{fill:#00b39f}</style></defs><title>meshery-logo-light</title><polygon points=\"69.49 31.82 69.49 64.07 97.44 47.89 69.49 31.82\" class=\"cls-1\"/><polygon points=\"69.49 70.81 69.49 103.22 97.7 87.09 69.49 70.81\" class=\"cls-1\"/><polygon points=\"65.47 63.85 65.47 32.09 37.87 47.92 65.47 63.85\" class=\"cls-2\"/><path d=\"M10.1,103.1a67.79,67.79,0,0,0,21.41,21.55V90.71Z\" class=\"cls-2\"/><polygon points=\"65.47 103.06 65.47 71.05 37.8 87.07 65.47 103.06\" class=\"cls-2\"/><polygon points=\"35.54 122.63 63.56 106.61 35.54 90.41 35.54 122.63\" class=\"cls-1\"/><polygon points=\"99.61 122.8 99.61 90.63 71.63 106.63 99.61 122.8\" class=\"cls-2\"/><path d=\"M127,99.37a67.22,67.22,0,0,0,7.91-28.94L105.78,87.11Z\" class=\"cls-2\"/><polygon points=\"103.64 83.69 131.76 67.61 103.64 51.45 103.64 83.69\" class=\"cls-1\"/><polygon points=\"99.61 44.5 99.61 12.52 71.76 28.49 99.61 44.5\" class=\"cls-2\"/><polygon points=\"99.61 83.55 99.61 51.28 71.7 67.44 99.61 83.55\" class=\"cls-2\"/><polygon points=\"67.48 135.02 67.49 135.02 67.48 135.02 67.48 135.02\" class=\"cls-2\"/><polygon points=\"35.54 51.22 35.54 83.73 63.66 67.45 35.54 51.22\" class=\"cls-1\"/><path d=\"M65.47,0A67.2,67.2,0,0,0,35.83,7.83l29.64,17Z\" class=\"cls-2\"/><polygon points=\"35.54 12.3 35.54 44.62 63.68 28.48 35.54 12.3\" class=\"cls-1\"/><path d=\"M31.51,10.34A67.89,67.89,0,0,0,10.1,31.89L31.51,44.25Z\" class=\"cls-2\"/><path d=\"M99.43,8A67.23,67.23,0,0,0,69.49,0V25.15Z\" class=\"cls-1\"/><path d=\"M0,69.87A67.27,67.27,0,0,0,8.07,99.63L29.76,87.07Z\" class=\"cls-1\"/><path d=\"M8.07,35.37A67.16,67.16,0,0,0,0,65L29.79,47.91Z\" class=\"cls-1\"/><path d=\"M35.78,127.13A67.13,67.13,0,0,0,65.47,135V110.15Z\" class=\"cls-2\"/><path d=\"M124.92,32a67.9,67.9,0,0,0-21.28-21.52V44.3Z\" class=\"cls-1\"/><path d=\"M103.64,124.54A68,68,0,0,0,125,102.86L103.64,90.52Z\" class=\"cls-1\"/><path d=\"M135,64.81a67.06,67.06,0,0,0-8-29.35L105.49,47.88Z\" class=\"cls-2\"/><path d=\"M69.49,135a67.12,67.12,0,0,0,29.63-7.83L69.49,110Z\" class=\"cls-1\"/><polygon points=\"31.51 83.44 31.51 51.56 3.83 67.43 31.51 83.44\" class=\"cls-2\"/></svg>",
      "svgComplete": "",
      "shape": "circle",
      "isAnnotation": false
    },
    "registrantId": "00000000-0000-0000-0000-000000000000",
    "categoryId": "00000000-0000-0000-0000-000000000000",
    "category": {
      "id": "00000000-0000-0000-0000-000000000000",
      "name": "Uncategorized"
    },
    "subCategory": "Uncategorized",
    "model": {
      "version": "v0.0.1"
    },
    "componentsCount": 0,
    "relationshipsCount": 0
  },
  "registrant": {},
  "metadata": {
    "genealogy": "",
    "configurationUISchema": "",
    "isAnnotation": false
  },
  "category": {},
  "modelId": "00000000-0000-0000-0000-000000000000",
  "styles": {
    "primaryColor": "",
    "secondaryColor": "",
    "svgWhite": "",
    "svgColor": "",
    "svgComplete": "",
    "color": "",
    "font-family": "",
    "font-size": "",
    "font-style": "",
    "font-weight": "",
    "text-transform": "",
    "label": "",
    "shape": "",
    "position": {},
    "body-text": "",
    "body-text-wrap": "",
    "body-text-max-width": "",
    "body-text-background-color": "",
    "body-text-color": "",
    "body-text-font-weight": "",
    "body-text-horizontal-align": "",
    "body-text-decoration": "",
    "body-text-vertical-align": "",
    "background-image": "",
    "background-color": "",
    "background-position-x": "",
    "background-position-y": "",
    "background-offset-x": "",
    "background-offset-y": "",
    "background-fit": "",
    "background-clip": "",
    "background-width-relative-to": "",
    "background-height-relative-to": "",
    "border-style": "",
    "border-color": "",
    "text-halign": "",
    "text-valign": "",
    "ghost": "no",
    "active-bg-color": "",
    "active-bg-opacity": "",
    "active-bg-size": "",
    "selection-box-color": "",
    "outside-texture-bg-color": "",
    "shape-polygon-points": "",
    "menu-background-color": "",
    "menu-forground-color": ""
  },
  "animation": {},
  "position": {},
  "capabilities": [
    {
      "schemaVersion": "capability.meshery.io/v1alpha1",
      "version": "0.7.0",
      "displayName": "Performance Test",
      "description": "Initiate a performance test. Meshery will execute the load generation, collect metrics, and present the results.",
      "kind": "action",
      "type": "operator",
      "subType": "perf-test",
      "key": "",
      "entityState": [
        "instance"
      ],
      "status": "enabled",
      "metadata": null
    },
    {
      "schemaVersion": "capability.meshery.io/v1alpha1",
      "version": "0.7.0",
      "displayName": "Workload Configuration",
      "description": "Configure the workload specific setting of a component",
      "kind": "mutate",
      "type": "configuration",
      "subType": "config",
      "key": "",
      "entityState": [
        "declaration"
      ],
      "status": "enabled",
      "metadata": null
    },
    {
      "schemaVersion": "capability.meshery.io/v1alpha1",
      "version": "0.7.0",
      "displayName": "Labels and Annotations Configuration",
      "description": "Configure Labels And Annotations for  the component ",
      "kind": "mutate",
      "type": "configuration",
      "subType": "labels-and-annotations",
      "key": "",
      "entityState": [
        "declaration"
      ],
      "status": "enabled",
      "metadata": null
    },
    {
      "schemaVersion": "capability.meshery.io/v1alpha1",
      "version": "0.7.0",
      "displayName": "Relationships",
      "description": "View relationships for the component",
      "kind": "view",
      "type": "configuration",
      "subType": "relationship",
      "key": "",
      "entityState": [
        "declaration",
        "instance"
      ],
      "status": "enabled",
      "metadata": null
    },
    {
      "schemaVersion": "capability.meshery.io/v1alpha1",
      "version": "0.7.0",
      "displayName": "Json Schema",
      "description": "View Component Definition ",
      "kind": "view",
      "type": "configuration",
      "subType": "definition",
      "key": "",
      "entityState": [
        "declaration",
        "instance"
      ],
      "status": "enabled",
      "metadata": null
    },
    {
      "schemaVersion": "capability.meshery.io/v1alpha1",
      "version": "0.7.0",
      "displayName": "Styling",
      "description": "Configure the visual styles for the component",
      "kind": "mutate",
      "type": "style",
      "subType": "",
      "key": "",
      "entityState": [
        "declaration"
      ],
      "status": "enabled",
      "metadata": null
    },
    {
      "schemaVersion": "capability.meshery.io/v1alpha1",
      "version": "0.7.0",
      "displayName": "Change Shape",
      "description": "Change the shape of the component",
      "kind": "mutate",
      "type": "style",
      "subType": "shape",
      "key": "",
      "entityState": [
        "declaration"
      ],
      "status": "enabled",
      "metadata": null
    },
    {
      "schemaVersion": "capability.meshery.io/v1alpha1",
      "version": "0.7.0",
      "displayName": "Compound Drag And Drop",
      "description": "Drag and Drop a component into a parent component in graph view",
      "kind": "interaction",
      "type": "graph",
      "subType": "compoundDnd",
      "key": "",
      "entityState": [
        "declaration"
      ],
      "status": "enabled",
      "metadata": null
    }
  ],
  "status": "enabled",
  "instanceDetails": {},
  "configuration": {},
  "component": {
    "version": "",
    "kind": "",
    "schema": ""
  }
}

  </code>
  </pre>
</div>
  
</details>

<details><summary><b>relationship.json</b></summary>
<div class="highlight">
  <pre class="highlight">
  <code json>

{
  "id": "00000000-0000-0000-0000-000000000000",
  "schemaVersion": "relationships.meshery.io/v1alpha3",
  "version": "v0.0.1",
  "model": {
    "id": "00000000-0000-0000-0000-000000000000",
    "schemaVersion": "models.meshery.io/v1beta1",
    "version": "v0.0.1",
    "name": "untitled-model",
    "displayName": "Untitled Model",
    "description": "A new Meshery model.",
    "status": "enabled",
    "registrant": {
      "id": "00000000-0000-0000-0000-000000000000",
      "name": "",
      "credential_id": "00000000-0000-0000-0000-000000000000",
      "type": "",
      "sub_type": "",
      "kind": "artifacthub",
      "status": "",
      "user_id": "00000000-0000-0000-0000-000000000000",
      "created_at": "0001-01-01T00:00:00Z",
      "updated_at": "0001-01-01T00:00:00Z",
      "deleted_at": null,
      "schemaVersion": "connections.meshery.io/v1beta1",
      "environments": [
        {
          "id": "00000000-0000-0000-0000-000000000000",
          "name": "",
          "description": "",
          "organization_id": "00000000-0000-0000-0000-000000000000",
          "owner": "00000000-0000-0000-0000-000000000000",
          "created_at": "0001-01-01T00:00:00Z",
          "updated_at": "0001-01-01T00:00:00Z",
          "deleted_at": null,
          "schemaVersion": "environments.meshery.io/v1beta1"
        }
      ]
    },
    "metadata": {
      "capabilities": [],
      "primaryColor": "#00b39f",
      "secondaryColor": "#00D3A9",
      "svgWhite": "<svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"<http://www.w3.org/2000/svg\">><path d=\"M16.405 8.732v6.57l5.694-3.297-5.694-3.273Zm0 7.942v6.602l5.747-3.285-5.747-3.317Z\" fill=\"#fff\"/><path d=\"M15.586 15.256v-6.47l-5.622 3.225 5.622 3.245ZM4.307 23.252a13.809 13.809 0 0 0 4.362 4.39v-6.914l-4.362 2.524Zm11.279-.008v-6.52L9.95 19.985l5.636 3.258Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"m9.49 27.23 5.707-3.263-5.707-3.3v6.563Z\" fill=\"#fff\"/><path d=\"M22.54 27.265v-6.553l-5.699 3.259 5.7 3.294Zm5.58-4.773a13.697 13.697 0 0 0 1.612-5.895l-5.934 3.397 4.323 2.498Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"m23.362 19.298 5.728-3.276-5.728-3.291v6.567Z\" fill=\"#fff\"/><path d=\"M22.541 11.315V4.8l-5.673 3.253 5.673 3.262Zm0 7.955v-6.574l-5.685 3.292 5.685 3.281Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M9.49 12.684v6.622l5.728-3.316-5.728-3.306Z\" fill=\"#fff\"/><path d=\"M15.586 2.25a13.69 13.69 0 0 0-6.037 1.595l6.037 3.463V2.25Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M9.49 4.756v6.583l5.732-3.288L9.49 4.756Z\" fill=\"#fff\"/><path d=\"M8.669 4.356a13.83 13.83 0 0 0-4.362 4.39l4.362 2.518V4.356Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M22.504 3.88a13.695 13.695 0 0 0-6.099-1.63v5.123l6.1-3.493ZM2.25 16.483c.071 2.12.634 4.196 1.644 6.062l4.418-2.559-6.062-3.503Zm1.644-7.028a13.68 13.68 0 0 0-1.644 6.036l6.068-3.482-4.424-2.554Z\" fill=\"#fff\"/><path d=\"M9.539 28.147a13.673 13.673 0 0 0 6.047 1.603v-5.062L9.54 28.147Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M27.697 8.768a13.83 13.83 0 0 0-4.335-4.383v6.889l4.335-2.506ZM23.362 27.62a13.851 13.851 0 0 0 4.351-4.417l-4.351-2.514v6.93Z\" fill=\"#fff\"/><path d=\"M29.75 15.452a13.659 13.659 0 0 0-1.63-5.979l-4.381 2.53 6.011 3.45Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M16.405 29.75a13.673 13.673 0 0 0 6.036-1.595l-6.036-3.498v5.093Z\" fill=\"#fff\"/><path d=\"M8.669 19.247v-6.494L3.03 15.986l5.639 3.261Z\" fill=\"#fff\" fill-opacity=\".8\"/></svg>",
      "svgColor": "<svg xmlns=\"<http://www.w3.org/2000/svg\>" id=\"Layer_1\" data-name=\"Layer 1\" viewBox=\"0 0 134.95 135.02\"><defs><style>.cls-1{fill:#00d3a9}.cls-2{fill:#00b39f}</style></defs><title>meshery-logo-light</title><polygon points=\"69.49 31.82 69.49 64.07 97.44 47.89 69.49 31.82\" class=\"cls-1\"/><polygon points=\"69.49 70.81 69.49 103.22 97.7 87.09 69.49 70.81\" class=\"cls-1\"/><polygon points=\"65.47 63.85 65.47 32.09 37.87 47.92 65.47 63.85\" class=\"cls-2\"/><path d=\"M10.1,103.1a67.79,67.79,0,0,0,21.41,21.55V90.71Z\" class=\"cls-2\"/><polygon points=\"65.47 103.06 65.47 71.05 37.8 87.07 65.47 103.06\" class=\"cls-2\"/><polygon points=\"35.54 122.63 63.56 106.61 35.54 90.41 35.54 122.63\" class=\"cls-1\"/><polygon points=\"99.61 122.8 99.61 90.63 71.63 106.63 99.61 122.8\" class=\"cls-2\"/><path d=\"M127,99.37a67.22,67.22,0,0,0,7.91-28.94L105.78,87.11Z\" class=\"cls-2\"/><polygon points=\"103.64 83.69 131.76 67.61 103.64 51.45 103.64 83.69\" class=\"cls-1\"/><polygon points=\"99.61 44.5 99.61 12.52 71.76 28.49 99.61 44.5\" class=\"cls-2\"/><polygon points=\"99.61 83.55 99.61 51.28 71.7 67.44 99.61 83.55\" class=\"cls-2\"/><polygon points=\"67.48 135.02 67.49 135.02 67.48 135.02 67.48 135.02\" class=\"cls-2\"/><polygon points=\"35.54 51.22 35.54 83.73 63.66 67.45 35.54 51.22\" class=\"cls-1\"/><path d=\"M65.47,0A67.2,67.2,0,0,0,35.83,7.83l29.64,17Z\" class=\"cls-2\"/><polygon points=\"35.54 12.3 35.54 44.62 63.68 28.48 35.54 12.3\" class=\"cls-1\"/><path d=\"M31.51,10.34A67.89,67.89,0,0,0,10.1,31.89L31.51,44.25Z\" class=\"cls-2\"/><path d=\"M99.43,8A67.23,67.23,0,0,0,69.49,0V25.15Z\" class=\"cls-1\"/><path d=\"M0,69.87A67.27,67.27,0,0,0,8.07,99.63L29.76,87.07Z\" class=\"cls-1\"/><path d=\"M8.07,35.37A67.16,67.16,0,0,0,0,65L29.79,47.91Z\" class=\"cls-1\"/><path d=\"M35.78,127.13A67.13,67.13,0,0,0,65.47,135V110.15Z\" class=\"cls-2\"/><path d=\"M124.92,32a67.9,67.9,0,0,0-21.28-21.52V44.3Z\" class=\"cls-1\"/><path d=\"M103.64,124.54A68,68,0,0,0,125,102.86L103.64,90.52Z\" class=\"cls-1\"/><path d=\"M135,64.81a67.06,67.06,0,0,0-8-29.35L105.49,47.88Z\" class=\"cls-2\"/><path d=\"M69.49,135a67.12,67.12,0,0,0,29.63-7.83L69.49,110Z\" class=\"cls-1\"/><polygon points=\"31.51 83.44 31.51 51.56 3.83 67.43 31.51 83.44\" class=\"cls-2\"/></svg>",
      "svgComplete": "",
      "shape": "circle",
      "isAnnotation": false
    },
    "registrantId": "00000000-0000-0000-0000-000000000000",
    "categoryId": "00000000-0000-0000-0000-000000000000",
    "category": {
      "id": "00000000-0000-0000-0000-000000000000",
      "name": "Uncategorized"
    },
    "subCategory": "Uncategorized",
    "model": {
      "version": "v0.0.1"
    },
    "componentsCount": 0,
    "relationshipsCount": 0
  },
  "metadata": {},
  "kind": "hierarchical",
  "subType": "inventory",
  "type": "parent",
  "status": "enabled",
  "evaluationQuery": "",
  "capabilities": [],
  "selectors": []
}
  </code>
  </pre>
</div>
</details>

### Step 2 — build: `mesheryctl model build`

**Purpose:** Create an OCI-compliant package from the model files.

**Documentation:** <https://docs.meshery.io/reference/mesheryctl/model/build>

**Example:**

Now you have already customized your model and want to create an artifact.

- **name:** my-awesome-model
- **path:** my-awesome-models
- **version:** v0.1.0

Be sure to move into the folder where the model was created (here: `my-awesome-models`)

```shell
# move in the root folder where you store your models

~/$ cd ~/my-awesome-models

~/my-awesome-models$ mesheryctl model build my-awesome-model/v0.1.0
Building meshery model from path my-awesome-model/v0.1.0
Saving OCI artifact as my-awesome-model-v0-1-0.tar
```

What this does (high level):

- build the model from the path provided
- save it as an OCI artifact

Let's see what we have in `my-awesome-models` folder

```shell
.
├── my-awesome-model
│   └── v0.1.0
│       ├── components
│       │   └── component.json
│       ├── connections
│       ├── credentials
│       ├── model.json
│       └── relationships
│           └── relationship.json
└── my-awesome-model-v0-1-0.tar

6 directories, 4 files
```

You can see that an artifact has been generated properly

### What to expect next

If you would like to use that model, we will have another dedicated tutorial post to achieve this.

I hope this quick introduction gives you a starting point to create your own model and enjoy the tools provided in the Meshery ecosystem.
