---
layout: single-page-model
item-type: model
name: AWS Elastic Container Service
subtitle: Collaborative and visual infrastructure as design for AWS Elastic Container Service
colorIcon: /assets/images/integration/aws-ecs-controller/icons/color/aws-ecs-controller-color.svg
whiteIcon: /assets/images/integration/aws-ecs-controller/icons/white/aws-ecs-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-ecs-controller
description: 
category: Provisioning
subcategory: Automation & Configuration
registrant: GitHub
components: 
- name: cluster
  colorIcon: assets/images/integration/aws-ecs-controller/components/cluster/icons/color/cluster-color.svg
  whiteIcon: assets/images/integration/aws-ecs-controller/components/cluster/icons/white/cluster-white.svg
  description: 
- name: service
  colorIcon: assets/images/integration/aws-ecs-controller/components/service/icons/color/service-color.svg
  whiteIcon: assets/images/integration/aws-ecs-controller/components/service/icons/white/service-white.svg
  description: 
- name: task-definition
  colorIcon: assets/images/integration/aws-ecs-controller/components/task-definition/icons/color/task-definition-color.svg
  whiteIcon: assets/images/integration/aws-ecs-controller/components/task-definition/icons/white/task-definition-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-ecs-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-ecs-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: field-export
  colorIcon: assets/images/integration/aws-ecs-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-ecs-controller/components/field-export/icons/white/field-export-white.svg
  description: 
componentsCount: 5
relationships: 
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between service and TaskDefinition"
- type: "Parent"
  kind: "Hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
relationshipsCount: 2
featureList: [
  "Simplifies container deployment and management",
  "Integrates with other AWS services",
  "Supports various container technologies"
]
howItWorks: "Deploys containers on ECS"
howItWorksDetails: "Easy and scalable container management on AWS"
---
