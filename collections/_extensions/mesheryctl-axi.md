---
layout: single-page-extension
item-type: extension
name: mesheryctl-axi
kind: Plugin
userName: Meshery Authors
type: Configuration
compatibility: 
  - meshery
  - kubernetes
logo: /assets/images/logos/meshery-logo-light.svg
whiteImage: /assets/images/logos/meshery-logo-light.svg
colorImage: /assets/images/logos/meshery-logo-light.svg
image-light: /assets/images/logos/meshery-logo-light.svg
extensionInfo: |
  mesheryctl-axi is an agent-ergonomic <a href="https://axi.md/">AXI</a> wrapper around <a href="https://docs.meshery.io/reference/mesheryctl">mesheryctl</a>. It wraps the human-facing CLI rather than changing it, presenting the same Meshery operations through an interface designed for AI agents and automation: token-efficient TOON output for list and view reporting, definitive empty states, structured errors, and <code>help[]</code> next-step suggestions on every successful command.

  Run it with <code>npx -y mesheryctl-axi</code>. It spawns your existing mesheryctl binary, so mesheryctl must be installed and authenticated; Meshery itself is not embedded in the package. Schema-faithful content retrieval for designs and models is always returned as raw YAML or JSON, never as TOON, so what you read back is exactly what Meshery stores.

extensionCaveats: |
  - Token-Efficient Output: TOON rendering of list and view results keeps agent context windows small compared to raw CLI tables or verbose JSON.
  - Always Non-Interactive: Every command runs without TTY prompts, so agent workflows never stall waiting on input.
  - Structured Errors and Next Steps: Unknown flags and failures exit non-zero with a structured TOON error, and successes carry help[] suggestions that guide the next command.
  - Zero-Install Usage: Invoke directly with npx -y mesheryctl-axi against your existing, authenticated mesheryctl installation.

URL: https://github.com/meshery-extensions/mesheryctl-axi
docsURL: https://docs.meshery.io/extensions/extensions/
---

{{ page.extensionCaveats }}
