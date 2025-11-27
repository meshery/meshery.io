---
layout: single-page-model
item-type: model
name: AWS Applilcation Autoscaling
subtitle: Collaborative and visual infrastructure as design for AWS Applilcation Autoscaling
colorIcon: /assets/images/integration/aws-applicationautoscaling-controller/icons/color/aws-applicationautoscaling-controller-color.svg
whiteIcon: /assets/images/integration/aws-applicationautoscaling-controller/icons/white/aws-applicationautoscaling-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-applicationautoscaling-controller
description: 
category: Provisioning
subcategory: Management Governance
registrant: GitHub
components: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-applicationautoscaling-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-applicationautoscaling-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: scalable-target
  colorIcon: assets/images/integration/aws-applicationautoscaling-controller/components/scalable-target/icons/color/scalable-target-color.svg
  whiteIcon: assets/images/integration/aws-applicationautoscaling-controller/components/scalable-target/icons/white/scalable-target-white.svg
  description: 
- name: field-export
  colorIcon: assets/images/integration/aws-applicationautoscaling-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-applicationautoscaling-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: scaling-target
  colorIcon: assets/images/integration/aws-applicationautoscaling-controller/components/scaling-target/icons/color/scaling-target-color.svg
  whiteIcon: assets/images/integration/aws-applicationautoscaling-controller/components/scaling-target/icons/white/scaling-target-white.svg
  description: 
- name: scaling-policy
  colorIcon: assets/images/integration/aws-applicationautoscaling-controller/components/scaling-policy/icons/color/scaling-policy-color.svg
  whiteIcon: assets/images/integration/aws-applicationautoscaling-controller/components/scaling-policy/icons/white/scaling-policy-white.svg
  description: 
- name: iam-role-selector
  colorIcon: assets/images/integration/aws-applicationautoscaling-controller/components/iam-role-selector/icons/color/iam-role-selector-color.svg
  whiteIcon: assets/images/integration/aws-applicationautoscaling-controller/components/iam-role-selector/icons/white/iam-role-selector-white.svg
  description: 
componentsCount: 6
relationships: 
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between ScalableTarget and SpotFleetRequest"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between AdoptedResource and ScalableTarget"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between AdoptedResource and ScalingPolicy"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between ScalingPolicy and ScalableTarget"
relationshipsCount: 4
featureList: [
  "Dynamically scales EC2 instances and other AWS resources",
  "Provides target tracking scaling policies",
  "Integrates with various AWS services"
]
howItWorks: "Integrates with Application Autoscaling"
howItWorksDetails: "Automated scaling of resources for Kubernetes applications on AWS"
---
