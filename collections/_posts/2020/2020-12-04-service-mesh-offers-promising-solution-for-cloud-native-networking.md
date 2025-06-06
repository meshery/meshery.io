---
date:   2020-12-04 21:00:00 +0530
heading: Service Mesh Offers Promising Solution for Cloud Native Networking
title: Service Mesh Offers Promising Solution for Cloud Native Networking
author: The Newsroom
categories:
  - announcements
  - cloud-native
redirect_from: /blog/service-mesh-offers-promising-solution-for-cloud-native-networking
---
<div style="text-align:center;margin-bottom:0.75rem;">
  <img src="{{site.baseurl}}/assets/images/posts/2020-12-04-service-mesh-offers-promising-solution-for-cloud-native-networking/service-mesh.png" alt="service-mesh" width="100%"  />
</div>
"Cloud native" doesn't just mean "running in the cloud." It's a specific deployment paradigm and uses containers and an orchestration system (usually Kubernetes) to help provision, schedule, run and control a production workload in the cloud, or even across multiple clouds. Within cloud native deployments, an increasingly common approach to networking is the service mesh concept. With a service mesh, instead of each individual container requiring a full networking stack, a grouping of containers all benefit from a mesh that provides connectivity and networking with other containers as well as the outside world.

Service mesh in the wild
While the concept of a service mesh has applicability beyond just Kubernetes deployments, that's arguably where the vast majority of deployments are today. Among the earliest cloud-native service mesh approaches is the open source Linkerd project, which is backed by Buoyant and began to really ramp up adoption in 2017.

Over the past three years there has been an explosion of open source service mesh technology. Meshery, which develops service mesh aggregation technology, currently tracks over 20 different open and closed source mesh projects. Beyond Linkerd, among the most popular is the Google-backed Istio project, which recently hit its 1.8 milestone release. Cisco has backed the Network Service Mesh (NSM) effort, which works at a lower level in the networking stack than Linkerd, Istio and most others.

Each mesh has its own take on configuration and capabilities, which is a good thing for users. Simply put, there is no shortage of options and there is likely to be a service mesh that already exists to meet just about any need.

Service mesh abstraction
While having lots of different service mesh technologies is good for choice, it's not necessarily a good thing for simplicity or interoperability. That's where the concept of service mesh abstraction comes into play.

At the recent KubeCon NA 2020 virtual event, Lee Calcote, co-chair of the Cloud Native Computing Foundation (CNCF) Networking Special Interest Group (SIG) and founder of Meshery, outlined how the different service mesh abstraction technologies fit together.

The Service Mesh Interface (SMI) is a way for any compliant service mesh to plug into Kubernetes. The Service Mesh Performance (SMP) abstraction is all about providing visibility into service mesh performance though a common interface. The third key abstraction is known as Hamlet and it provides multi-vendor service interoperation and mesh federation capabilities.

Service mesh benefits
There are a number of different benefits that service meshes can bring, which are helping to accelerate adoption. Calcote explained that with a service mesh there is a decoupling of developer and operations teams such that each can iterate independently.

As such, operators can make changes to infrastructure independent of developers. DevOps is supposed to mean developer and operations teams work together, but the reality is often quite different and the ability to build application and infrastructure separately is why service mesh has been such a winning proposition for so many organizations.

"We live within a software defined network landscape, and service meshes in some respects are sort of a next-gen SDN," Calcote said.

**Read the full article on [Enterprise Networking Planet](http://www.enterprisenetworkingplanet.com/datacenter/datacenter-blog/service-mesh-cloud-native-networking.html)**
