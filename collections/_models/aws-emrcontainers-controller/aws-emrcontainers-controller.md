---
layout: single-page-model
item-type: model
name: AWS EMR Containers
subtitle: Collaborative and visual infrastructure as design for AWS EMR Containers
colorIcon: /assets/images/integration/aws-emrcontainers-controller/icons/color/aws-emrcontainers-controller-color.svg
whiteIcon: /assets/images/integration/aws-emrcontainers-controller/icons/white/aws-emrcontainers-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-emrcontainers-controller
description: 
category: Analytics
subcategory: Analytics
registrant: GitHub
components: 
- name: virtual-cluster
  colorIcon: assets/images/integration/aws-emrcontainers-controller/components/virtual-cluster/icons/color/virtual-cluster-color.svg
  whiteIcon: assets/images/integration/aws-emrcontainers-controller/components/virtual-cluster/icons/white/virtual-cluster-white.svg
  description: 
- name: job-run
  colorIcon: assets/images/integration/aws-emrcontainers-controller/components/job-run/icons/color/job-run-color.svg
  whiteIcon: assets/images/integration/aws-emrcontainers-controller/components/job-run/icons/white/job-run-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-emrcontainers-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-emrcontainers-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: field-export
  colorIcon: assets/images/integration/aws-emrcontainers-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-emrcontainers-controller/components/field-export/icons/white/field-export-white.svg
  description: 
componentsCount: 4
relationships: 
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between JobRun and role"
- type: "Parent"
  kind: "Hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
relationshipsCount: 2
featureList: [
  "Runs Spark, Hive, and Presto on Kubernetes",
  "Integrates with other AWS services",
  "Cost-effective big data processing"
]
howItWorks: "Runs containers on EMR"
howItWorksDetails: "Easier big data processing on Kubernetes with EMR"
---
