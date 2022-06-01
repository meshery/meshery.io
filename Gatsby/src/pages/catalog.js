import React, { useState } from "react";
import Layout from "../Layout/layout";
import Features from "../components/Catalog/features";
import Catalogcard from "../components/Catalog/cards/catalog_card";
import CommingSoonCard from "../components/Catalog/cards/commingSoon_Card";
import patternsdata from "../components/Catalog/patterns.data";
import wasmdata from "../components/Catalog/wasm.data";
import WasmCard from "../components/Catalog/cards/wasm_card";
import Filters from "../components/Catalog/filters";
import { Col, Row } from "../reusecore/Layout";
import Modal from "react-modal";

const CatalogPage = () => {
  const [filter, setFilter] = useState([]);
  


  const handleChange = () => {
    var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    var filters = [];
    for (var i = 0; i < checkboxes.length; i++) {
      filters.push(checkboxes[i].value);
    }
    setFilter(filters);
  };

  return (
    <Layout>
      <div style={{ maxWidth: "1140px", margin: "auto" }}>
        <h1 style={{ marginTop: "2rem" }}>Service Mesh Catalog </h1>
        <Features />
        <div style={{display: "flex"}}>
        <Filters resources={filter} handleChange={handleChange} />
        <div className="list">
          <Row
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              // gap: "2rem",
            }}
          >
            {patternsdata.map((pattern) => {
              if (pattern.Status !== "ComingSoon") {
                return <Catalogcard pattern={pattern} />;
              }
            })}
            {wasmdata.map((filter) => {
              return <WasmCard filter={filter} />;
            })}
            {patternsdata.map((pattern) => {
              if (pattern.Status === "ComingSoon") {
                return <CommingSoonCard pattern={pattern}  />;
              }
            })}
          </Row>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default CatalogPage;
