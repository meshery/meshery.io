---
layout: single-page-model
item-type: model
name: AWS Elastic Kubernetes Service
subtitle: Collaborative and visual infrastructure as design for AWS Elastic Kubernetes Service
colorIcon: /assets/images/integration/aws-eks-controller/icons/color/aws-eks-controller-color.svg
whiteIcon: /assets/images/integration/aws-eks-controller/icons/white/aws-eks-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-eks-controller
description: 
category: Orchestration & Management
subcategory: Containers
registrant: GitHub
components: 
- name: cluster
  colorIcon: assets/images/integration/aws-eks-controller/components/cluster/icons/color/cluster-color.svg
  whiteIcon: assets/images/integration/aws-eks-controller/components/cluster/icons/white/cluster-white.svg
  description: 
- name: addon
  colorIcon: assets/images/integration/aws-eks-controller/components/addon/icons/color/addon-color.svg
  whiteIcon: assets/images/integration/aws-eks-controller/components/addon/icons/white/addon-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-eks-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-eks-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: eks-anywhere-subscription
  colorIcon: assets/images/integration/aws-eks-controller/components/eks-anywhere-subscription/icons/color/eks-anywhere-subscription-color.svg
  whiteIcon: assets/images/integration/aws-eks-controller/components/eks-anywhere-subscription/icons/white/eks-anywhere-subscription-white.svg
  description: 
- name: fargate-profile
  colorIcon: assets/images/integration/aws-eks-controller/components/fargate-profile/icons/color/fargate-profile-color.svg
  whiteIcon: assets/images/integration/aws-eks-controller/components/fargate-profile/icons/white/fargate-profile-white.svg
  description: 
- name: field-export
  colorIcon: assets/images/integration/aws-eks-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-eks-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: nodegroup
  colorIcon: assets/images/integration/aws-eks-controller/components/nodegroup/icons/color/nodegroup-color.svg
  whiteIcon: assets/images/integration/aws-eks-controller/components/nodegroup/icons/white/nodegroup-white.svg
  description: 
- name: pod-identity-association
  colorIcon: assets/images/integration/aws-eks-controller/components/pod-identity-association/icons/color/pod-identity-association-color.svg
  whiteIcon: assets/images/integration/aws-eks-controller/components/pod-identity-association/icons/white/pod-identity-association-white.svg
  description: 
- name: access-entry
  colorIcon: assets/images/integration/aws-eks-controller/components/access-entry/icons/color/access-entry-color.svg
  whiteIcon: assets/images/integration/aws-eks-controller/components/access-entry/icons/white/access-entry-white.svg
  description: 
- name: identity-provider-config
  colorIcon: assets/images/integration/aws-eks-controller/components/identity-provider-config/icons/color/identity-provider-config-color.svg
  whiteIcon: assets/images/integration/aws-eks-controller/components/identity-provider-config/icons/white/identity-provider-config-white.svg
  description: 
componentsCount: 10
relationships: 
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between Addon and cluster"
- type: "Parent"
  kind: "Hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between cluster and SecurityGroup "
relationshipsCount: 3
featureList: [
  "Simplifies Kubernetes cluster creation and management",
  "Integrates with other AWS services",
  "High availability and scalability"
]
howItWorks: "Deploys and manages EKS clusters"
howItWorksDetails: "Easy and scalable Kubernetes management on AWS"
---
