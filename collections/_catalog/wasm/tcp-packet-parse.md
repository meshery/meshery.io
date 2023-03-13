---
layout: item
name: TCP Packet Parse
type: wasm filter
compatibility:
        - Istio
        - Envoy
        - Consul
patternId: FILTER003
image: /assets/images/webassembly_logo.svg
filterInfo: |
        <p>
        Parses the contents of every TCP packet the proxy receives and logs it.
        </p>
        <p>
        Build and deploy:
        </p>

        <code>
        cd tcp-packet-parse
        make run-filtered
        </code>
        
        <p>
        Test this filter by executing:
        </p>

        <code>
        curl 0.0.0.0:18000 -v -d "request body"
        </code>
        

filterCaveats: 
URL: "https://github.com/layer5io/wasm-filters/releases"
downloadLink: tcp_packet_parse_bg.wasm
---
