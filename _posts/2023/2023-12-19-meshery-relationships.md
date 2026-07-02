---
date: 2023-12-17 13:00:00 +0000
title: "Meshery Relationships: AWS RDS DBCluster and IAM Roles"
subheading: Context-aware design with Meshery
author: Lee Calcote
categories:
  - relationships
  - extensibility
featured-image: /assets/images/posts/2023/2023-12-08-graphql-and-rest-apis/meshery-apis.jpeg
redirect_from: /blog/unleashing-power-and-flexibility-the-synergy-of-rest-and-graphql-in-meshery
published: false
---
Question:

"How do RDS DBCluster and IAM Roles relate to one another? How do I reference an IAM Role from an RDS DBCluster resource?"

An RDS DBCluster allows you to group database instances for high availability and scalability. You can reference an IAM role from a DBCluster to control access to the DBCluster and its associated resources.

When you create a DBCluster, you specify an IAM role that the DBCluster's instances will assume. This allows the instances to access other AWS services and resources that the role has permissions for. For example, you may grant the role permissions to write logs to CloudWatch Logs.

The key things to know about IAM roles in RDS are:

1. An IAM role provides permissions for the DBCluster's instances to access other AWS services, without having to use long-term access keys in the instances.

2. You specify the role to use when creating the DBCluster. The instances will then assume this role.

3. The role should allow the `rds.amazonaws.com` service principal to assume the role. This allows the instances to assume the role.

Managing permissions by attaching policies to the IAM role provides a centralized way to control access for all instances in the DBCluster. You can also use IAM policies to control access to the DBCluster itself. For example, you can use an IAM policy to allow a user to create a DBCluster, but not delete it. For more information, see [Controlling Access with Amazon RDS Identity-Based Policies](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.IAMPolicy.html). 

For more information about IAM roles, see [Using Identity-Based Policies (IAM Policies) for Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAM.html).

For more information about DBClusters, see [Amazon RDS DB Clusters](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_MySQL.html#MySQL.Concepts.DBInstance.Classes).

For more information about the `rds.amazonaws.com` service principal, see [Amazon RDS Service-Linked Role Permissions](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAM.Permissions.SLR.html).
