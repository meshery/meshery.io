import React,{ useState } from "react";
import pattern1 from "../../assets/images/patterns/service-mesh.svg";
import pattern2 from "../../assets/images/patterns/circuit-breaker.svg";
import pattern3 from "../../assets/images/patterns/rate-limit.svg";
import wasmimg from "../../assets/images/webassembly_text.svg";
import DataFile from "./data";

 import Istio from "../../assets/images/adapters/istio.svg";
 import Linkerd from "../../assets/images/adapters/linkerd.svg";
 import AppMesh from "../../assets/images/adapters/aws-app-mesh.svg";
 import OSM from "../../assets/images/adapters/osm.svg";
 import Nginx from "../../assets/images/adapters/nginx-sm.svg";
 import Kuma from "../../assets/images/adapters/Kuma.svg";
 import Consul from "../../assets/images/adapters/consul.svg";
 import NSM from "../../assets/images/adapters/nsm.svg";
 import Traefik from "../../assets/images/adapters/traefik-mesh.svg";

// Libraries
// import { useStaticQuery, graphql } from "gatsby";

const DataWrapper = (WrappedComponent) => {
 
  return (props) => {
    return <WrappedComponent {...props} />;
  };
};

export default DataWrapper;
