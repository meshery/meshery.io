---
layout: single-page-model
item-type: model
name: Azure Cache
subtitle: Collaborative and visual infrastructure as design for Azure Cache
colorIcon: /assets/images/integration/azure-cache/icons/color/azure-cache-color.svg
whiteIcon: /assets/images/integration/azure-cache/icons/white/azure-cache-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/azure-cache
description: 
category: Cloud Native Storage
subcategory: Content Delivery Network
registrant: GitHub
components: 
- name: redis
  colorIcon: assets/images/integration/azure-cache/components/redis/icons/color/redis-color.svg
  whiteIcon: assets/images/integration/azure-cache/components/redis/icons/white/redis-white.svg
  description: 
- name: redis-enterprise-database
  colorIcon: assets/images/integration/azure-cache/components/redis-enterprise-database/icons/color/redis-enterprise-database-color.svg
  whiteIcon: assets/images/integration/azure-cache/components/redis-enterprise-database/icons/white/redis-enterprise-database-white.svg
  description: 
- name: redis-enterprise
  colorIcon: assets/images/integration/azure-cache/components/redis-enterprise/icons/color/redis-enterprise-color.svg
  whiteIcon: assets/images/integration/azure-cache/components/redis-enterprise/icons/white/redis-enterprise-white.svg
  description: 
- name: redis-firewall-rule
  colorIcon: assets/images/integration/azure-cache/components/redis-firewall-rule/icons/color/redis-firewall-rule-color.svg
  whiteIcon: assets/images/integration/azure-cache/components/redis-firewall-rule/icons/white/redis-firewall-rule-white.svg
  description: 
- name: redis-linked-server
  colorIcon: assets/images/integration/azure-cache/components/redis-linked-server/icons/color/redis-linked-server-color.svg
  whiteIcon: assets/images/integration/azure-cache/components/redis-linked-server/icons/white/redis-linked-server-white.svg
  description: 
- name: redis-patch-schedule
  colorIcon: assets/images/integration/azure-cache/components/redis-patch-schedule/icons/color/redis-patch-schedule-color.svg
  whiteIcon: assets/images/integration/azure-cache/components/redis-patch-schedule/icons/white/redis-patch-schedule-white.svg
  description: 
componentsCount: 6
relationships: 
- type: "parent"
  kind: "hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of Redis Cache(parent component) is patched with the configuration of RedisFirewallRule(child component). "
- type: "parent"
  kind: "hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of Redis Cache(parent component) is patched with the configuration of RedisLinkedServer(child component). "
- type: "parent"
  kind: "hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of Redis Enterprise Cache(parent component) is patched with the configuration of RedisEnterpriseDatabase(child component). "
- type: "parent"
  kind: "hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of Redis Cache(parent component) is patched with the configuration of RedisPatchSchedule(child component). "
relationshipsCount: 4
featureList: [
  "Drag-n-drop cloud native infrastructure designer to configure, model, and deploy your workloads.",
  "Invite anyone to review and make changes to your private designs.",
  "Ongoing synchronization of Kubernetes configuration and changes across any number of clusters."
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
