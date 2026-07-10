---
layout: single-page-model
item-type: model
name: F5 Networks
subtitle: Collaborative and visual infrastructure as design for F5 Networks
colorIcon: /assets/images/integration/f5-networks/icons/color/f5-networks-color.svg
whiteIcon: /assets/images/integration/f5-networks/icons/white/f5-networks-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/f5-networks
description: F5 BIG-IP Container Ingress Services (CIS) is a Kubernetes/OpenShift integration component that automatically configures an F5 BIG-IP load balancer based on changes in your container platform.
category: Security & Compliance
subcategory: Security & Compliance
registrant: GitHub
components: 
- name: virtual-server
  colorIcon: assets/images/integration/f5-networks/components/virtual-server/icons/color/virtual-server-color.svg
  whiteIcon: assets/images/integration/f5-networks/components/virtual-server/icons/white/virtual-server-white.svg
  description: A BIG-IP Virtual Server is a logical IP address and port on an F5 BIG-IP device that receives client traffic and distributes it to one or more backend servers (pool members) based on configured load-balancing and traffic management policies.
- name: transport-server
  colorIcon: assets/images/integration/f5-networks/components/transport-server/icons/color/transport-server-color.svg
  whiteIcon: assets/images/integration/f5-networks/components/transport-server/icons/white/transport-server-white.svg
  description: A BIG-IP Transport Server is a service definition on an F5 BIG-IP device used to manage Layer 4 (TCP/UDP) traffic for backend services without the full L7 capabilities of a Virtual Server, suitable for protocols like UDP, SCTP, or specific TCP-only use cases.
- name: ingress-link
  colorIcon: assets/images/integration/f5-networks/components/ingress-link/icons/color/ingress-link-color.svg
  whiteIcon: assets/images/integration/f5-networks/components/ingress-link/icons/white/ingress-link-white.svg
  description: The BIG-IP Ingress Link is a Kubernetes Custom Resource Definition (CRD) used by the Container Ingress Services (CIS) to bridge Kubernetes Ingress resources with F5 BIG-IP Virtual Servers, defining how traffic from Kubernetes services is exposed through the BIG-IP load balancer.
- name: tls-profile
  colorIcon: assets/images/integration/f5-networks/components/tls-profile/icons/color/tls-profile-color.svg
  whiteIcon: assets/images/integration/f5-networks/components/tls-profile/icons/white/tls-profile-white.svg
  description: A TLSProfile is an F5 BIG-IP CIS Custom Resource (CRD) that defines how TLS/SSL should be handled for a Virtual Server.
- name: external-dns
  colorIcon: assets/images/integration/f5-networks/components/external-dns/icons/color/external-dns-color.svg
  whiteIcon: assets/images/integration/f5-networks/components/external-dns/icons/white/external-dns-white.svg
  description: ExternalDNS is used to automatically create DNS records that point to BIG-IP Virtual Servers.
componentsCount: 5
relationships: 
relationshipsCount: 0
featureList: [
  "L4-L7 traffic management via F5 BIG-IP virtual servers",
  "TLS termination and SSL profile configuration for secure ingress",
  "External DNS management for Kubernetes services"
]
howItWorks: "Integrates F5 BIG-IP with Kubernetes"
howItWorksDetails: "Manages ingress traffic routing and load balancing using F5 BIG-IP from within Kubernetes using custom resource definitions"
---
