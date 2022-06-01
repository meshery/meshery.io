import istio from "../../assets/images/adapters/istio.svg";
import linkerd from "../../assets/images/adapters/linkerd.svg";
import consul from "../../assets/images/adapters/consul.svg";
import nsm from "../../assets/images/adapters/nsm.svg";
import Kuma from "../../assets/images/adapters/Kuma.svg";
import osm from "../../assets/images/adapters/osm.svg";
import citrix from "../../assets/images/adapters/citrix.svg";
import traefikMesh from "../../assets/images/adapters/traefik-mesh.svg";
import nginx from "../../assets/images/adapters/nginx-sm.svg";
import awsappmesh from "../../assets/images/adapters/aws-app-mesh.svg";
import tanzu from "../../assets/images/adapters/tanzu.svg";
import cilium from "../../assets/images/adapters/cilium.svg";

const Adapterdata = [
  {
    category: "stable",
    subdata: [
      {
        name: "Istio",
        img: istio,
        link: "https://github.com/meshery/meshery-istio",
      },
      {
        name: "Linkerd",
        img: linkerd,
        link: "https://github.com/meshery/meshery-linkerd",
      },
      {
        name: "Consul",
        img: consul,
        link: "https://github.com/meshery/meshery-consul",
      },
      {
        name: "Network Service Mesh",
        img: nsm,
        link: "https://github.com/meshery/meshery-nsm",
      },
      {
        name: "Kuma",
        img: Kuma,
        link: "https://github.com/meshery/meshery-kuma",
      },
      {
        name: "Open Service Mesh",
        img: osm,
        link: "https://github.com/meshery/meshery-osm",
      },
    ],
  },
  {
    category: "beta",
    subdata: [
      {
        name: "Citrix CPX",
        img: citrix,
        link: "https://github.com/meshery/meshery-cpx",
      },
      {
        name: "Traefik Mesh",
        img: traefikMesh,
        link: "https://github.com/meshery/meshery-traefik-mesh",
      },
      {
        name: "NGINX SM",
        img: nginx,
        link: "https://github.com/meshery/meshery-nginx-sm",
      },
      {
        name: "App Mesh",
        img: awsappmesh,
        link: "https://github.com/meshery/meshery-app-mesh",
      },
      {
        name: "Cilium SM",
        img: cilium,
        link: "https://github.com/meshery/meshery-cilium",
      },
    ],
  },
  {
    category: "alpha",
    subdata: [
      {
        name: "Tanzu SM",
        img: tanzu,
        link: "https://github.com/meshery/meshery-tanzu-sm",
      },
    ],
  },
];

export default Adapterdata;
