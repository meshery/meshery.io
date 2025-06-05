---
layout: page
title: Community Handbook
permalink: /community/handbook
description: Explore the Meshery Community!
cards:
  - title: "About"
    link:  "/about"
    icon:  "/assets/images/About.svg"
    desc:  "Meshery offers cloud native application management by harnessing the power of a developer-friendly applications management system."
  - title: "Code of Conduct"
    link:  "/community/code-of-conduct"
    icon:  "/assets/images/Conduct.svg"
    desc:  "We follow the CNCF Code of Conduct and pledge to respect all contributors."
  - title: "Community"
    link:  "/community"
    icon:  "/assets/images/Community.svg"
    desc:  "A MeshMate will guide you as you explore Meshery projects and areas of interest."
  - title: "Connect with Us"
    link:  "/community/connect"
    icon:  "/assets/images/Connect.svg"
    desc:  "Join our Slack workspace and interact with a thousand like-minded members."
  - title: "Community Roles"
    link:  "/community/roles"
    icon:  "/assets/images/Roles.svg"
    desc:  "See the many ways you can participate in decision-making and accountability."
  - title: "Contribution"
    link:  "/community/contribution"
    icon:  "/assets/images/Contribution.svg"
    desc:  "Pull requests are the best way to propose changes. Learn our GitHub Flow."
  - title: "Learning"
    link:  "/community/learning"
    icon:  "/assets/images/Learning.svg"
    desc:  "Access curated resources to learn cloud-native infrastructure."
  - title: "Mentorship Programs"
    link:  "/community/mentorship"
    icon:  "/assets/Mentorship.svg"
    desc:  "Explore the mentorship programs Meshery participates in and how to join."
  - title: "Projects"
    link:  "/projects"
    icon:  "/assets/images/Project.svg"
    desc:  "Meshery projects: Meshery, Service Mesh Performance, NightHawk, and more."
  - title: "Recognition"
    link:  "/handbook/recognitions"
    icon:  "/assets/images/nav-icons/Recognition.svg"
    desc:  "Meshery publicly recognizes and appreciates its contributors."
  - title: "Repository Overview"
    link:  "/community/repository-overview"
    icon:  "/assets/images/Overview.svg"
    desc:  "Get a code-centric overview of collective community efforts."
  - title: "Security Vulnerabilities"
    link:  "/community/security"
    icon:  "/assets/images/Security.svg"
    desc:  "Report Meshery security issues responsibly — we investigate every report."
  - title: "GitHub Process"
    link:  "/community/github-process"
    icon:  "/assets/images/Github.svg"
    desc:  "Consistent PRs and labels streamline CI across Meshery repositories."
  - title: "FAQs"
    link:  "/community/faq"
    icon:  "/assets/images/FAQ.svg"
    desc:  "Find answers to common questions about Meshery and contributing."
  - title: "GitHub Organization Membership"
    link:  "/community/github-org-membership"
    icon:  "/assets/images/Membership.svg"
    desc:  "Consistent contributors may receive invitations to Meshery GitHub orgs."
---

<div class="meshery-card-grid">
  {% for card in page.cards %}
    <div class="meshery-card" onclick="location.href='{{ card.link }}'">
      <div class="meshery-card-notch">
        <img src="{{ card.icon }}" alt="{{ card.title }}" />
      </div>
      <div class="meshery-card-body">
        <div class="meshery-card-title">{{ card.title }}</div>
        <div class="meshery-card-desc">{{ card.desc }}</div>
      </div>
    </div>
  {% endfor %}
</div>

<style>
.meshery-card-grid {
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 285px));
  gap: 2.2rem;
  margin: 2.2rem 0 3.2rem 0;    
}

.meshery-card {
  position: relative;
  border-radius: 2rem;
  background: linear-gradient(135deg, #184140 0%, #00e7cb 100%);
  box-shadow: 0 4px 28px 0 #00b39f22, 0 1.5px 8px #0003;
  color: #fff;
  min-height: 185px;
  padding: 2.1rem 1.25rem 1.25rem 1.25rem;
  cursor: pointer;
  overflow: visible;
  display: flex;
  align-items: flex-start;
  transition:
    box-shadow 0.26s cubic-bezier(.28,1.36,.71,.96),
    transform 0.22s cubic-bezier(.48,1.23,.49,.96),
    background 0.28s;
}
.meshery-card:hover,
.meshery-card:focus-within {
  background: linear-gradient(135deg, #00e7cb 10%, #184140 100%);
  box-shadow: 0 12px 42px #00b39f55, 0 5px 24px #0005;
  transform: translateY(-8px) scale(1.037);
  z-index: 2;
}

.meshery-card-notch {
  position: absolute;
  top: 0;
  left: 0;
  width: 62px;
  height: 62px;
  background: #00b39f;
  border-radius: 2rem 0 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-15%, -15%);
  box-shadow: 0 4px 18px #00b39f44;
  z-index: 4;
}
.meshery-card-notch img {
  width: 34px;
  height: 34px;
  filter: drop-shadow(0 0 7px #fff8) brightness(1.19);
  transition: filter 0.26s, transform 0.22s;
}

.meshery-card:hover .meshery-card-notch img,
.meshery-card:focus-within .meshery-card-notch img {
  filter: drop-shadow(0 0 16px #fff) brightness(2.2);
}

.meshery-card-body {
  margin-left: 58px;
  margin-top: 12px;
  flex: 1;
  min-width: 0;
}
.meshery-card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
}
.meshery-card-desc {
  font-size: 1rem;
  color: #d1fff8;
}
</style>
