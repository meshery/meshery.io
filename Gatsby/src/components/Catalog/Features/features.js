import React from "react";
import FeaturesWrapper from "./features.styles";

import patternslogo from "../../../assets/images/service-mesh-pattern.svg";
import wasmlogo from "../../../assets/images/webassembly_logo.svg";
import opologo from "../../../assets/images/opa-logo.png";
import ebpflogo from "../../../assets/images/eBPF_logo.png";
// import coming_soon from "../../assets/images/patterns-coming-soon.png"

const Features = () => {
  const featureslist = [
    {
      name: "Patterns",
      className: "title pattern",
      img: patternslogo,
      description:
        "Service mesh patterns enable the business function in simple language.",
    },
    {
      name: "Filters",
      className: "title wasm",
      img: wasmlogo,
      description:
        "Embedded in the data plane of a service mesh, WebAssembly filters offer fine-grained control over service requests.",
    },
    {
      name: "Programs",
      className: "title ebpf",
      img: ebpflogo,
      description:
        "Embedded in the data plane of a service mesh, eBPF programs performant, fine-grained control over service requests.",
    },
    {
      name: "Policies",
      className: "title OPA",
      img: opologo,
      description:
        "Applied across the cloud native infrastructure under managemetn, policies may be applied broadly and specificly.",
    },
  ];

  return (
    <FeaturesWrapper>
      {featureslist.map((featureslist) => {
        return (
          <div className="feature-container">
            <div className="box">
              <div className={featureslist.className}>{featureslist.name}</div>
              <div className="circlecont">
                <div className="circle"></div>
                <div className="hover-circles">
                  <div className="circle">
                    <img src={featureslist.img} alt="feature" />
                  </div>
                  <div className="circle">
                    <img src={featureslist.img} alt="feature" />
                  </div>
                  <div className="circle">
                    <img src={featureslist.img} alt="feature" />
                  </div>
                  <div className="circle">
                    <img src={featureslist.img} alt="feature" />
                  </div>
                  <div className="circle">
                    <img src={featureslist.img} alt="feature" />
                  </div>
                </div>
              </div>
            </div>
            <div class="description pattern">{featureslist.description}</div>
          </div>
        );
      })}
      {/* <div className="feature-container">
<img className="patterns-coming-soon" src={coming_soon} />
</div> */}
    </FeaturesWrapper>
  );
};

export default Features;
