import React from "react";
import ProjectItemWrapper from "./projectSection.style";

import projectImage from "../../assets/images/meshery-logo-light.svg";

const data = [
  {
    name: "Community Calendar",
    description:
      "Join the weekly meetings by subscribing to our community calendar",
    link: "https://bit.ly/2SbrRhe",
  },
  {
    name: "Community Meetings",
    description: "Watch community meeting recordings on our YouTube channel",
    link: "https://www.youtube.com/c/Layer5io?sub_confirmation=1",
  },
  {
    name: "Join the Conversation",
    description:
      "Ask questions, find answers and share knowledge on our Discussion Forum",
    link: "https://discuss.layer5.io",
  },
  {
    name: "Community Guide",
    description:
      "Read the Welcome Guide to familiarize yourself with the community",
    link: "https://docs.google.com/document/d/17OPtDE_rdnPQxmk2Kauhm3GwXF1R5dZ3Cj8qZLKdo5E/edite",
  },
];

const Projects = () => {
  return (
    <ProjectItemWrapper id="projects">
      <div className="callout">
        {data.map((data) => {
          return (
            <a
              className="card"
              href={data.link}
              target="_blank"
              rel="noreferrer"
            >
              <h3>{data.name}</h3>
              <p className="small">{data.description}</p>
              <img
                className="go-corner"
                src={projectImage}
                alt="projectImage"
                // href={data.link}
              />
            </a>
          );
        })}
      </div>
    </ProjectItemWrapper>
  );
};

export default Projects;
