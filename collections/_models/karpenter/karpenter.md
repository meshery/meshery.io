---
layout: single-page-model
item-type: model
name: Karpenter
subtitle: Collaborative and visual infrastructure as design for Karpenter
colorIcon: /assets/images/integration/karpenter/icons/color/karpenter-color.svg
whiteIcon: /assets/images/integration/karpenter/icons/white/karpenter-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/karpenter
description: 
category: Provisioning
subcategory: Automation & Configuration
registrant: Artifact Hub
components: 
- name: aws-node-template
  colorIcon: assets/images/integration/karpenter/components/aws-node-template/icons/color/aws-node-template-color.svg
  whiteIcon: assets/images/integration/karpenter/components/aws-node-template/icons/white/aws-node-template-white.svg
  description: 
- name: provisioner
  colorIcon: assets/images/integration/karpenter/components/provisioner/icons/color/provisioner-color.svg
  whiteIcon: assets/images/integration/karpenter/components/provisioner/icons/white/provisioner-white.svg
  description: 
componentsCount: 2
relationships: 
relationshipsCount: 0
featureList: [
  "Watching for pods that the Kubernetes scheduler has marked as unschedulable",
  "Evaluating scheduling constraints (resource requests, nodeselectors, affinities, tolerations, and topology spread constraints) requested by the pods",
  "Provisioning nodes that meet the requirements of the pods"
]
howItWorks: "Using Meshery and Karpenter, once your Kubernetes cluster and the Karpenter controller are up and running"
howItWorksDetails: "Set up provisioners: By applying a provisioner to Karpenter, you can configure constraints on node provisioning and set timeout values for node expiry or Kubelet configuration values. 

Deploy workloads: When deploying workloads, you can request that scheduling constraints be met to direct which nodes Karpenter provisions for those workloads. "
---
