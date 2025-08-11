---
layout: single-page-model
item-type: model
name: Azure SignalR Service
subtitle: Collaborative and visual infrastructure as design for Azure SignalR Service
colorIcon: /assets/images/integration/azure-signalr-service/icons/color/azure-signalr-service-color.svg
whiteIcon: /assets/images/integration/azure-signalr-service/icons/white/azure-signalr-service-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/azure-signalr-service
description: 
category: Observability and Analysis
subcategory: Streaming & Messaging
registrant: GitHub
components: 
- name: custom-certificate
  colorIcon: assets/images/integration/azure-signalr-service/components/custom-certificate/icons/color/custom-certificate-color.svg
  whiteIcon: assets/images/integration/azure-signalr-service/components/custom-certificate/icons/white/custom-certificate-white.svg
  description: 
- name: custom-domain
  colorIcon: assets/images/integration/azure-signalr-service/components/custom-domain/icons/color/custom-domain-color.svg
  whiteIcon: assets/images/integration/azure-signalr-service/components/custom-domain/icons/white/custom-domain-white.svg
  description: 
- name: replica
  colorIcon: assets/images/integration/azure-signalr-service/components/replica/icons/color/replica-color.svg
  whiteIcon: assets/images/integration/azure-signalr-service/components/replica/icons/white/replica-white.svg
  description: 
- name: signal-r
  colorIcon: assets/images/integration/azure-signalr-service/components/signal-r/icons/color/signal-r-color.svg
  whiteIcon: assets/images/integration/azure-signalr-service/components/signal-r/icons/white/signal-r-white.svg
  description: 
componentsCount: 4
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
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between CustomDomain and CustomCertificate(azure-signalr-service)"
relationshipsCount: 4
featureList: [
  "Drag-n-drop cloud native infrastructure designer to configure, model, and deploy your workloads.",
  "Invite anyone to review and make changes to your private designs.",
  "Ongoing synchronization of Kubernetes configuration and changes across any number of clusters."
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
