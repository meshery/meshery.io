---
title: Meshery CLI - Commands for Organization, Connections and Workspace Management
subheading: Managing organizations, connections and workspaces via mesheryctl
author: Aadhitya Amarendiran
date: 2025-10-31 08:00:00 -0500
categories:
    - mesheryctl
redirect_from: /blog/2025-10-31-mesheryctl-new-cmds-org-workspace
---

Introducing new `mesheryctl` commands that enhance organization and workspace management capabilities. These commands empower users to efficiently manage their Meshery organizations and workspaces directly from the command line.

Whether you’re just getting started with Meshery or expanding collaboration across teams, these experimental commands bring day-to-day actions—like listing organizations, creating workspaces, and managing connections—into a consistent CLI workflow.

### What you’ll find in this blog post:
- A quick primer to understand more about Organizations, Workspaces and Connections in Meshery.
- Step-by-step usage for each command with examples.
- Notes, tips, and troubleshooting guidance to avoid common pitfalls.

Note on stability: All commands in this post are currently experimental. Behavior and output formats may change as the features mature.

### Quick primer (terminology)
- Organization: Your Meshery Cloud tenant. Users belong to one or more organizations.
- Workspace: A collaboration area within an organization. Use workspaces to group Designs, Environments, teams, or projects.
- Connection: An integration endpoint (for example, Kubernetes clusters or Meshery platforms) associated with your Meshery profile.

### Prerequisites
- `mesheryctl` installed and configured.
- Logged in to Meshery Cloud with access to at least one organization.
- Appropriate permissions in the target organization to list and/or create resources.

Tip: If a command fails with “unauthorized” or “forbidden,” verify that you are logged in with the correct account and that your role in the organization allows the requested action.

## Connection

`connection` command helps users to view and manage Meshery connections with respect to the user's profile in Meshery. This command is currently in `experimental` mode. Using this command, one can view the number of connections associated with their profile in Meshery and can delete unused connections if present. To know more info about Meshery connections concept in general, please refer to [Connections in Meshery](https://docs.meshery.io/concepts/logical/connections)

### Base command syntax:
```
mesheryctl exp connections
```

Current available subcommands present are: delete and list.
delete - This subcommand is used to delete a connection in Meshery
list - List all available Meshery connections

Flags available: 
-c,--count - To display total number of available connections 

Examples:
For listing connections:
```
> mesheryctl exp connections list --count
Total number of connections: 5
Page: 1
ID                                    NAME                     TYPE      KIND        STATUS
b0122ae9-...  in-cluster               platform  kubernetes  connected
467fd193-...  meshery-shocker-0        platform  meshery     connected
b481abd6-...  meshery-m.o.d.o.k.-3     platform  meshery     connected
4d51bff0-...  kubernetes-meshfusion-3  platform  kubernetes  not found
a85478df-...  meshery-sentinel-1       platform  meshery     connected
```

For deleting a connection:
```
> mesheryctl exp connections delete 22xg3…
Connection deleted
```

### Notes and tips:
- “not found” status usually indicates the target system is no longer reachable. Consider removing such connections.
- Deleting a connection cannot be undone. Ensure the ID is correct before deleting.
- If you manage multiple environments, run list regularly to keep connections tidy.

### Troubleshooting:
- “resource not found”: Verify the connection ID from the latest list output.
- “forbidden” or “unauthorized”: Confirm your Meshery login and account permissions.

## Organization

`organization` command allows users to view organizations which they are part of in the Meshery Cloud. This command is in `experimental` mode and users can currently view the organizations they are in as a member.

### Base syntax:
```
mesheryctl exp organization
```

### Available subcommands:
list - List all organizations that user is part of in Meshery Cloud

Example:
```
> mesheryctl exp organization list
Total number of organizations:2
Page: 1
NAME     	ID                  CREATED-AT
Meshery  	c5ada327-...  		2025/September/10
XYZ 		ce8a571e-...  		2024/August/19
```

### Notes and tips:
- If you expect to see an organization but don’t, ask an admin to confirm your membership.
- Use the organization ID from this list when creating or listing workspaces.

### Troubleshooting:
- “no organizations found”: Confirm that your Meshery account is connected to Meshery Cloud and that you’ve been invited to an organization.

## Workspaces

`workspace` command allows users to create workspaces within an organization which can act as a hub for teams to work and collaborate in Meshery. Workspaces are useful to organize project-based work or to create domains of responsibility for your teams or segregate Designs and Environments and track team activity. 

Currently, this command is in `experimental` mode and users can create workspaces in the organisation they are in, list workspaces present. For more info about workspaces in Meshery, please refer to [Workspaces in Meshery](https://docs.meshery.io/concepts/logical/workspaces). 

### Base command:
```
mesheryctl exp workspace
```

Available subcommands:
create - Create a workspace within an organization in Meshery
list - List all available workspaces present within an organization in Meshery

Example:
To list workspaces in an organization:
```
> mesheryctl exp workspace list --orgId ce8ffxe-...
Total number of workspaces:3
Page: 1
ID                                    NAME        DESCRIPTION
9a21b6e1-...  platform-team  Platform engineering workspace
b77c19f9-...  test-1         Test workspace
c05a3c3a-...  staging        Staging experiments
```

To create a workspace in an organization:
```
> mesheryctl exp workspace create --orgId ce8ffxe-... --name test-1 --desc "Test workspace"
Workspace created: test-1
```

### Notes and tips:
- Workspace names should be clear to your team (for example, “platform-team” or “payments-observability”).
- Use the organization ID from the Organization section to scope workspace operations.
- If creation fails, confirm you have permissions to create resources in the target organization.

### Troubleshooting:
- “invalid orgId”: Copy the ID exactly as shown in organization list output.
- “workspace already exists”: Choose a unique name or delete the existing workspace if appropriate.

NOTE: These commands are evolving. Share feedback, report issues, and help improve the experience so teams can collaborate more effectively in Meshery.
