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
        cd metrics-store<br/>
        make run-filtered
        </code>
        
        <p>
        Test this filer by executing:
        </p>

        <code>
        # make a few of these calls<br/>
        curl 0.0.0.0:18000 -v -d "request body" 
        </code>
        
        <br />

        <code>
        # Retrieves the stored stats<br/>
        curl 0.0.0.0:8080/retrieve -v <br/>
        x | y | z  === <br/>
        # x : downstream bytes, <br/>
        # y : upstream bytes, <br/>
        # z: the latency for application server to respond <br/>
        </code>

        <p>
        Collects simple metrics for every TCP packet sent, and logs it down.
        </p>
filterCaveats: Potentially log large files depending upon volue of traffic handled.
URL: "https://github.com/layer5io/wasm-filters/releases"
downloadLink: metrics_collector_bg.wasm
---
