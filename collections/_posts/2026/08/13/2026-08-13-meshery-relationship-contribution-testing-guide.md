---
title: "Meshery Relationship Contribution & Testing Guide"
subheading: "A step-by-step guide to defining, validating, and testing relationships in Meshery"
date: 2026-08-13
author: Olaleye Oyewunmi
categories:
  - relationships
  - extensibility
featured-image: /assets/images/logos/meshery-logo.png
redirect_from: /blog/meshery-relationship-contribution-testing-guide
published: true
---

This document outlines the standard operating procedure for contributors defining, validating, and testing new OPA relationships in Meshery. Following these steps ensures your relationships correctly evaluate in the backend engine and visually render in Kanvas.

## Phase 1: Definition & Validation

### 1. Create the Relationship File

Define your relationship in JSON or YAML format.

> **Important:** Ensure that you choose the correct relationship type and follow all regulations. For a complete guide on relationship types and terminologies, please refer to the [Meshery Relationships Documentation](https://docs.meshery.io/concepts/logical/relationships/) and the [Contribution Guide](https://docs.meshery.io/project/contributing/contributing-relationships/).

#### Crucial Standard (Non-Binding Edges - STRICT)
For non-binding edges, the OPA engine is rigid regarding the patch direction: the `mutatorRef` (the provider/source of the value) **MUST** be placed in the `from` selector, and the `mutatedRef` (the consumer/destination of the value) **MUST** be placed in the `to` selector. Consequently, the visual connection arrow will always point from the provider (`from` selector) to the consumer (`to` selector). If you invert these fields, the engine's patching logic will fail to evaluate.

#### Crucial Standard (Binding Edges - FLEXIBLE)
For binding edges, the OPA engine is flexible. You can place the `mutatorRef` on either the `from` or `to` node depending on the direction of your connection. 

> **Note:** The `binding` type is different from others as it needs an intermediary component to bind two other components. It is specifically designed for relationships like binding a User/ServiceAccount to a Role/ClusterRole using a RoleBinding/ClusterRoleBinding.

#### Crucial Standard (Hierarchical Relationships - FLEXIBLE)
For Hierarchical relationships, the OPA engine is completely flexible. You can place the `mutatorRef`/`mutatedRef` on either the `from` or `to` node depending on the logic of your specific relationship (for example, in a `hierarchical-parent-wallet`, `mutatorRef` is placed on the child in `from`, whereas in `hierarchical-parent-inventory`, the `mutatorRef` is placed on the parent in `to`).

#### Important Rules
* **Top Level `id` field**: The top level `"id"` field should always be:
  ```json
  "id": "00000000-0000-0000-0000-000000000000"
  ```
  Never assign anything other than this since the Meshery Server assigns a unique ID to relationships at runtime during import.
* **Unified Go-based evaluation engine**: The `evaluationQuery` field is a legacy property that was used to specify which exact Rego policy file/query should be executed to evaluate this relationship. You should leave it completely blank (`""`). Meshery has transitioned to a unified Go-based evaluation engine.
* **Mutator and Mutated Refs**: Remember that `mutatorRef` defines the source (provider) path that is read, and `mutatedRef` defines the target (consumer) path that is modified.
* **Directives vs. Sources**: `from` and `to` blocks define the visual endpoints of the relationship line, while `mutatorRef` and `mutatedRef` define the data mutation flow.
* **Allow vs. Deny Selectors**: Your `allow` and `deny` selectors use separate selector objects.
  * **Allow selectors** enforce evaluation of defined relationships when conditions are met. In the example below, the relationship from `Deployment` to `Service` will be evaluated and patched when the described conditions are met.
  * **Deny selectors** are used to restrict relationships between defined components when specific conditions are met. In the example below, relationships between two `Service` components are denied as they are semantically invalid.

**Example Configuration:**

Here is a complete, valid JSON relationship document illustrating a non-binding reference where a `Deployment`'s labels patch a `Service`'s selector:

```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "kind": "edge",
  "type": "non-binding",
  "subType": "reference",
  "selectors": [
    {
      "allow": {
        "from": [
          {
            "kind": "Deployment",
            "model": {
              "name": "kubernetes"
            },
            "patch": {
              "mutatorRef": [
                ["configuration", "spec", "template", "metadata", "labels"]
              ],
              "patchStrategy": "replace"
            }
          }
        ],
        "to": [
          {
            "kind": "Service",
            "model": {
              "name": "kubernetes"
            },
            "patch": {
              "mutatedRef": [
                ["configuration", "spec", "selector"]
              ],
              "patchStrategy": "replace"
            }
          }
        ]
      },
      "deny": {
        "from": [
          {
            "kind": "Service",
            "model": {
              "name": "kubernetes"
            },
            "patch": null
          }
        ],
        "to": [
          {
            "kind": "Service",
            "model": {
              "name": "kubernetes"
            },
            "patch": null
          }
        ]
      }
    }
  ],
  "status": "enabled",
  "version": "v1.0.0"
}
```

* **Hierarchical From/To Mapping**:
  * The `from` array always contains the **CHILD** selector.
  * The `to` array always contains the **PARENT** selector.
  * In a **Hierarchical Parent-Inventory** relationship, the `from` block (child) holds `mutatedRef` and the `to` block (parent) holds `mutatorRef` because the parent patches the child by providing its value.
  * In a **Hierarchical Parent-Wallet** relationship, the `from` block (child) holds `mutatorRef` and the `to` block (parent) holds `mutatedRef` because the child patches the parent with its own value.

**Hierarchical Example:**

```json
{
  "kind": "hierarchical",
  "selectors": [{
    "allow": {
      "from": [{"kind": "Child"}],
      "to": [{"kind": "Parent"}]
    }
  }]
}
```

---

### 2. Validate Syntax & Schema

Verify that your JSON/YAML syntax is valid:
* We recommend validating JSON and YAML files using terminal utilities (such as `jq` or `yq`), IDE linters (like the Red Hat YAML extension), or automated CI/CD checks via `yamllint`.
* Cross-reference your file against the official schema (available in the [meshery/schemas](https://github.com/meshery/schemas) repository) to ensure all required fields are present.
  * Schemas for relationships live at [schemas/constructs/v1beta2/relationship](https://github.com/meshery/schemas/tree/master/schemas/constructs/v1beta2/relationship).
  * Templates can be found at [schemas/constructs/v1beta2/relationship/templates](https://github.com/meshery/schemas/tree/master/schemas/constructs/v1beta2/relationship/templates).
  * The schema version used for a relationship file should be defined as a root field in the relationship file:
    ```json
    {
      "schemaVersion": "relationships.meshery.io/v1beta2"
    }
    ```

---

### 3. Verify Component Existence, Referenced Fields, and Existing Relationships

* **Verify Component Existence**: Ensure that the components you are defining the relationship between (e.g., `kind: PersistentVolume` and `kind: PersistentVolumeClaim`) actually exist in the target model.
  * *Where to look*: If you want to define a relationship between PV and PVC, look at `meshery/models/kubernetes/<latest-version>/v1.0.0/components/<desired-component>.json`.
* **Verify Referenced Fields**: Inspect the source component schema and confirm that the field referenced in the relationship actually exists.
  * *Example*: In the case of a relationship between any Kubernetes namespace-scoped object and a namespace, verify that the `mutatorRef` paths and `mutatedRef` paths exist and are valid.
  * Check the `source_ui` field of `component.json` to find the source CRDs of the specific vendor to confirm the schema.
  * *Note*: Meshery uses `displayName` for `metadata.name`.
* **Check for Existing Relationships**: Search the repository for similar relationships before creating a new one. This helps avoid duplicate contributions and ensures consistency with existing relationship patterns.

---

### 4. Place in the Correct Directory

Save your relationship file in the latest available version directory for the specific model.
* **Path format**: `meshery/models/<model-folder>/<latest-version>/v1.0.0/relationships/<your-file>.json`

---

## Phase 2: Local UI Testing (Kanvas)

### 1. Start the Local Server
1. Install UI dependencies in `meshery/ui/`.
2. Build the UI using `make ui-build` at the root directory.
3. Run `make ui-server` in the `meshery/` directory.

### 2. Access Kanvas
1. Open `http://localhost:9081` (or your configured port) in your browser.
2. Authenticate using your preferred Provider (use **Meshery** or **Layer5** as providers; the Local provider does not give access to Kanvas).
3. Navigate to the Kanvas design tool.

### 3. Test Component Interaction
Drag and drop the respective components (defined in your relationship) onto the canvas.

* **For Non-Binding-Edge Relationships**:
  * Drag a Deployment and then a Service on Kanvas. Notice that the gear icon on the left will spin (this is Meshery's evaluation engine). Once the evaluation is completed, you'll see the evaluation results in the evaluation panel, and an edge arrow will render automatically. 
  * The arrow should initiate from the provider component (`allow.from`, e.g., Deployment) and extend towards the consumer component (`allow.to`, e.g., Service).
  * If it doesn't render automatically, try to draw it manually.
  * Watch this demo: [Screencast from 02-07-26 12:22:25 AM IST](https://drive.google.com/file/d/11rB9TUm1uB1XD4Ym05zN-aFoMivzCqmX/view?usp=drive_link).
  * Watch this manual drawing demo: [Screencast from 02-07-26 04:51:37 AM IST](https://drive.google.com/file/d/1qOAzMoib_ZQfcyKzJnDx2zGLxpHRxjWw/view?usp=sharing).
  * *Note*: Match strategy matrix is applicable for non-binding-edge relationships.

* **For Binding Relationships**:
  * Match strategy matrix is not applicable.
  * You can place the `mutatorRef` on either the `from` or `to` node.

* **For Hierarchical Relationships**:
  * Match strategy matrix is not applicable.
  * For **Parent-inventory** relationships, ensure that the `mutatorRef` is placed at the Parent (inside the `to` block).
  * For **Parent-wallet** relationships, ensure that the `mutatorRef` is placed at the Child component (inside the `from` block).
  * Arrows are not used. Simply drag the child component and drop it inside the parent component (e.g., placing a Pod inside a Namespace, or an EC2 instance inside a VPC). Verify the UI visually embeds the child.
  * Watch this embedding demo: [Screencast from 02-07-26 04:06:51 AM IST](https://drive.google.com/file/d/11CF1Or0l7CqdLlloMDQyuBYkjMyrhBO8/view?usp=sharing).

---

## Phase 3: Evaluation & Verification

### 1. Check the Evaluation Engine
* Open the **Evaluation Engine** panel in Kanvas.
* Notice the evaluation results. Ensure your relationship fired and no OPA policy errors were thrown.
* **Understanding the Evaluation Engine**: It is a dynamic runtime engine (not a static linter) that analyzes and mutates the design based on registered rules. When processing, it enforces:
  * **Semantic Validity**: Validates if manually drawn connections are actually allowed by a registered `RelationshipDefinition` in the registry.
  * **Dependency Fulfillment**: Flags missing required components and can auto-inject them (e.g., automatically adding a Namespace if a Pod requires one).
  * **Configuration Mutability (Patching)**: Validates and applies patches (e.g., automatically injecting Component B's IP address or selector into Component A's configuration based on the policy).
  * Watch this demo: [Meshery Evaluation Engine Automatic Relationship Updates](https://drive.google.com/file/d/1TVLqSqilEH4CIbpXJJSCbsiS4pBgH4Cy/view?usp=sharing).

### 2. Dry Run / Validate
* Click the **Validate** or **Dry Run** (Actions) button to verify the design against Kubernetes schemas.

> **Note:** The Validate button does not validate your relationship definition itself; it only checks for Kubernetes guidelines regarding expected or required values (for example, ensuring a container image and name are not empty for a Pod).

### 3. Verify Manifest Generation
* Export the design as a manifest to ensure the `mutatedRef` patch was applied to the consumer's configuration.
* Inspect the exported YAML/JSON to verify that the data was successfully injected.
* Deploy the generated manifest to your cluster to confirm it works as expected, or attempt to deploy it directly to a test cluster if your Kubernetes cluster is connected.
* Watch this export demo: [Screencast from 02-07-26 03:56:52 PM IST](https://drive.google.com/file/d/1QQMU0EF7VG5J0h9NdYL9SToOhgeMJ52X/view?usp=sharing).

### 4. Vice-Versa Generation (Import Verification)
* Meshery also renders relationships through imported YAMLs.
* You can import a YAML file in the Meshery UI and see the infrastructure rendered as a design.
* Try exporting your test design that exercises the relationship as a Kubernetes manifest, and then import it again to ensure it gets rendered correctly.
* Watch this import rendering demo: [Screencast from 02-07-26 03:35:58 PM IST](https://drive.google.com/file/d/1pjVToxIqm4NKIx-0sDMAzp1032cBVt7E/view?usp=sharing).

---

## Phase 4: Pull Request Submission

### 1. Capture a Demo
Record a short demo video (preferred) or take high-quality screenshots demonstrating:
* The components connecting in Kanvas.
* The successful evaluation result.
* Any mutation happening in real time.
* Watch this complete demo: [How to Validate Meshery Relationship Files](https://drive.google.com/file/d/1Abtn4yfclwe-VM35drTDJIwKDM0Ly4zK/view?usp=sharing).

### 2. Submit PR
Attach the video/screenshots to your Pull Request description to prove the relationship has been tested and works as intended.

---

## More References & Workshops

* **Relationships Workshop Part 1**: [Watch on YouTube](https://www.youtube.com/live/IJ0wtrQWxhw)
* **Relationships Workshop Part 2**: [Watch on YouTube](https://www.youtube.com/live/UmSjNNKaJo8)
* **Slides**: [CMC - Working with Meshery Relationships](https://docs.google.com/presentation/d/1isBoZmsNi9AOrI7mUvpeBeF5QtEGK0ACV11Q9hoqG_I/edit?slide=id.g34a2b009d75_0_23#slide=id.g34a2b009d75_0_23)
* **Meshery Models Workshop**: [Contributor Training Series: Meshery Models (Aabid Sofi)](https://www.youtube.com/watch?v=K2gmdIlGXNo)
* **Slides**: [Contributing to Meshery Models](https://docs.google.com/presentation/d/1XSnDpXeloE9c7FOHGy2l82YbykHl49njUN1RgFoe_ac/edit)
