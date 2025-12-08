---
layout: single-page-model
item-type: model
name: AWS DocumentDB
subtitle: Collaborative and visual infrastructure as design for AWS DocumentDB
colorIcon: /assets/images/integration/aws-documentdb-controller/icons/color/aws-documentdb-controller-color.svg
whiteIcon: /assets/images/integration/aws-documentdb-controller/icons/white/aws-documentdb-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-documentdb-controller
description: 
category: App Definition and Development
subcategory: Database
registrant: GitHub
components: 
- name: db-cluster
  colorIcon: assets/images/integration/aws-documentdb-controller/components/db-cluster/icons/color/db-cluster-color.svg
  whiteIcon: assets/images/integration/aws-documentdb-controller/components/db-cluster/icons/white/db-cluster-white.svg
  description: 
- name: db-instance
  colorIcon: assets/images/integration/aws-documentdb-controller/components/db-instance/icons/color/db-instance-color.svg
  whiteIcon: assets/images/integration/aws-documentdb-controller/components/db-instance/icons/white/db-instance-white.svg
  description: 
- name: db-subnet-group
  colorIcon: assets/images/integration/aws-documentdb-controller/components/db-subnet-group/icons/color/db-subnet-group-color.svg
  whiteIcon: assets/images/integration/aws-documentdb-controller/components/db-subnet-group/icons/white/db-subnet-group-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-documentdb-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-documentdb-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: field-export
  colorIcon: assets/images/integration/aws-documentdb-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-documentdb-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: iam-role-selector
  colorIcon: assets/images/integration/aws-documentdb-controller/components/iam-role-selector/icons/color/iam-role-selector-color.svg
  whiteIcon: assets/images/integration/aws-documentdb-controller/components/iam-role-selector/icons/white/iam-role-selector-white.svg
  description: 
componentsCount: 6
relationships: 
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between DBInstance and SecurityGroup"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between DBCluster and DBSubnetGroup"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between DBInstance and DBSubnetGroup"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between DBSubnetGroup and Subnet"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between DBCluster and SecurityGroup"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship Lambda functions query MongoDB-compatible DocumentDB"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between AdoptedResource and DBCluster"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between AdoptedResource and DBInstance"
- type: "parent"
  kind: "hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
relationshipsCount: 9
featureList: [
  "Scalable NoSQL database",
  "Supports MongoDB workloads",
  "Highly available and durable"
]
howItWorks: "Integrates DocumentDB"
howItWorksDetails: "Simplified NoSQL database management on AWS"
---
