---
layout: single-page-model
item-type: model
name: AWS CloudWatch
subtitle: Collaborative and visual infrastructure as design for AWS CloudWatch
colorIcon: /assets/images/integration/aws-cloudwatch-controller/icons/color/aws-cloudwatch-controller-color.svg
whiteIcon: /assets/images/integration/aws-cloudwatch-controller/icons/white/aws-cloudwatch-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-cloudwatch-controller
description: 
category: Observability and Analysis
subcategory: Management Governance
registrant: GitHub
components: 
- name: field-export
  colorIcon: assets/images/integration/aws-cloudwatch-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-cloudwatch-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-cloudwatch-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-cloudwatch-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: metric-alarm
  colorIcon: assets/images/integration/aws-cloudwatch-controller/components/metric-alarm/icons/color/metric-alarm-color.svg
  whiteIcon: assets/images/integration/aws-cloudwatch-controller/components/metric-alarm/icons/white/metric-alarm-white.svg
  description: 
- name: metric-stream
  colorIcon: assets/images/integration/aws-cloudwatch-controller/components/metric-stream/icons/color/metric-stream-color.svg
  whiteIcon: assets/images/integration/aws-cloudwatch-controller/components/metric-stream/icons/white/metric-stream-white.svg
  description: 
- name: dashboard
  colorIcon: assets/images/integration/aws-cloudwatch-controller/components/dashboard/icons/color/dashboard-color.svg
  whiteIcon: assets/images/integration/aws-cloudwatch-controller/components/dashboard/icons/white/dashboard-white.svg
  description: 
- name: iam-role-selector
  colorIcon: assets/images/integration/aws-cloudwatch-controller/components/iam-role-selector/icons/color/iam-role-selector-color.svg
  whiteIcon: assets/images/integration/aws-cloudwatch-controller/components/iam-role-selector/icons/white/iam-role-selector-white.svg
  description: 
componentsCount: 6
relationships: 
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between MetricAlarm and Function"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between AdoptedResource and MetricAlarm"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between MetricStream and Instance"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between AdoptedResource and MetricStream"
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between MetricAlarm and Instance"
relationshipsCount: 5
featureList: [
  "Provides you with data and actionable insights to monitor your applications, respond to system-wide performance changes, and optimize resource utilization.",
  "Collects monitoring and operational data in the form of logs, metrics, and traces.",
  "Get a unified view of operational health and gain complete visibility of your AWS resources, applications, and services running on AWS and on-premises."
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
