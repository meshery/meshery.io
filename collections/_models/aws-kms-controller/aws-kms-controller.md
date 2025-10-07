---
layout: single-page-model
item-type: model
name: AWS KMS
subtitle: Collaborative and visual infrastructure as design for AWS KMS
colorIcon: /assets/images/integration/aws-kms-controller/icons/color/aws-kms-controller-color.svg
whiteIcon: /assets/images/integration/aws-kms-controller/icons/white/aws-kms-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-kms-controller
description: 
category: Security & Compliance
subcategory: Key Management Service
registrant: GitHub
components: 
- name: field-export
  colorIcon: assets/images/integration/aws-kms-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-kms-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-kms-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-kms-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: alias
  colorIcon: assets/images/integration/aws-kms-controller/components/alias/icons/color/alias-color.svg
  whiteIcon: assets/images/integration/aws-kms-controller/components/alias/icons/white/alias-white.svg
  description: 
- name: grant
  colorIcon: assets/images/integration/aws-kms-controller/components/grant/icons/color/grant-color.svg
  whiteIcon: assets/images/integration/aws-kms-controller/components/grant/icons/white/grant-white.svg
  description: 
- name: key
  colorIcon: assets/images/integration/aws-kms-controller/components/key/icons/color/key-color.svg
  whiteIcon: assets/images/integration/aws-kms-controller/components/key/icons/white/key-white.svg
  description: 
componentsCount: 5
relationships: 
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between function and CodeSigningConfig"
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between EventSourceMapping and function"
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between FunctionURLConfig and function"
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between Function and SecurityGroup"
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between function and subnet"
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between alias and version"
- type: "Parent"
  kind: "Hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
- type: "Parent"
  kind: "Hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
relationshipsCount: 8
featureList: [
  "Secure key management",
  "Encrypts data at rest and in transit",
  "Integrates with other AWS services"
]
howItWorks: "Integrates with KMS"
howItWorksDetails: "Enhanced security for Kubernetes applications and data on AWS"
---
