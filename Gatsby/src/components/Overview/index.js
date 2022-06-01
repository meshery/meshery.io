import React from "react";
import OverviewWrapper from "./overview.styles";

const Overview = () => {
  return (
    <OverviewWrapper>
      <div className="container">
        <h1 className="overview-heading">Overview</h1>
        <div className="google-slides">
          <iframe
            src="https://docs.google.com/presentation/d/e/2PACX-1vSJdaOJ6MdmYQCyd2c3sbGsa9h7BVqauzBpdeVIKMpAh4eHoStLTMS8hmYJdzT0YTgXzS2chyrLPRzR/embed?start=true&loop=true&delayms=5000"
            frameBorder={0}
            allowFullScreen="true"
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            loading="lazy"
          />
        </div>
      </div>
    </OverviewWrapper>
  );
};

export default Overview;
