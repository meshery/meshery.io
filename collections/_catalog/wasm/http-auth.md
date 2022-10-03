---
layout: item
name: HTTP Auth
type: wasm filter
compatibility:
        - 
patternId: FILTER001
image: /images/webassembly_logo.svg
filterInfo: Simulates handling authentication of requests at proxy level. Requests with a header token with value hello are accepted as authorized while the rest unauthorized. The actual authentication is handled by the Upstream server. Whenever the proxy recieves a request it extracts the token header and makes a request to the Upstream server which validates the token and returns a response.
filterCaveats: "[Coming Soon]"
URL: "https://raw.githubusercontent.com/layer5io/wasm-filters/master/http-auth/src/lib.rs"
downloadLink: wasm/
---
