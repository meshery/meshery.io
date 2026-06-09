---
title: "Meshery and DigitalOcean: Cloud Credits and an AI Academy"
subheading: A credits grant that grew into a full AI engineering academy - certification, learning paths, and hands-on labs
date: 2025-05-28
author: Meshery Authors
draft: false
published: true
categories:
  - community
  - collaboration
  - opensource
redirect_from: /blog/meshery-digitalocean-open-source-credits
featured-image: /assets/images/posts/2025/meshery-digitalocean-open-source-credits/meshery-digitalocean-open-source-credits.png
---

Meshery has been accepted into the [DigitalOcean Open Source Credits Program](https://www.digitalocean.com/open-source/credits-for-projects), and the collaboration grew into something much larger than a credits grant. Together with DigitalOcean, we built the **DigitalOcean Academy**: a complete AI engineering curriculum with a professional certification, seven learning paths, and hands-on challenges that run on real DigitalOcean infrastructure managed by Meshery. You can explore it now at [digitalocean.layer5.io/academy](https://digitalocean.layer5.io/academy).

<img src="/assets/images/posts/2025/meshery-digitalocean-open-source-credits/meshery-digitalocean-open-source-credits.png" style="width:100%; max-width:750px;" alt="Meshery and DigitalOcean logos with the heading Open Source Credits Program and the line Cloud credits, and a new AI engineering academy" />

This is what a healthy open source partnership looks like. A company invests in the infrastructure a project runs on, and the project turns that support into learning resources the whole community can use.

> The credits are DigitalOcean's. What we built with them - an entire AI academy - belongs to the whole community.

## A vote of confidence from DigitalOcean

The DigitalOcean Open Source Credits Program grants cloud credits to projects with an OSI-approved license to cover the unglamorous-but-essential work of development, testing, and hosting. Grants run on a yearly cycle and renew as a project keeps building in the open.

Our initial grant is $1,000 in DigitalOcean credits, with yearly renewal and extension options as our participation continues. For a community-driven project like Meshery, that is real runway - it pays for compute we would otherwise scrape together, and it let us put our energy into something lasting: a full curriculum for the people who will build the next wave of AI infrastructure.

## Introducing the DigitalOcean Academy

The [DigitalOcean Academy](https://digitalocean.layer5.io/academy) is a structured, hands-on path from AI fundamentals to production-grade AI engineering on DigitalOcean. It is built on the same Layer5 Cloud learning platform that powers [Meshery's own academy](https://cloud.meshery.io/academy/overview), and it organizes content into three tiers: a certification, learning paths, and challenges.

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

The **Cloud Native AI Infrastructure with Meshery & DOKS** path is where the two projects meet most directly. It teaches you to stand up GPU-backed DigitalOcean Kubernetes clusters and operate them visually with Meshery.

### Five challenges that prove you can ship

Challenges are graded, hands-on activities. Each one pairs a live lab with an exam, so you practice the skill and then prove it:

- **Deploy an LLM on GPU Droplets**
- **Build a RAG Agent with Knowledge Bases**
- **Manage a DOKS GPU Cluster with Meshery**
- **The DO-CAIE Certification Exam** - a written exam plus a capstone project
- **How to Add Volumes to Kubernetes Clusters**

## Infrastructure that powers the labs

These labs are not simulations. They run on real DigitalOcean infrastructure - GPU Droplets for model serving, DigitalOcean Kubernetes (DOKS) GPU clusters operated through [Meshery](https://docs.meshery.io/installation/kubernetes), the Gradient AI Platform and Knowledge Bases for retrieval-augmented agents, and block storage Volumes for stateful workloads. The Open Source Credits grant is what keeps those environments running for learners.

The same credits back Meshery's own community infrastructure:

- **End-to-end test targets.** Disposable DOKS clusters and Droplets serve as fresh Kubernetes environments for our [Playwright-powered end-to-end test suite](https://meshery.io/blog/improving-meshery-ui-e2e-tests), so every pull request runs against a real cluster rather than a mock.
- **Demo and onboarding environments.** Hosted environments where newcomers can watch Meshery manage live infrastructure, complementing [Meshery Playground](https://play.meshery.io).
- **Artifacts and design snapshots.** Spaces object storage for build artifacts, exported [designs](https://meshery.io/catalog), and the snapshots that power our visual diffs.

Each of these reduces toil for maintainers and shortens the loop for contributors - exactly the outcomes the credits are meant to enable.

## Saying thank you, out loud

Part of the program is attribution, and we are glad to give it. Following DigitalOcean's [attribution guidelines](https://www.digitalocean.com/open-source), we are adding the DigitalOcean logo and a link back to their site across our project's web and repository presence, and we will tag DigitalOcean and use **#DoforOpenSource** when we share what we build.

A specific thank-you to Oliver Mensah and the DigitalOcean Open Source team in Developer Relations for reaching out and making this straightforward. Supporting maintainers with infrastructure is one of the most concrete ways a company can invest in open source, and DigitalOcean went further - helping us turn that support into an academy that will outlast any single release. We will keep sharing what we learn, with success stories and case studies from running AI workloads on DigitalOcean with Meshery.

## Start learning today

Meshery's momentum is a community achievement - the same momentum that recently made us [one of the highest-velocity projects in the CNCF](https://meshery.io/blog/sixth-highest-velocity-cncf-project). Support like DigitalOcean's helps us keep that pace, and the DigitalOcean Academy turns it into something you can put on your resume.

- Open the [DigitalOcean Academy](https://digitalocean.layer5.io/academy) and start with AI Foundations, or aim straight for the DO-CAIE certification.
- [Install Meshery](https://docs.meshery.io/installation) and connect your first cluster in minutes.
- Explore the [Meshery Catalog](https://meshery.io/catalog) for ready-to-use cloud native designs.
- Join the conversation on [Slack](https://slack.meshery.io) and meet the maintainers at our [weekly community calls](/community).

Thank you, DigitalOcean, for sponsoring open source - and thank you, Meshery community, for making the project worth sponsoring. Onwards.
