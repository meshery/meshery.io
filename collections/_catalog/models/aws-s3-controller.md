---
name: AWS Simple Storage Service (S3)
subtitle: Collaborative and visual infrastructure as design for AWS Simple Storage Service (S3)
colorIcon: /assets/images/integration/aws-s3-controller/icons/color/aws-s3-controller-color.svg
whiteIcon: /assets/images/integration/aws-s3-controller/icons/white/aws-s3-controller-white.svg
permalink: extensibility/integrations/aws-s3-controller
docURL: https://docs.meshery.io/extensibility/integrations/aws-s3-controller
description: 
category: Cloud Native Storage
subcategory: Storage
registrant: GitHub
components: 
- name: field-export
  colorIcon: assets/images/integration/aws-s3-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-s3-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-s3-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-s3-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: bucket
  colorIcon: assets/images/integration/aws-s3-controller/components/bucket/icons/color/bucket-color.svg
  whiteIcon: assets/images/integration/aws-s3-controller/components/bucket/icons/white/bucket-white.svg
  description: 
componentsCount: 3
relationships: 
- type: "Parent"
  kind: "Hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent) component is patched with the configuration of other (child) component. E.g Secret->Pod, ConfigMaps->Deployment, etc..."
- type: "Non Binding"
  kind: "Edge"
  description: "A relationship that defines network edges between components"
- type: "Binding"
  kind: "Edge"
  description: ""
- type: "Binding"
  kind: "Edge"
  description: ""
- type: "Non Binding"
  kind: "Edge"
  description: ""
- type: "Sibling"
  kind: "Hierarchical"
  description: ""
relationshipsCount: 6
featureList: [
  "Stores and retrieves any amount of data",
  "Highly scalable and durable",
  "Integrates with various AWS services"
]
howItWorks: "Integrates S3 storage"
howItWorksDetails: "Provides scalable and reliable storage for Kubernetes applications"
---
