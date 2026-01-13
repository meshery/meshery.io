# Contributing to Meshery.io

You want to contribute to the project? Yay! 🎈 Please do. 🎈

## Issues & Pull Requests

### Creating an Issue

Before **creating** an Issue i.e for `features`/`bugs`/`improvements` please follow these steps:

1. Search existing Issues before creating a new Issue (look to see if the Issue has already been created).
1. If it doesn't exist create a new Issue giving as much context as possible (please take note and select the correct Issue type, for example `bug`, `documentation` or `feature`.
1. If you wish to work on the Issue once it has been triaged, please include this in your Issue description.

### Working on an Issue

Before working on an existing Issue please follow these steps:

1. Comment asking for the Issue to be assigned to you.
1. To best position yourself for Issues assignment, we recommend that you:
   1. Confirm that you have read the CONTRIBUTING.md.
   1. Have a functional development environment (have built and are able to run the project).
   1. Convey your intended approach to solving the issue.
   1. Put each of these items in writing in one or more comments.
1. After the Issue is assigned to you, you can start working on it.
1. In general, **only** start working on this Issue (and open a Pull Request) when it has been assigned to you. Doing so will prevent confusion, duplicate work (some of which may go unaccepted given its duplicity), incidental stepping on toes, and the headache involved for maintainers and contributors alike as Issue assignments collide and heads bump together.
1. Reference the Issue in your Pull Request (for example `This PR fixes #123`). so that the corresponding Issue is automatically closed upon merge of your Pull Request.

> Notes:
>
> - Check the `Assignees` box at the top of the page to see if the Issue has been assigned to someone else before requesting this be assigned to you. If the issue has a current Assignee, but appears to be inactive, politely inquire with the current Assignee as to whether they are still working on a solution and/or if you might collaborate with them.
> - Only request to be assigned an Issue if you know how to work on it.
> - If an Issue is unclear, ask questions to get more clarity before asking to have the Issue assigned to you; avoid asking "what do I do next? how do I fix this?" (see the item above this line)
> - An Issue can be assigned to multiple people, if you all agree to collaborate on the Issue (the Pull Request can contain commits from different collaborators)
> - Any Issues that has no activity after 2 weeks will be unassigned and re-assigned to someone else.

## Reviewing Pull Requests

We welcome everyone to review Pull Requests. It is a great way to learn, network, and support each other.

### DOs

- Use inline comments to explain your suggestions
- Use inline suggestions to propose changes
- Exercise patience and empathy while offering critiques of the works of others.

### DON'Ts

- Do not repeat feedback, this creates more noise than value (check the existing conversation), use GitHub reactions if you agree/disagree with a comment
- Do not blindly approve Pull Requests to improve your GitHub contributors graph

## Style Guide

The Meshery.io site is built using Jekyll and Javascript.

## Working with themes

To differentiate between dark and light theme components, a base file `rootvariables.scss` has been created. It contains global CSS variables that can be accessed by using the `var()` keyword during styling elements. This file powers all the different styles (including font colors, background colors, image filters and image backgrounds) based on theme changes.

It is advised to use these predefined styles for contributing to different features on the website that are theme dependent. Avoid creating your own CSS variables.

### Example

To change the text color in CSS, this can be used:

```
color: var(--color-primary-light);
```

To change the background color in CSS, this can be executed:

```
background: var(--background-primary);
```

These global variables will change automatically based on the theme selection. This is done by modifying the body classlist.

## Changing images according to the theme

The Meshery.io website contains icons for various organizations, and these are set to change according to the website theme.

The format for SVG or other images is as follows:

```
<img src = " *path for image SVG to be used for light theme* "
id = "logo-dark-light"
data-logo-for-dark = " *path for image SVG to be used for dark theme* "
data-logo-for-light = " *path for image SVG to be used for light theme* "
```

The id **logo-dark-light** is used as a CSS selector and ensures that the image is affected by the theme changes.

The images can be found at the path `meshery.io/ images`

See the set of contributing guides at https://docs.meshery.io/project/contributing
