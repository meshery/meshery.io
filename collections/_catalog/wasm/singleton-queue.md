---
layout: item
name: Singleton Queue
type: wasm filter
compatibility:
        - Istio
        - Envoy
        - Consul
patternId: FILTER006
image: /assets/images/webassembly_logo.svg
filterInfo: |
        An example which depicts a singleton HTTP WASM service which does an HTTP call once every 2 seconds.


        Build and deploy:
        
        <pre><code>
        cd singleton-http-call
        make run-filtered
        </code></pre>

filterCaveats: 
URL: https://github.com/layer5io/wasm-filters/releases
downloadLink: singleton_queue_bg.wasm
---
