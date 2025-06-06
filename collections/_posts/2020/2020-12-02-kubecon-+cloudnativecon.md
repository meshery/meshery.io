---
date:   2020-12-02 21:00:00 +0530
heading: KubeCon+CloudNativeCon
title: KubeCon+CloudNativeCon 
author: The Newsroom
categories:
 - events
 - kubecon
redirect-from: /blog/kubecon-cloudnativecon
---
<div style="text-align:center;padding:5px">
<img src="{{site.baseurl}}/assets/images/posts/2020-12-02-kubecon+cloudnativecon/service-mesh-implementations.png" style="width:100%" /></div>
As more organizations implement service meshes, they are finding what works and what needs more work, and they are creating new management practices around this knowledge. A few tried-and-tested best practices were detailed last month during KubeCon+CloudNativeCon.

“There’s a lot to say about each of these service meshes and how they work: their architecture, why they’re made, what they’re focused on, what they do when they came about and why some of them aren’t here anymore and why we’re still seeing new ones,” Lee Calcote, founder of Meshery, explained during his talk with Kush Trivedi, a Meshery maintainer, entitled “Service Mesh Specifications and Why They Matter in Your Deployment.”

Service mesh is increasingly seen as a requirement to manage microservices in Kubernetes environments, offering a central control plane to manage microservices access, testing, metrics and other functionalities. One-third of the respondents in The New Stack survey of our readers said their organizations already use service mesh. Among the numerous service mesh options available; Envoy, Istio, Linkerd and Kuma are but a few on offer.

### Interoperability Is Key as Service Meshes Come and Go

Organizations will likely look to use at least more than one API service layer and service mesh for their clusters. This is why interoperability, and thus specifications, are critical for control planes as well. During his talk — “Service Mesh Specifications and Why They Matter in Your Deployment” mentioned above — for example, Calcote, asked rhetorically:

“How many specifications, how many standards are there that have come to the rescue, so to speak, for understanding and interoperating with the various service meshes that are out there?” Calcote said.

<img src="{{site.baseurl}}/assets/images/posts/2020-12-02-kubecon+cloudnativecon/service-mesh-abstractions.png" alt="service-mesh-abstractions" width="100%" />

A service mesh can be used for testing router performance, service latency and other variables. However, determining service mesh performance in an apples-to-apples way can be challenging. When studying “published results from some of the service meshes [from providers] that do publish results about performance… what you’ll find is that they’re probably using an environment that isn’t necessarily like yours,” Calcote said. “They’re also using different statistics and metrics to measure [their service meshes] … and it doesn’t help.”

<img src="../../assets/images/posts/2020-12-02-kubecon+cloudnativecon/service-mesh-performance.png" alt="service-mesh-performance" width="100%" />

Service mesh performance (SMP) was created in an attempt to establish a way of comparing the performance of different services. “The SMP was born in combination with engaging with a few of those different service mesh maintainers and creating a standard way of articulating a performance of a mesh,” Calcote said.

Among the variables in consideration, in addition to the service mesh itself, include the number of clusters, workloads, the types of nodes, control plan configuration and the use of client libraries all affect performance.

“What costs more, what’s more efficient and what’s more powerful: These are all open questions that SMP assists in answering in your environment,” Calcote said.


**Read the full, [original post](https://thenewstack.io/kubeconcloudnativecon-service-mesh-battle-stories-and-fixes/).**
