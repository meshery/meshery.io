---
layout: item
name: Duration-based Canary
type: Traffic Management
compatibility:
    - Linkerd
patternId: MESHERY004
image: /assets/images/patterns/service-mesh.svg
patternInfo: "Gradual and measured introduction of a new version of an application is commonly called a Canary deployment.  With a canary deployment, you deploy a new version of your application to the production environment; however, it initially receives no user requests. The previous version continues to handle 100% of the requests.<br/><br/>Traffic is gradually distributed to the new version of the service while monitoring it for errors or anomalies. Incremental increases to the new service’s traffic continue until the new service handles 100% of all traffic, and you remove the previous service version. If you detect unsatisfactory levels of errors at any point, traffic is reverted to the old version. Because the service meshes routing later handles traffic direction, it is incredibly quick to change the traffic flow. Also, there is a dramatic reduction to risk as you hopefully catch any errors before exposure to the problem affects all users."
patternCaveats: "<em>Parallel Change</em><br/><br/> When introducing a new version of an application into production, you are often required to: <br/><br/>- Change or modify the application’s behavior.<br/>- Change the interface.<br/>- Change a model in an external data store."
URL: 
downloadLink: 
---
    