import React from "react";
import MailingListWrapper from "./mailingList.styles";

const MailingList = () => {
  return (
    <MailingListWrapper>
      <div className="mailinglist">
        <h3 className="mail-heading">Project Mailing lists</h3>
        <p className="mail-subheading">
          Engage in the Meshery project. Join any of our mailing lists.
        </p>
        <div className="mail-container">
          <div className="mail-row">
            <button
              className=" button-dev"
              href="https://groups.google.com/a/meshery.io/g/developers"
            >
              Developers{" "}
            </button>
            <button
              className=" button-user"
              href="https://groups.google.com/a/meshery.io/g/users"
            >
              Users
            </button>
          </div>
          <div className="mail-row">
            <button
              className=" button-maintain"
              href="mailto:maintainers@meshery.io"
            >
              Maintainer
            </button>
            <button className=" button-comm" href="mailto:community@meshery.io">
              Community
            </button>
          </div>
        </div>
      </div>
    </MailingListWrapper>
  );
};

export default MailingList;
