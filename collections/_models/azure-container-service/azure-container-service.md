---
layout: single-page-model
item-type: model
name: Azure Container Service
subtitle: Collaborative and visual infrastructure as design for Azure Container Service
colorIcon: /assets/images/integration/azure-container-service/icons/color/azure-container-service-color.svg
whiteIcon: /assets/images/integration/azure-container-service/icons/white/azure-container-service-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/azure-container-service
description: 
category: Provisioning
subcategory: Containers
registrant: GitHub
components: 
- name: fleet
  colorIcon: assets/images/integration/azure-container-service/components/fleet/icons/color/fleet-color.svg
  whiteIcon: assets/images/integration/azure-container-service/components/fleet/icons/white/fleet-white.svg
  description: 
- name: fleets-member
  colorIcon: assets/images/integration/azure-container-service/components/fleets-member/icons/color/fleets-member-color.svg
  whiteIcon: assets/images/integration/azure-container-service/components/fleets-member/icons/white/fleets-member-white.svg
  description: 
- name: fleets-update-run
  colorIcon: assets/images/integration/azure-container-service/components/fleets-update-run/icons/color/fleets-update-run-color.svg
  whiteIcon: assets/images/integration/azure-container-service/components/fleets-update-run/icons/white/fleets-update-run-white.svg
  description: 
- name: maintenance-configuration
  colorIcon: assets/images/integration/azure-container-service/components/maintenance-configuration/icons/color/maintenance-configuration-color.svg
  whiteIcon: assets/images/integration/azure-container-service/components/maintenance-configuration/icons/white/maintenance-configuration-white.svg
  description: 
- name: managed-cluster
  colorIcon: assets/images/integration/azure-container-service/components/managed-cluster/icons/color/managed-cluster-color.svg
  whiteIcon: assets/images/integration/azure-container-service/components/managed-cluster/icons/white/managed-cluster-white.svg
  description: 
- name: managed-clusters-agent-pool
  colorIcon: assets/images/integration/azure-container-service/components/managed-clusters-agent-pool/icons/color/managed-clusters-agent-pool-color.svg
  whiteIcon: assets/images/integration/azure-container-service/components/managed-clusters-agent-pool/icons/white/managed-clusters-agent-pool-white.svg
  description: 
- name: trusted-access-role-binding
  colorIcon: assets/images/integration/azure-container-service/components/trusted-access-role-binding/icons/color/trusted-access-role-binding-color.svg
  whiteIcon: assets/images/integration/azure-container-service/components/trusted-access-role-binding/icons/white/trusted-access-role-binding-white.svg
  description: 
componentsCount: 7
relationships: 
- type: "Parent"
  kind: "Hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
- type: "Parent"
  kind: "Hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
- type: "Parent"
  kind: "Hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
- type: "Parent"
  kind: "Hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
- type: "Parent"
  kind: "Hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between Fleetsmember and mangedCluster(azure-container-service)"
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between TrustedAccessRoleBinding and Workspace(azure-machine-learning)"
relationshipsCount: 7
featureList: [
  "Drag-n-drop cloud native infrastructure designer to configure, model, and deploy your workloads.",
  "Invite anyone to review and make changes to your private designs.",
  "Ongoing synchronization of Kubernetes configuration and changes across any number of clusters."
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
