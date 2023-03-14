---
layout: item
name: TCP Metrics
type: wasm filter
compatibility:
        - Envoy
        - Istio
patternId: FILTER002
image: /assets/images/webassembly_logo.svg
filterInfo: |
        <p>
        Collects simple metrics for every TCP packet and logs it.
        </p>

        <p>
        Build and Deploy:
        </p>

        <code>
        cd tcp-metrics
        make run-filtered
        </code>
        
        <p>
        Test this filer by executing:
        </p>

        <code>
        curl 0.0.0.0:18000 -v -d "request body"
        </code>
filterCaveats: none
URL: "https://github.com/layer5io/wasm-filters/releases"
downloadLink: tcp_metrics_bg.wasm
---
