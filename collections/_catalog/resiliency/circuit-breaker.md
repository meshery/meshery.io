---
layout: item
name: Circuit Breaker
type: Resiliency
compatibility:
    - Istio
    - Linkerd
    - App Mesh
    - OSM
    - Nginx
    - Kuma
    - Consul
    - NSM
    - Traefik
patternId: MESHERY002
image: /assets/images/patterns/circuit-breaker.svg
patternInfo: "Circuit breaking is a foundation pattern designed to remove endpoints that persistently return error messages from a load-balanced group.  Circuit Breakers go hand in hand with the retry pattern; while a retry attempts to recover from an endpoint returning an error when the system knows an endpoint is failing, a circuit breaker ensures that it is no longer called."
patternCaveats: "If the specific fault reported is unusual or rare, it might have been caused by unusual circumstances such as a network packet becoming corrupted while it was being transmitted. In this case, the service mesh could retry the failing request again immediately because the same failure is unlikely to be repeated and the request will probably be successful."
URL: ""
downloadLink: 
---
    