---
layout: single-page-model
item-type: model
name: AWS Elastic File System
subtitle: Collaborative and visual infrastructure as design for AWS Elastic File System
colorIcon: /assets/images/integration/aws-efs-controller/icons/color/aws-efs-controller-color.svg
whiteIcon: /assets/images/integration/aws-efs-controller/icons/white/aws-efs-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-efs-controller
description: 
category: Cloud Native Storage
subcategory: Cloud Native Storage
registrant: GitHub
components: 
- name: access-point
  colorIcon: assets/images/integration/aws-efs-controller/components/access-point/icons/color/access-point-color.svg
  whiteIcon: assets/images/integration/aws-efs-controller/components/access-point/icons/white/access-point-white.svg
  description: 
- name: file-system
  colorIcon: assets/images/integration/aws-efs-controller/components/file-system/icons/color/file-system-color.svg
  whiteIcon: assets/images/integration/aws-efs-controller/components/file-system/icons/white/file-system-white.svg
  description: 
- name: mount-target
  colorIcon: assets/images/integration/aws-efs-controller/components/mount-target/icons/color/mount-target-color.svg
  whiteIcon: assets/images/integration/aws-efs-controller/components/mount-target/icons/white/mount-target-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-efs-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-efs-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: field-export
  colorIcon: assets/images/integration/aws-efs-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-efs-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: iam-role-selector
  colorIcon: assets/images/integration/aws-efs-controller/components/iam-role-selector/icons/color/iam-role-selector-color.svg
  whiteIcon: assets/images/integration/aws-efs-controller/components/iam-role-selector/icons/white/iam-role-selector-white.svg
  description: 
componentsCount: 6
relationships: 
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship EC2 instances mount EFS file systems for shared storage across instances"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship Lambda can mount EFS for persistent storage and shared data"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship ECS tasks mount EFS volumes for persistent container storage"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship EKS pods use EFS as PersistentVolumes via CSI driver"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between accesspoint and filesystem"
- type: "parent"
  kind: "hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
relationshipsCount: 6
featureList: [
  "Scalable and elastic file storage",
  "Supports NFS and SMB protocols",
  "Highly available and durable"
]
howItWorks: "Integrates EFS storage"
howItWorksDetails: "Provides scalable and reliable file storage for Kubernetes applications"
---
