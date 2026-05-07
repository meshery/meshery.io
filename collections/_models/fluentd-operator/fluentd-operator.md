---
layout: single-page-model
item-type: model
name: Fluentd Operator
subtitle: Collaborative and visual infrastructure as design for Fluentd Operator
colorIcon: /assets/images/integration/fluentd-operator/icons/color/fluentd-operator-color.svg
whiteIcon: /assets/images/integration/fluentd-operator/icons/white/fluentd-operator-white.svg
docURL: https://docs.meshery.io/extensibility/integrations/fluentd-operator
description: 
category: Observability and Analysis
subcategory: Logging
registrant: Artifact Hub
components: 
- name: fluentd-config
  colorIcon: assets/images/integration/fluentd-operator/components/fluentd-config/icons/color/fluentd-config-color.svg
  whiteIcon: assets/images/integration/fluentd-operator/components/fluentd-config/icons/white/fluentd-config-white.svg
  description: 
componentsCount: 1
relationships: 
relationshipsCount: 0
featureList: [
  "Fluent Operator provides great flexibility in building a logging layer based on Fluent Bit and Fluentd.",
  "Fluentd Management: Deploy and destroy Fluentd StatefulSet automatically.",
  "Custom Configuration: Select input/filter/output plugins via labels."
]
howItWorks: "Fluent Bit will be deployed as a DaemonSet while Fluentd will be deployed as a StatefulSet. "
howItWorksDetails: "Although both Fluent Bit and Fluentd can collect, process(parse and filter) and then forward log to the final destinations, still they have strengths in different aspects.

Fluent Bit is a good choice as a logging agent because of its lightweight and efficiency, while Fluentd is more powerful to perform advanced processing on logs because of its rich plugins.

Fluent Bit only mode: If you just need to collect logs and send logs to the final destinations, all you need is Fluent Bit.
Fluent Bit + Fluentd mode: If you also need to perform some advanced processing on the logs collected or send to more sinks, then you also need Fluentd.
Fluentd only mode: If you need to receive logs through networks like HTTP or Syslog and then process and send the log to the final sinks, you only need Fluentd.
Fluent Operator includes CRDs and controllers for both Fluent Bit and Fluentd which allows you to config your log processing pipelines in the 3 modes mentioned above as you wish."
---
