import React from "react";
import CardWrapper from "./card.styles";
import wasmlogo from "../../../assets/images/webassembly_logo.svg";

const WasmCard = ({ filter }) => {
  return (
    <CardWrapper>
      <div className="card">
        <div className="chip">
          <small className="pattern-type"> {filter.filters.type}</small>
        </div>
        <h4 className="pattern-name">{filter.name}</h4>
        <img className="pattern-filter-image" src={filter.image} />
        <div>
          <h6 className="pattern-id">
            {" "}
            <img className="wasm" src={wasmlogo} loading="lazy" />
            {filter.filterId}
          </h6>
        </div>
      </div>
    </CardWrapper>
  );
};

export default WasmCard;
