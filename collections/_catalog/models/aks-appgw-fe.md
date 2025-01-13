---
name: Azure Application Gateway 
subtitle: Collaborative and visual infrastructure as design for Azure Application Gateway 
colorIcon: /assets/images/integration/aks-appgw-fe/icons/color/aks-appgw-fe-color.svg
whiteIcon: /assets/images/integration/aks-appgw-fe/icons/white/aks-appgw-fe-white.svg
permalink: extensibility/integrations/aks-appgw-fe
docURL: https://docs.meshery.io/extensibility/integrations/aks-appgw-fe
description: 
category: Cloud Native Network
subcategory: Service Proxy
registrant: Artifact Hub
components: 
- name: azure-assigned-identity
  colorIcon: assets/images/integration/aks-appgw-fe/components/azure-assigned-identity/icons/color/azure-assigned-identity-color.svg
  whiteIcon: assets/images/integration/aks-appgw-fe/components/azure-assigned-identity/icons/white/azure-assigned-identity-white.svg
  description: 
- name: azure-identity
  colorIcon: assets/images/integration/aks-appgw-fe/components/azure-identity/icons/color/azure-identity-color.svg
  whiteIcon: assets/images/integration/aks-appgw-fe/components/azure-identity/icons/white/azure-identity-white.svg
  description: 
- name: azure-identity-binding
  colorIcon: assets/images/integration/aks-appgw-fe/components/azure-identity-binding/icons/color/azure-identity-binding-color.svg
  whiteIcon: assets/images/integration/aks-appgw-fe/components/azure-identity-binding/icons/white/azure-identity-binding-white.svg
  description: 
- name: azure-pod-identity-exception
  colorIcon: assets/images/integration/aks-appgw-fe/components/azure-pod-identity-exception/icons/color/azure-pod-identity-exception-color.svg
  whiteIcon: assets/images/integration/aks-appgw-fe/components/azure-pod-identity-exception/icons/white/azure-pod-identity-exception-white.svg
  description: 
componentsCount: 4
relationships: 
relationshipsCount: 0
featureList: [
  "URL routing and cookie-based affinity
",
  "Support for public, private, and hybrid web sites and 
integrated web application firewall",
  "Secure Sockets Layer (SSL) termination and End-to-end SSL"
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Application Gateway Ingress Controller runs in its own pod on the customer’s AKS. Ingress Controller monitors a subset of Kubernetes’ resources for changes. The state of the AKS cluster is translated to Application Gateway specific configuration and applied to the Azure Resource Manager. The continuous re-configuration of Application Gateway ensures uninterrupted flow of traffic to AKS’ services. The diagram below illustrates the flow of state and configuration changes from the Kubernetes API, via Application Gateway Ingress Controller, to Resource Manager and then Application Gateway."
---
