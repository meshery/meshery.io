---
date:   2022-01-26 22:00:00 +0530
heading: Pipelining Service Mesh Specifications
title: Pipelining Service Mesh Specifications
author: The Newsroom
categories:
 - continuous-integration
 - service-mesh
 - gitops
redirect_from: /blog/pipelining-service-mesh-specifications
---
<div style="text-align:center;margin-bottom:0.75rem;">
  <img src="{{site.baseurl}}/assets/images/posts/2022-01-26-pipelining-service-mesh-specifications/service-mesh-specifications.png" alt="service-mesh-specifications" width="80%"  />
</div>
With growing adoption of service meshes in cloud native environments, service mesh abstractions - service mesh-neutral specifications - have emerged. Service Mesh Performance and <a href="https://layer5.io/projects/service-mesh-interface-conformance">Service Mesh Interface</a> are two open specifications that address the need for universal interfaces for interacting with and managing any type of service mesh. Let’s examine what each specification provides.

Service Mesh Performance standardizes service mesh value measurement, characterizing any deployment's performance by capturing the details of infrastructure capacity, service mesh configuration and workload metadata.

Service Mesh Interface provides a standard interface for service meshes on Kubernetes. These (currently) four specifications offer a common denominator set of interfaces to support most common service mesh use cases and the flexibility to evolve to support new service mesh capabilities over time.

As a service mesh agnostic tool that provides lifecycle and performance management of a large number of (10+) service meshes, Kubernetes applications, service mesh patterns and WebAssembly filters, Meshery is the ideal tool for the job when it comes to implementing these specifications.

Meshery also comes with two new GitHub Actions that do exactly this. The <a href="https://github.com/meshery/meshery-smi-conformance-action">Meshery SMI Conformance Action</a> which validates <a href="https://meshery.io/blog/validating-smi-conformance-with-meshery">SMI conformance in your pipeline</a> and the <a href="https://github.com/meshery/meshery-smp-action">Meshery SMP Action</a> which runs <a href="SMP compatible performance benchmarks">SMP compatible performance benchmarks</a>.

But how do we use these actions? What do they offer? Let’s find out!

#### Service Mesh Interface Conformance GitHub Action

Conformance of SMI specifications is defined as a series of test assertions. These test assertions are categorised by SMI specification (of which, there are currently four specifications) and comprise the complete suite of SMI conformance tests. Conformance requirements will change appropriately as each new version of the SMI spec is released. Refer to Meshery's documentation for details of how <a href="https://docs.meshery.io/functionality/service-mesh-interface">Meshery performs SMI conformance.</a>

**Using Meshery's SMI Conformance GitHub Action** 

The <a href="https://github.com/marketplace/actions/service-mesh-interface-conformance-with-meshery">Service Mesh Interface Conformance GitHub Action</a> is available in the GitHub Marketplace. You can configure this action to trigger with each of your releases, on every pull request. or any GitHub workflow trigger event.

An example of the action configuration which runs on every release is shown below. The action handles setting up a Kubernetes environment, deploying the service mesh (see supported service meshes), running the conformance tests and reporting back the results to the SMI Conformance dashboard in Meshery.

<div id="channelset" class="highlight-code">
  <code class="code-box" style="white-space:pre-wrap;">
name: SMI Conformance with Meshery
on:
  push:
    tags:
      - 'v*'

jobs:
  smi-conformance:
    name: SMI Conformance
    runs-on: ubuntu-latest
    steps:

      - name: SMI conformance tests
        uses: layer5io/mesheryctl-smi-conformance-action@master
        with:
          provider_token: $
          service_mesh: open_service_mesh
          mesh_deployed: false 
</code>
    <!-- copy to clipboard -->
    <a class="btn tooltip" style="position: absolute; top:0.10rem; right: 0.5rem; font-size: 22px;" data-clipboard-target="#channelset"
      data-clipboard-text="
 name: SMI Conformance with Meshery
 on:
   push:
     tags:
       - 'v*'&#xa;
 jobs:
   smi-conformance:
     name: SMI Conformance
     runs-on: ubuntu-latest
     steps:&#xa;
       - name: SMI conformance tests
         uses: layer5io/mesheryctl-smi-conformance-action@master
         with:
           provider_token: $
           service_mesh: open_service_mesh
           mesh_deployed: false"
          onmouseout="resetCopyText(this)">
      <i class="far fa-copy"></i>
      <span class="tooltiptext" style="font-size: 15px; width: 140px; height: 40px; padding: 0; line-height: 40px; top: 2rem; left: -80px;">Copy to clipboard</span>
    </a>
