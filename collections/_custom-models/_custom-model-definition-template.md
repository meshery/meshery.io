---
layout: single-page-model
item-type: model
name: # TODO: Provide the unique name for this model (e.g., "apisix")
subtitle: # TODO: Provide a brief subtitle (e.g., "Cloud-native API Gateway")
colorIcon: /assets/images/custom-integration/[MODEL-NAME]/icons/color/[MODEL-NAME]-color.svg
whiteIcon: /assets/images/custom-integration/[MODEL-NAME]/icons/white/[MODEL-NAME]-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/[model-name] # Leave empty if no documentation is available
description: # TODO: Add a description of what this model provides
category: # TODO: Choose from various available categories at meshery.io/catalog/models
subcategory: # TODO: Specify appropriate subcategory
registrant: # TODO: Choose from: Artifact Hub, GitHub, Meshery etc.
components: 
  # TODO: Component icons must be placed in assets/images/custom-integration/
  # Example structure: assets/images/custom-integration/exoscale-icons/components/2fa-icon.svg
  - name: # TODO: Component name (e.g., "apisix-route")
    colorIcon: assets/images/custom-integration/[MODEL-NAME]/components/[COMPONENT-NAME]/icons/color/[COMPONENT-NAME]-color.svg
    whiteIcon: assets/images/custom-integration/[MODEL-NAME]/components/[COMPONENT-NAME]/icons/white/[COMPONENT-NAME]-white.svg
    description: # TODO: Brief description of what this component does
  - name: # TODO: Add additional components as needed
    colorIcon: assets/images/custom-integration/[MODEL-NAME]/components/[COMPONENT-NAME]/icons/color/[COMPONENT-NAME]-color.svg
    whiteIcon: assets/images/custom-integration/[MODEL-NAME]/components/[COMPONENT-NAME]/icons/white/[COMPONENT-NAME]-white.svg
    description: # TODO: Brief description of what this component does
componentsCount: # TODO: Update this number to match actual component count
relationships: 
 # TODO: Define relationships between components if any exist
  # Example:
  # - type: "Binding"
  #   kind: "Edge"
  #   description: "A relationship that represents volume mounts between components"
relationshipsCount: 0 # TODO: Update this number to match actual relationship count
featureList: [
  # TODO: Replace with actual features of your model
  "Feature 1 - Brief description",
  "Feature 2 - Brief description", 
  "Feature 3 - Brief description"
]
howItWorks: # TODO: One-line summary of how the integration works
howItWorksDetails: # TODO: Detailed explanation of the integration's functionality
---
