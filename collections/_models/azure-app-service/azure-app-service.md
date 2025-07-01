---
layout: single-page-model
item-type: model
name: Azure App Service
subtitle: Collaborative and visual infrastructure as design for Azure App Service
colorIcon: /assets/images/integration/azure-app-service/icons/color/azure-app-service-color.svg
whiteIcon: /assets/images/integration/azure-app-service/icons/white/azure-app-service-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/azure-app-service
description: 
category: App Definition and Development
subcategory: App Integration
registrant: GitHub
components: 
- name: auth-config
  colorIcon: assets/images/integration/azure-app-service/components/auth-config/icons/color/auth-config-color.svg
  whiteIcon: assets/images/integration/azure-app-service/components/auth-config/icons/white/auth-config-white.svg
  description: 
- name: container-app
  colorIcon: assets/images/integration/azure-app-service/components/container-app/icons/color/container-app-color.svg
  whiteIcon: assets/images/integration/azure-app-service/components/container-app/icons/white/container-app-white.svg
  description: 
- name: job
  colorIcon: assets/images/integration/azure-app-service/components/job/icons/color/job-color.svg
  whiteIcon: assets/images/integration/azure-app-service/components/job/icons/white/job-white.svg
  description: 
- name: managed-environment
  colorIcon: assets/images/integration/azure-app-service/components/managed-environment/icons/color/managed-environment-color.svg
  whiteIcon: assets/images/integration/azure-app-service/components/managed-environment/icons/white/managed-environment-white.svg
  description: 
componentsCount: 4
relationships: 
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between ContainerApp and ManagedEnvironment(azure-app-service)"
relationshipsCount: 1
featureList: [
  "Drag-n-drop cloud native infrastructure designer to configure, model, and deploy your workloads.",
  "Invite anyone to review and make changes to your private designs.",
  "Ongoing synchronization of Kubernetes configuration and changes across any number of clusters."
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
