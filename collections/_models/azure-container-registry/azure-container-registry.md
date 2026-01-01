---
layout: single-page-model
item-type: model
name: Azure Container Registry
subtitle: Collaborative and visual infrastructure as design for Azure Container Registry
colorIcon: /assets/images/integration/azure-container-registry/icons/color/azure-container-registry-color.svg
whiteIcon: /assets/images/integration/azure-container-registry/icons/white/azure-container-registry-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/azure-container-registry
description: 
category: Provisioning
subcategory: Container Registry
registrant: GitHub
components: 
- name: registry
  colorIcon: assets/images/integration/azure-container-registry/components/registry/icons/color/registry-color.svg
  whiteIcon: assets/images/integration/azure-container-registry/components/registry/icons/white/registry-white.svg
  description: 
- name: registry-replication
  colorIcon: assets/images/integration/azure-container-registry/components/registry-replication/icons/color/registry-replication-color.svg
  whiteIcon: assets/images/integration/azure-container-registry/components/registry-replication/icons/white/registry-replication-white.svg
  description: 
componentsCount: 2
relationships: 
- type: "parent"
  kind: "hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
relationshipsCount: 1
featureList: [
  "Drag-n-drop cloud native infrastructure designer to configure, model, and deploy your workloads.",
  "Invite anyone to review and make changes to your private designs.",
  "Ongoing synchronization of Kubernetes configuration and changes across any number of clusters."
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
