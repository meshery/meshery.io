---
layout: single-page-model
item-type: model
name: AWS CloudWatch Logs
subtitle: Collaborative and visual infrastructure as design for AWS CloudWatch Logs
colorIcon: /assets/images/integration/aws-cloudwatchlogs-controller/icons/color/aws-cloudwatchlogs-controller-color.svg
whiteIcon: /assets/images/integration/aws-cloudwatchlogs-controller/icons/white/aws-cloudwatchlogs-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-cloudwatchlogs-controller
description: 
category: Observability and Analysis
subcategory: Management Governance
registrant: GitHub
components: 
- name: field-export
  colorIcon: assets/images/integration/aws-cloudwatchlogs-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-cloudwatchlogs-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-cloudwatchlogs-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-cloudwatchlogs-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: log-group
  colorIcon: assets/images/integration/aws-cloudwatchlogs-controller/components/log-group/icons/color/log-group-color.svg
  whiteIcon: assets/images/integration/aws-cloudwatchlogs-controller/components/log-group/icons/white/log-group-white.svg
  description: 
- name: iam-role-selector
  colorIcon: assets/images/integration/aws-cloudwatchlogs-controller/components/iam-role-selector/icons/color/iam-role-selector-color.svg
  whiteIcon: assets/images/integration/aws-cloudwatchlogs-controller/components/iam-role-selector/icons/white/iam-role-selector-white.svg
  description: 
componentsCount: 4
relationships: 
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between AdoptedResource and LogGroup"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between AdoptedResource and LogGroup"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between LogGroup and Instance"
relationshipsCount: 3
featureList: [
  "Two classes of log groups for flexibility – CloudWatch Logs offers two classes of log groups so that you can have a cost-effective option for logs that you access infrequently. ",
  "Query your log data – You can use CloudWatch Logs Insights to interactively search and analyze your log data. ",
  "Detect and debug using Live Tail – You can use Live Tail to quickly troubleshoot incidents by viewing a streaming list of new log events as they are ingested. "
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
