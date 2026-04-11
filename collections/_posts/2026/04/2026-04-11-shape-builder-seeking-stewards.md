---
layout: post
title: "Spotlight: Shape Builder Extension"
subheading: "Seeking Contributors to Become Maintainers"
date: 2026-04-11 08:00:00 +0000
author: Meshery Maintainers
image: /assets/images/posts/2026/03/meshery-v1.0/meshery-v1.0/meshery-v1.0-kubecon-eu.webp
draft: false
published: true
categories:
  - meshery
  - community
  - extensions
tags:
  - meshery
  - shape-builder
  - kanvas
  - extensions
  - open-source
permalink: /blog/spotlight-shape-builder-extension/
---

This post is based on the [community discussion](https://discuss.layer5.io/t/shape-builder-extension-seeking-contributors-to-become-maintainers/7737).

## Overview

The Shape Builder extension (https://github.com/meshery-extensions/shape-builder) is part of the Meshery ecosystem that enables users to visually design custom polygon shapes for Kanvas components.

Instead of manually defining coordinate-based shapes, users can draw shapes visually and generate Meshery-compatible output.

## What is Shape Builder?

Shape Builder allows users to convert drawn shapes into normalized coordinate data used by Meshery components.

These shapes are defined in a coordinate system ranging from -1 to +1, which ensures consistency across all visual components in Meshery.

This makes shape creation more accessible and removes the need for manual coordinate editing.

## Current State

The Shape Builder extension is live at https://shapes.meshery.io and has contributions from around 30 contributors.

However, it currently lacks active maintainers responsible for:
- Reviewing pull requests
- Triaging issues
- Driving feature development

## Areas That Need Attention

### Documentation

There is currently no complete end-to-end documentation explaining:
- How to export Shape Builder output
- How to use generated shapes in Meshery components
- How to integrate outputs into real workflows

### Workflow Improvements

Shape Builder output is not yet part of a fully automated pipeline for Meshery components.

Improving this could significantly enhance the developer experience and evolve Shape Builder into a more complete visual design tool.

## How to Get Involved

If you're interested in frontend tooling, visualization systems, or developer experience, this is a great opportunity to contribute.

Steps to get started:

- Try the tool: https://shapes.meshery.io
- Explore issues: https://github.com/meshery-extensions/shape-builder/issues
- Join Meshery Slack: https://slack.meshery.io
- Read contribution guide: https://docs.meshery.io/project/contributing
- Visit the [Newcomer's Guide] (https://meshery.io/community/newcomers) to get started. 

This is a focused opportunity to contribute meaningfully to the Meshery ecosystem and help shape its visual design tooling.
