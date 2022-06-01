import React from "react";
import ForumWrapper from "./forum.styles";

const Forum = () => {
  return (
    <ForumWrapper>
      <h2 className="font-bold heading">Mailing Lists and Discussion Forum</h2>
      <p className="sub-heading">
        Engage in the Meshery project. Join any of our mailing lists. Get your
        questions answered in the discussion forum.
      </p>
      <div className="mailing-component">
        <div className="mailing-row">
          <div className="bg-grey-300">
            <div className="mailing-container">
              <div>
                <h3 className="h3">Meshery Developers</h3>
              </div>
              <div>
                <a
                  className="button"
                  href="https://groups.google.com/a/meshery.io/g/developers"
                >
                  Subscribe
                </a>
              </div>
            </div>
            <div className="mailing-container mail-link-div">
              <a
                className="mail-link"
                href="https://groups.google.com/a/meshery.io/g/developers"
              >
                developers@meshery.io
              </a>
            </div>
            <p className="p-normal">
              Engage with contributors. Contribute to Meshery.
            </p>
          </div>
          <div className="bg-grey-300">
            <div className="mailing-container">
              <div>
                <h3 className="h3">Meshery Users</h3>
              </div>
              <div>
                <a
                  className="button"
                  href="https://groups.google.com/a/meshery.io/g/users"
                >
                  Subscribe
                </a>
              </div>
            </div>
            <div className="mailing-container mail-link-div">
              <a
                className="mail-link"
                href="https://groups.google.com/a/meshery.io/g/users"
              >
                users@meshery.io
              </a>
            </div>
            <p className="p-normal">
              Learn about Meshery. Troubleshoot issues. Share cloud native
              experiences.
            </p>
          </div>
        </div>
        <div className="mailing-row">
          <div className="bg-grey-300">
            <div className="mailing-container">
              <div>
                <h3 className="h3">Meshery Maintainers</h3>
              </div>
              <div>
                <a className="button" href="mailto:maintainers@meshery.io">
                  Send email
                </a>
              </div>
            </div>
            <div className="mailing-container mail-link-div">
              <a className="mail-link" href="mailto:maintainers@meshery.io">
                maintainers@meshery.io
              </a>
            </div>
            <p className="p-normal">Contact Meshery Maintainers via email.</p>
          </div>
          {/*<div class="bg-grey-300">
    <div class="mailing-container">
      <div>
        <h3 class="h3">Meshery Community</h3>
      </div>
      <div>
        <a class="button" href="mailto:community@meshery.io">Subscribe</a>
      </div>
    </div>
    <div class="mailing-container mail-link-div">
      <a class="mail-link" href="mailto:community@meshery.io"
        >community@meshery.io
      </a>
    </div>
    <p class="p-normal">Receive the latest updates on Meshery and surrounding projects.</p>
  </div>
</div> */}
          <div className="bg-grey-300">
            <div className="mailing-container">
              <div>
                <h3 className="h3">Meshery Vulnerabilities</h3>
              </div>
              <div>
                <a
                  className="button"
                  href="https://docs.meshery.io/project/security-vulnerabilities"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="mailing-container mail-link-div">
              <a className="mail-link" href="mailto:security@meshery.dev">
                security@meshery.dev
              </a>
            </div>
            <p className="p-normal">
              Report a vulnerability or inquire about a security-related
              concern.
            </p>
          </div>
        </div>
      </div>
      <div className="mailing-row mailing-row-single">
        <div className="bg-grey-300 bg-single">
          <div className="mailing-container">
            <div>
              <h3 className="h3">Discussion Forum</h3>
            </div>
            <div>
              <a className="button" href="mailto:community@meshery.io">
                Engage
              </a>
            </div>
          </div>
          <div className="mailing-container mail-link-div">
            <a className="mail-link saffron" href="https://discuss.layer5.io">
              Questions and answers about Meshery
            </a>
          </div>
          <p className="p-normal white">
            Get your questions answered in the service mesh community discussion
            forum.
          </p>
        </div>
      </div>
    </ForumWrapper>
  );
};

export default Forum;
