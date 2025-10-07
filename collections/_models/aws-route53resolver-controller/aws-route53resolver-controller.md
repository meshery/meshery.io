---
layout: single-page-model
item-type: model
name: AWS Route 53 Resolver
subtitle: Collaborative and visual infrastructure as design for AWS Route 53 Resolver
colorIcon: /assets/images/integration/aws-route53resolver-controller/icons/color/aws-route53resolver-controller-color.svg
whiteIcon: /assets/images/integration/aws-route53resolver-controller/icons/white/aws-route53resolver-controller-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/aws-route53resolver-controller
description: 
category: Cloud Native Network
subcategory: Networking Content Delivery
registrant: GitHub
components: 
- name: field-export
  colorIcon: assets/images/integration/aws-route53resolver-controller/components/field-export/icons/color/field-export-color.svg
  whiteIcon: assets/images/integration/aws-route53resolver-controller/components/field-export/icons/white/field-export-white.svg
  description: 
- name: adopted-resource
  colorIcon: assets/images/integration/aws-route53resolver-controller/components/adopted-resource/icons/color/adopted-resource-color.svg
  whiteIcon: assets/images/integration/aws-route53resolver-controller/components/adopted-resource/icons/white/adopted-resource-white.svg
  description: 
- name: resolver-endpoint
  colorIcon: assets/images/integration/aws-route53resolver-controller/components/resolver-endpoint/icons/color/resolver-endpoint-color.svg
  whiteIcon: assets/images/integration/aws-route53resolver-controller/components/resolver-endpoint/icons/white/resolver-endpoint-white.svg
  description: 
- name: resolver-rule
  colorIcon: assets/images/integration/aws-route53resolver-controller/components/resolver-rule/icons/color/resolver-rule-color.svg
  whiteIcon: assets/images/integration/aws-route53resolver-controller/components/resolver-rule/icons/white/resolver-rule-white.svg
  description: 
componentsCount: 4
relationships: 
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between ResolverEndpoint and SecurityGroup"
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between ResolverEndpoint and Subnet"
- type: "Binding"
  kind: "Edge"
  description: "An edge relationship between ResolverRule and ResolverEndpoint"
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between adoptedresource and ResolverEndpoint"
- type: "Non Binding"
  kind: "Edge"
  description: "An edge relationship between adoptedresource and ResolverRule"
relationshipsCount: 5
featureList: [
  "Local VPC domain names for EC2 instances (for example, ec2-192-0-2-44.compute-1.amazonaws.com).
",
  "Records in private hosted zones (for example, acme.example.com).
",
  "For public domain names, Route 53 Resolver performs recursive lookups against public name servers on the internet.
"
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Collaboratively manage infrastructure with your coworkers synchronously sharing the same designs."
---
