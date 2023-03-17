---
layout: item
name: JWT Filter
type: JWT
compatibility:
        - Istio
        - Envoy
        - Consul
patternId: FILTER007
image: /assets/images/webassembly_logo.svg
filterInfo: |
        A WASM filter made to manipulate JWT token headers and payloads (currently only supports string parameters). Works best with Meshery.

        Sample configuration:
        <pre>
        <code>
        {
        "add_header": [
        ["header1","value1"],
        ["header2","value2"]
        ],
        "del_header":[
        "header1"
        ],
        "add_payload": [
        ["payload1","value1"],
        ["payload2","value2"],
        ],
        "del_payload":[
        "payload1"
        ],
        "payload_to_header": [
        "payload2"
        ],
        "header_to_payload": [
        "header2"
        ]
        }
        </code>
        </pre>
filterCaveats: "DISCLAIMER: This filter doesn't regenerate the signature of the modified JWT, and provides no protections. Proceed with caution.
"
URL: "https://github.com/layer5io/wasm-filters/releases"
downloadLink: jwt_filter_bg.wasm
---
