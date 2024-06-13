---
title: "Multiple Organizations in Meshery"
subheading: Conveniently switch between organizations and workspaces in Meshery
date: 2024-06-01
author_contributor: Akshay Sharma
categories: 
  - Meshery
  - Cloud
permalink: /blog/organization-workspace-switcher
featured-image: /assets/images/posts/2024-06-01-organization-workspace-switcher/organization-workspace-switcher.png
---

Meshery facilitates organization and workspace management, enabling diverse architectural spaces to thrive. Within the Layer5 Cloud ecosystem, organizations form the bedrock of multi-tenancy, while Meshery Workspaces provide virtual arenas for collaborative team endeavors. Delve deeper into the intricacies of <a href="https://docs.layer5.io/cloud/identity/organizations/" target="_blank">organization</a> and <a href="https://docs.layer5.io/cloud/spaces" target="_blank">workspace</a>.


## Organization
In Meshery, organizations form the core of tenancy, grouping users effectively. These organizations host multiple teams, each accommodating various users. Users can belong to multiple teams and organizations. Teams play a key role in managing access to workspaces and their resources, enhancing efficiency and security.

<img alt="Org" src="/assets/images/posts/2024-06-01-organization-workspace-switcher/organization-units.svg" width="50%" align="right" />

## Workspaces
Workspaces empower collaboration with your teams, enabling resource control and activity tracking. Workspaces support multiple teams, with each team accommodating diverse users. Users have the flexibility to join multiple teams and organizations, fostering fluidity and efficiency in workflow management.


### Key Features
1. **Resource Sharing:** <small>Workspaces allow for resource sharing among team members, fostering collaboration.</small>
2. **Extension Possibilities:** <small>Remote Providers can extend Meshery for hierarchical organizations and user groups.</small>
3. **Resource Ownership:** <small>Organizations own all resources created by users, including Workspaces, Designs, Environments, etc.</small>
4. **Access Control:** <small>Workspaces allow you to control access to resources by granting permissions to users and teams.</small>

<div style="margin:10rem 0rem 5rem 0rem; border: 1px solid var(--color-secondary-dark);">
<div id="embedded-design-538d1bc7-ddd1-40f4-9ea6-4133799820d7" style="height:40rem; color:var(--color-secondary-dark);"></div>
<script src="/assets/images/posts/2024-06-01-organization-workspace-switcher/embedded-design-invite-based-loop.js" type="module" ></script>
</div>

We are now exposing the ability to switch between different organization and different workspace,this will enable users to :

- Different spaces have different level of restriction 
- Switch to an organization where they have the required permissions.

Try Meshery's new organization and workspace switcher in the [Meshery Playground](https://play.meshery.io) and [let us know what you think](https://meshery.io/subscribe)!

