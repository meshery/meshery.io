---
title: mesheryctl component and relationship commands
subheading: How to check the Meshery components and relationships between them using mesheryctl
date: 2025-10-31
author: Hussaina Begum
categories:
  - releases
  - mesheryctl
redirect_from: /blog/mesheryctl-component-relationship-explained
published: true
---

# Meshery CLI: Component and Relationship Commands

## Component


The `component` command manages components registered in Meshery. Components are **fundamental building blocks** representing and defining the infrastructure under management. This command lets users:

- View details of specific components
- List all registered components
- Search for components via keywords
- Interact with registered management entities in Meshery server

**Base command syntax:**

```
mesheryctl component
```


### Subcommands

- `list` — List all components registered in Meshery server
- `view` — View details of a specific component
- `search` — Search registry for components using keywords


### Flags

- `--count` (optional): Get the number of components in total
- `-h, --help`: Help for component


#### Example: List Components

```
mesheryctl component list

Total number of components: 3727
Page: 1

NAME                MODEL                            CATEGORY                  VERSION
ACL                 aws-memorydb-controller          ACL                       memorydb.services.k8s.aws/v1alpha1
ACL                 kubeform-provider-aws            ACL                       memorydb.aws.kubeform.com/v1alpha1
AI Platform Model   k8s-config-connector             AIPlatformModel           aiplatform.cnrm.cloud.google.com/v1alpha1
AP Dos Log Conf     nginx-ingress                    APDosLogConf              appprotectdos.f5.com/v1beta1
...
```


#### Example: Search Components

```
mesheryctl component search tensor

Total number of components: 3
Page: 1

NAME                     MODEL                 KIND                       VERSION
AWS TensorFlow on AWS    aws                   AWS TensorFlow on AWS      core.meshery.io/v1alpha1
GCP Tensorflow Enterprise gcp                  GCP Tensorflow Enterprise  core.meshery.io/v1alpha1
Vertex AI Tensorboard    k8s-config-connector  VertexAITensorboard        vertexai.cnrm.cloud.google.com/v1alpha1
```


#### Example: View Component Details

```
mesheryctl component view acl

Use the arrow keys to navigate: ↓ ↑ → ←

Select component:
  ▸ ACL, version: memorydb.services.k8s.aws/v1alpha1
    ACL, version: memorydb.aws.kubeform.com/v1alpha1
    Network ACL, version: ec2.services.k8s.aws/v1alpha1
    Oracle, version: kubedb.com/v1alpha2
    Oracle Version, version: catalog.kubedb.com/v1alpha1
```

```
mesheryctl component view kubegres

id: 59c8b93a-81a4-4622-87cd-354e17833952
schemaVersion: components.meshery.io/v1beta1
version: v1.0.0
displayName: Kubegres
description: ""
format: JSON
model:
  id: bef7242f-2a00-0cb5-4402-91f30c17b3c5
  schemaVersion: models.meshery.io/v1beta1
  version: v1.0.0
  name: postgres-with-operator
  displayName: Postgres With Operator
  status: enabled
  registrant:
    id: cf1d6acd-4509-e589-1c1e-3f20f8aaf715
    name: Artifact Hub
    type: registry
    kind: artifacthub
    status: registered
    created_at: 2025-10-29T16:39:53.249049629Z
    updated_at: 2025-10-29T16:39:53.249049629Z
  connection_id: cf1d6acd-4509-e589-1c1e-3f20f8aaf715
  category:
    id: ab73d2ca-e731-6532-6780-e789cc29a64b
    name: Database
  subCategory: App Definition and Development
```

**For detailed info:**
[Component Command Reference](https://docs.meshery.io/reference/mesheryctl/component)

***

## Relationship

The `relationship` command describes **how Meshery-managed components are connected and interact**. It reveals relationships among registered entities, adapters, and core components.

**Base command syntax:**

```
mesheryctl exp relationship
```


### Subcommands

- `generate` — Generate relationships documents
- `list` — List all registered relationships
- `view` — View relationships by model name
- `search` — Search registered relationships using keywords


### Flags

- `--count` (optional): Get total number of relationships
- `-h, --help`: Help for relationship


#### Example: List Relationships

```
mesheryctl exp relationship list

Total number of relationships: 502
Page: 1

KIND         API VERSION      MODEL NAME                  SUB TYPE    EVALUATION POLICY
edge         v1.0.0           aws-apigatewayv2-controller network
edge         v1.0.0           aws-apigatewayv2-controller reference
hierarchical v1.0.0           aws-apigatewayv2-controller inventory
edge         v1.0.0           aws-applicationautoscaling-controller reference
edge         v1.0.0           aws-cloudfront-controller   network
...
```


#### Example: View Relationships of a Model

```
mesheryctl exp relationship view aws-vpc-cni

Use arrow keys to navigate: ↓ ↑ → ←

Select a relationship:
  ▸ kind: edge, EvaluationPolicy: , SubType: firewall
    kind: edge, EvaluationPolicy: , SubType: network
```

Detailed schema for an AWS VPC CNI relationship (firewall subtype):

```
kind: edge
id: 52c6d9ab-d7ff-4b33-98eb-41a0bade8995
metadata:
  description: An edge relationship between policyendpoint and securitygroup
  styles:
    primaryColor: ""
    svgColor: ""
    svgWhite: ""
  isAnnotation: false
  additionalproperties: {}
model:
  id: e6a5081b-4e32-016b-50d5-73f189545e7f
  schemaVersion: models.meshery.io/v1beta1
  version: v1.0.0
  name: aws-vpc-cni
  displayName: AWS VPC CNI
  status: enabled
  registrant:
    id: 00000000-0000-0000-0000-000000000000
    kind: ""
    status: ""
  connection_id: cf1d6acd-4509-e589-1c1e-3f20f8aaf715
  category:
    id: ce0a3644-0d14-5673-73ac-43706fc02429
    name: Cloud Native Network
  subCategory: Cloud Native Network
  metadata:
    isAnnotation: false
    primaryColor: '#ff9900'
    secondaryColor: '#F4BC79'
    svgWhite: ui/public/static/img/meshmodels/aws-vpc-cni/white/aws-vpc-cni-white.svg
    svgColor: ui/public/static/img/meshmodels/aws-vpc-cni/color/aws-vpc-cni-color.svg
    shape: circle
  model:
    version: 1.20.4
```


#### Example: Search Relationships (Firewall Subtype)

```
mesheryctl exp relationship --subtype firewall search aws-vpc-cni

Total number of relationships: 24
Page: 1

KIND  APIVERSION                         MODEL-NAME                    SUBTYPE    REGOQUERY
edge  relationships.meshery.io/v1alpha3  AWS DocumentDB                firewall
edge  relationships.meshery.io/v1alpha3  AWS DynamoDB                  firewall
edge  relationships.meshery.io/v1alpha3  AWS EC2                       firewall
edge  relationships.meshery.io/v1alpha3  AWS Lambda                    firewall
edge  relationships.meshery.io/v1alpha3  AWS MemoryDB for Redis        firewall
edge  relationships.meshery.io/v1alpha3  AWS MQ                        firewall
edge  relationships.meshery.io/v1alpha3  AWS OpenSearch Service        firewall
...
```

**For detailed info:**
[Relationship Command Reference](https://docs.meshery.io/reference/mesheryctl/exp/relationship)

