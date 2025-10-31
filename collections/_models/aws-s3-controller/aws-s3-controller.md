---
layout: single-page-model
item-type: model
name: AWS Simple Storage Service (S3)
subtitle: Collaborative and visual infrastructure as design for AWS Simple Storage Service (S3)
colorIcon: /assets/images/integration/aws-s3-controller/icons/color/aws-s3-controller-color.svg
whiteIcon: /assets/images/integration/aws-s3-controller/icons/white/aws-s3-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-s3-controller
description: 
category: Cloud Native Storage
subcategory: Storage
registrant: GitHub
components: 
- name: field-export
  colorIcon: assets/images/integration/aws-s3-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-s3-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-s3-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-s3-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: bucket
  colorIcon: assets/images/integration/aws-s3-controller/components/bucket/icons/color/bucket-color.svg
  whiteIcon: assets/images/integration/aws-s3-controller/components/bucket/icons/white/bucket-white.svg
  description: 
componentsCount: 3
relationships: 
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between adoptedresource and Bucket"
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship EC2 instances read/write objects to S3 buckets via SDK/CLI"
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship Lambda functions are triggered by S3 events "
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship ECS containers access S3 for application data and artifacts"
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship EKS workloads store/retrieve data from S3 buckets"
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship EMR containers read input and write output data to S3"
relationshipsCount: 6
featureList: [
  "Stores and retrieves any amount of data",
  "Highly scalable and durable",
  "Integrates with various AWS services"
]
howItWorks: "Integrates S3 storage"
howItWorksDetails: "Provides scalable and reliable storage for Kubernetes applications"
---
