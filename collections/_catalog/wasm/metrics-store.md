---
layout: item
name: Metrics Store
type: wasm filter
compatibility:
        -  Envoy
        -  Istio
        -  Consul
patternId: FILTER005
image: /assets/images/webassembly_logo.svg
filterInfo: |
        <p>
        This example showcases communication between a WASM filter and a service via shared queue. It combines the <b>Singleton HTTP Call</b> and <b>TCP Metrics</b> examples. The filter collects metrics and enqueues it onto the queue while the service dequeues it and sends it to upstream server where it is stored.
        </p>

        <p>
        Build and Deploy:
        </p>

        <code>
        cd metrics-store
        make run-filtered
        </code>
        
        <p>
        Test this filer by executing:
        </p>

        <code>
        # make a few of these calls
        curl 0.0.0.0:18000 -v -d "request body" 
        </code>
        
        <br />

        <code>
        # Retrieves the stored stats
        curl 0.0.0.0:8080/retrieve -v 
        x | y | z  === 
        # x : downstream bytes, 
        # y : upstream bytes, 
        # z: the latency for application server to respond 
        </code>

        <p>
        Collects simple metrics for every TCP packet sent, and logs it down.
        </p>
filterCaveats: Potentially log large files depending upon volue of traffic handled.
URL: "https://github.com/layer5io/wasm-filters/releases"
downloadLink: metrics_collector_bg.wasm
---
