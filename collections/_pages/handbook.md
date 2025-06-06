---
layout: page
title: Community Handbook
permalink: /community/handbook
description: Explore the Meshery Community!
cards:
  - title: "About"
    link:  "/community/handbook/about"
    desc:  "Meshery offers cloud native application management by harnessing the power of a developer-friendly applications management system."
  - title: "Code of Conduct"
    link:  "/community/handbook/code-of-conduct"
    desc:  "We follow the CNCF Code of Conduct and pledge to respect all contributors."
  - title: "Community"
    link:  "/community/handbook/community"
    desc:  "A MeshMate will guide you as you explore Meshery projects and areas of interest."
  - title: "Connect with Us"
    link:  "/community/handbook/connect-with-us"
    desc:  "Join our Slack workspace and interact with a thousand like-minded members."
  - title: "Community Roles"
    link:  "/community/handbook/community-roles"
    desc:  "See the many ways you can participate in decision-making and accountability."
  - title: "Contribution"
    link:  "/community/handbook/contribution"
    desc:  "Pull requests are the best way to propose changes. Learn our GitHub Flow."
  - title: "Learning"
    link:  "/community/handbook/learning"
    desc:  "Access curated resources to learn cloud-native infrastructure."
  - title: "Mentorship Programs"
    link:  "/community/handbook/mentorship"
    desc:  "Explore the mentorship programs Meshery participates in and how to join."
  - title: "Projects"
    link:  "/community/handbook/projects"
    desc:  "Meshery projects: Meshery, Service Mesh Performance, NightHawk, and more."
  - title: "Recognition"
    link:  "/community/handbook/recognitions"
    desc:  "Meshery publicly recognizes and appreciates its contributors."
  - title: "Repository Overview"
    link:  "/community/handbook/repository-overview"
    desc:  "Get a code-centric overview of collective community efforts."
  - title: "Security Vulnerabilities"
    link:  "/community/handbook/security"
    desc:  "Report Meshery security issues responsibly — we investigate every report."
  - title: "GitHub Process"
    link:  "/community/handbook/github-process"
    desc:  "Consistent PRs and labels streamline CI across Meshery repositories."
  - title: "FAQs"
    link:  "/community/handbook/faq"
    desc:  "Find answers to common questions about Meshery and contributing."
  - title: "GitHub Organization Membership"
    link:  "/community/handbook/github-org-membership"
    desc:  "Consistent contributors may receive invitations to Meshery GitHub orgs."
---

<div class="handbook">
  {% for card in page.cards %}
  <div class="card" onclick="location.href='{{ card.link }}'">
    <h3>{{ card.title }}</h3>
    <p class="small">{{ card.desc }}</p>
    <div class="read-more">Read More ></div>
  </div>
  {% endfor %}
</div>
