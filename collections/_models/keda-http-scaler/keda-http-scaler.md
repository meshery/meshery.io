---
layout: single-page-model
item-type: model
name: KEDA HTTP Scaler
subtitle: Collaborative and visual infrastructure as design for KEDA HTTP Scaler
colorIcon: /assets/images/integration/keda-http-scaler/icons/color/keda-http-scaler-color.svg
whiteIcon: /assets/images/integration/keda-http-scaler/icons/white/keda-http-scaler-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/keda-http-scaler
description: 
category: Orchestration & Management
subcategory: Scheduling & Orchestration
registrant: Artifact Hub
components: 
- name: http-scaled-object
  colorIcon: assets/images/integration/keda-http-scaler/components/http-scaled-object/icons/color/http-scaled-object-color.svg
  whiteIcon: assets/images/integration/keda-http-scaler/components/http-scaled-object/icons/white/http-scaled-object-white.svg
  description: 
componentsCount: 1
relationships: 
- type: "Non Binding"
  kind: "Edge"
  description: "A KEDA HTTPScaledObject is a Kubernetes custom resource definition (CRD) used in conjunction with the KEDA HTTP Add-on to enable the automatic scaling of your HTTP-based applications based on incoming HTTP traffic. This means your application can dynamically adjust the number of replicas (pods) running to handle varying workloads efficiently."
relationshipsCount: 1
featureList: [
  "Scales based on HTTP requests and metrics",
  "Integrates with various ingress controllers",
  "Supports various HTTP metrics"
]
howItWorks: "Scales deployments with KEDA HTTP Scaler"
howItWorksDetails: "Automated scaling of Kubernetes applications based on HTTP traffic"
---
