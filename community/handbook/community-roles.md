# Meshery Community Leadership Roles

A leader is someone who contributes to the Meshery Community’s growth by faithfully upholding one of the responsibilities outlined in the roles below.

---

## Community Manager

**Meshery Community Managers** generally oversee community activities and support ongoing initiatives. They are responsible for the health and growth of the community. Community Managers cultivate an environment which attracts new community members by ensuring that timely and completed responses are provided to questions asked. Community Managers work to ensure that existing community members are retained by helping those members stay engaged in projects on an ongoing basis. Aspects of marketing including member and project promotion as well as aspects of project management by organizing meetings and triaging issues are under the purview of Community Managers.

A Community Manager is a person who has an innate drive to contribute to the community's prosperity. A community manager serves as a link between the organisation and its community, overcoming obstacles as they arise—or even before they arise!—by collaborating with other departments and the community to find solutions that benefit the entire community.

Role:

- Moderating, engaging, and supporting community members on platforms like Slack, GitHub etc.
- Building healthy relationships among community members.
- Celebrating community successes, sending swag, and recognizing top contributors.
- Regularly updating the community on the metrics performance.
- Creating and managing new community programs.
- Organizing meetups, events, and other engagements.
- Coordinating with other departments—such as product, engineering, and content marketing—to support community initiatives.

**Responsibilities of Community Managers**

The responsibilities of a Community Manager involves building, stewarding, and organizing the Meshery Community.

### Daily:

1. Issue Triage on GitHub (Issue squatters)
   1. Make use of `issue/remind` and `issue/dco`.
   2. Issue squatters are to be politely, but briskly brushed aside.
   3. Remove assignment if not response from the assignee.

### Weekly:

2. Assess as a candidate for GitHub org invitation.
   1. Make use of `issue/invite` (on issues only, not PRs).
3. Assess as a candidate for community member profile.
   1. See sample message.
4. Weekly evaluation and nomination of community members for the next step in the contributor ladder.
5. Review Community Members spreadsheet.
   Identify members that need extra attention.

### Monthly:

1. Assess each community member profile for transition to inactive.Use a period of two months of inactivity as the metric.
2. Monthly evaluation of Social sharing and SEO tracker:
   - **Twitter accounts:**
     - Rate of new followership
     - Month-over-month count of followers
   - **LinkedIn accounts:**
     - Competitive comparison: total count, current month (new follower rate) and historical (rate)
   - **MailChimp:**
     - Rate of new subscribers vs unsubscribers
     - Most popular content
     - Click rate
3. Monthly evaluation of DevStats
4. Orbit: Evaluation
   - Slack integration for Orbit?
5. Every week on Thursday at 8:30 pm | 10:00 am CT - meeting and minutes.
6. Event management

- Workshops, Webinars, Conferences
- CFPs

7. Reset the Slack invitation on slack.meshery.io.

