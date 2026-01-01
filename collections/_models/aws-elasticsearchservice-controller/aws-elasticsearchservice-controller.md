---
layout: single-page-model
item-type: model
name: AWS ElasticSearch Service
subtitle: Collaborative and visual infrastructure as design for AWS ElasticSearch Service
colorIcon: /assets/images/integration/aws-elasticsearchservice-controller/icons/color/aws-elasticsearchservice-controller-color.svg
whiteIcon: /assets/images/integration/aws-elasticsearchservice-controller/icons/white/aws-elasticsearchservice-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-elasticsearchservice-controller
description: 
category: Observability and Analysis
subcategory: Logging
registrant: GitHub
components: 
- name: elasticsearch-domain
  colorIcon: assets/images/integration/aws-elasticsearchservice-controller/components/elasticsearch-domain/icons/color/elasticsearch-domain-color.svg
  whiteIcon: assets/images/integration/aws-elasticsearchservice-controller/components/elasticsearch-domain/icons/white/elasticsearch-domain-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-elasticsearchservice-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-elasticsearchservice-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
componentsCount: 2
relationships: 
- type: "non-binding"
  kind: "edge"
  description: "An edge relationship between ElasticsearchDomain and vpc"
- type: "binding"
  kind: "edge"
  description: "An edge relationship between policy and ElasticsearchDomain"
relationshipsCount: 2
featureList: [
  "Scalable search and analytics",
  "Easy to deploy and manage",
  "Integrates with other AWS services"
]
howItWorks: "Deploys and manages Elasticsearch"
howItWorksDetails: "Simplified Elasticsearch management and integration with AWS"
---
