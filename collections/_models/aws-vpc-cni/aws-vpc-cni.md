---
layout: single-page-model
item-type: model
name: AWS VPC CNI
subtitle: Collaborative and visual infrastructure as code for AWS VPC CNI
colorIcon: /assets/images/integration/aws-vpc-cni/icons/color/aws-vpc-cni-color.svg
whiteIcon: /assets/images/integration/aws-vpc-cni/icons/white/aws-vpc-cni-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-vpc-cni
description: 
category: Cloud Native Network
subcategory: Cloud Native Network
registrant: Artifact Hub
components: 
- name: eni-config
  colorIcon: assets/images/integration/aws-vpc-cni/components/eni-config/icons/color/eni-config-color.svg
  whiteIcon: assets/images/integration/aws-vpc-cni/components/eni-config/icons/white/eni-config-white.svg
  description: 
- name: policy-endpoint
  colorIcon: assets/images/integration/aws-vpc-cni/components/policy-endpoint/icons/color/policy-endpoint-color.svg
  whiteIcon: assets/images/integration/aws-vpc-cni/components/policy-endpoint/icons/white/policy-endpoint-white.svg
  description: 
componentsCount: 2
relationships: 
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between policyendpoint and securitygroup"
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between ENIConfig and Subnet"
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between VPCLink and Integration"
relationshipsCount: 3
featureList: [
  "Keep revision history and audit trail of all configuration changes",
  "Use Kanvas&lsquo;s visual designer to explore your App Mesh configuration",
  "Deploy Meshery on your EKS clusters for App Mesh management"
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
