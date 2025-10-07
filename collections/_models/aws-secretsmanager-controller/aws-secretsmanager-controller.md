---
layout: single-page-model
item-type: model
name: AWS Secrets Manager
subtitle: Collaborative and visual infrastructure as design for AWS Secrets Manager
colorIcon: /assets/images/integration/aws-secretsmanager-controller/icons/color/aws-secretsmanager-controller-color.svg
whiteIcon: /assets/images/integration/aws-secretsmanager-controller/icons/white/aws-secretsmanager-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-secretsmanager-controller
description: 
category: Security & Compliance
subcategory: Security Identity Compliance
registrant: GitHub
components: 
- name: field-export
  colorIcon: assets/images/integration/aws-secretsmanager-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-secretsmanager-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-secretsmanager-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-secretsmanager-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: secret
  colorIcon: assets/images/integration/aws-secretsmanager-controller/components/secret/icons/color/secret-color.svg
  whiteIcon: assets/images/integration/aws-secretsmanager-controller/components/secret/icons/white/secret-white.svg
  description: 
componentsCount: 3
relationships: 
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between adoptedresourcex and Secret "
relationshipsCount: 1
featureList: [
  "Centrally store and manage credentials, API keys, and other secrets.",
  "Use AWS Identity and Access Management (IAM) permissions policies to manage access to your secrets.",
  "Rotate secrets on demand or on a schedule, without redeploying or disrupting active applications."
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