</div>

You can also bring in their own cluster with specific capabilities and with a service mesh already installed.

<div id="channelset" class="highlight-code">
  <code class="code-box" style="white-space:pre-wrap;">
name: SMI Conformance with Meshery
on:
  push:
    branches:
      - 'master'

jobs:
  smi-conformance:
    name: SMI Conformance tests on master
    runs-on: ubuntu-latest
    steps:

      - name: Deploy k8s-minikube
        uses: manusa/actions-setup-minikube@v2.4.1
        with:
          minikube version: 'v1.21.0'
          kubernetes version: 'v1.20.7'
          driver: docker

      - name: Install OSM
        run: |
           curl -LO https://github.com/openservicemesh/
           osm/releases/download/v0.9.1/osm-v0.9.1-linux-amd64.tar.gz
           tar -xzf osm-v0.9.1-linux-amd64.tar.gz
           mkdir -p ~/osm/bin
           mv ./linux-amd64/osm ~/osm/bin/osm-bin
           PATH="$PATH:$HOME/osm/bin/"
           osm-bin install --osm-namespace default

      - name: SMI conformance tests
        uses: layer5io/mesheryctl-smi-conformance-action@master
        with:
          provider_token: $
          service_mesh: open_service_mesh
          mesh_deployed: true 
</code>
    <!-- copy to clipboard -->
    <a class="btn tooltip" style="position: absolute; top:0.10rem; right: 0.5rem; font-size: 22px;" data-clipboard-target="#channelset"
      data-clipboard-text="
name: SMI Conformance with Meshery
on:
  push:
    branches:
      - 'master'&#xa;
jobs:
  smi-conformance:
    name: SMI Conformance tests on master
    runs-on: ubuntu-latest
    steps:&#xa;
      - name: Deploy k8s-minikube
        uses: manusa/actions-setup-minikube@v2.4.1
        with:
          minikube version: 'v1.21.0'
          kubernetes version: 'v1.20.7'
          driver: docker&#xa;
      - name: Install OSM
        run: |
           curl -LO https://github.com/openservicemesh/
           osm/releases/download/v0.9.1/osm-v0.9.1-linux-amd64.tar.gz
           tar -xzf osm-v0.9.1-linux-amd64.tar.gz
           mkdir -p ~/osm/bin
           mv ./linux-amd64/osm ~/osm/bin/osm-bin
           PATH='$PATH:$HOME/osm/bin/'
           osm-bin install --osm-namespace default&#xa;
      - name: SMI conformance tests
        uses: layer5io/mesheryctl-smi-conformance-action@master
        with:
          provider_token: $
          service_mesh: open_service_mesh
          mesh_deployed: true" onmouseout="resetCopyText(this)">
      <i class="far fa-copy"></i>
      <span class="tooltiptext" style="font-size: 15px; width: 140px; height: 40px; padding: 0; line-height: 40px; top: 2rem; left: -80px;">Copy to clipboard</span>
    </a>
</div>

You can download a token from Meshery and add it as a GitHub secret (in the example above, the secret is MESHERY_PROVIDER_TOKEN). After the test is run, you can view the results from the Service Mesh Interface dashboard in Meshery UI.

<div style="text-align:center;margin-bottom:2rem;width:100%">
<img width="100%" src="../../assets/images/posts/2022-01-26-pipelining-service-mesh-specifications/smi-conformance-result.png" alt="smi conformance dashboard">
</div>

Participating service mesh projects can also <a href="https://docs.meshery.io/tasks/service-mesh-interface#reporting-conformance">automatically report their conformance test results</a> to the <a href="https://meshery.io/service-mesh-interface">SMI Conformance dashboard</a>

#### Service Mesh Performance GitHub Action

Measuring and managing the performance of a service mesh is key to efficient operation of any service mesh. Meshery is the canonical implementation of the Service Mesh Performance specification. You can choose from multiple load generators and use a highly configurable set of load profiles with variable tunable facets to run a performance test. Meshery packages all these features into an easy-to-use GitHub Action.

