---
layout: single-page-model
item-type: model
name: Contour
subtitle: Collaborative and visual infrastructure as design for Contour
colorIcon: /assets/images/integration/contour-operator/icons/color/contour-operator-color.svg
whiteIcon: /assets/images/integration/contour-operator/icons/white/contour-operator-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/contour-operator
description: 
category: Cloud Native Network
subcategory: Service Proxy
registrant: Artifact Hub
components: 
- name: contour
  colorIcon: assets/images/integration/contour-operator/components/contour/icons/color/contour-color.svg
  whiteIcon: assets/images/integration/contour-operator/components/contour/icons/white/contour-white.svg
  description: 
- name: contour-configuration
  colorIcon: assets/images/integration/contour-operator/components/contour-configuration/icons/color/contour-configuration-color.svg
  whiteIcon: assets/images/integration/contour-operator/components/contour-configuration/icons/white/contour-configuration-white.svg
  description: 
- name: contour-deployment
  colorIcon: assets/images/integration/contour-operator/components/contour-deployment/icons/color/contour-deployment-color.svg
  whiteIcon: assets/images/integration/contour-operator/components/contour-deployment/icons/white/contour-deployment-white.svg
  description: 
- name: extension-service
  colorIcon: assets/images/integration/contour-operator/components/extension-service/icons/color/extension-service-color.svg
  whiteIcon: assets/images/integration/contour-operator/components/extension-service/icons/white/extension-service-white.svg
  description: 
- name: gateway
  colorIcon: assets/images/integration/contour-operator/components/gateway/icons/color/gateway-color.svg
  whiteIcon: assets/images/integration/contour-operator/components/gateway/icons/white/gateway-white.svg
  description: 
- name: gateway-class
  colorIcon: assets/images/integration/contour-operator/components/gateway-class/icons/color/gateway-class-color.svg
  whiteIcon: assets/images/integration/contour-operator/components/gateway-class/icons/white/gateway-class-white.svg
  description: 
- name: http-proxy
  colorIcon: assets/images/integration/contour-operator/components/http-proxy/icons/color/http-proxy-color.svg
  whiteIcon: assets/images/integration/contour-operator/components/http-proxy/icons/white/http-proxy-white.svg
  description: 
- name: http-route
  colorIcon: assets/images/integration/contour-operator/components/http-route/icons/color/http-route-color.svg
  whiteIcon: assets/images/integration/contour-operator/components/http-route/icons/white/http-route-white.svg
  description: 
- name: tcp-route
  colorIcon: assets/images/integration/contour-operator/components/tcp-route/icons/color/tcp-route-color.svg
  whiteIcon: assets/images/integration/contour-operator/components/tcp-route/icons/white/tcp-route-white.svg
  description: 
- name: tls-certificate-delegation
  colorIcon: assets/images/integration/contour-operator/components/tls-certificate-delegation/icons/color/tls-certificate-delegation-color.svg
  whiteIcon: assets/images/integration/contour-operator/components/tls-certificate-delegation/icons/white/tls-certificate-delegation-white.svg
  description: 
- name: tls-route
  colorIcon: assets/images/integration/contour-operator/components/tls-route/icons/color/tls-route-color.svg
  whiteIcon: assets/images/integration/contour-operator/components/tls-route/icons/white/tls-route-white.svg
  description: 
- name: udp-route
  colorIcon: assets/images/integration/contour-operator/components/udp-route/icons/color/udp-route-color.svg
  whiteIcon: assets/images/integration/contour-operator/components/udp-route/icons/white/udp-route-white.svg
  description: 
componentsCount: 12
relationships: 
relationshipsCount: 0
featureList: [
  "Supports dynamic configuration updates out of the box while maintaining a lightweight profile.",
  "Introduces a new ingress API (HTTPProxy) which is implemented via a Custom Resource Definition (CRD).",
  "Solves shortcomings in the original design."
]
howItWorks: "Collaborative Infrastructure as Design"
howItWorksDetails: "Builds upon the basic Kubernetes resource and controller concepts, but includes domain-specific knowledge to automate the entire lifecycle of Contour."
---
