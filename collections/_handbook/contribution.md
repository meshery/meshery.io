---
title: "Contribution"
layout: "page"
permalink: "/community/handbook/contribution"

link: "assets/images/contribution/git-signoff-vscode.webp"
icon: "https://layer5.io/static/gsod-bdae86e80935b6dc17caa4239c795ecc.webp"

---



### Introduction

Meshery is written in Go (Golang) and leverages Go Modules. UI is built on React and Next.js. To make building and packaging easier a Makefile is included in the main repository folder.

Relevant coding style guidelines are the Go Code Review Comments and the Formatting and style section of Peter Bourgon’s Go: Best Practices for Production Environments.

Please note: All make commands should be run in a terminal from within the Meshery’s main folder.
### Prerequisite
1. Go version 1.23 must be installed if you want to build and/or make changes to the existing code. The binary go1.23 should be available in your path. If you don't want to disturb your existing version of Go, then follow these instructions to keep multiple versions of Go in your system.
2. GOPATH environment variable should be configured appropriately
3. npm and node should be installed on your machine, `node` version 19 or higher is not supported right now.
4. golangci-lint should be installed if you want to test Go code, for MacOS and linux users.


# General contribution flow
Pull requests (PRs) are the best ways to propose changes to a project repository. At Meshery, we use the Github Flow:


### 1.Clone your fork to your local machine

- Fork the Meshery repository . 
- Go to your GitHub account, open the forked repository, click on the code button and then click the “copy to - clipboard” icon if you intend to use a command-line tool.
- Open the terminal and run the following git command:

```bash
 git clone “URL you copied from the clipboard.” 
 ```  



 Example : ``` git clone https://github.com/<UserName>/meshery.git ```


### 2.Add 'upstream' repo to list of remotes

- Keeping your fork up to date while this isn't a necessary step. If you plan on doing anything more than a tiny quick fix, you'll want to make sure you keep your fork up to date by tracking the original "upstream" repo that you forked earlier.
- To do this, you'll need to add a remote. An example of the command is given below:

```bash
git remote add upstream https://github.com/meshery/meshery.git 
```

### 3.Create and checkout a new branch

- Whenever you begin to work on a new feature or bugfix, it's important that you create a new branch. Not only is it a proper git workflow, but it also keeps your changes organized and separated from the master branch so that you can easily submit and manage multiple pull requests for every task completed.
- Perform the flow:

```bash
git checkout -b your-new-branch-name   
```

### 4.Make the necessary changes to your file.

- To add the changes you have made to your branch, use:

```bash
git add . 
```

If you add multiple file changes to the branch, you simply use:
```git add <file>```

### 5.Commit the changes made
- Now commit those changes using the git commit command:

```bash 
git commit -s -m “This is my commit message”
```
### 6.Make sure to Sign-off on your Commits (Developer Certificate of Origin)

To contribute to this project, you must agree to the Developer Certificate of Origin (DCO) for each commit you make. The DCO is a simple statement that you, as a contributor, have the legal right to contribute.


**To signify that you agree to the DCO for contributions, you simply add a line to each of your git commit messages:**

```Signed-off-by: Jane Smith <jane.smith@example.com>```


**In most cases, you can add this signoff to your commit automatically with the -s or --signoff flag to git commit. You must use your real name and a reachable email address (sorry, no pseudonyms or anonymous contributions). An example of signing off on a commit :**

`$ commit -s -m “my commit message w/signoff”`

**To ensure all your commits are signed, you may choose to add this alias to your global .gitconfig :**

`[alias] amend = commit -s --amend cm = commit -s -m commit = commit -s`

Or you may configure your IDE, for example, Visual Studio Code to automatically sign-off commits for you:

![Git Signoff VScode](/assets/images/contribution/git-signoff-vscode.webp)

### 7.Push changes to Github

- To push your changes, run the git command:

```bash
git push origin your_branch_name
```

### 8.Create a pull request (PR)

- Head over to your forked repository on GitHub and you'll see a Compare & pull request button. Click on that button.
Note: Please ensure that the right branch is selected for the PR.
![Compare and PR](/assets/images/contribution/compare-and-pr.webp)


- Once you click on the button, you'll be taken to the Pull Request page. Here, you can add a title and description to your pull request that explains your contribution. Once you're done, click on the Create pull request button.
![Compare PR](/assets/images/contribution/create-pr.webp)

### Suggested Reading 

For more details on contributing to different meshery repositories you can follow this 
[Suggested Reading](https://docs.meshery.io/project/contributing#suggested-reading)