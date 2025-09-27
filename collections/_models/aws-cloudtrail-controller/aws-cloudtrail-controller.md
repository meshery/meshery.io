---
layout: single-page-model
item-type: model
name: AWS CloudTrail
subtitle: Collaborative and visual infrastructure as design for AWS CloudTrail
colorIcon: /assets/images/integration/aws-cloudtrail-controller/icons/color/aws-cloudtrail-controller-color.svg
whiteIcon: /assets/images/integration/aws-cloudtrail-controller/icons/white/aws-cloudtrail-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-cloudtrail-controller
description: 
category: Observability and Analysis
subcategory: Logging
registrant: GitHub
components: 
- name: field-export
  colorIcon: assets/images/integration/aws-cloudtrail-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-cloudtrail-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-cloudtrail-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-cloudtrail-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: event-data-store
  colorIcon: assets/images/integration/aws-cloudtrail-controller/components/event-data-store/icons/color/event-data-store-color.svg
  whiteIcon: assets/images/integration/aws-cloudtrail-controller/components/event-data-store/icons/white/event-data-store-white.svg
  description: 
- name: trail
  colorIcon: assets/images/integration/aws-cloudtrail-controller/components/trail/icons/color/trail-color.svg
  whiteIcon: assets/images/integration/aws-cloudtrail-controller/components/trail/icons/white/trail-white.svg
  description: 
componentsCount: 4
relationships: 
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between Trail and EventDataStore"
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between Trail and Bucket"
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between Trail and Topic"
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between AdoptedResource and EventDataStore"
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between AdoptedResource and Trail"
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between Trail and LogGroup"
relationshipsCount: 6
featureList: [
  "Data events that capture data plane actions within a resource, such as reading or writing an Amazon S3 object.",
  "Configuration items from AWS Config that capture resource configuration history and resource compliance history as evaluated by AWS Config rules.",
  "Audit evidence from AWS Audit Manager that contains the information needed to demonstrate compliance with the requirements as specified by Audit Manager controls."
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
