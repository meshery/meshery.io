---
layout: single-page-model
item-type: model
name: Azure Alerts Management
subtitle: Collaborative and visual infrastructure as design for Azure Alerts Management
colorIcon: /assets/images/integration/azure-alerts-management/icons/color/azure-alerts-management-color.svg
whiteIcon: /assets/images/integration/azure-alerts-management/icons/white/azure-alerts-management-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/azure-alerts-management
description: 
category: Observability and Analysis
subcategory: Monitoring
registrant: GitHub
components: 
- name: prometheus-rule-group
  colorIcon: assets/images/integration/azure-alerts-management/components/prometheus-rule-group/icons/color/prometheus-rule-group-color.svg
  whiteIcon: assets/images/integration/azure-alerts-management/components/prometheus-rule-group/icons/white/prometheus-rule-group-white.svg
  description: 
- name: smart-detector-alert-rule
  colorIcon: assets/images/integration/azure-alerts-management/components/smart-detector-alert-rule/icons/color/smart-detector-alert-rule-color.svg
  whiteIcon: assets/images/integration/azure-alerts-management/components/smart-detector-alert-rule/icons/white/smart-detector-alert-rule-white.svg
  description: 
componentsCount: 2
relationships: 
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between PrometheusRuleGroup and Account(azure-monitor)"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between SmartDetectorAlertRule and ActionGroup(azure-insights)"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between SmartDetectorAlertRule and Components(azure-insights)"
relationshipsCount: 3
featureList: [
  "Drag-n-drop cloud native infrastructure designer to configure, model, and deploy your workloads.",
  "Invite anyone to review and make changes to your private designs.",
  "Ongoing synchronization of Kubernetes configuration and changes across any number of clusters."
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
