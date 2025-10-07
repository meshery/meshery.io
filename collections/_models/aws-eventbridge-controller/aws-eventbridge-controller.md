---
layout: single-page-model
item-type: model
name: AWS EventBridge
subtitle: Collaborative and visual infrastructure as design for AWS EventBridge
colorIcon: /assets/images/integration/aws-eventbridge-controller/icons/color/aws-eventbridge-controller-color.svg
whiteIcon: /assets/images/integration/aws-eventbridge-controller/icons/white/aws-eventbridge-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-eventbridge-controller
description: 
category: App Definition and Development
subcategory: Streaming & Messaging
registrant: GitHub
components: 
- name: archive
  colorIcon: assets/images/integration/aws-eventbridge-controller/components/archive/icons/color/archive-color.svg
  whiteIcon: assets/images/integration/aws-eventbridge-controller/components/archive/icons/white/archive-white.svg
  description: 
- name: endpoint
  colorIcon: assets/images/integration/aws-eventbridge-controller/components/endpoint/icons/color/endpoint-color.svg
  whiteIcon: assets/images/integration/aws-eventbridge-controller/components/endpoint/icons/white/endpoint-white.svg
  description: 
- name: event-bus
  colorIcon: assets/images/integration/aws-eventbridge-controller/components/event-bus/icons/color/event-bus-color.svg
  whiteIcon: assets/images/integration/aws-eventbridge-controller/components/event-bus/icons/white/event-bus-white.svg
  description: 
- name: field-export
  colorIcon: assets/images/integration/aws-eventbridge-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-eventbridge-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: rule
  colorIcon: assets/images/integration/aws-eventbridge-controller/components/rule/icons/color/rule-color.svg
  whiteIcon: assets/images/integration/aws-eventbridge-controller/components/rule/icons/white/rule-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-eventbridge-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-eventbridge-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
componentsCount: 6
relationships: 
- type: "Parent"
  kind: "Hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between role and EventBus"
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between rule and Endpoint"
relationshipsCount: 3
featureList: [
  "Amazon EventBridge Event Bus is a serverless event bus that helps you receive, filter, transform, route, and deliver events.",
  "Amazon EventBridge Pipes is a serverless point-to-point integration resource that helps you connect event producers to event consumers with optional filtering, enrichment, and transformation capabilities.",
  "Use Amazon EventBridge Scheduler to schedule tasks and events at scale."
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
