---
layout: single-page-model
item-type: model
name: Loki
subtitle: Collaborative and visual infrastructure as design for Loki
colorIcon: /assets/images/integration/loki/icons/color/loki-color.svg
whiteIcon: /assets/images/integration/loki/icons/white/loki-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/loki
description: Loki is a horizontally scalable, highly available, multi-tenant log aggregation system inspired by Prometheus. It is designed to be very cost effective and easy to operate. It does not index the contents of the logs, but rather a set of labels for each log stream.
category: Observability and Analysis
subcategory: Logging
registrant: Artifact Hub
components: 
- name: pod-monitor
  colorIcon: assets/images/integration/loki/components/pod-monitor/icons/color/pod-monitor-color.svg
  whiteIcon: assets/images/integration/loki/components/pod-monitor/icons/white/pod-monitor-white.svg
  description: 
- name: probe
  colorIcon: assets/images/integration/loki/components/probe/icons/color/probe-color.svg
  whiteIcon: assets/images/integration/loki/components/probe/icons/white/probe-white.svg
  description: 
- name: service-monitor
  colorIcon: assets/images/integration/loki/components/service-monitor/icons/color/service-monitor-color.svg
  whiteIcon: assets/images/integration/loki/components/service-monitor/icons/white/service-monitor-white.svg
  description: 
- name: grafana-agent
  colorIcon: assets/images/integration/loki/components/grafana-agent/icons/color/grafana-agent-color.svg
  whiteIcon: assets/images/integration/loki/components/grafana-agent/icons/white/grafana-agent-white.svg
  description: 
- name: integration
  colorIcon: assets/images/integration/loki/components/integration/icons/color/integration-color.svg
  whiteIcon: assets/images/integration/loki/components/integration/icons/white/integration-white.svg
  description: 
- name: logs-instance
  colorIcon: assets/images/integration/loki/components/logs-instance/icons/color/logs-instance-color.svg
  whiteIcon: assets/images/integration/loki/components/logs-instance/icons/white/logs-instance-white.svg
  description: 
- name: metrics-instance
  colorIcon: assets/images/integration/loki/components/metrics-instance/icons/color/metrics-instance-color.svg
  whiteIcon: assets/images/integration/loki/components/metrics-instance/icons/white/metrics-instance-white.svg
  description: 
- name: pod-logs
  colorIcon: assets/images/integration/loki/components/pod-logs/icons/color/pod-logs-color.svg
  whiteIcon: assets/images/integration/loki/components/pod-logs/icons/white/pod-logs-white.svg
  description: 
componentsCount: 8
relationships: 
relationshipsCount: 0
featureList: [
  "Log aggregation and storage",
  "Multi-tenancy",
  "Label-based querying"
]
howItWorks: "Integrates Loki logs"
howItWorksDetails: "Cost-effective and scalable log management for Kubernetes"
---
