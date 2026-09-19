---
title: "mesheryctl-axi: an agent-ergonomic mesheryctl"
subheading: "Token-efficient TOON output for AI agents operating Meshery"
date: 2026-09-18
author: Yī nuò
categories:
  - extensibility
  - open-source
featured-image: /assets/images/meshery-logo-light-text-side.svg
redirect_from: /blog/mesheryctl-axi-agent-ergonomic-mesheryctl
published: true
---

Every agent turn that shells out to a human CLI pays a token tax: ASCII tables built for eyeballs, JSON that repeats every key on every row, full documents when you asked for a list. [mesheryctl-axi](https://github.com/meshery-extensions/mesheryctl-axi) is a wrapper that reshapes `mesheryctl` for agents - the same Meshery operations, presented through an interface designed for machines. It follows the [AXI](https://axi.md) agent-ergonomics principles and is listed in the AXI community catalog.

The economics are the point. A two-design list renders **363 bytes of TOON versus 468 bytes of raw API JSON for the same rows** (measured from the 0.3.0 binary), and the saving compounds with every row: TOON states the schema once, JSON repeats every key per object. Lists also project a handful of scalar columns instead of full documents - no `patternFile` blobs when you asked what designs exist.

## Zero-install, non-interactive

```bash
npx -y mesheryctl-axi connection list
```

The package embeds nothing. It spawns your existing `mesheryctl` binary (override with `MESHERYCTL_BIN`), so `mesheryctl` must be installed and authenticated, and every command runs without TTY prompts, so agent workflows never stall waiting on input.

## Show, don't tell

Outputs below were produced by the released 0.3.0 binary against a fixture server speaking the real Meshery API shapes. Reporting is TOON; design and model **content** stays raw YAML/JSON, never TOON - what you read back is exactly what Meshery stores.

```text
$ mesheryctl-axi connection list
count: 2
total: 2
connections[2]{id,name,status,kind,type}:
  c0ffee11-0000-4000-8000-aaaaaaaaaaaa,metal04,connected,kubernetes,platform
  c0ffee22-0000-4000-8000-bbbbbbbbbbbb,docker-desktop,discovered,kubernetes,platform
status:
  connected: 1
  discovered: 1
help[1]:
  mesheryctl-axi connection view <id>
```

Every successful command ends with `help[]` next-step suggestions, so the agent's next move is always one obvious command. `--fields` and `--full` control the projection:

```text
$ mesheryctl-axi design list --fields name,visibility
count: 2
total: 2
designs[2]{name,visibility}:
  sock-shop,private
  istio-bookinfo,public
help[2]:
  mesheryctl-axi design view <name>
  mesheryctl-axi design content <name> --format yaml
```

Empty collections render a definitive `designs: 0` rather than an empty table, and failures exit non-zero with a structured error, never a scraped traceback:

```text
$ mesheryctl-axi connection list --bogus
error: "unknown flag for mesheryctl-axi connection list: --bogus"
code: VALIDATION_ERROR
help[2]:
  mesheryctl-axi connection list [flags]
  mesheryctl-axi connection list --help
```

## For agents, and the people pointing them at Meshery

If you run agents against Meshery, point them at the wrapper instead of raw `mesheryctl`: `npx -y mesheryctl-axi`, with `MESHERYCTL_BIN` if the binary lives somewhere unusual. The [README](https://github.com/meshery-extensions/mesheryctl-axi#readme) has an agent quickstart, the package is [on npm](https://www.npmjs.com/package/mesheryctl-axi), and the [extensions page](https://meshery.io/extensions/mesheryctl-axi) has the overview. Every wrapper-to-`mesheryctl` call is pinned by a contract test against a real binary, so the interface agents learn today keeps working tomorrow.
