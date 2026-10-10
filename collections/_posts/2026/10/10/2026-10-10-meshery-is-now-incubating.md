---
title: "Meshery is now a CNCF Incubating Project"
subheading: "Meshery has officially been accepted as a CNCF Incubating project! <br> Read about our growth and join us at KubeCon + CloudNativeCon North America 2026."
date: 2026-10-10
author: Sangram Rath
featured-image: /assets/images/posts/2026/10/meshery-incubation-announcement.png
category: Announcements
categories:
  - announcements
  - cncf
  - kubecon
  - cloudnativecon
  - open-source
---

It is official: the **Cloud Native Computing Foundation (CNCF) Technical Oversight Committee has voted to accept Meshery as an Incubating project**! This marks a massive milestone in our journey from a Sandbox project to becoming the premier cloud native manager and infrastructure management platform. 

### Project Pulse

Meshery has evolved far beyond its initial iterations. Today, it stands as an expansive cloud native manager designed to simplify the complex lifecycle of modern infrastructure. Instead of leaving you to wrestle with an endless pile of YAML, Meshery allows you to treat your cluster as a dynamic knowledge graph. This approach provides multi-cluster fleet management, deep visibility, and an extensible architecture that brings order and automation to cloud native operations.

### A Community-Driven Triumph

This incubation milestone belongs to the community. It is a direct result of the relentless collaboration and innovation from developers around the globe. Since entering the CNCF Sandbox on June 22, 2021, our ecosystem’s growth has been staggering:

*   **Fifth highest-velocity project** in the CNCF (as of this writing).
*   **350% increase in code commits** between July 1, 2025 to July 1, 2026.
*   **7,000+ Contributors** helping build and refine the platform.
*   **1,000+ Contributing Organizations** backing the ecosystem.
*   **36.6% Year-Over-Year Increase** in active community contributors.
*   **15,000 GitHub stars**

These metrics are more than just numbers, they reflect the real-world trust and reliance that users and organizations are placing in Meshery to design, operate, and manage their cloud native deployments at scale.

### The Future

In the era of AI, Meshery is working on tackling critical gaps in cloud-native AI by grounding LLMs in rich, topology-aware context rather than leaving them to hallucinate over raw, isolated YAML manifests. By exposing cloud-native infrastructures as an active semantic knowledge graph, Meshery provides agents with full structural visibility into relationships, dependencies, and policy guardrails before they generate or mutate configurations. Subsequently, visualizing these AI-generated changes for review esnures human-in-the-loop. Crucially, these improvements to Meshery treats AI agents as first-class operators. We are also refining `mesheryctl` for headless, non-interactive execution and rolling out token-efficient output serializations like TOON alongside JSON and YAML, cutting context-window overhead while giving agents deterministic pre-change impact analysis directly inside their execution loops. And our newest project [`mesheryctl-axi`](https://github.com/meshery-extensions/mesheryctl-axi) takes this further by providing a dedicated Agent eXecution Interface (AXI) built specifically for autonomous systems—offering token-efficient TOON list and view reporting, definitive empty states, structured errors, actionable next-step suggestions, and strictly non-interactive execution, making it the preferred entry point over raw `mesheryctl` for agent workflows.

Beyond our AI initiatives, the architectural roadmap focuses on scaling core infrastructure lifecycle operations through dynamic, model-driven orchestration. We are expanding runtime model generation from OCI registries and remote Helm charts, enabling seamless onboarding of custom resources while strengthening our semantic relationship engine to enforce policy and simulate changes before reconciliation. MeshSync is evolving with tiered discovery and composite fingerprinting to deliver near-instant, multi-cluster state synchronization at minimal resource cost. Paired with native OCI packaging for versioning designs, granular workspace boundaries for platform teams, and automated visual diff snapshots directly in pull requests, Meshery is set to make multi-cluster fleet management faster, visual, and collaborative at scale.

### Celebrate with Us at KubeCon + CloudNativeCon North America 2026!

Incubation is just the beginning of our next chapter, and we want to celebrate this momentum with you next month. Whether you are a long-time user or looking to make your very first open-source contribution, come connect with the maintainers and the community at the upcoming KubeCon + CloudNativeCon North America 2026 events:

<div style="display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; margin: 2rem 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <!-- Card 1: Project Lightning Talk -->
  <div style="flex: 1 1 340px; max-width: 460px; background-color: #f0faf8; border-radius: 14px; border: 1px solid #d4ece6; border-left: 7px solid #00B39F; padding: 22px 24px; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05); display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <!-- Date & Time badge/header -->
      <div style="margin-bottom: 12px; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #007a6c;">
        Monday, November 9 &bull; 12:20 PM
      </div>

      <!-- Title -->
      <h3 style="margin: 0 0 10px 0; font-size: 1.25rem; font-weight: 700; color: #111827; line-height: 1.35;">
        Meshery: Your Cluster as a Knowledge Graph, Not a Pile of YAML
      </h3>

      <!-- Location -->
      <p style="margin: 0 0 6px 0; font-size: 0.95rem; font-weight: 600; color: #374151;">
        Hyatt Regency | Level 4 | Regency Ballroom B-D
      </p>

      <!-- Speaker -->
      <p style="margin: 0 0 18px 0; font-size: 0.88rem; color: #6b7280; line-height: 1.45;">
        Yash Sharma, DigitalOcean
      </p>
    </div>

    <!-- Tags -->
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <span style="border: 1.5px solid #00B39F; color: #007a6c; border-radius: 20px; padding: 4px 14px; font-size: 0.78rem; font-weight: 600;">
        Project Lightning Talks
      </span>
    </div>
  </div>

  <!-- Card 2: Contribfest -->
  <div style="flex: 1 1 340px; max-width: 460px; background-color: #f1f7fc; border-radius: 14px; border: 1px solid #d4e5f4; border-left: 7px solid #2563EB; padding: 22px 24px; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05); display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <!-- Date & Time badge/header -->
      <div style="margin-bottom: 12px; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #1d4ed8;">
        Thursday, November 12 &bull; 1:50 PM
      </div>

      <!-- Title -->
      <h3 style="margin: 0 0 10px 0; font-size: 1.25rem; font-weight: 700; color: #111827; line-height: 1.35;">
        Meshery Contribfest: Ship Your First PR to a CNCF Cloud Native Manager
      </h3>

      <!-- Location -->
      <p style="margin: 0 0 6px 0; font-size: 0.95rem; font-weight: 600; color: #374151;">
        Salt Palace | Level 2 | 255 D
      </p>

      <!-- Speakers -->
      <p style="margin: 0 0 18px 0; font-size: 0.85rem; color: #6b7280; line-height: 1.45;">
        Yash Sharma, DigitalOcean; Lee Calcote, Layer5, Inc.; Hussaina Begum Nandyala, Netskope; Shivay Lamba, Qualcomm; Sangram Rath, OD10 Ventures
      </p>
    </div>

    <!-- Tags -->
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <span style="border: 1.5px solid #2563EB; color: #1d4ed8; border-radius: 20px; padding: 4px 14px; font-size: 0.78rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
        🤖 <span>Contribfest</span>
      </span>
    </div>
  </div>

</div>

We are incredibly proud of what this community has accomplished together. Stop by our events, meet the team, and let's keep building the future of cloud native management.
