---
date: 2023-12-08 13:00:00 +0000
title: The Synergy of REST and GraphQL APIs in Meshery
subheading: Extending Meshery as an engineering platform
author: Lee Calcote
categories:
  - extensibility
featured-image: /assets/images/posts/2023/2023-12-08-graphql-and-rest-apis/meshery-apis.jpeg
redirect_from: /blog/unleashing-power-and-flexibility-the-synergy-of-rest-and-graphql-in-meshery
---

As an extensible engineering platform, Meshery's focus on flexibility and adaptability are key. Meshery has embraced this philosophy wholeheartedly as evident by the myriad ways in which it is [extensible](https://docs.meshery.io/extensibility). By incorporating both REST and GraphQL APIs into its architecture, this dual approach allows Meshery to cater to a diverse range of use cases and developer preferences, ensuring that the platform remains a powerful and versatile tool for managing infrastructure and applications.

## Understanding Meshery's balance between flexibility and stability

Meshery is an open source, cloud native management platform that facilitates the deployment, management, and operation of Kubernetes and any resource represented on Kubernetes (e.g. GCP and AWS as cloud platforms). Since the ability for developers to understand, configure, and collaborate over the infrastructure that runs their microservices-based applications, plays a crucial role in their ability to innovate, Meshery offers self-service, engineering empowerment via its various extension points (see figure).

<img alt="Meshery Extension Points" src="/assets/images/posts/2023/2023-12-08-graphql-and-rest-apis/meshery-extension-points.webp" width="90%" />

Incumbent upon Meshery is the necessity to balance the freedoms of these extension points with that of platform-enforced safeguards to help prevent the incidental mishaps that occur when an engineer "shoots themself in the foot", so to speak. Meshery's APIs are designed to be flexible and expressive, while also being stable and predictable. This balance is achieved by providing both REST and GraphQL APIs.

## Meshery's APIs

[Meshery's APIs](https://docs.meshery.io/extensibility/api) are just one type of extension point. Meshery's APIs are used by every Meshery component. This includes:

- the two clients, [Meshery UI](https://docs.meshery.io/concepts/architecture), and [mesheryctl](https://docs.meshery.io/reference/mesheryctl) to interact with the Meshery Server.
- [Meshery Adapters](https://docs.meshery.io/concepts/architecture/adapters) to register capabilities with the Meshery Server.
- Meshery's APIs are also used by the [Meshery Operator](https://docs.meshery.io/concepts/architecture/operator) and it runs [MeshSync](https://docs.meshery.io/concepts/architecture/broker) and [Meshery Broker](https://docs.meshery.io/concepts/architecture/broker).

<div class="callout">
<h5>Meshery REST API Reference</h5>
<ul><li><a href="(https://docs.meshery.io/reference/rest-apis">Meshery REST API Reference</a></li>
<li><a href="(https://docs.meshery.io/reference/graphql-apis">Meshery GraphQL API Reference</a></li>
</ul>
</div>

### REST API: Traditional and Battle-Tested

The inclusion of a RESTful API in Meshery aligns with the conventional approach to building APIs. REST, or Representational State Transfer, is an architectural style that has been widely adopted in the industry for years. Meshery's REST API provides a standardized and intuitive way for developers to interact with the platform.

- **Familiarity and Ease of Use:** Many developers are already familiar with RESTful APIs, making Meshery accessible to a broad audience. The straightforward nature of REST makes it easy to understand and integrate into existing workflows.

- **Industry Standards:** REST is a tried-and-true approach with established industry standards. This ensures compatibility with a myriad of tools, libraries, and frameworks, enabling seamless integration with other services and systems.

- **Statelessness:** REST's stateless nature simplifies server-side implementation and promotes scalability. Each request from a client contains all the information needed to understand and process the request, reducing server overhead.

### GraphQL API: Empowering Developers with Flexibility

Meshery's GraphQL API provides a more expressive and flexible approach to querying data. In addition to REST, Meshery has embraced GraphQL, a query language for APIs that provides a more flexible and efficient alternative to traditional RESTful approaches.

- **Fine-Grained Queries:** GraphQL allows clients to request only the data they need, minimizing bandwidth usage and reducing the over-fetching of data. This granularity in querying enhances performance and responsiveness, especially in scenarios with limited network resources.

- **Single Request, Multiple Responses:** Unlike REST, where multiple endpoints might be required to gather disparate data, GraphQL allows clients to retrieve all the necessary information in a single request. This reduces the number of network requests and optimizes data fetching.

- **Schema Evolution:** GraphQL supports incremental schema updates, providing flexibility in evolving APIs over time without breaking existing clients. This is particularly beneficial in a rapidly changing technology landscape.

## Synergy of REST and GraphQL in Meshery

The decision to incorporate both REST and GraphQL APIs in Meshery is a strategic move that maximizes the benefits of both paradigms. Developers can choose the approach that best suits their requirements, taking advantage of the simplicity of REST or the flexibility of GraphQL.

### Authn and Authz

Irrespective of whether you use the REST or GraphQL API, Meshery requires authentication and authorization for all API requests. Requests to any of the API endpoints must be authenticated and include a valid JWT access token in the HTTP headers. Type of authentication is determined by the selected [Provider](https://docs.meshery.io/extensibility/providers). Use of the Local Provider, "None", puts Meshery into single-user mode and does not require authentication.

#### Compatibility and Integration

Meshery's REST API ensures compatibility with a wide range of tools and libraries, while the GraphQL API caters to developers who prefer a more dynamic and tailored querying experience.

#### Developer Choice

Offering both REST and GraphQL APIs empowers developers to choose the API style that aligns with their expertise and project requirements. This flexibility promotes inclusivity and encourages collaboration among diverse development teams.

#### Future-Proofing

Meshery's commitment to providing both REST and GraphQL APIs demonstrates a forward-looking approach. As technology evolves and developer preferences shift, Meshery remains adaptable, ensuring its relevance in the ever-changing landscape of cloud-native development.

### Conclusion

The Meshery open source project's decision to incorporate both REST and GraphQL APIs reflects a commitment to empowering developers with choice and flexibility. By embracing the strengths of both paradigms, Meshery ensures that it remains a versatile and future-proof tool for managing service meshes in the dynamic world of cloud-native applications. Whether developers prefer the familiarity of REST or the expressive power of GraphQL, Meshery stands ready to meet their needs, providing a seamless and efficient experience for cloud native and cloud infrastructure management.