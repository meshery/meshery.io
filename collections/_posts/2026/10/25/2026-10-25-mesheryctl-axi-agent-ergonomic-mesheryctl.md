---
title: "mesheryctl-axi: an agent-ergonomic mesheryctl"
subheading: "Token-efficient TOON output for AI agents operating Meshery"
date: 2026-10-25
author: Yī nuò, Salmaan M
categories:
  - extensibility
  - open-source
featured-image: /assets/images/logos/meshery-logo-light-text-side.svg
redirect_from: /blog/mesheryctl-axi-agent-ergonomic-mesheryctl
published: true
---

Every agent turn that shells out to a human CLI pays a token tax: ASCII tables built for eyeballs, JSON that repeats every key on every row, full documents when you asked for a list. [mesheryctl-axi](https://github.com/meshery-extensions/mesheryctl-axi) is a wrapper that reshapes `mesheryctl` for agents - the same Meshery operations, presented through an interface designed for machines. It follows the [AXI](https://axi.md) agent-ergonomics principles and is listed in the AXI community catalog.

The economics are the point. A two-design list renders **363 bytes of TOON versus 468 bytes of raw API JSON for the same rows** (measured from the 0.3.0 binary), and the saving compounds with every row: TOON states the schema once, JSON repeats every key per object. Lists also project a handful of scalar columns instead of full documents - no `patternFile` blobs when you asked what designs exist.

## Why agents need an interface of their own

`mesheryctl` is Meshery's CLI client. Operators use it to manage connections, inspect system status, work with infrastructure designs, and run Meshery operations from a terminal. It is designed for people, which makes readable tables, prompts, colors, and explanatory output useful in an interactive shell.

AXI, or Agentic eXtension Interface, applies a different design goal: deterministic structures that an agent can inspect, summarize, and act on without guessing where a value lives. `mesheryctl-axi` is an AXI-compliant wrapper around `mesheryctl`; it preserves the underlying Meshery operations while reshaping their reporting for machine consumption.

### Agent interaction flow

1. **AI agent** sends a structured command.
2. **`mesheryctl-axi`** receives the command and formats the response with AXI and TOON.
3. **`mesheryctl-axi`** invokes the native **`mesheryctl`** client.
4. **`mesheryctl`** communicates with **Meshery Server**.
5. The result returns through `mesheryctl-axi` as a compact TOON response for the agent.

## TOON: less structure to repeat

JSON repeats object keys on every row. TOON declares the collection size and schema once, then leaves each row to carry only its values. That gives an agent immediate structural awareness and reduces the amount of context it must read and reproduce.

```json
{
  "connections": [
    { "id": "c1", "kind": "k8s", "status": "connected" },
    { "id": "c2", "kind": "prom", "status": "connected" }
  ]
}
```

```text
connections[2]{id,kind,status}:
  c1,k8s,connected
  c2,prom,connected
```

The wrapper uses TOON for reporting and keeps design and model content as raw YAML or JSON. Agents get compact lists without losing the source representation when they need to inspect or apply a full document.

## Zero-install, non-interactive

```bash
npx -y mesheryctl-axi connection list
```

The wrapper requires **Node.js 22 or newer** and an installed, authenticated `mesheryctl` binary. It embeds nothing; it spawns your existing `mesheryctl` binary (override the path with `MESHERYCTL_BIN`). Every command runs without TTY prompts, so agent workflows never stall waiting for interactive input.

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

## Prompts to try with your agent

These examples use the same fixture-shaped outputs shown above. The command is the tool call an agent should make; the short explanation describes how it can use the structured response instead of scraping a human-oriented table.

### Filter connections by kind

**Prompt:** “List my Meshery connections and show only the Kubernetes ones.”

```text
mesheryctl-axi connection list --fields id,name,status,kind,type
```

Representative fixture output:

```text
count: 2
total: 2
connections[2]{id,name,status,kind,type}:
  c0ffee11-0000-4000-8000-aaaaaaaaaaaa,metal04,connected,kubernetes,platform
  c0ffee22-0000-4000-8000-bbbbbbbbbbbb,docker-desktop,discovered,kubernetes,platform
```

The agent reads the declared `kind` column, keeps rows whose value is `kubernetes`, and presents the matching connection names and statuses. The projection keeps the fields needed for that answer without requesting a full connection document.

### List design names and visibility

**Prompt:** “List my Meshery designs and show only their names and visibility.”

```text
mesheryctl-axi design list --fields name,visibility
```

Representative fixture output:

```text
count: 2
total: 2
designs[2]{name,visibility}:
  sock-shop,private
  istio-bookinfo,public
```

The agent can return a compact name-and-visibility list directly. Because the schema is declared once, it does not need to infer which value belongs to which property on every row.

### Explain an error and choose the next command

**Prompt:** “Explain this command error and tell me the next command to try.”

```text
mesheryctl-axi connection list --bogus
```

Representative fixture output:

```text
error: "unknown flag for mesheryctl-axi connection list: --bogus"
code: VALIDATION_ERROR
help[2]:
  mesheryctl-axi connection list [flags]
  mesheryctl-axi connection list --help
```

The agent can identify `VALIDATION_ERROR`, explain that `--bogus` is not a supported flag, and choose the supplied help command or the corrected list command as its next action. `help[]` makes the recovery path part of the response instead of requiring the agent to guess.

## Benchmark results: less work for the agent

The interface-level examples are reflected in a controlled benchmark conducted on October 6, 2026, comparing raw `mesheryctl` with `mesheryctl-axi`. The benchmark used one LLM, `nvidia/nemotron-3-super-120b-a12b:free`, accessed through OpenRouter, under a strict single-tool setup: each observation used the same task, target, repetition ID, and a fresh agent run. The primary dataset contains 40 valid paired observations across six tasks: `connections-by-kind`, `connection-id-kind`, `connections-count`, `system-status`, `design-list-view`, and `component-list`. These results describe the tested model, task suite, and controlled environment rather than every model or Meshery command.

Both tools achieved 100% exact accuracy across the primary dataset. The difference was the effort required to reach the answer:

| Metric | Raw `mesheryctl` | `mesheryctl-axi` | AXI change |
| --- | ---: | ---: | ---: |
| Average wall-clock duration | 21.53 s | 14.08 s | 34.6% lower |
| Average agent turns | 2.80 | 2.45 | 12.5% lower |
| Average tool invocations | 1.68 | 1.33 | 20.8% lower |
| Average total tokens | 3,649.5 | 2,530.4 | 30.7% lower |
| Total CLI execution errors | 14 | 3 | 78.6% lower |

The largest gains appeared in output-heavy tasks. For `system-status`, AXI averaged 5.56 seconds and 1,886.2 tokens, compared with 40.87 seconds and 4,482.2 tokens for raw `mesheryctl`. For `connections-by-kind`, AXI was faster in 9 of 10 paired repetitions and reduced average duration from 24.79 to 13.32 seconds. The results were not uniformly faster: raw `mesheryctl` was quicker on average for `connection-id-kind` and `connections-count`, showing that the strongest advantage comes when an agent must parse structured, multi-row output or recover from CLI errors.

### Task-level performance

The six benchmark suites show where the wrapper creates the most leverage. Every task retained 100% exact accuracy for both interfaces:

| Task | Raw duration | AXI duration | Raw tokens | AXI tokens |
| --- | ---: | ---: | ---: | ---: |
| `component-list` | 30.18 s | 22.77 s | 10,214.0 | 4,592.0 |
| `connection-id-kind` | 8.78 s | 11.02 s | 1,872.4 | 1,940.1 |
| `connections-by-kind` | 24.79 s | 13.32 s | 2,200.9 | 2,116.3 |
| `connections-count` | 9.13 s | 14.12 s | 1,797.0 | 1,913.6 |
| `design-list-view` | 24.91 s | 21.52 s | 4,556.0 | 3,738.4 |
| `system-status` | 40.87 s | 5.56 s | 4,482.2 | 1,886.2 |

`system-status` shows the clearest agent-efficiency gain. Raw tabular output can make an empty or wrapped component state ambiguous, encouraging an agent to spend another turn checking the command. AXI makes the state explicit with compact key-value output and definitive empty collections, so the agent can extract the answer in one pass more often. Across five `system-status` runs, raw `mesheryctl` recorded 9 CLI execution errors compared with 1 for AXI.

The result is a practical engineering tradeoff: AXI does not change what Meshery can do, and it is not faster for every small query. AXI was slower and used slightly more tokens for `connection-id-kind` and `connections-count`, while its strongest gains appeared in commands that produce more structure or require more parsing. The benchmark therefore supports a targeted efficiency claim, not a claim that AXI wins every comparison.


## For agents, and the people pointing them at Meshery

Install and authenticate `mesheryctl`, then try the wrapper with `npx -y mesheryctl-axi`, setting `MESHERYCTL_BIN` if the binary lives somewhere unusual. Read the [mesheryctl-axi repository](https://github.com/meshery-extensions/mesheryctl-axi), the [agent quickstart in the README](https://github.com/meshery-extensions/mesheryctl-axi#readme), the [npm package](https://www.npmjs.com/package/mesheryctl-axi), and the [Meshery extensions documentation](https://docs.meshery.io/extensions/extensions/). Every wrapper-to-`mesheryctl` call is pinned by a contract test against a real binary, so the interface agents learn today keeps working tomorrow. Report bugs or share feedback through the [mesheryctl-axi GitHub issues](https://github.com/meshery-extensions/mesheryctl-axi/issues).
