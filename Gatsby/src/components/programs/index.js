import React from "react";
import ProgramsWrapper from "./programs.style";

import Gsoc from "../../assets/images/programs/gsoc-logo.svg";
import CNCF from "../../assets/images/programs/cncf-logo.svg";
import Gsod from "../../assets/images/programs/gsod-logo.svg";
import LFX from "../../assets/images/programs/lfx-logo.svg";

const Programs = () => {
  return (
    <ProgramsWrapper>
      <section className="programs-section">
        <h3>
          Learn about Meshery's participation in{" "}
          <a href="/programs">various open source programs</a>.
        </h3>
        <div id="gsoc-2020" className="card-content flex">
          <span className="minicard-span">
            <a
              className="smallcard-a waves-effect waves-light btn white-text darken-2 l5-dark-green z-depth-2"
              href="/programs/meshery/cncf"
            >
              <img
                src={CNCF}
                style={{
                  width: "40%",
                  // paddingTop: "1.4rem",
                  // paddingBottom: ".4rem",
                verticalAlign: "middle",
                marginBottom: "0"
       

                }}
                alt="CNCF"
                className="minicard-img"
              />
            </a>
          </span>
          <span className="minicard-span">
            <a
              className="smallcard-a waves-effect waves-light btn white-text darken-2 l5-dark-green z-depth-2"
              href="/programs/gsod/2020"
            >
              <img
                src={Gsod}
                style={{
                  width: "40%",
                  // paddingTop: "1.4rem",
                  // paddingBottom: ".4rem",
                 marginBottom: "0"

                }}
                alt="GSOD2020"
                className="minicard-img"
              />
            </a>
          </span>
          <span className="minicard-span">
            <a
              className="smallcard-a waves-effect waves-light btn white-text darken-2 l5-dark-green z-depth-2"
              href="/programs/gsoc/2020"
            >
              <img
                src={Gsoc}
                style={{
                  width: "40%",
                  // paddingTop: "1.4rem",
                  // paddingBottom: ".4rem",
                  marginBottom: "0"

                }}
                alt="GSOC"
                className="minicard-img"
              />
            </a>
          </span>
          <span className="minicard-span">
            <a
              className="smallcard-a waves-effect waves-light btn white-text darken-2 l5-dark-green z-depth-2"
              href="/programs/lfx"
            >
              <img
                src={LFX}
                alt="LFX"
                className="minicard-img"
                style={{
                  width: "30%",
                  // paddingTop: "1.7rem",
                  // paddingBottom: ".7rem",
                  marginBottom: "0",
                }}
              />
            </a>
          </span>
        </div>
      </section>
    </ProgramsWrapper>
  );
};

export default Programs;
