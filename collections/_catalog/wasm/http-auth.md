---
layout: item
name: HTTP Auth
type: wasm filter
compatibility:
        - Istio
        - Envoy
        - Consul
patternId: FILTER001
image: /assets/images/webassembly_logo.svg
filterInfo: |
        Simulates handling authentication of requests at proxy level. Requests with a header `token` with value `hello` are accepted as authorized while the rest unauthorized. The actual authentication is handled by the Upstream server. Whenever the proxy recieves a request it extracts the `token` header and makes a request to the Upstream server which validates the token and returns a response.
        <p>
        Build and deploy:
        </p>
        <code>
        cd http-auth
        make run-filtered
        </code>
        <p>
        Test:
        </p>
        <code>
        curl  -H "token":"hello" 0.0.0.0:18000 -v # Authorized
        curl  -H "token":"world" 0.0.0.0:18000 -v # Unauthorized
        </code>
filterCaveats: 
URL: "https://raw.githubusercontent.com/layer5io/wasm-filters/master/http-auth/src/lib.rs"
downloadLink: wasm/
---
