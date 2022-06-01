import React from "react";
import SubscribeWrapper from "./subscribe.styles";

const Subscribe = () => {
  return (
    <SubscribeWrapper>
      <div className="form-container">
        <p className="newsletter-heading">Community Newsletter</p>
        <div id="mc_embed_signup">
          <form
            action="https://layer5.us15.list-manage.com/subscribe/post?u=6b50be5aea3dfe1fd4c041d80&id=f7bd70043b"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            onsubmit="document.getElementById(mc-embedded-subscribe-form).submit();"
          >
            <div id="mc_embed_signup_scroll">
              <div className="subscribe-inputbox">
                <input
                  type="text"
                  placeholder="First Name"
                  name="FNAME"
                  className="NAME"
                  id="mce-FNAME"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="LNAME"
                  className="NAME"
                  id="mce-LNAME"
                  required
                />
              </div>
              <div id="mce-responses" className="clear subscribe-inputbox">
                <div
                  className="response"
                  id="mce-error-response"
                  style={{ display: "none" }}
                />
                <div
                  className="response"
                  id="mce-success-response"
                  style={{ display: "none" }}
                />
              </div>
              {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
              <div className="email-div">
                <input
                  type="email"
                  name="EMAIL"
                  className="EMAIL"
                  placeholder="Email Address"
                  required
                />
              </div>
              {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
              <div style={{ display: "none" }}>
                <input
                  type="text"
                  name="b_6b50be5aea3dfe1fd4c041d80_6bb65defeb"
                  tabIndex={-1}
                />
              </div>
              <button
                className="subscribe-button"
                type="submit"
                name="subscribe-button"
                id="mc-embedded-subscribe"
              >
                {" "}
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </SubscribeWrapper>
  );
};

export default Subscribe;
