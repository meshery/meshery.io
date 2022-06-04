import mesherycloud from "../../assets/images/meshery-cloud.png";
import infoImage1 from "../../assets/images/configuration-best-practices.gif";
import infoImage2 from "../../assets/images/meshery-dashboard-no-shadow.png";
import infoImage3 from "../../assets/images/meshery-wasm.png";
import infoImage4 from "../../assets/images/service mesh performance example.gif";
import infoImage5 from "../../assets/images/service-mesh-performance-example.gif";
import infoImage6 from "../../assets/images/smi-conformance.png";
import smplogo from "../../assets/images/smp-dark-text-side.svg";
import smilogo from "../../assets/images/servicemeshinterface-icon-color.svg";
import wasmlogo from "../../assets/images/webassembly_logo.svg";

const Data = [
  {
    index: 1,
    img: infoImage1,
    title: "Operate with configuration best practices",
    titleimg: "none",
    headingimg: "none",
    content:
      "Assess your service mesh configuration against deployment and operational best practices with Meshery's configuration validator.",
    button: "",
    
  },
  {
    index: 2,
    img: infoImage2,
    title: "Use the Service Mesh Performance standard",
    titleimg: smplogo,
    headingimg: "none",
    content:
      "Weigh the value of your service mesh features in-context of it's overhead.",
    button: "See Service Mesh Performance(SMP)",
    btnurl: "https://smp-spec.io/"
  },
  {
    index: 3,
    img: infoImage3,
    title: "Is your service mesh SMI compliant?",
    titleimg: "none",
    headingimg: smilogo,
    content:
      "Validate your service mesh's conformance to Service Mesh Interface (SMI) specifications.",
    button: "See the Service Mesh Interface Conformance Report",
    btnurl: "/service-mesh-interface"
  },
  {
    index: 4,
    img: infoImage4,
    title: "Manage data plane intelligence with WebAssembly filters",
    titleimg: "none",
    headingimg: wasmlogo,
    content:
      "Dynamically load and manage your own WebAssembly filters in Envoy-based service meshes. ",
    button: "",
  },
  {
    index: 5,
    img: infoImage5,
    title: "Which service mesh should I use and how do I get started?",
    titleimg: "none",
    headingimg: "none",
    content:
      "Learn about the functionality of different service meshes and visually manipulate mesh configuration.",
    button: "See the Meshery documentation",
    btnurl: "https://docs.meshery.io/"
  },
  {
    index: 6,
    img: infoImage6,
    title: "Manage the performance of your service mesh and its workloads",
    titleimg: "none",
    headingimg: "none",
    content:
      "Use performance profiles to track the historical performance of your workloads",
    button: "",
  },
];

export default Data;
