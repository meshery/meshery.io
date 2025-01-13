---
name: Kubernetes UI Server
subtitle: Collaborative and visual infrastructure as design for Kubernetes UI Server
colorIcon: /assets/images/integration/kube-ui-server/icons/color/kube-ui-server-color.svg
whiteIcon: /assets/images/integration/kube-ui-server/icons/white/kube-ui-server-white.svg
permalink: extensibility/integrations/kube-ui-server
docURL: https://docs.meshery.io/extensibility/integrations/kube-ui-server
description: 
category: Provisioning
subcategory: Automation & Configuration
registrant: Artifact Hub
components: 
- name: app-binding
  colorIcon: assets/images/integration/kube-ui-server/components/app-binding/icons/color/app-binding-color.svg
  whiteIcon: assets/images/integration/kube-ui-server/components/app-binding/icons/white/app-binding-white.svg
  description: 
- name: helm-release
  colorIcon: assets/images/integration/kube-ui-server/components/helm-release/icons/color/helm-release-color.svg
  whiteIcon: assets/images/integration/kube-ui-server/components/helm-release/icons/white/helm-release-white.svg
  description: 
- name: helm-repository
  colorIcon: assets/images/integration/kube-ui-server/components/helm-repository/icons/color/helm-repository-color.svg
  whiteIcon: assets/images/integration/kube-ui-server/components/helm-repository/icons/white/helm-repository-white.svg
  description: 
- name: feature
  colorIcon: assets/images/integration/kube-ui-server/components/feature/icons/color/feature-color.svg
  whiteIcon: assets/images/integration/kube-ui-server/components/feature/icons/white/feature-white.svg
  description: 
- name: feature-set
  colorIcon: assets/images/integration/kube-ui-server/components/feature-set/icons/color/feature-set-color.svg
  whiteIcon: assets/images/integration/kube-ui-server/components/feature-set/icons/white/feature-set-white.svg
  description: 
- name: resource-dashboard
  colorIcon: assets/images/integration/kube-ui-server/components/resource-dashboard/icons/color/resource-dashboard-color.svg
  whiteIcon: assets/images/integration/kube-ui-server/components/resource-dashboard/icons/white/resource-dashboard-white.svg
  description: 
- name: resource-editor
  colorIcon: assets/images/integration/kube-ui-server/components/resource-editor/icons/color/resource-editor-color.svg
  whiteIcon: assets/images/integration/kube-ui-server/components/resource-editor/icons/white/resource-editor-white.svg
  description: 
- name: chart-preset
  colorIcon: assets/images/integration/kube-ui-server/components/chart-preset/icons/color/chart-preset-color.svg
  whiteIcon: assets/images/integration/kube-ui-server/components/chart-preset/icons/white/chart-preset-white.svg
  description: 
- name: cluster-chart-preset
  colorIcon: assets/images/integration/kube-ui-server/components/cluster-chart-preset/icons/color/cluster-chart-preset-color.svg
  whiteIcon: assets/images/integration/kube-ui-server/components/cluster-chart-preset/icons/white/cluster-chart-preset-white.svg
  description: 
- name: project-quota
  colorIcon: assets/images/integration/kube-ui-server/components/project-quota/icons/color/project-quota-color.svg
  whiteIcon: assets/images/integration/kube-ui-server/components/project-quota/icons/white/project-quota-white.svg
  description: 
- name: service-monitor
  colorIcon: assets/images/integration/kube-ui-server/components/service-monitor/icons/color/service-monitor-color.svg
  whiteIcon: assets/images/integration/kube-ui-server/components/service-monitor/icons/white/service-monitor-white.svg
  description: 
- name: cluster-profile
  colorIcon: assets/images/integration/kube-ui-server/components/cluster-profile/icons/color/cluster-profile-color.svg
  whiteIcon: assets/images/integration/kube-ui-server/components/cluster-profile/icons/white/cluster-profile-white.svg
  description: 
- name: resource-outline-filter
  colorIcon: assets/images/integration/kube-ui-server/components/resource-outline-filter/icons/color/resource-outline-filter-color.svg
  whiteIcon: assets/images/integration/kube-ui-server/components/resource-outline-filter/icons/white/resource-outline-filter-white.svg
  description: 
componentsCount: 13
relationships: 
relationshipsCount: 0
featureList: [
  "WhoAmI service returns the user info of the user making the api call.",
  "PodView resource exposes actual resource usage by a Pod. The resource usage information is read from Prometheus.",
  "Identity Server is a Kubernetes extended apiserver (EAS). As an EAS, it has access to the user who is making an api call to the whoami server."
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
