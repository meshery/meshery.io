import React from "react";
import SlackIcon from "../../assets/images/social-icons/slack.svg";
import DockerIcon from "../../assets/images/social-icons/docker.svg";
import YoutubeIcon from "../../assets/images/social-icons/youtube.svg";
import TwitterIcon from "../../assets/images/social-icons/twitter.svg";
import GithubIcon from "../../assets/images/social-icons/github.svg";
import CalendarIcon from "../../assets/images/social-icons/calendar.png";
import FooterWrapper from "./Footer.styles";

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="container">
        <div className="footer-links community">
          <h3 className="section-title">
            <a className="title-link" href="https://layer5.io/community">
              Community
            </a>
          </h3>
          <ul className="section-categories">
            <li>
              <a className="category-link" href="https://layer5.io/blog">
                Blog
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://layer5.io/community/members"
              >
                Contributors
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://layer5.io/community/events/"
              >
                Events
              </a>
            </li>
            <li>
              <a className="category-link" href="/service-mesh-landscape">
                Slack
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://github.com/meshery/play"
              >
                Github
              </a>
            </li>
            <li>
              <a className="category-link" href="https://discuss.layer5.io/">
                Forum
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-links getting-started">
          <h3 className="section-title">
            <a className="title-link" href="https://layer5.io/community">
              Getting Started
            </a>
          </h3>
          <ul className="section-categories">
            <li>
              <a className="category-link" href="https://meshery.io/features">
                Features
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://meshery.io/#getting-started"
              >
                Run Meshery
              </a>
            </li>
            <li>
              <a className="category-link" href="https://docs.meshery.io/">
                Docs
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-links resources">
          <h3 className="section-title">
            <a className="title-link" href="https://layer5.io/resources">
              Resources
            </a>
          </h3>
          <ul className="section-categories">
            <li>
              <a
                className="category-link"
                href="https://layer5.io/service-mesh-landscape"
              >
                Service Mesh Comparison
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://layer5.io/service-mesh-landscape"
              >
                Service Mesh Tools
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://layer5.io/learn/service-mesh-books"
              >
                Service Mesh Books
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://layer5.io/learn/service-mesh-workshops"
              >
                Service Mesh Workshops
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://meshery.io/service-mesh-interface"
              >
                Service Mesh Interface Conformance
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-links socials">
          <h3 className="section-title">
            <a className="title-link" href="https://layer5.io/resources">
              Socials
            </a>
          </h3>
          <ul className="section-categories">
            <li>
              <a
                className="category-link"
                href="https://twitter.com/mesheryio/"
              >
                <img src={TwitterIcon} alt="Twitter Icon" />
                Twitter
              </a>
            </li>
            <li>
              <a className="category-link" href="https://meshery.io/calendar">
                <img src={CalendarIcon} alt="Calendar Icon" />
                Calender
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://www.youtube.com/channel/UCFL1af7_wdnhHXL1InzaMvA"
              >
                <img src={YoutubeIcon} alt="Youtube Icon" />
                Youtube
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://hub.docker.com/u/layer5/"
              >
                <img src={DockerIcon} alt="Docker Icon" />
                Docker Hub
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://meshery.io/service-mesh-interface"
              >
                <img src={SlackIcon} alt="Slack Icon" />
                Slack
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://github.com/meshery/play"
              >
                <img src={GithubIcon} alt="GitHub Icon" />
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container flex copyright">
        <div className="text">&copy; 2022 The Meshery Authors</div>
        <div className="text">Proudly representing every service mesh</div>
        <div className="text">
          <a href="https://github.com/meshery/meshery/blob/master/CODE_OF_CONDUCT.md">
            Code of Conduct
          </a>
        </div>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
