import React from "react";
import HeroWrapper from "./hero.styles";
import { Link } from "gatsby";
import Button from "../../reusecore/Button";

import MeshmapGIF from "../../assets/images/meshmap.gif";

const Hero = () => {
  return (
    <HeroWrapper>
      <section className="hero" style={{ paddingBottom: "1rem" }}>
        <div className="container">
          <div className="text-container">
            <h1 style={{ margin: "1rem 0rem 3rem 0rem", fontSize: "2.7rem" }}>
              <span style={{ fontWeight: "200" }}>The cloud-native </span>{" "}
              <br /> <span style={{ fontWeight: "700" }}>management plane</span>
            </h1>
            <p>Deploy, Configure, Operate, Measure, Tune</p>
            <Button
              secondary
              className="banner-btn two"
              title="Get Started"
              url="/service-mesh-management/meshery"
            />
          </div>
          <div style={{ paddingBottom: "2rem" }}>
            <a
              href={MeshmapGIF}
              data-fancybox="images"
              data-caption="Multi-service mesh management plane"
            >
              <img
                src={MeshmapGIF}
                alt="Multi-service mesh management plane"
                style={{ boxShadow: "6px 6px 20px #1a2421", width: "40%" }}
              />
            </a>
            <h2
              className="sub-text"
              style={{ paddingTop: "1rem", fontSize: "1rem", fontWeight: 500 }}
            >
              cloud native management with plugins
            </h2>
          </div>
        </div>
      </section>
    </HeroWrapper>
  );
};

export default Hero;
