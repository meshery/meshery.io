---
title: "Celebrate Your Wins with Meshery Milestones"
author: Test
date: 2025-06-11
categories:
  - community
  - meshery
featured-image: /assets/images/posts/2025-3-25-meshery-reaches-7000-stars/meshery-reaches-7000-stars.png # TODO: change the cover image
redirect_from: /blog/meshery-milestones
---

Open source thrives on community. Every pull request, tutorial, or design you create contributes to the project's success and it doesn't go unnoticed. That's why the Meshery community built the [meshery/meshery-milestone](https://hub.docker.com/r/meshery/meshery-milestone) Docker image: a simple web app designed to recognize your milestones.

With this Docker image, you can easily spin up the milestone application, visually celebrate your accomplishments, and let everyone know about your contributions to Meshery's projects. 
<!-- write a longer introduction, don't break user readibility/flow  -->

## 1. Installing the Meshery Milestones Image

You'll find the image under <a href="https://hub.docker.com/r/meshery/meshery-milestone">meshery/meshery-milestone</a>, maintained by the Meshery community.

It's a simple app to encourage and recognize the milestones of Meshery users and contributors.

#### 1. Download the image
```
docker pull meshery/meshery-milestone
```

#### 2. Start the container
```
docker run -d -p 8080:80 meshery/meshery-milestone
```

Then open your browser to:

```
http://localhost:8080
```
You’ll land on a warm “Congratulations!” screen inviting you to claim your badge.

<p align="center">
  <img src="/assets/images/posts/2025/meshery-milestones/meshery-milestones-app-running.png" alt="Docker Hub: meshery/meshery-milestone" style="max-width:600px; width:100%" />
</p>

## How to claim these badges?

We offer badges to contributors, new and seasoned alike, with each badge awarded upon meeting specific milestones. For instance, you can earn the **Design Pioneer** badge by creating your first Meshery design, or the **Continuous Contributor** badge by regularly contributing to the community over time.

With the Design Pioneer badge, you can proudly say that you've embraced Meshery’s visual tools and left complex YAML behind.

## More Badges to Earn!

Meshery recognizes various other significant milestones:

- **1. Code Cleanup Crew**: Celebrating those who improve code clarity and quality.
- **2. Security Sentinel**: Earned by those who identify or fix security vulnerabilities.
- **3. Longevity Legend**: Recognizes sustained contributions to Meshery over time.

Every badge highlights your dedication, skills, and growing expertise, valuable additions to your professional profile.

## Share Your Achievements

Your hard work deserves to be celebrated publicly. 

Share it on Social Media and tag us [@mesheryio](https://x.com/mesheryio) on X or [Meshery](https://www.linkedin.com/showcase/meshery/posts/) on Linkedin. Wear it proudly on your GitHub or Linkedin! 

We genuinely look forward to celebrating many more of your contributions and awarding you new badges soon 🎉

## What's next?

Keep your momentum up by following these guides and tutorials, and earn some more badges!

- [1. Exploring Kubernetes Pods with Meshery](https://docs.meshery.io/guides/tutorials/kubernetes-pods)
- [2. Deploy an Azure Storage Account with Meshery](https://docs.meshery.io/guides/tutorials/deploy-azure-storage-account-with-meshery)
- [3. Create your own Model](https://docs.meshery.io/guides/configuration-management/creating-models)

Now, keep celebrating your wins, one badge at a time. Your journey in open source just got a whole lot brighter!

Happy building! 🧑‍💻 🎉
---