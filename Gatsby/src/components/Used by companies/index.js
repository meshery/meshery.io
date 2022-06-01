import React from "react";
import CompaniesWrapper from "./companies.styles";

import layer5logo from "../../assets/images/company-logo/layer5-no-trim.svg";
import HPElogo from "../../assets/images/company-logo/hpe-logo-color-no-trim.svg";
import intraservelogo from "../../assets/images/company-logo/intraserve.png";
import solarwindslogo from "../../assets/images/company-logo/solarwinds.svg";
import bookmyshowlogo from "../../assets/images/company-logo/book-my-show.png";
import ericssonlogo from "../../assets/images/company-logo/ericsson-logo.png";
import Metaboblogo from "../../assets/images/company-logo/Metabob-Logo_1.png";
import Asterialogo from "../../assets/images/company-logo/Asteria_Logo_horizontal_blue.svg";
import bootlabslogo from "../../assets/images/company-logo/bootlabs-logo.png";

const Companies = () => {
  return (
    <CompaniesWrapper>
      <div class="content">
        <section class="created-by-section">
          <div class="created-by-container">
            <h1 class="created-by">Created By</h1>
            <div class="company-image">
              <a href="https://layer5.io/" target="_blank" rel="noreferrer">
                <img src={layer5logo} alt="Layer5" loading="lazy" />
              </a>
            </div>
          </div>
        </section>

        <section class="used-by-section">
          <div class="used-by-container">
            <h1 class="used-by">Used By</h1>
            <div class="companies-image">
              <div class="company-image">
                <img src={HPElogo} alt="Hewlett Packard" loading="lazy" />
              </div>
              <div class="company-image">
                <img src={intraservelogo} alt="Intraserve" loading="lazy" />
              </div>
              <div class="company-image">
                <img src={solarwindslogo} alt="SolarWinds" loading="lazy" />
              </div>
              <div class="company-image">
                <img src={bookmyshowlogo} alt="BookMyShow" loading="lazy" />
              </div>
              <div id="ericsson-logo" class="company-image">
                <img src={ericssonlogo} alt="Ericsson" loading="lazy" />
              </div>
              <div id="metabob-logo" class="company-image">
                <img src={Metaboblogo} alt="Metabob" loading="lazy" />
              </div>
              <div id="asteria-logo" class="company-image">
                <img src={Asterialogo} alt="asteria" loading="lazy" />
              </div>
              <div id="Bootlabs-logo" class="company-image">
                <img src={bootlabslogo} alt="Bootlabs" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <section class="adopter-section">
          <div class="adopter-container">
            <h3>
              Add yourself as an <strong>adopter</strong>
            </h3>
            <p className="adopter-descption">
              and share your service mesh story with the community
            </p>
            <button
              to="https://github.com/layer5io/meshery/blob/master/ADOPTERS.md"
              target="_blank"
              class="link"
            >
              Become an Adopter
            </button>
            <br />
          </div>
        </section>
      </div>
    </CompaniesWrapper>
  );
};

export default Companies;
