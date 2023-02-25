const data = [
  {
    name: "AKS",
    color: ".,/assets/images/integration/aks/aks.svg",
    white: ".,/assets/images/integration/aks/aks-white.svg",
  },
  {
    name: "AWS App Mesh",
    color: ".,/assets/images/integration/aws-app-mesh/aws-app-mesh.svg",
    white: ".,/assets/images/integration/aws-app-mesh/aws-app-mesh-white.svg",
  },
  {
    name: "Argo",
    color: ".,/assets/images/integration/argo/argo.svg",
    white: ".,/assets/images/integration/argo/argo-white.svg",
  },
  {
    name: "Citrix Service Mesh",
    color: ".,/assets/images/integration/citrix-service-mesh/citrix-service-mesh.svg",
    white:
      ".,/assets/images/integration/citrix-service-mesh/citrix-service-mesh-white.svg",
  },
  {
    name: "Consul",
    color: ".,/assets/images/integration/consul/consul.svg",
    white: ".,/assets/images/integration/consul/consul-white.svg",
  },
  {
    name: "Docker",
    color: ".,/assets/images/integration/docker/docker.svg",
    white: ".,/assets/images/integration/docker/docker-white.svg",
  },
  {
    name: "EKS",
    color: ".,/assets/images/integration/eks/eks.svg",
    white: ".,/assets/images/integration/eks/eks-white.svg",
  },
  {
    name: "GKE",
    color: ".,/assets/images/integration/gke/gke.svg",
    white: ".,/assets/images/integration/gke/gke-white.svg",
  },
  {
    name: "Github",
    color: ".,/assets/images/integration/github/github.svg",
  },
  {
    name: "Grafana",
    color: ".,/assets/images/integration/grafana/grafana.svg",
  },
  {
    name: "Helm",
    color: ".,/assets/images/integration/helm/helm.svg",
  },
  {
    name: "Homebrew",
    color: ".,/assets/images/integration/homebrew/homebrew.svg",
  },
  {
    name: "Istio",
    color: ".,/assets/images/integration/istio/istio.svg",
    white: ".,/assets/images/integration/istio/istio-white.svg",
  },
  {
    name: "KinD",
    color: ".,/assets/images/integration/kind/kind.svg",
    white: ".,/assets/images/integration/kind/kind-white.svg",
  },
  {
    name: "Kubernetes",
    color: ".,/assets/images/integration/kubernetes/kubernetes.svg",
  },
  {
    name: "Kubesphere",
    color: ".,/assets/images/integration/kubesphere/kubesphere.svg",
  },
  {
    name: "Kuma",
    color: ".,/assets/images/integration/kuma/kuma.svg",
    white: ".,/assets/images/integration/kuma/kuma-white.svg",
  },
  {
    name: "Linkerd",
    color: ".,/assets/images/integration/linkerd/linkerd.svg",
    white: ".,/assets/images/integration/linkerd/linkerd-white.svg",
  },
  {
    name: "Linux",
    color: ".,/assets/images/integration/linux/linux.svg",
    white: ".,/assets/images/integration/linux/linux-white.svg",
  },
  {
    name: "Mac",
    color: ".,/assets/images/integration/mac/mac.svg",
    white: ".,/assets/images/integration/mac/mac-white.svg",
  },
  {
    name: "Minikube",
    color: ".,/assets/images/integration/minikube/minikube.svg",
    white: ".,/assets/images/integration/minikube/minikube-white.svg",
  },
  {
    name: "NGINX Service Mesh",
    color: ".,/assets/images/integration/nginx-service-mesh/nginx-service-mesh.svg",
    white:
      ".,/assets/images/integration/nginx-service-mesh/nginx-service-mesh-white.svg",
  },
  {
    name: "Nats",
    color: ".,/assets/images/integration/nats/nats.svg",
    white: ".,/assets/images/integration/nats/nats-white.svg",
  },
  {
    name: "Network Service Mesh",
    color:
      ".,/assets/images/integration/network-service-mesh/network-service-mesh.svg",
    white:
      ".,/assets/images/integration/network-service-mesh/network-service-mesh-white.svg",
  },
  {
    name: "Prometheus",
    color: ".,/assets/images/integration/prometheus/prometheus.svg",
    white: ".,/assets/images/integration/prometheus/prometheus-white.svg",
  },
  {
    name: "Tanzu Service Mesh",
    color: ".,/assets/images/integration/tanzu-service-mesh/tanzu-service-mesh.svg",
  },
  {
    name: "Traefik",
    color: ".,/assets/images/integration/traefik/traefik.svg",
    white: ".,/assets/images/integration/traefik/traefik-white.svg",
  },
  {
    name: "Windows",
    color: ".,/assets/images/integration/windows/windows.svg",
  },
  {
    name: "Akri",
    color: ".,/assets/images/integration/akri/akri.svg",
    white: ".,/assets/images/integration/akri/akri-white.svg",
  },
  {
    name: "BFE",
    color: ".,/assets/images/integration/bfe/bfe.svg",
    white: ".,/assets/images/integration/bfe/bfe-white.svg",
  },
  {
    name: "Buildpacks",
    color: ".,/assets/images/integration/buildpacks/buildpacks.svg",
  },
  {
    name: "Calico",
    color: ".,/assets/images/integration/calico/calico.svg",
    white: ".,/assets/images/integration/calico/calico-white.svg",
  },
  {
    name: "CDK for Kubernetes (CDK8s)",
    color: ".,/assets/images/integration/cdk8s/cdk8s.svg",
    white: ".,/assets/images/integration/cdk8s/cdk8s-white.svg",
  },
  {
    name: "Chaos Mesh",
    color: ".,/assets/images/integration/chaos-mesh/chaos-mesh.svg",
    white: ".,/assets/images/integration/chaos-mesh/chaos-mesh-white.svg",
  },
  {
    name: "CubeFS",
    color: ".,/assets/images/integration/cubefs/cubefs.svg",
    white: ".,/assets/images/integration/cubefs/cubefs-white.svg",
  },
  {
    name: "Cilium",
    color: ".,/assets/images/integration/cilium/cilium.svg",
    white: ".,/assets/images/integration/cilium/cilium-white.svg",
  },
  {
    name: "Cloud Custodian",
    color: ".,/assets/images/integration/cloud-custodian/cloud-custodian.svg",
    white: ".,/assets/images/integration/cloud-custodian/cloud-custodian-white.svg",
  },
  {
    name: "Cloud Events",
    color: ".,/assets/images/integration/cloud-events/cloud-events.svg",
    white: ".,/assets/images/integration/cloud-events/cloud-events-white.svg",
  },
  {
    name: "Containerd",
    color: ".,/assets/images/integration/containerd/containerd.svg",
    white: ".,/assets/images/integration/containerd/containerd-white.svg",
  },
  {
    name: "ContainerSSH",
    color: ".,/assets/images/integration/containerssh/containerssh.svg",
    white: ".,/assets/images/integration/containerssh/containerssh-white.svg",
  },
  {
    name: "Contour",
    color: ".,/assets/images/integration/contour/contour.svg",
  },
  {
    name: "CoreDNS",
    color: ".,/assets/images/integration/coredns/coredns.svg",
    white: ".,/assets/images/integration/coredns/coredns-white.svg",
  },
  {
    name: "Cortex",
    color: ".,/assets/images/integration/cortex/cortex.svg",
  },
  {
    name: "CRI-O",
    color: ".,/assets/images/integration/cri-o/cri-o.svg",
    white: ".,/assets/images/integration/cri-o/cri-o-white.svg",
  },
  {
    name: "Crossplane",
    color: ".,/assets/images/integration/crossplane/crossplane.svg",
    white: ".,/assets/images/integration/crossplane/crossplane-white.svg",
  },
  {
    name: "Dapr",
    color: ".,/assets/images/integration/dapr/dapr.svg",
    white: ".,/assets/images/integration/dapr/dapr-white.svg",
  },
  {
    name: "Datadog",
    color: ".,/assets/images/integration/datadog/datadog.svg",
    white: ".,/assets/images/integration/datadog/datadog-white.svg",
  },
  {
    name: "Dex",
    color: ".,/assets/images/integration/dex/dex.svg",
  },
  {
    name: "Emissary-Ingress",
    color: ".,/assets/images/integration/emissary-ingress/emissary-ingress.svg",
    white: ".,/assets/images/integration/emissary-ingress/emissary-ingress-white.svg",
  },
  {
    name: "Envoy",
    color: ".,/assets/images/integration/envoy/envoy.svg",
    white: ".,/assets/images/integration/envoy/envoy-white.svg",
  },
  {
    name: "Falco",
    color: ".,/assets/images/integration/falco/falco.svg",
    white: ".,/assets/images/integration/falco/falco-white.svg",
  },
  {
    name: "Fagger",
    color: ".,/assets/images/integration/flagger/flagger.svg",
    white: ".,/assets/images/integration/flagger/flagger-white.svg",
  },
  {
    name: "Fluentbit",
    color: ".,/assets/images/integration/fluentbit/fluentbit.svg",
    white: ".,/assets/images/integration/fluentbit/fluentbit-white.svg",
  },
  {
    name: "Fluentd",
    color: ".,/assets/images/integration/fluentd/fluentd.svg",
    white: ".,/assets/images/integration/fluentd/fluentd-white.svg",
  },
  {
    name: "Fluid",
    color: ".,/assets/images/integration/fluid/fluid.svg",
    white: ".,/assets/images/integration/fluid/fluid-white.svg",
  },
  {
    name: "Flux",
    color: ".,/assets/images/integration/flux/flux.svg",
    white: ".,/assets/images/integration/flux/flux-white.svg",
  },
  {
    name: "Gatekeeper",
    color: ".,/assets/images/integration/gatekeeper/gatekeeper.svg",
    white: ".,/assets/images/integration/gatekeeper/gatekeeper-white.svg",
  },
  {
    name: "Harbor",
    color: ".,/assets/images/integration/harbor/harbor.svg",
    white: ".,/assets/images/integration/harbor/harbor-white.svg",
  },
  {
    name: "Jaeger",
    color: ".,/assets/images/integration/jaeger/jaeger.svg",
    white: ".,/assets/images/integration/jaeger/jaeger-white.svg",
  },
  {
    name: "Keda",
    color: ".,/assets/images/integration/keda/keda.svg",
    white: ".,/assets/images/integration/keda/keda-white.svg",
  },
  {
    name: "Knative",
    color: ".,/assets/images/integration/knative/knative.svg",
    white: ".,/assets/images/integration/knative/knative-white.svg",
  },
  {
    name: "KubeDL",
    color: ".,/assets/images/integration/kubedl/kubedl.svg",
  },
  {
    name: "KubeEdge",
    color: ".,/assets/images/integration/kubeedge/kubeedge.svg",
    white: ".,/assets/images/integration/kubeedge/kubeedge-white.svg",
  },
  {
    name: "Kyverno",
    color: ".,/assets/images/integration/kyverno/kyverno.svg",
    white: ".,/assets/images/integration/kyverno/kyverno-white.svg",
  },
  {
    name: "Open Service Mesh",
    color: ".,/assets/images/integration/open-service-mesh/open-service-mesh.svg",
    white:
      ".,/assets/images/integration/open-service-mesh/open-service-mesh-white.svg",
  },
  {
    name: "Parsec",
    color: ".,/assets/images/integration/parsec/parsec.svg",
  },
  {
    name: "SPIFFE",
    color: ".,/assets/images/integration/spiffe/spiffe.svg",
    white: ".,/assets/images/integration/spiffe/spiffe-white.svg",
  },
  {
    name: "SPIRE",
    color: ".,/assets/images/integration/spire/spire.svg",
    white: ".,/assets/images/integration/spire/spire-white.svg",
  },
  {
    name: "Strimzi",
    color: ".,/assets/images/integration/strimzi/strimzi.svg",
    white: ".,/assets/images/integration/strimzi/strimzi-white.svg",
  },
  {
    name: "Telepresence",
    color: ".,/assets/images/integration/telepresence/telepresence.svg",
    white: ".,/assets/images/integration/telepresence/telepresence-white.svg",
  },
  {
    name: "Teller",
    color: ".,/assets/images/integration/teller/teller.svg",
    white: ".,/assets/images/integration/teller/teller-white.svg",
  },
  {
    name: "Terraform",
    color: ".,/assets/images/integration/terraform/terraform.svg",
    white: ".,/assets/images/integration/terraform/terraform-white.svg",
  },
  {
    name: "Virtual Kubelet",
    color: ".,/assets/images/integration/virtual-kubelet/virtual-kubelet.svg",
    white: ".,/assets/images/integration/virtual-kubelet/virtual-kubelet-white.svg",
  },
  {
    name: "Vitess",
    color: ".,/assets/images/integration/vitess/vitess.svg",
  },
  {
    name: "Volcano",
    color: ".,/assets/images/integration/volcano/volcano.svg",
  },
];

export { data };
