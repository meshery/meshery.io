---
layout: single-page-model
item-type: model
name: AWS DynamoDB
subtitle: Collaborative and visual infrastructure as design for AWS DynamoDB
colorIcon: /assets/images/integration/aws-dynamodb-controller/icons/color/aws-dynamodb-controller-color.svg
whiteIcon: /assets/images/integration/aws-dynamodb-controller/icons/white/aws-dynamodb-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-dynamodb-controller
description: 
category: App Definition and Development
subcategory: Database
registrant: GitHub
components: 
- name: field-export
  colorIcon: assets/images/integration/aws-dynamodb-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-dynamodb-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-dynamodb-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-dynamodb-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: backup
  colorIcon: assets/images/integration/aws-dynamodb-controller/components/backup/icons/color/backup-color.svg
  whiteIcon: assets/images/integration/aws-dynamodb-controller/components/backup/icons/white/backup-white.svg
  description: 
- name: table
  colorIcon: assets/images/integration/aws-dynamodb-controller/components/table/icons/color/table-color.svg
  whiteIcon: assets/images/integration/aws-dynamodb-controller/components/table/icons/white/table-white.svg
  description: 
- name: global-table
  colorIcon: assets/images/integration/aws-dynamodb-controller/components/global-table/icons/color/global-table-color.svg
  whiteIcon: assets/images/integration/aws-dynamodb-controller/components/global-table/icons/white/global-table-white.svg
  description: 
componentsCount: 5
relationships: 
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between table and VPCEndpoint"
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between AdoptedResource and GlobalTable"
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between AdoptedResource and GlobalTable"
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between AdoptedResource and Table"
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between Backup and Table"
- type: "Parent"
  kind: "Hierarchical"
  description: "A hierarchical inventory relationship in which the configuration of (parent component) is patched with the configuration of (child component). "
relationshipsCount: 6
featureList: [
  "Handle more than 10 trillion requests per day and can support peaks of more than 20 million requests per second.
",
  "Secure your data with encryption at rest, automatic backup and restore, and guaranteed reliability with an SLA of up to 99.999% availability.",
  "Fast and flexible NoSQL database service for any scale"
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
