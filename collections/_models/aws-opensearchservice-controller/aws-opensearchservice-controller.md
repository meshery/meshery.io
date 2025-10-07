---
layout: single-page-model
item-type: model
name: AWS OpenSearch Service
subtitle: Collaborative and visual infrastructure as design for AWS OpenSearch Service
colorIcon: /assets/images/integration/aws-opensearchservice-controller/icons/color/aws-opensearchservice-controller-color.svg
whiteIcon: /assets/images/integration/aws-opensearchservice-controller/icons/white/aws-opensearchservice-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-opensearchservice-controller
description: 
category: Observability and Analysis
subcategory: Logging
registrant: GitHub
components: 
- name: domain
  colorIcon: assets/images/integration/aws-opensearchservice-controller/components/domain/icons/color/domain-color.svg
  whiteIcon: assets/images/integration/aws-opensearchservice-controller/components/domain/icons/white/domain-white.svg
  description: 
- name: field-export
  colorIcon: assets/images/integration/aws-opensearchservice-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-opensearchservice-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-opensearchservice-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-opensearchservice-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
componentsCount: 3
relationships: 
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between domain and secuirtygroup "
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between domain and subnet "
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between AdoptedResource and domain "
relationshipsCount: 3
featureList: [
  "Scalable search and analytics",
  "Easy to deploy and manage",
  "Integrates with other AWS services"
]
howItWorks: "Deploys and manages OpenSearch"
howItWorksDetails: "Simplified OpenSearch management and integration with AWS"
---
