---
layout: single-page-model
item-type: model
name: AWS Route 53
subtitle: Collaborative and visual infrastructure as design for AWS Route 53
colorIcon: /assets/images/integration/aws-route53-controller/icons/color/aws-route53-controller-color.svg
whiteIcon: /assets/images/integration/aws-route53-controller/icons/white/aws-route53-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-route53-controller
description: 
category: Cloud Native Network
subcategory: Networking Content Delivery
registrant: GitHub
components: 
- name: field-export
  colorIcon: assets/images/integration/aws-route53-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-route53-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-route53-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-route53-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: hosted-zone
  colorIcon: assets/images/integration/aws-route53-controller/components/hosted-zone/icons/color/hosted-zone-color.svg
  whiteIcon: assets/images/integration/aws-route53-controller/components/hosted-zone/icons/white/hosted-zone-white.svg
  description: 
- name: record-set
  colorIcon: assets/images/integration/aws-route53-controller/components/record-set/icons/color/record-set-color.svg
  whiteIcon: assets/images/integration/aws-route53-controller/components/record-set/icons/white/record-set-white.svg
  description: 
- name: health-check
  colorIcon: assets/images/integration/aws-route53-controller/components/health-check/icons/color/health-check-color.svg
  whiteIcon: assets/images/integration/aws-route53-controller/components/health-check/icons/white/health-check-white.svg
  description: 
componentsCount: 5
relationships: 
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between HostedZone and VPC"
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between recordset and hostedzone"
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between adoptedresources and hostedzone"
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between adoptedresource and recordset"
- type: "Parent"
  kind: "Hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
relationshipsCount: 5
featureList: [
  "Route end users to your site reliably with globally-dispersed Domain Name System (DNS) servers and automatic scaling.",
  "Set up your DNS routing in minutes with domain name registration and straightforward visual traffic flow tools.",
  "Customize your DNS routing policies to reduce latency, improve application availability, and maintain compliance."
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
