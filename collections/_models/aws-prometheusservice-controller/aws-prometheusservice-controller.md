---
layout: single-page-model
item-type: model
name: AWS Managed Service for Prometheus
subtitle: Collaborative and visual infrastructure as design for AWS Managed Service for Prometheus
colorIcon: /assets/images/integration/aws-prometheusservice-controller/icons/color/aws-prometheusservice-controller-color.svg
whiteIcon: /assets/images/integration/aws-prometheusservice-controller/icons/white/aws-prometheusservice-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-prometheusservice-controller
description: 
category: Observability and Analysis
subcategory: Metrics
registrant: GitHub
components: 
- name: field-export
  colorIcon: assets/images/integration/aws-prometheusservice-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-prometheusservice-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-prometheusservice-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-prometheusservice-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: alert-manager-definition
  colorIcon: assets/images/integration/aws-prometheusservice-controller/components/alert-manager-definition/icons/color/alert-manager-definition-color.svg
  whiteIcon: assets/images/integration/aws-prometheusservice-controller/components/alert-manager-definition/icons/white/alert-manager-definition-white.svg
  description: 
- name: workspace
  colorIcon: assets/images/integration/aws-prometheusservice-controller/components/workspace/icons/color/workspace-color.svg
  whiteIcon: assets/images/integration/aws-prometheusservice-controller/components/workspace/icons/white/workspace-white.svg
  description: 
- name: logging-configuration
  colorIcon: assets/images/integration/aws-prometheusservice-controller/components/logging-configuration/icons/color/logging-configuration-color.svg
  whiteIcon: assets/images/integration/aws-prometheusservice-controller/components/logging-configuration/icons/white/logging-configuration-white.svg
  description: 
- name: rule-groups-namespace
  colorIcon: assets/images/integration/aws-prometheusservice-controller/components/rule-groups-namespace/icons/color/rule-groups-namespace-color.svg
  whiteIcon: assets/images/integration/aws-prometheusservice-controller/components/rule-groups-namespace/icons/white/rule-groups-namespace-white.svg
  description: 
componentsCount: 6
relationships: 
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between AlertManagerDefinition and Workspace "
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between LoggingConfiguration and Workspace "
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between adpotedresource and Workspace "
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between RuleGroupsNamespace and Workspace "
relationshipsCount: 4
featureList: [
  "No collection agents required",
  "Amazon Managed Service for Prometheus includes a remote write-compatible API that can ingest metrics from OpenTelemetry, Prometheus libraries, and existing Prometheus servers.",
  "Amazon Managed Service for Prometheus includes a query-compatible HTTP API that allows you to query metrics, metric labels, metric metadata, and time series metrics. "
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
