---
title: "Meshery Joins the DigitalOcean Open Source Credits Program"
subheading: Thank you, DigitalOcean - cloud credits to power our community's infrastructure
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

Meshery has been accepted into the [DigitalOcean Open Source Credits Program](https://www.digitalocean.com/open-source/credits-for-projects). DigitalOcean is backing our community with cloud credits to run, test, and showcase Meshery on its infrastructure, and the grant renews and grows each year based on our continued participation. We are grateful for the support, and we are excited about what it lets us build alongside you.

<img src="/assets/images/posts/2025/meshery-digitalocean-open-source-credits/meshery-digitalocean-open-source-credits.png" style="width:100%; max-width:750px;" alt="Meshery and DigitalOcean logos side by side under the heading Open Source Credits Program" />

This kind of support is what keeps open source healthy. Infrastructure is one of the quietest, most expensive costs a community project carries, and a company stepping in to cover it is a direct investment in the cloud native commons.

> The credits are DigitalOcean's. What we build with them belongs to the whole community.

## A vote of confidence from DigitalOcean

The DigitalOcean Open Source Credits Program grants cloud credits to projects with an OSI-approved license to cover the unglamorous-but-essential work of development, testing, and hosting. Grants run on a yearly cycle and renew as a project keeps building in the open.

Our initial grant is $1,000 in DigitalOcean credits, with yearly renewal and extension options as our participation continues. For a community-driven project like Meshery, that is real runway - it pays for compute we would otherwise scrape together, and it lets us point more of our energy at the code, the docs, and the contributors.

## Putting the credits to work for the community

Meshery is the extensible cloud native manager, and it manages any Kubernetes cluster - including [DigitalOcean Kubernetes (DOKS)](https://docs.meshery.io/installation/kubernetes). These credits give us a clean, dedicated place to run the kind of infrastructure our community leans on every day. Here is where we plan to direct them:

- **End-to-end test targets.** Spin up disposable DOKS clusters and Droplets as fresh Kubernetes environments for our [Playwright-powered end-to-end test suite](https://meshery.io/blog/improving-meshery-ui-e2e-tests), so every pull request runs against a real cluster rather than a mock.
- **Demo and onboarding environments.** Stand up hosted environments where newcomers can watch Meshery manage live infrastructure, complementing [Meshery Playground](https://play.meshery.io).
- **Artifacts and design snapshots.** Use Spaces object storage for build artifacts, exported designs, and the snapshots that power our visual diffs.
- **Reference deployments.** Keep a long-running DigitalOcean Kubernetes cluster around as a reference target for [integrations](https://meshery.io/catalog) and reproducing community-reported issues.

Each of these reduces toil for maintainers and shortens the loop for contributors - exactly the outcomes the credits are meant to enable.

## Saying thank you, out loud

Part of the program is attribution, and we are glad to give it. Following DigitalOcean's [attribution guidelines](https://www.digitalocean.com/open-source), we are adding the DigitalOcean logo and a link back to their site across our project's web and repository presence, and we will tag DigitalOcean and use **#DoforOpenSource** when we share what we build.

A specific thank-you to Oliver Mensah and the DigitalOcean Open Source team in Developer Relations for reaching out and making this straightforward. Supporting maintainers with infrastructure is one of the most concrete ways a company can invest in open source, and DigitalOcean has done exactly that.

## Sharing what we build

The best part of a partnership like this is what comes out of it for everyone else. Over the coming months we will share our experience running Meshery on DigitalOcean with the broader community, including:

- A hands-on tutorial for deploying and managing a DigitalOcean Kubernetes cluster with Meshery.
- An architectural overview of how Meshery's services map onto DigitalOcean resources.
- Case studies and success stories drawn from real community workflows.

If you run Meshery on DigitalOcean and want to co-author any of these, we would love your help. This is a community story, and it is better told by the people living it.

## Join us

Meshery's momentum is a community achievement - the same momentum that recently made us [one of the highest-velocity projects in the CNCF](https://meshery.io/blog/sixth-highest-velocity-cncf-project). Support like DigitalOcean's helps us keep that pace.

- [Install Meshery](https://docs.meshery.io/installation) and connect your first cluster in minutes.
- Explore the [Meshery Catalog](https://meshery.io/catalog) for ready-to-use cloud native designs.
- Join the conversation on [Slack](https://slack.meshery.io) and meet the maintainers at our [weekly community calls](/community).

Thank you, DigitalOcean, for sponsoring open source - and thank you, Meshery community, for making the project worth sponsoring. Onwards.
