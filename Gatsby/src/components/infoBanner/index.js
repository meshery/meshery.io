import React from "react";
import { Container, Row, Col } from "../../reusecore/Layout";
import InfoBannerStyle from "./infoBanner.style";
import { Link } from "gatsby";
import Data from "./sampleData";

function InfoBanner({}) {
  return (
    <InfoBannerStyle>
      <Container fullWidthSM>
        {Data.map((Data) => {
          return (
            <Row
              className={Data.index % 2 === 1 ? "cont-row-reverse" : "cont-row"}
            >
              <Col xs={12} sm={12} md={6}>
                <Link to="/service-mesh-management/meshery">
                  <img
                    className="mesh-image"
                    alt="Meshery - the multi-service mesh manager"
                    src={Data.img}
                  />
                </Link>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <div className="side">
                  <div
                    className={Data.titleimg === "none" ? "noimg" : "title_img"}
                  >
                    <img alt="titleimg" src={Data.titleimg} />
                  </div>

                  <div className="side-text">
                    <img
                      className={
                        Data.headingimg === "none" ? "noimg" : "heading_img"
                      }
                      src={Data.headingimg}
                    />
                    <h1>{Data.title}</h1>
                  </div>
                  <div className="description">
                    <p>{Data.content}</p>
                  </div>

                  <div className={Data.button === "" ? "nobtn" : "Btn"}>
                    <br />
                    <Link to={Data.btnurl}>
                      <button>{Data.button}</button>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          );
        })}
      </Container>
    </InfoBannerStyle>
  );
}

export default InfoBanner;
