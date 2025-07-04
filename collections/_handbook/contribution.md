---
title: "Contribution"
layout: "page"
permalink: "/community/handbook/contribution"
description : "Pull requests are the best way to propose changes. Learn our GitHub Flow."
---
---
## Introduction
<div style="text-align: left;">
<p>
Meshery is written in Go (Golang) and leverages Go Modules. UI is built on React and Next.js. To make building and packaging easier a Makefile is included in the main repository folder.

Relevant coding style guidelines are the Go Code Review Comments and the Formatting and style section of Peter Bourgon’s Go: Best Practices for Production Environments.

Please note: All make commands should be run in a terminal from within the Meshery’s main folder.
</p>
</div>
--- 

## Prerequisite
1. Go version 1.23 must be installed if you want to build and/or make changes to the existing code. The binary go1.23 should be available in your path. If you don't want to disturb your existing version of Go, then follow these [instructions to keep multiple versions](https://go.dev/doc/manage-install) of Go in your system.
2. GOPATH environment variable should be configured appropriately
3. npm and node should be installed on your machine, `node` version 19 or higher is not supported right now.
4. golangci-lint should be installed if you want to test Go code, for MacOS and linux users.


---


## General contribution flow
<div style="text-align: left">
<p>
Pull requests (PRs) are the best ways to propose changes to a project repository. At Meshery, we use the Github Flow:
</p>
</div>

##  1. Clone your fork to your local machine

- Fork the Meshery repository . 
- Go to your GitHub account, open the forked repository, click on the code button and then click the “copy to - clipboard” icon if you intend to use a command-line tool.
- Open the terminal and run the following git command:
<div class="highlight-code">
<code id="git-clone" class="code-box" style="white-space:pre-wrap;">git clone "URL you copied from the clipboard."</code>
{% include copy-to-clipboard.html clipboard_target="#git-clone" clipboard_text="git clone 'URL you copied from the clipboard.' " %}
</div>


<div class="highlight-code">
  <code id="meshery" class="code-box" style="white-space:pre-wrap;">git clone https://github.com/&lt;UserName&gt;/meshery.git</code>
  {% include copy-to-clipboard.html clipboard_target="#meshery" clipboard_text="git clone https://github.com/<UserName>/meshery.git" %}
</div>

##  2. Add 'upstream' repo to list of remotes

- Keeping your fork up to date while this isn't a necessary step. If you plan on doing anything more than a tiny quick fix, you'll want to make sure you keep your fork up to date by tracking the original "upstream" repo that you forked earlier.
- To do this, you'll need to add a remote. An example of the command is given below:

<div class="highlight-code">
<code id="git-upstream" class ="code-box" style="white-space:pre-wrap;">git remote add upstream https://github.com/meshery/meshery.git </code>
 {% include copy-to-clipboard.html clipboard_target="#git-upstream" clipboard_text="git remote add upstream https://github.com/meshery/meshery.git" %}
 </div>

##  3. Create and checkout a new branch

- Whenever you begin to work on a new feature or bugfix, it's important that you create a new branch. Not only is it a proper git workflow, but it also keeps your changes organized and separated from the master branch so that you can easily submit and manage multiple pull requests for every task completed.
- Perform the flow:

<div class="highlight-code">
<code id="git-branch-name" class ="code-box" style="white-space:pre-wrap;">git checkout -b your-new-branch-name   </code>
 {% include copy-to-clipboard.html clipboard_target="#git-branch-name" clipboard_text="git checkout -b your-new-branch-name" %}
 </div>

##  4. Make the necessary changes to your file.

- To add the changes you have made to your branch, use:

<div class="highlight-code">
<code id="git-add" class ="code-box" style="white-space:pre-wrap;">git add . </code>
 {% include copy-to-clipboard.html clipboard_target="#git-add" clipboard_text="git add ." %}
 </div>

If you add multiple file changes to the branch, you simply use:
```git add <file>```

##  5. Commit the changes made
- Now commit those changes using the git commit command:

<div class="highlight-code">
<code id="git-commit" class ="code-box" style="white-space:pre-wrap;">git commit -s -m “This is my commit message”</code>
 {% include copy-to-clipboard.html clipboard_target="#git-commit" clipboard_text="git commit -s -m 'This is my commit message'" %}
 </div>


##  6. Make sure to Sign-off on your Commits 

