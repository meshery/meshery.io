---
date:   2020-07-30 20:00:00 +0530
heading: Getting started with Service Mesh Performance Analysis
title: Analyzing with SMP
author: Lee Calcote
categories:
  - performance
redirect_from: /blog/getting-started-with-service-mesh-performance-analysis
---
<div style="text-align:center;padding:5px">
<img src="{{site.baseurl}}/assets/images/posts/2020-07-30-analyzing-with-smp/mesh-cubes.svg#center" style="width:70%" /></div>
Anytime performance questions are to be answered, they are subjective to the specific workload and infrastructure used for measurement. Given the variety of this measurement challenge, the Envoy project, for example, refuses to publish performance data because such tests can be

1. Time consuming and Redundant
2. Misinterpreted

Such tests are complicated in part, because there are different types of performance testing, which include: soak testing, stress testing, load testing, capacity testing, and spike testing. Let’s examine each in context of service meshes and their workloads.

* **Soak testing** involves testing a service mesh with a typical production load, over a continuous availability period, to validate service mesh and workload behavior under production use. A good soak test would also include the ability to simulate peak loads as opposed to just average loads. A soak test would be something that we’d run over a weekend or over 24-hour period and we would be looking generally for things like memory leaks.

* **Stress testing** is where we escalate the amount of load over time until we find the limits of the service mesh. Stress testing answers questions of which components will fail first when you push your mesh to extreme limits. Naturally, the results of stress tests identify which components need additional consideration in the face of such extreme load; where your service mesh deployment model and/or it’s configuration may break.

* **Load testing** is where you understand the business requirements very well and can ramp up the load, leaving it running at a plateau until you’re satisfied that the performance is not continuing to degrade and then ramp down on the load. Load testing can help determine what normal performance metrics look like.  By using iterative, load testing, you can determine whether new updates have been in par with code quality or not.

* **Capacity testing** is when a test to determine how many users your application can handle before either performance or stability becomes unacceptable. Capacity testing addresses things like identifying the number of users your application can handle “successfully”. Having run capacity tests, you will have better visibility into events that might push your site beyond its limitations.

* **Spike testing** is where we go over and above the maximum design capacity, just to see how the service mesh and workload can deal with a significantly spiking load. Spike testing helps identify the amount of load by which your service falls over.

Outside of the different types of performance tests, performance management concerns include the need for performance and overhead data under a permutation of different workloads (applications) and different types and sizes of infrastructure resources. The need for cross-project, apple-to-apple comparisons are also desired in order to facilitate a comparison of behavioral differences between service meshes and which one might be best-suited for your workloads. Individual projects shy from publishing test results of other, competing service meshes. The need for an independent, unbiased, credible standard measurement is needed is why the Service Mesh Performance (SMP) was created.

### Service Mesh Performance (SMP)

The Service Mesh Performance working group defines the Service Mesh Performance and is hosted within the CNCF SIG Network. Using SMP, MeshMark provides a universal performance index to gauge your mesh’s efficiency against deployments in other organizations’ environments. The group is also working in collaboration with the Envoy project to create easy-to-use tooling around distributed performance management (distributed load generation and analysis) in context of Istio, Consul, Tanzu Service Mesh, Network Service Mesh, App Mesh, Linkerd, and other service meshes.

The specification itself provides a standard format for describing and capturing:

- performance test configuration
- service mesh configuration
- environment configuration
- workload configuration
- performance test results

The canonical implementation of this specification is the Meshery project. Figure 8-x provides insight to the fact that the specification defines a common collection of statistical analysis to be calculated for every performance test.

<p>Snippet of the Service Mesh Performance describing how to capture statistical analysis.</p>

<div id="channelset" class="highlight-code">
  <code class="code-box">
message PerformanceTestResult {
  message Latency {
    double min = 1;
    double average = 2;
    double p50 = 3;
    double p90 = 4;
    double p99 = 5;
    double max = 6;
  }
}
</code>
    <!-- copy to clipboard -->
    <a class="btn tooltip" style="position: absolute; top:0.10rem; right: 0.5rem; font-size: 22px;" data-clipboard-target="#channelset"
      data-clipboard-text="
message PerformanceTestResult {
  message Latency {
    double min = 1;
    double average = 2;
    double p50 = 3;
    double p90 = 4;
    double p99 = 5;
    double max = 6;
  }
}" onmouseout="resetCopyText(this)">
      <i class="far fa-copy"></i>
      <span class="tooltiptext" style="font-size: 15px; width: 140px; height: 40px; padding: 0; line-height: 40px; top: 2rem; left: -80px;">Copy to clipboard</span>
    </a>
</div>


### Measuring the value of your service mesh configuration
In this pattern we introduce the MeshMark scoring system as a derivation from the Service Mesh Performance. The focus of the MeshMark scoring system is to measure the value versus the overhead of a service mesh.

### The value of SMP
Consider that the more value you try to derive from service mesh, the more you will ask it to do. Which is to say, that as someone reflects more deeply on the architecture of a service mesh - with its distributed proxies - and the more work it does, they will eventually wonder, “What overhead is running my service mesh incurring?”. This is one of the most common questions engineers have.

### What SMP solves
Measurement data may not provide a clear and simple picture of how well those applications are performing from a business point of view, a characteristic desired in metrics that are used as key performance indicators. Reporting several different kinds of data can cause confusion.
MeshMark distills a variety of overhead signals and key performance indicators into a simple scale. Reducing measurement data to a single well understood metric is a convenient way to track and report on quality of experience. Its purpose is to convert measurements into insights about the value of functions a service mesh is providing. It does so by specifying a uniform way to analyze and report on the degree to which measured performance provides user value.
