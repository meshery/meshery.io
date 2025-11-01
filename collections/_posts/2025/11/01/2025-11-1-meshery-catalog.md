---
title: Revolutionizing Cloud Native Infrastructure, The Meshery Catalog – Your All-in-One Design & Extensibility Hub
subheading: A walkthrough on Meshery Catalog
date: 2025-11-01
author: Darshan Narasimha
categories: 
  - catalog
  - models
  - design
redirect_from: /blog/revolutionizing-cloud-native-infrastructure-the-meshery-catalog-your-all-in-one-design-and-extensibility-hub
featured-image: 
---

In the fast-paced world of Kubernetes, service meshes, and multi-cloud chaos, managing infrastructure shouldn’t feel like herding cats. That’s where the Meshery Catalog steps in — a living, community-powered marketplace of reusable, versioned, and instantly deployable cloud native designs.

Let’s explore its three killer features — Models, Designs, and WASM Filters — and why this combination is uniquely powerful.

## Models: The DNA of Cloud Native Infrastructure

Models are the atomic units of the Meshery Catalog — schema-driven, versioned packages that define components, relationships and policies for any cloud or cloud native resource.

Built with the CUE schema language, Models ensure type safety and extensibility while remaining fully editable through the Meshery UI or mesheryctl CLI. They can be exported as OCI images, making them portable, secure, and easy to distribute. Best of all, Models automatically wire dependencies — a Deployment knows it needs a Service, which needs an Ingress — eliminating manual YAML stitching and reducing errors.

### Creating your custom models
- Import from CRDs, Helm, JSON, CSV
- Design visually in Meshery UI → Export as OCI image
- Publish to public or private registries
Here's more on [publishing your custom model](https://meshery.io/catalog/models#:~:text=%C3%97-,Publish%20Your%20Own%20Model,-Using%20Meshery%27s%20Registry) 

Check out [Catalog Models](https://meshery.io/catalog/models)

## WASM Filters: Secure, Portable, High-Performance Extensions

WASM Filters, the secret weapon for secure, high-performance extensibility. These WebAssembly modules run custom logic directly in the data plane of service meshes and gateways like Envoy or NGINX — with zero runtime dependencies. Unlike traditional Lua or JavaScript filters, WASM Filters are sandboxed, memory-safe, and start in microseconds. They’re fully cross-mesh portable, working seamlessly across Istio, Linkerd, NGINX, and more. In the Catalog, you’ll find ready-to-use filters like auth2 for JWT validation, meshery-filter-iclu for rate limiting, and even user-defined ones like my-http-auth1. Simply drag a filter into your design, configure it visually, and deploy — your traffic is now smarter and safer, instantly.

Check out [Catalog Filters](https://meshery.io/catalog/filters) 

## Designs: Production-Ready Apps, Ready to Deploy

Designs tie it all together into complete, production-ready applications. A Design is a fully wired, executable blueprint — a real-world app built by combining multiple Models, WASM Filters, and relationships. With 337+ Designs in the Catalog, you can deploy anything from the classic Istio Bookinfo app (complete with traffic rules and WASM auth) to a Prometheus + Grafana observability stack or a GitOps pipeline with ArgoCD. Each Design is saved as a OCI artifact, versioned, tagged, published and shareable via Meshery catalog. Best of all, you can save your own custom design — your secure e-commerce backend, your internal microservices platform — and publish it for your team or the world.

Check out the [preexisting Design built by the community](https://meshery.io/catalog/designs), create your own Meshery Design by [referring this documentation](https://docs.meshery.io/guides/configuration-management/creating-a-meshery-design).

## 👏 Thanks for Your Patience and Help

This is a community effort, and we appreciate your support as we make our Catalog more robust and developer-friendly. If you have feedback or ideas to improve the process, drop a note in the [#meshery channel](https://slack.meshery.io) or bring it up during our community calls!

Together, we’re building better tooling—for everyone.