- To contribute to this project, you must agree to the Developer Certificate of Origin (DCO) for each commit you make. The DCO is a simple statement that you, as a contributor, have the legal right to contribute. You can refer this [page](https://docs.meshery.io/project/contributing#general-contribution-flow)


**To signify that you agree to the DCO for contributions, you simply add a line to each of your git commit messages:**

<div class="highlight-code">
<code id="git-signoff-text" class ="code-box" style="white-space:pre-wrap;">Signed-off-by: Jane Smith <jane.smith@example.com></code>
 {% include copy-to-clipboard.html clipboard_target="#git-signoff-text" clipboard_text="Signed-off-by: Jane Smith <jane.smith@example.com>" %}
 </div>

**In most cases, you can add this signoff to your commit automatically with the -s or --signoff flag to git commit. You must use your real name and a reachable email address (sorry, no pseudonyms or anonymous contributions). An example of signing off on a commit :**

<div class="highlight-code">
<code id="git-signoff-commit" class="code-box" style="white-space:pre-wrap;">git commit -s -m "my commit message w/signoff"</code>
 {% include copy-to-clipboard.html clipboard_target="#git-signoff-commit" clipboard_text="commit -s -m 'my commit message w/signoff' " %}
 </div>

**To ensure all your commits are signed, you may choose to add this alias to your global .gitconfig :**

<div class="highlight-code">
<code id="git-signoff-commit-global" class="code-box" style="white-space:pre-wrap;">[alias]
  amend = commit -s --amend
  cm = commit -s -m
  commit = commit -s</code>
 {% include copy-to-clipboard.html clipboard_target="#git-signoff-commit-global" clipboard_text="[alias] amend = commit -s --amend cm = commit -s -m commit = commit -s" %}
 </div>


Or you may configure your IDE, for example, Visual Studio Code to automatically sign-off commits for you:

<div style="max-width: 750px; overflow: auto; margin:0 auto;">
  <img src="/assets/images/contribution/git-signoff-vscode.webp" alt="Git Signoff VScode" style="width: 100%; height: auto;" />
</div>

##  7. Push changes to Github

- To push your changes, run the git command:

<div class="highlight-code">
<code id="git-push" class ="code-box" style="white-space:pre-wrap;">git push origin your_branch_name</code>
 {% include copy-to-clipboard.html clipboard_target="#git-push" clipboard_text="git push origin your_branch_name" %}
 </div>


##  8. Create a pull request (PR)

- Head over to your forked repository on GitHub and you'll see a Compare & pull request button. Click on that button.
Note: Please ensure that the right branch is selected for the PR.
<div style="max-width: 750px; overflow: auto; margin:0 auto;">
  <img src="/assets/images/contribution/compare-and-pr.webp" alt="Compare and PR" style="width: 100%; height: auto;" />
</div>



- Once you click on the button, you'll be taken to the Pull Request page. Here, you can add a title and description to your pull request that explains your contribution. Once you're done, click on the Create pull request button.

<div style="max-width: 750px; overflow: auto; margin:0 auto;">
  <img src="/assets/images/contribution/create-pr.webp" alt="Compare PR" style="width: 100%; height: auto;" />
</div>



---

## Handling PRs Made Without Being Assigned 
<div style="text-align: left">
<p>
At <a href="https://meshery.io/">Meshery</a>, we usually suggest to contributors that they ask maintainers to assign them to the issue they want to work on. But sometimes, pull requests that aren't assigned to anyone can be found. In such cases, it's important to be flexible and ready to adapt. Here are some simple guidelines for dealing with these unassigned contributions:
</p>
</div>

#### 1. We value getting things done:   

- Evaluate the PR: First, assess the quality and significance of the PR. Is it a valuable contribution to the project? Does it fix a bug or add a meaningful feature? If the PR aligns with the project's goals and standards, it's worth considering.

- Review the code: Ensure that the code in the PR meets the project's coding guidelines and standards. If the code quality is high and the changes are beneficial, it's a positive sign.

#### 2. We value our contributors' feelings:

- Communication: Reach out to the contributor who made the unassigned PR in a friendly and respectful manner. Express gratitude for their contribution and explain the importance of assigning PRs to maintain transparency and collaboration within the community.

- Offer assistance: If the contributor is willing, help them understand the process of assigning PRs and offer guidance on how to do it correctly in the future.

- Encourage participation: Emphasize that their contribution is valuable and that the project welcomes their involvement. Encourage them to continue contributing.

#### 3. Attempt to uphold the spirit of #2 while ensuring that #1 happens:

- Balance: Strive to strike a balance between maintaining a welcoming and inclusive community (#2) and ensuring that the project continues to make progress (#1).

- Collaboration: If the contributor is receptive and willing to work together, consider helping them assign the PR correctly, and possibly collaborate on improving the PR if necessary.

- If necessary, reassign: If the contributor is unresponsive or unable to assign the PR correctly, you may consider reassigning the PR to an appropriate contributor or assigning it to yourself to ensure it doesn't go unnoticed.

#### 4. Contributor Guidance:

- How you should: As a contributor, it's important to follow the project's guidelines. Start by identifying a suitable issue or create one if necessary. Afterward, kindly request assignment or express your interest in working on the issue by commenting on it. This ensures that maintainers are aware of your intentions and can provide guidance or assign the issue appropriately. Once assigned, proceed with your work and submit a pull request.


- How you should not: Avoid starting work on an issue and creating a pull request without prior communication or assignment. Jumping directly into the code can lead to misunderstandings and duplicate efforts. Instead, take a moment to engage with the maintainers and community by discussing your interest in the issue and seeking assignment before submitting a pull request. This promotes transparency and effective collaboration within the project.


- Requesting Reassignment: If you are interested in working on an issue that is already assigned to someone else, it's important to respect their efforts and contributions. First, politely reach out to the assignee and express your interest in collaborating on the issue. Discuss the possibility of working together or sharing the workload. If the assignee agrees or is open to collaboration, you can proceed. If the assignee is not responsive or there has been no progress on the issue for a long time and the issue aligns with your skills and interests, kindly request reassignment from the maintainers, providing a clear and courteous explanation for the request.



### Suggested Reading 

For more details on contributing to different meshery repositories you can follow this 
[Suggested Reading](https://docs.meshery.io/project/contributing#suggested-reading)



---


