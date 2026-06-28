---
title: "Spotlight: Shape Builder Extension"
subheading: "Seeking contributors to become maintainers"
date: 2026-06-28
author: Sathwik Parimi
categories:
  - community
  - extensibility
  - open-source
featured-image: /assets/images/posts/2026/06/meshery-extensions-color.png
redirect_from: /blog/spotlight-shape-builder-extension
published: true
---

The Meshery ecosystem is full of focused tools that make designing and visualizing cloud native infrastructure easier. One of them, the **Shape Builder** extension, is looking for contributors who want to take ownership of a meaningful, standalone project and grow into maintainers. This post spotlights what Shape Builder does, where it stands today, and exactly where the project needs help.

## What is Shape Builder?

[Shape Builder](https://shapes.meshery.io) is a Meshery extension that lets you visually design custom polygon shapes for use with [Kanvas](https://docs.meshery.io/extensions/kanvas/) components. Instead of hand-coding coordinate matrices, you draw a shape interactively and the tool generates the polygon notation that Meshery components understand.

That makes it a natural entry point for anyone who wants to influence how infrastructure is represented in Kanvas, the visual layer where users design and operate their cloud native deployments. Shapes carry meaning in Kanvas, as described in the [Component Shape Guide](https://docs.meshery.io/extensions/component-shape-guide/), so a better shape-authoring experience directly improves how readable a design is. The source lives at [meshery-extensions/shape-builder](https://github.com/meshery-extensions/shape-builder).

## Where the project stands today

Shape Builder already has a solid foundation. Roughly 30 contributors have touched the project over time, and it runs as a live deployment you can try right now at [shapes.meshery.io](https://shapes.meshery.io). The codebase is primarily JavaScript and CSS, which keeps the barrier to entry low, so if you are comfortable with frontend work you can become productive quickly.

What the project is missing is consistent stewardship. There is a backlog of open pull requests and issues that needs someone to champion it and carry it forward.

## Where the project needs help

The extension is looking for a volunteer, or two, to step up, stay consistently engaged, and steward the project on the path to becoming a maintainer. Concretely, that means:

- **Working through the open pull requests** by reviewing, merging, or closing the [existing backlog](https://github.com/meshery-extensions/shape-builder/pulls).
- **Triaging the open issues** by prioritizing [what matters most](https://github.com/meshery-extensions/shape-builder/issues) and keeping the queue healthy.
- **Driving the next feature iteration** by deciding where the tool should go next and helping build it.

Two areas stand out as the most impactful:

1. **Closing the loop between design and use.** Today it is not obvious how a user takes the output of the tool and actually puts it to work, that is, how to copy the generated shape code, package it, and import it into Meshery. Clear documentation here would immediately help users get value from what they design.
2. **Smoothing that workflow with tooling.** Beyond documentation, there is an opportunity to build the process that takes custom output and enhances the components inside a user's custom [models](https://docs.meshery.io/concepts/logical/models). Done well, Shape Builder could grow from a polygon designer into a full-blown Meshery **component builder**.

## Why this is a great opportunity

If you have wanted to own a meaningful, standalone piece of the Meshery ecosystem, this is a good place to start:

- **The scope is focused.** It is a single, well-defined extension rather than a sprawling subsystem.
- **The stack is approachable.** JavaScript and CSS, friendly to frontend contributors.
- **The impact is visible.** Every time someone defines a custom component shape in Kanvas, your work is right there in front of them.

It is also a clear path toward maintainership, exactly the kind of consistent, ownership-driven contribution that the Meshery community recognizes and supports.

## Get involved

Ready to jump in? Start here Now:

- Browse the [open issues](https://github.com/meshery-extensions/shape-builder/issues) and [open pull requests](https://github.com/meshery-extensions/shape-builder/pulls).
- Try the live tool at [shapes.meshery.io](https://shapes.meshery.io).
- Introduce yourself in the [Meshery community](https://meshery.io/community) and join the weekly community calls.

The maintainers and the wider community are ready to help you get up to speed. If Shape Builder sounds like the kind of project you would like to champion, leave a comment on the repo or in the community forum, and away you go.
