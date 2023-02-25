---
layout: item
name: Singleton-HTTP-Call
type: wasm filter
compatibility:
        - 
patternId: FILTER004
image: /images/webassembly_logo.svg
filterInfo: "The filter is responsible for intercepting HTTP requests, authorizing them based on the stored cache, and performing rate limiting. In the context of the envoy, this component is an HTTP filter and gets executed in the worker threads. For each request, a context object gets created."
filterCaveats: "[Coming Soon]"
URL: https://github.com/layer5io/wasm-filters/releases
downloadLink: singleton_http_call_bg.wasm
---
