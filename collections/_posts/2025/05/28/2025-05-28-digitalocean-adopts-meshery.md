---
title: "DigitalOcean Adopts Meshery as an Ecosystem Partner"
subheading: A Meshery Catalog publisher, a co-built AI academy, and an Open Source Credits grant
date: 2025-05-28
author: Meshery Authors
draft: false
published: true
categories:
  - community
  - collaboration
  - opensource
redirect_from: /blog/digitalocean-adopts-meshery
featured-image: /assets/images/posts/2025/digitalocean-adopts-meshery/digitalocean-adopts-meshery.png
---

DigitalOcean has adopted Meshery, and not in just one way. DigitalOcean publishes its own designs and models to the Meshery Catalog, it co-built an AI engineering academy that teaches operators to manage DigitalOcean infrastructure with Meshery, and it backs the project through the [DigitalOcean Open Source Credits Program](https://www.digitalocean.com/open-source/credits-for-projects). Put together, that makes DigitalOcean a genuine ecosystem partner: a user of Meshery, not only a sponsor of it.

<img src="/assets/images/posts/2025/digitalocean-adopts-meshery/digitalocean-adopts-meshery.png" style="width:100%; max-width:750px;" alt="Meshery and DigitalOcean logos with the heading Ecosystem Partner and the line Supporting open source together" />

This is what a healthy open source partnership looks like. Support flows both ways - DigitalOcean invests in the infrastructure Meshery runs on, and it gives back to the community with reusable designs, models, and learning resources that any operator can pick up.

> The strongest endorsement of a project is not a logo on a sponsors page. It is a company choosing to build on it.

## A user and a publisher: DigitalOcean in the Meshery Catalog

The clearest sign that DigitalOcean has adopted Meshery is that DigitalOcean builds with it. DigitalOcean is an active publisher in the [Meshery Catalog](https://meshery.io/catalog), sharing both Meshery designs and Meshery models that capture how to stand up and operate real workloads on DigitalOcean. Anyone can browse them, import them into their own clusters, and adapt them - turning a vendor's hard-won setup into a starting point for the rest of us.

Those contributions travel even further than the Catalog. Because [Meshery Designs are a first-class artifact kind on Artifact Hub](https://meshery.io/blog/2024/04/2024-04-09-designs-on-artifacthub/) - the Meshery Catalog was the first repository listed there - DigitalOcean's published designs are discoverable by anyone searching [Artifact Hub](https://artifacthub.io), not only by people already inside Meshery.

Publishing designs and models is how a company puts its expertise back into the commons. It is also how it signals, in the most concrete way available, that it has made Meshery part of how it works.

## A co-built academy for AI engineering

DigitalOcean's adoption extends to teaching others. Together, we built the **DigitalOcean Academy**: a complete AI engineering curriculum, hosted at [digitalocean.layer5.io/academy](https://digitalocean.layer5.io/academy) on the same Layer5 Cloud learning platform that powers [Meshery's own academy](https://cloud.meshery.io/academy/overview).

By the numbers, the Academy delivers **134 hands-on learning units** - 124 lessons, 5 labs, and 5 graded exams - spread across **31 courses** and **7 learning paths**, all capped by a professional certification. Most of it is brand new: we created **1 certification, 6 learning paths, and 4 challenges** for this partnership, adding 114 lessons and 29 courses from scratch.

### Earn the DigitalOcean Certified AI Engineer (DO-CAIE) credential

At the top of the Academy sits the **DigitalOcean Certified AI Engineer (DO-CAIE)** certification. It is built on a seven-domain blueprint and assessed with a 60-question exam plus a mandatory capstone project. You need 70% to pass, and the credential is valid for two years.

### Seven learning paths, from foundations to production

The learning paths carry you from your first model to MLOps in production, with clear levels so you can start where you are:

| Learning path | Level | Courses | Modules | Lessons |
| --- | --- | :--: | :--: | :--: |
| AI Foundations on DigitalOcean | Beginner | 4 | 4 | 16 |
| Building Agentic AI with the Gradient AI Platform | Intermediate | 6 | 6 | 24 |
| GPU Compute & Model Serving | Intermediate | 5 | 5 | 20 |
| Cloud Native AI Infrastructure with Meshery & DOKS | Advanced | 6 | 6 | 24 |
| Production AI Engineering & MLOps | Advanced | 5 | 5 | 20 |
| DO-CAIE Certification Prep | Advanced | 3 | 3 | 10 |
| Getting Started | Beginner | 2 | 1 | 10 |

The **Cloud Native AI Infrastructure with Meshery & DOKS** path is where DigitalOcean's adoption of Meshery becomes a lesson plan. It teaches you to stand up GPU-backed DigitalOcean Kubernetes clusters and operate them visually with Meshery - the same workflow DigitalOcean captures in its published designs and labs.

### Five challenges that prove you can ship

Challenges are graded, hands-on activities. Each one pairs a live lab with an exam, so you practice the skill and then prove it:

- **Deploy an LLM on GPU Droplets**
- **Build a RAG Agent with Knowledge Bases**
- **Manage a DOKS GPU Cluster with Meshery**
- **The DO-CAIE Certification Exam** - a written exam plus a capstone project
- **How to Add Volumes to Kubernetes Clusters**

## The infrastructure behind it, backed by DigitalOcean credits

The Academy's labs are not simulations. They run on real DigitalOcean infrastructure - GPU Droplets for model serving, DigitalOcean Kubernetes (DOKS) GPU clusters operated through [Meshery](https://docs.meshery.io/installation/kubernetes), the Gradient AI Platform and Knowledge Bases for retrieval-augmented agents, and block storage Volumes for stateful workloads.

Keeping those environments running is where the DigitalOcean Open Source Credits Program comes in. The program grants cloud credits to projects with an OSI-approved license to cover development, testing, and hosting, on a yearly cycle that renews as a project keeps building in the open. Our initial grant is $1,000 in credits, with yearly renewal and extension options as our participation continues - real runway for both the Academy and the project.

The same credits back Meshery's own community infrastructure:

- **End-to-end test targets.** Disposable DOKS clusters and Droplets serve as fresh Kubernetes environments for our [Playwright-powered end-to-end test suite](https://meshery.io/blog/improving-meshery-ui-e2e-tests), so every pull request runs against a real cluster rather than a mock.
- **Demo and onboarding environments.** Hosted environments where newcomers can watch Meshery manage live infrastructure, complementing [Meshery Playground](https://play.meshery.io).
- **Artifacts and design snapshots.** Spaces object storage for build artifacts, exported [designs](https://meshery.io/catalog), and the snapshots that power our visual diffs.

## Saying thank you, out loud

Part of the program is attribution, and we are glad to give it. Following DigitalOcean's [attribution guidelines](https://www.digitalocean.com/open-source), we are adding the DigitalOcean logo and a link back to their site across our project's web and repository presence, and we will tag DigitalOcean and use **#DoforOpenSource** when we share what we build.

A specific thank-you to Oliver Mensah and the DigitalOcean Open Source team in Developer Relations. Sponsorship keeps the lights on, but choosing to publish on Meshery, teach with Meshery, and run labs on Meshery-managed infrastructure is a deeper kind of investment - and that is exactly what DigitalOcean has done. We will keep sharing what we learn, with success stories and case studies from running AI workloads on DigitalOcean with Meshery.

## Start learning today

Meshery's momentum is a community achievement - the same momentum that recently made us [one of the highest-velocity projects in the CNCF](https://meshery.io/blog/sixth-highest-velocity-cncf-project). When a provider like DigitalOcean adopts the project, that momentum compounds.

- Open the [DigitalOcean Academy](https://digitalocean.layer5.io/academy) and start with AI Foundations, or aim straight for the DO-CAIE certification.
- Browse DigitalOcean's designs in the [Meshery Catalog](https://meshery.io/catalog) and import one into your own cluster.
- [Install Meshery](https://docs.meshery.io/installation) and connect your first cluster in minutes.
- Join the conversation on [Slack](https://slack.meshery.io) and meet the maintainers at our [weekly community calls](/community).

Thank you, DigitalOcean, for adopting Meshery and investing in open source - and thank you, Meshery community, for making the project worth adopting. Onwards.
