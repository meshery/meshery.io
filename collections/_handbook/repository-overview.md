---
title: "Repository Overview"
layout: page
description: "Get a code-centric overview of collective community efforts."

frontend_projects:
  - site_url: "https://meshery.io"
    site_logo: "/assets/images/meshery-color.svg"
    alt: "Meshery Logo"
    project: "Meshery.io"
    framework: "Jekyll"
    maintainers: '<a href="/community/members/vivek-vishal">Vivek Vishal</a>'
    repo: "https://github.com/meshery/meshery.io"

  - site_url: "https://docs.meshery.io"
    site_logo: "/assets/images/meshery-color.svg"
    alt: "Meshery Logo"
    project: "Meshery Documentation"
    framework: "Jekyll"
    maintainers: '<a href="/community/members/vivek-vishal">Vivek Vishal</a>'
    repo: "https://github.com/meshery/meshery/tree/master/docs"

  - site_url: "https://github.com/meshery/meshery/tree/master/ui"
    site_logo: "/assets/images/meshery-color.svg"
    alt: "Meshery Logo"
    project: "Meshery UI"
    framework: "NextJS, React.js, MaterialUI and Billboard.js"
    maintainers: '<a href="/community/members/antonette-caldwell">Antonette Caldwell</a>, <a href="/community/members/aabid-sofi">Aabid Sofi</a>'
    repo: "https://github.com/meshery/meshery/tree/master/ui"

  - site_url: "https://play.meshery.io/"
    site_logo: "/assets/images/meshery-color.svg"
    alt: "Meshery Logo"
    project: "Cloud Native Playground"
    framework: "React.js"
    maintainers: '<a href="/community/members/sangram-rath">Sangram Rath</a>'
    repo: "https://github.com/meshery/play"

backend_repos:
  - site_logo: "/assets/images/meshery-color.svg"
    alt: "Meshery Logo"
    project: "Meshery"
    language: "Golang, gRPC"
    description: "The cloud native management plane to provide governance and backend system integration. Golang, gRPC, NATS, CloudEvents"
    maintainers: '<a href="/community/members/antonette-caldwell">Antonette Caldwell</a>, <a href="/community/members/uzair-shaikh">Uzair Shaikh</a>'
    repo: "https://github.com/meshery/meshery"

  - site_logo: "/assets/images/badges/meshery-operator.svg"
    alt: "Meshery Operator"
    project: "Meshery Operator"
    language: "Golang, Kubernetes Operator"
    description: "Meshery Operator is the multi-cloud native operator and implementation of MeshSync."
    maintainers: '<a href="/community/members/aisuko-li">Aisuko Li</a>'
    repo: "https://github.com/meshery/meshery-operator"

  - site_logo: "/assets/images/logos/meshsync.svg"
    alt: "MeshSync"
    project: "MeshSync"
    language: "Golang and NATS"
    description: "MeshSync is a multi-mesh resource discovery application which is also a custom Kubernetes controller."
    maintainers: '<a href="#">Vacant</a>'
    repo: "https://github.com/meshery/meshsync"

  - site_logo: "/assets/images/nav-icons/meshery-extensions.svg"
    alt: "Helm Kanvas Snapshot"
    project: "Helm Kanvas Snapshot"
    language: "Golang"
    description: "The Kanvas Snapshot Helm Plugin allows users to generate a visual snapshot of their Helm charts directly from the command line."
    maintainers: '<a href="#">Vacant</a>'
    repo: "https://github.com/meshery-extensions/helm-kanvas-snapshot"

  - site_logo: "/assets/images/nav-icons/meshery-extensions.svg"
    alt: "Kubectl Kanvas Snapshot"
    project: "Kubectl Kanvas Snapshot"
    language: "Golang"
    description: "A Kubectl Kanvas Snapshot is a native kubectl plugin designed to conveniently create a visual snapshot of the combination of multiple Kubernetes manifest files."
    maintainers: '<a href="#">Vacant</a>'
    repo: "https://github.com/meshery-extensions/kubectl-kanvas-snapshot"
---


# GitHub Organizations

A brief overview of the five GitHub organizations that make up the Meshery community.

<ul>
  <li><strong><a href="https://github.com/meshery">Meshery</a></strong> – Core Meshery components like MeshSync and Meshery Operator.</li>
  <li><strong><a href="https://github.com/meshery-extensions">Meshery Extensions</a></strong> – Extensions and plugins that expand Meshery’s functionality.</li>
</ul>

---
<style>
  .icon {
    height: 32px;
    width: auto;
    max-width: 100%;
    display: inline-block;
    vertical-align: middle;
  }
</style>

# Frontend Projects

<div class="talks-and-presentations">
<table>
  <thead>
    <tr class="talks-table-row">
      <th>Site</th>
      <th>Project</th>
      <th>Framework</th>
      <th>Maintainers</th>
      <th>Repo</th>
    </tr>
  </thead>
  <tbody>
    {% for p in page.frontend_projects %}
    <tr class="talks-table-row">
      <td ><a href="{{ p.site_url }}"><img src="{{ p.site_logo }}" class="icon" alt="{{ p.alt }}"></a></td>
      <td>{{ p.project }}</td>
      <td>{{ p.framework }}</td>
      <td>{{ p.maintainers }}</td>
      <td><a href="{{ p.repo }}"><img src="/assets/images/github-white.svg" class="icon" alt="GitHub Repo"></a></td>
    </tr>
    {% endfor %}
  </tbody>
</table>
</div>

# Backend Projects

<div class="talks-and-presentations">
<table>
  <thead>
    <tr class="talks-table-row">
      <th>Project</th>
      <th>Language</th>
      <th>Description</th>
      <th>Maintainers</th>
      <th>Repo</th>
    </tr>
  </thead>
  <tbody>
    {% for r in page.backend_repos %}
    <tr class="talks-table-row">
      <td><img src="{{ r.site_logo }}" class="icon" alt="{{ r.alt }}"> {{ r.project }}</td>
      <td>{{ r.language }}</td>
      <td>{{ r.description }}</td>
      <td>{{ r.maintainers }}</td>
      <td><a href="{{ r.repo }}"><img src="/assets/images/github-white.svg" class="icon" alt="GitHub Repo"></a></td>
    </tr>
    {% endfor %}
  </tbody>
</table>
</div>