---
layout: item
name: Metrics-Store
type: wasm filter
compatibility:
        - 
patternId: FILTER005
image: /images/webassembly_logo.svg
filterInfo: This example showcases communication between a WASM filter and a service via shared queue. It combines the Singleton-HTTP-Call and TCP-Metrics examples. The filter collects metrics and enqueues it onto the queue while the service dequeues it and sends it to upstream server where it is stored.
filterCaveats: "[Coming Soon]"
URL: "https://github.com/layer5io/wasm-filters/releases"
downloadLink: metrics_collector_bg.wasm
---