- Visit: [slack.meshery.io](https://slack.meshery.io)
- Deactivate old link, create new one.
- Update: [Meshery Slack index.html](https://github.com/meshery/slack/blob/master/index.html)

---

## MeshMate

**Role**
**MeshMates** is a community member onboarding and mentoring program. MeshMates are committed to helping community members be successful contributors. MeshMates aid in identifying areas of projects to engage within, working groups to join, and in helping community members grow in their open source and cloud native knowledge. By connecting one-on-one, MeshMates will share tips on how to have the best community experience possible.

The role of the **Community Manager** and the **MeshMate** are intertwined. It is not uncommon for an individual to be both a Community Manager and a MeshMate. The role of a Community Manager involves stewarding, building, and organizing the Meshery Community. MeshMates are committed to helping community members be successful contributors. MeshMates aid in identifying areas of projects to engage within, working groups to join, and helping community members grow in their open-source and cloud-native knowledge. By connecting one-on-one, MeshMates will share tips on how to have the best community experience possible.

- Promote community awareness.
- Assist new contributors.
- Provide resources and project guidance.
- Facilitate newcomer calls.
- Mentoring members of the community.

## Maintainer

**Maintainers** are those who are responsible for managing the growth and performance of the project. They are incharge of the project's wellbeing, reviewing and merging the PR, updating the libraries and dependencies in that project, monitoring the codebase and so much more.

- Send a reminder about meetings
- Prepare meetings
- Lead meetings
- Make sure meeting minutes are kept
- Facilitate the creation and advancement of metrics/software
- Answer questions about the progress of Meshery projects
- Report on weekly community call progress on a project
- Review issues on the repository
- Review and merge pull requests
- Regularly check the repository for stale content
- Monitor issue tracker and pull requests

---

### Checklist Before Becoming a Maintainer

- [ ] Makes consistent contributions within the Meshery community
- [ ] Has the ability to commit directly to a project repository
- [ ] Holds knowledge of Meshery project performance and software
- [ ] Attends community meetings
- [ ] Holds good knowledge in helping others achieve their goals
- [ ] Has knowledge of Git and GitHub
- [ ] Understands the workflow of the Issues and Pull Requests

---

## Release Manager

The role of release manager for a release lasts a total of about 6 months. This is divided up among activities before the initial release comes out and activities after the initial release while the release is within active maintenance. The majority of the time is spent in the month before the first release. After that, there is 6 months of time during which point releases come out on approximately a 3 week cycle. During three of these months, the release manager is working on the latest release. This 6 month time period is divided into two sections. In the first three months, this is the primary release and all fixes get cherry-picked from master here. After 3 months, the next release of the Meshery project comes out and there are three more months of support before this release goes to the end of life.

#### Before Release

- Cutting branches -- 8 to 16 hours divided between all release managers. Working on automating. Will still take a while with automation, probably around half a day. With automation, a lot of the time will be waiting for automated steps to complete as opposed to being directly involved.
- Testing days -- 8 to 16 hours divided between all release managers spread over two weeks in order to orchestrate the testing events. This does not include any time that the release managers additionally devote to picking up and testing individual tests.
- Managing spreadsheets
- Prioritization
- Chasing people to get things done
- Prioritization of issues in step with workgroups
- Release management meetings -- 45 minutes to 1 hour every week for each release manager. Increases as the release gets closer.
- Release notes/upgrade notes for point release -- 1 week for of the release managers as well as reviewing from other release managers
- Code reviews from docs team as well as workgroup leads
- Generation of release notes using automated tooling
- Updating release notes to make them more readable
- Announcement of release on Twitter/Discuss/Slack -- 5 minutes for one release manager for Discuss/Slack. For Twitter, reach out to someone with access.

#### Ongoing

- Watching for release blockers - part of the code review process. Wouldn't say it needs additional time
- Code reviews/deciding whether to accept cherry picks -- about an hour per day for each release manager. Ramps up just before the initial release. Ramps down to an hour per week towards the EOL for a release
- Minor release every 3 weeks.
- Release notes - 1 hour for a single release manager
- Creating releases - 8 hours spread across all release managers. Most of this is automated (i.e. update proxy and then wait for tests to complete, trigger a build and wait for tests to complete)
- 48 hour testing -- this involves requesting those who run the tests to trigger the tests and waiting for 48 hours. There is very little needed from a release manager other than checking in to make sure everything is working well
- Handle vulnerability fix integration in step with product security workgroup -- approximately 3 patch releases -- for private security releases, release managers are responsible for coordinating a flush release to get all fixes before the security fix out as well as ensuring they don't accept patches until the release is out. Most of the additional release related work is taken care of by the security fix lead although the release managers are expected to review release notes, build PRs, and other related content. The flush release takes about the same amount of time as a regular release.
- Meshery build and release meetings -- one hour per release manager per week
- End Of Life for release -- 8 hours

### Qualifications for Release Manager

- A member of the Meshery community and active for the last 3 months
- Approved by a majority vote of current maintainers
- At least one release manager for each version needs to meet requirements for access info in case of vulnerabilities

---

### Process for Volunteering for Release Management

- Contact a current maintainer to volunteer or nominate yourself

---

### GitHub Czar

**Role:**  
The GitHub Czar is a GitHub-focused role within the Meshery community responsible for keeping the organization’s GitHub repositories well-maintained, active, and contributor-friendly. This role exists as a specialized extension of the Community Manager role and works closely with maintainers and community leaders to support the technical and collaborative health of Meshery's GitHub ecosystem.

GitHub Czars ensure that issues and pull requests are actively triaged, contributors are appropriately engaged, and the repositories reflect up-to-date, community-driven activity.

---

### Responsibilities

#### Daily / Ongoing

- Triage GitHub Issues: Apply labels such as `issue/remind`, `issue/dco`, `good-first-issue`; close outdated or duplicate issues
- Monitor Issue Assignees: Gently remind inactive assignees and reclaim issues after ~7–10 days
- Review Pull Requests: Perform initial checks and tag reviewers/maintainers
- Enforce Contribution Standards: Ensure compliance with DCO, PR templates, and commit guidelines
- Bump Off Squatters: Use labels/comments to reclaim blocked or inactive issues

#### Weekly

- Contributor Engagement: Highlight contributors, recommend org invitations, and thank new contributors
- Support Issue Curation: Maintain `help-wanted`, `good-first-issue`, and project boards
- Identify Gaps: Escalate repo health concerns like outdated PRs, untested code, etc.

---

### Checklist Before Becoming a GitHub Czar

- [ ] Makes consistent contributions within the Meshery community
- [ ] Has strong technical proficiency in software development and code review
- [ ] Understands GitHub workflows, issue triage, and pull request management
- [ ] Demonstrates good communication skills with technical and non-technical contributors
- [ ] Familiar with Meshery contribution guidelines and community standards

---

> This document outlines the evolving leadership roles within the Meshery Community. For updates and participation, visit the [Meshery GitHub organization](https://github.com/meshery).
