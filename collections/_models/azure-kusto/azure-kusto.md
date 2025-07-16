---
layout: single-page-model
item-type: model
name: Azure Kusto
subtitle: Collaborative and visual infrastructure as design for Azure Kusto
colorIcon: /assets/images/integration/azure-kusto/icons/color/azure-kusto-color.svg
whiteIcon: /assets/images/integration/azure-kusto/icons/white/azure-kusto-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/azure-kusto
description: 
category: Orchestration & Management
subcategory: Kubernetes
registrant: GitHub
components: 
- name: cluster
  colorIcon: assets/images/integration/azure-kusto/components/cluster/icons/color/cluster-color.svg
  whiteIcon: assets/images/integration/azure-kusto/components/cluster/icons/white/cluster-white.svg
  description: 
- name: database
  colorIcon: assets/images/integration/azure-kusto/components/database/icons/color/database-color.svg
  whiteIcon: assets/images/integration/azure-kusto/components/database/icons/white/database-white.svg
  description: 
- name: data-connection
  colorIcon: assets/images/integration/azure-kusto/components/data-connection/icons/color/data-connection-color.svg
  whiteIcon: assets/images/integration/azure-kusto/components/data-connection/icons/white/data-connection-white.svg
  description: 
componentsCount: 3
relationships: 
- type: "Parent"
  kind: "Hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
- type: "Parent"
  kind: "Hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between Database and NamespacesEventHub(azure-event-hub)"
relationshipsCount: 3
featureList: [
  "Drag-n-drop cloud native infrastructure designer to configure, model, and deploy your workloads.",
  "Invite anyone to review and make changes to your private designs.",
  "Ongoing synchronization of Kubernetes configuration and changes across any number of clusters."
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