**Using Meshery's Service Mesh Performance GitHub Action**

The <a href="https://github.com/marketplace/actions/performance-testing-with-meshery">Service Mesh Performance GitHub Action</a> is available in the GitHub Marketplace.You can create your own performance profiles to run repeatable tests with Meshery. You can configure this action to trigger with each of your releases, on every pull request. or any GitHub workflow trigger event. A sample configuration of the action is shown below.

<div id="channelset" class="highlight-code">
  <code class="code-box" style="white-space:pre-wrap;">
name: Meshery SMP Action
on:
  push:
    branches:
      'master'

jobs:
  performance-test:
    name: Performance Test
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2
        with:
          ref: 'perf'

      - name: Deploy k8s-minikube
        uses: manusa/actions-setup-minikube@v2.4.1
        with:
          minikube version: 'v1.21.0'
          kubernetes version: 'v1.20.7'
          driver: docker

      - name: Run Performance Test
        uses: layer5io/meshery-smp-action@master
        with:
          provider_token: $
          platform: docker
          profile_name: soak-test 
  </code>
    <!-- copy to clipboard -->
    <a class="btn tooltip" style="position: absolute; top:0.10rem; right: 0.5rem; font-size: 22px;" data-clipboard-target="#channelset"
      data-clipboard-text="
name: Meshery SMP Action
on:
  push:
    branches:
      'master'&#xa;
jobs:
  performance-test:
    name: Performance Test
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2
        with:
          ref: 'perf'&#xa;
      - name: Deploy k8s-minikube
        uses: manusa/actions-setup-minikube@v2.4.1
        with:
          minikube version: 'v1.21.0'
          kubernetes version: 'v1.20.7'
          driver: docker&#xa;
      - name: Run Performance Test
        uses: layer5io/meshery-smp-action@master
        with:
          provider_token: $
          platform: docker
          profile_name: soak-test" onmouseout="resetCopyText(this)">
      <i class="far fa-copy"></i>
      <span class="tooltiptext" style="font-size: 15px; width: 140px; height: 40px; padding: 0; line-height: 40px; top: 2rem; left: -80px;">Copy to clipboard</span>
    </a>
</div>

You can also define your test configuration in an SMP compatible configuration file as shown below.

<div id="channelset" class="highlight-code">
  <code class="code-box" style="white-space:pre-wrap;">
smp_version: v0.0.1
id:
name: Istio Performance Test
labels: {}
clients:
- internal: false
  load_generator: fortio
  protocol: 1
  connections: 2
  rps: 10
  headers: {}
  cookies: {}
  body: ""
  content_type: ""
  endpoint_urls:
  - http://localhost:2323/productpage
duration: "30m"
  </code>
    <!-- copy to clipboard -->
    <a class="btn tooltip" style="position: absolute; top:0.10rem; right: 0.5rem; font-size: 22px;" data-clipboard-target="#channelset"
      data-clipboard-text="
smp_version: v0.0.1
id:
name: Istio Performance Test
labels: {}
clients:
- internal: false
  load_generator: fortio
  protocol: 1
  connections: 2
  rps: 10
  headers: {}
  cookies: {}
  body: ''
  content_type: ''
  endpoint_urls:
  - http://localhost:2323/productpage
duration: '30m'" onmouseout="resetCopyText(this)">
      <i class="far fa-copy"></i>
      <span class="tooltiptext" style="font-size: 15px; width: 140px; height: 40px; padding: 0; line-height: 40px; top: 2rem; left: -80px;">Copy to clipboard</span>
    </a>
</div>

See this sample GitHub workflow (<a href="https://github.com/layer5io/meshery-smp-action/blob/master/action.yml">action.yml</a>) for more configuration details.

<div style="text-align:center;margin-bottom:2rem;width:100%">
<img width="90%" src="../../assets/images/posts/2022-01-26-pipelining-service-mesh-specifications/service-mesh-performance-profile-test-results.png" alt="performance management dashboard">
</div>

The results from the tests are updated on the Performance Management dashboard in Meshery. To learn more about interpreting the test results, check out <a href="https://docs.meshery.io/guides/interpreting-performance-test-results">this guide</a>. You can always checkout the <a href="https://docs.meshery.io/guides">Meshery User Guides</a> to dive deep into these features.

Stay meshy!
