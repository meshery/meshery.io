import React from "react";
// import patternsdata from "../components/Catalog/patterns.data"
import ComingSoonWrapper from "./comingsoon.styles";
import patternslogo from "../../../assets/images/service-mesh-pattern.svg";

const CommingSoonCard = ({ pattern }) => {
  return (
    <ComingSoonWrapper>
      <div className="card-overlay">
        <h4 className="overlay-text">Coming Soon...</h4>
        <h4 className="pattern-name">{pattern.name}</h4>
        <img className="pattern-image-overlay" src={pattern.image} />
        <div>
          <h6 className="pattern-id-overlay">
            <img
              className="smp-overlay"
              src={patternslogo}
              alt="text"
              loading="lazy"
            />
            {pattern.patternId}
          </h6>
        </div>
      </div>
    </ComingSoonWrapper>
  );
};

export default CommingSoonCard;
