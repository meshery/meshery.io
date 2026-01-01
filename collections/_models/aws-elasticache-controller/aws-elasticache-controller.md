---
layout: single-page-model
item-type: model
name: AWS ElastiCache
subtitle: Collaborative and visual infrastructure as design for AWS ElastiCache
colorIcon: /assets/images/integration/aws-elasticache-controller/icons/color/aws-elasticache-controller-color.svg
whiteIcon: /assets/images/integration/aws-elasticache-controller/icons/white/aws-elasticache-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-elasticache-controller
description: 
category: App Definition and Development
subcategory: Database
registrant: GitHub
components: 
- name: cache-parameter-group
  colorIcon: assets/images/integration/aws-elasticache-controller/components/cache-parameter-group/icons/color/cache-parameter-group-color.svg
  whiteIcon: assets/images/integration/aws-elasticache-controller/components/cache-parameter-group/icons/white/cache-parameter-group-white.svg
  description: 
- name: cache-subnet-group
  colorIcon: assets/images/integration/aws-elasticache-controller/components/cache-subnet-group/icons/color/cache-subnet-group-color.svg
  whiteIcon: assets/images/integration/aws-elasticache-controller/components/cache-subnet-group/icons/white/cache-subnet-group-white.svg
  description: 
- name: field-export
  colorIcon: assets/images/integration/aws-elasticache-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-elasticache-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-elasticache-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-elasticache-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: snapshot
  colorIcon: assets/images/integration/aws-elasticache-controller/components/snapshot/icons/color/snapshot-color.svg
  whiteIcon: assets/images/integration/aws-elasticache-controller/components/snapshot/icons/white/snapshot-white.svg
  description: 
- name: user
  colorIcon: assets/images/integration/aws-elasticache-controller/components/user/icons/color/user-color.svg
  whiteIcon: assets/images/integration/aws-elasticache-controller/components/user/icons/white/user-white.svg
  description: 
- name: user-group
  colorIcon: assets/images/integration/aws-elasticache-controller/components/user-group/icons/color/user-group-color.svg
  whiteIcon: assets/images/integration/aws-elasticache-controller/components/user-group/icons/white/user-group-white.svg
  description: 
- name: replication-group
  colorIcon: assets/images/integration/aws-elasticache-controller/components/replication-group/icons/color/replication-group-color.svg
  whiteIcon: assets/images/integration/aws-elasticache-controller/components/replication-group/icons/white/replication-group-white.svg
  description: 
- name: cache-cluster
  colorIcon: assets/images/integration/aws-elasticache-controller/components/cache-cluster/icons/color/cache-cluster-color.svg
  whiteIcon: assets/images/integration/aws-elasticache-controller/components/cache-cluster/icons/white/cache-cluster-white.svg
  description: 
- name: serverless-cache
  colorIcon: assets/images/integration/aws-elasticache-controller/components/serverless-cache/icons/color/serverless-cache-color.svg
  whiteIcon: assets/images/integration/aws-elasticache-controller/components/serverless-cache/icons/white/serverless-cache-white.svg
  description: 
- name: serverless-cache-snapshot
  colorIcon: assets/images/integration/aws-elasticache-controller/components/serverless-cache-snapshot/icons/color/serverless-cache-snapshot-color.svg
  whiteIcon: assets/images/integration/aws-elasticache-controller/components/serverless-cache-snapshot/icons/white/serverless-cache-snapshot-white.svg
  description: 
- name: iam-role-selector
  colorIcon: assets/images/integration/aws-elasticache-controller/components/iam-role-selector/icons/color/iam-role-selector-color.svg
  whiteIcon: assets/images/integration/aws-elasticache-controller/components/iam-role-selector/icons/white/iam-role-selector-white.svg
  description: 
componentsCount: 12
relationships: 
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between ReplicationGroup and UserGroup"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship EC2 instances use ElastiCache (Redis/Memcached) for caching"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship Lambda functions cache data in ElastiCache to reduce latency"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between cachecluster and CacheParameterGroup"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between cachecluster and CacheSubnetGroup"
relationshipsCount: 5
featureList: [
  "Fully managed Redis and Memcached",
  "Add a cache to your relational database",
  "You can create an ElastiCache Serverless cache in a few steps by specifying a cache name in Meshery"
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
