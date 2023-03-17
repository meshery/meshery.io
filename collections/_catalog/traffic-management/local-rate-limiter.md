---
layout: item
name: Local Rate Limiter
type: Traffic Management
compatibility:
    - Istio
    - Kuma
patternId: MESHERY003
image: /assets/images/patterns/rate-limit.svg
patternInfo: "Local rate limiting is used to limit the rate of requests per service instance. Local rate limiting can be used in conjunction with global rate limiting to reduce load on the global rate limiting service."
patternCaveats: "Envoy supports local rate limiting of L4 connections and HTTP requests. This allows you to apply rate limits at the instance level, in the proxy itself, without calling any other service."
URL: ""
downloadLink: 
---
    