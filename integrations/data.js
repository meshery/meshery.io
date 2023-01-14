const data = [
  {
    name: "AKS",
    color: "../images/integration/aks/aks.svg",
    white: "../images/integration/aks/aks-white.svg",
  },
  {
    name: "AWS App Mesh",
    color: "../images/integration/aws-app-mesh/aws-app-mesh.svg",
    white: "../images/integration/aws-app-mesh/aws-app-mesh-white.svg",
  },
  {
    name: "Argo",
    color: "../images/integration/argo/argo.svg",
    white: "../images/integration/argo/argo-white.svg",
  },
  {
    name: "Citrix Service Mesh",
    color: "../images/integration/citrix-service-mesh/citrix-service-mesh.svg",
    white:
      "../images/integration/citrix-service-mesh/citrix-service-mesh-white.svg",
  },
  {
    name: "Consul",
    color: "../images/integration/consul/consul.svg",
    white: "../images/integration/consul/consul-white.svg",
  },
  {
    name: "Docker",
    color: "../images/integration/docker/docker.svg",
    white: "../images/integration/docker/docker-white.svg",
  },
  {
    name: "EKS",
    color: "../images/integration/eks/eks.svg",
    white: "../images/integration/eks/eks-white.svg",
  },
  {
    name: "GKE",
    color: "../images/integration/gke/gke.svg",
    white: "../images/integration/gke/gke-white.svg",
  },
  {
    name: "Github",
    color: "../images/integration/github/github.svg",
  },
  {
    name: "Grafana",
    color: "../images/integration/grafana/grafana.svg",
  },
  {
    name: "Helm",
    color: "../images/integration/helm/helm.svg",
  },
  {
    name: "Homebrew",
    color: "../images/integration/homebrew/homebrew.svg",
  },
  {
    name: "Istio",
    color: "../images/integration/istio/istio.svg",
    white: "../images/integration/istio/istio-white.svg",
  },
  {
    name: "KinD",
    color: "../images/integration/kind/kind.svg",
    white: "../images/integration/kind/kind-white.svg",
  },
  {
    name: "Kubernetes",
    color: "../images/integration/kubernetes/kubernetes.svg",
  },
  {
    name: "Kubesphere",
    color: "../images/integration/kubesphere/kubesphere.svg",
  },
  {
    name: "Kuma",
    color: "../images/integration/kuma/kuma.svg",
    white: "../images/integration/kuma/kuma-white.svg",
  },
  {
    name: "Linkerd",
    color: "../images/integration/linkerd/linkerd.svg",
    white: "../images/integration/linkerd/linkerd-white.svg",
  },
  {
    name: "Linux",
    color: "../images/integration/linux/linux.svg",
    white: "../images/integration/linux/linux-white.svg",
  },
  {
    name: "Mac",
    color: "../images/integration/mac/mac.svg",
    white: "../images/integration/mac/mac-white.svg",
  },
  {
    name: "Minikube",
    color: "../images/integration/minikube/minikube.svg",
    white: "../images/integration/minikube/minikube-white.svg",
  },
  {
    name: "NGINX Service Mesh",
    color: "../images/integration/nginx-service-mesh/nginx-service-mesh.svg",
    white:
      "../images/integration/nginx-service-mesh/nginx-service-mesh-white.svg",
  },
  {
    name: "Nats",
    color: "../images/integration/nats/nats.svg",
    white: "../images/integration/nats/nats-white.svg",
  },
  {
    name: "Network Service Mesh",
    color:
      "../images/integration/network-service-mesh/network-service-mesh.svg",
    white:
      "../images/integration/network-service-mesh/network-service-mesh-white.svg",
  },
  {
    name: "Prometheus",
    color: "../images/integration/prometheus/prometheus.svg",
    white: "../images/integration/prometheus/prometheus-white.svg",
  },
  {
    name: "Tanzu Service Mesh",
    color: "../images/integration/tanzu-service-mesh/tanzu-service-mesh.svg",
  },
  {
    name: "Traefik",
    color: "../images/integration/traefik/traefik.svg",
    white: "../images/integration/traefik/traefik-white.svg",
  },
  {
    name: "Windows",
    color: "../images/integration/windows/windows.svg",
  },
  {
    name: "Akri",
    color: "../images/integration/akri/akri.svg",
    white: "../images/integration/akri/akri-white.svg",
  },
  {
    name: "BFE",
    color: "../images/integration/bfe/bfe.svg",
    white: "../images/integration/bfe/bfe-white.svg",
  },
  {
    name: "Buildpacks",
    color: "../images/integration/buildpacks/buildpacks.svg",
  },
  {
    name: "Calico",
    color: "../images/integration/calico/calico.svg",
    white: "../images/integration/calico/calico-white.svg",
  },
  {
    name: "CDK for Kubernetes (CDK8s)",
    color: "../images/integration/cdk8s/cdk8s.svg",
    white: "../images/integration/cdk8s/cdk8s-white.svg",
  },
  {
    name: "Chaos Mesh",
    color: "../images/integration/chaos-mesh/chaos-mesh.svg",
    white: "../images/integration/chaos-mesh/chaos-mesh-white.svg",
  },
  {
    name: "CubeFS",
    color: "../images/integration/cubefs/cubefs.svg",
    white: "../images/integration/cubefs/cubefs-white.svg",
  },
  {
    name: "Cilium",
    color: "../images/integration/cilium/cilium.svg",
    white: "../images/integration/cilium/cilium-white.svg",
  },
  {
    name: "Cloud Custodian",
    color: "../images/integration/cloud-custodian/cloud-custodian.svg",
    white: "../images/integration/cloud-custodian/cloud-custodian-white.svg",
  },
  {
    name: "Cloud Events",
    color: "../images/integration/cloud-events/cloud-events.svg",
    white: "../images/integration/cloud-events/cloud-events-white.svg",
  },
  {
    name: "Containerd",
    color: "../images/integration/containerd/containerd.svg",
    white: "../images/integration/containerd/containerd-white.svg",
  },
  {
    name: "ContainerSSH",
    color: "../images/integration/containerssh/containerssh.svg",
    white: "../images/integration/containerssh/containerssh-white.svg",
  },
  {
    name: "Contour",
    color: "../images/integration/contour/contour.svg",
  },
  {
    name: "CoreDNS",
    color: "../images/integration/coredns/coredns.svg",
    white: "../images/integration/coredns/coredns-white.svg",
  },
  {
    name: "Cortex",
    color: "../images/integration/cortex/cortex.svg",
  },
  {
    name: "CRI-O",
    color: "../images/integration/cri-o/cri-o.svg",
    white: "../images/integration/cri-o/cri-o-white.svg",
  },
  {
    name: "Crossplane",
    color: "../images/integration/crossplane/crossplane.svg",
    white: "../images/integration/crossplane/crossplane-white.svg",
  },
  {
    name: "Dapr",
    color: "../images/integration/dapr/dapr.svg",
    white: "../images/integration/dapr/dapr-white.svg",
  },
  {
    name: "Datadog",
    color: "../images/integration/datadog/datadog.svg",
    white: "../images/integration/datadog/datadog-white.svg",
  },
  {
    name: "Dex",
    color: "../images/integration/dex/dex.svg",
  },
  {
    name: "Emissary-Ingress",
    color: "../images/integration/emissary-ingress/emissary-ingress.svg",
    white: "../images/integration/emissary-ingress/emissary-ingress-white.svg",
  },
  {
    name: "Envoy",
    color: "../images/integration/envoy/envoy.svg",
    white: "../images/integration/envoy/envoy-white.svg",
  },
  {
    name: "Falco",
    color: "../images/integration/falco/falco.svg",
    white: "../images/integration/falco/falco-white.svg",
  },
  {
    name: "Fagger",
    color: "../images/integration/flagger/flagger.svg",
    white: "../images/integration/flagger/flagger-white.svg",
  },
  {
    name: "Fluentbit",
    color: "../images/integration/fluentbit/fluentbit.svg",
    white: "../images/integration/fluentbit/fluentbit-white.svg",
  },
  {
    name: "Fluentd",
    color: "../images/integration/fluentd/fluentd.svg",
    white: "../images/integration/fluentd/fluentd-white.svg",
  },
  {
    name: "Fluid",
    color: "../images/integration/fluid/fluid.svg",
    white: "../images/integration/fluid/fluid-white.svg",
  },
  {
    name: "Flux",
    color: "../images/integration/flux/flux.svg",
    white: "../images/integration/flux/flux-white.svg",
  },
  {
    name: "Gatekeeper",
    color: "../images/integration/gatekeeper/gatekeeper.svg",
    white: "../images/integration/gatekeeper/gatekeeper-white.svg",
  },
  {
    name: "Harbor",
    color: "../images/integration/harbor/harbor.svg",
    white: "../images/integration/harbor/harbor-white.svg",
  },
  {
    name: "Jaeger",
    color: "../images/integration/jaeger/jaeger.svg",
    white: "../images/integration/jaeger/jaeger-white.svg",
  },
  {
    name: "Keda",
    color: "../images/integration/keda/keda.svg",
    white: "../images/integration/keda/keda-white.svg",
  },
  {
    name: "Knative",
    color: "../images/integration/knative/knative.svg",
    white: "../images/integration/knative/knative-white.svg",
  },
  {
    name: "KubeDL",
    color: "../images/integration/kubedl/kubedl.svg",
  },
  {
    name: "KubeEdge",
    color: "../images/integration/kubeedge/kubeedge.svg",
    white: "../images/integration/kubeedge/kubeedge-white.svg",
  },
  {
    name: "Kyverno",
    color: "../images/integration/kyverno/kyverno.svg",
    white: "../images/integration/kyverno/kyverno-white.svg",
  },
  {
    name: "Open Service Mesh",
    color: "../images/integration/open-service-mesh/open-service-mesh.svg",
    white:
      "../images/integration/open-service-mesh/open-service-mesh-white.svg",
  },
  {
    name: "Parsec",
    color: "../images/integration/parsec/parsec.svg",
  },
  {
    name: "SPIFFE",
    color: "../images/integration/spiffe/spiffe.svg",
    white: "../images/integration/spiffe/spiffe-white.svg",
  },
  {
    name: "SPIRE",
    color: "../images/integration/spire/spire.svg",
    white: "../images/integration/spire/spire-white.svg",
  },
  {
    name: "Strimzi",
    color: "../images/integration/strimzi/strimzi.svg",
    white: "../images/integration/strimzi/strimzi-white.svg",
  },
  {
    name: "Telepresence",
    color: "../images/integration/telepresence/telepresence.svg",
    white: "../images/integration/telepresence/telepresence-white.svg",
  },
  {
    name: "Teller",
    color: "../images/integration/teller/teller.svg",
    white: "../images/integration/teller/teller-white.svg",
  },
  {
    name: "Terraform",
    color: "../images/integration/terraform/terraform.svg",
    white: "../images/integration/terraform/terraform-white.svg",
  },
  {
    name: "Virtual Kubelet",
    color: "../images/integration/virtual-kubelet/virtual-kubelet.svg",
    white: "../images/integration/virtual-kubelet/virtual-kubelet-white.svg",
  },
  {
    name: "Vitess",
    color: "../images/integration/vitess/vitess.svg",
  },
  {
    name: "Volcano",
    color: "../images/integration/volcano/volcano.svg",
  },
];

export { data };
