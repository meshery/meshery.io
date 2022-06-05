import React, { useState } from "react";
import { options } from "./options";

import FiltersWrapper from "./filters.style";

const Filters = (props) => {
  const data = React.useMemo(() => options);
  let categoriesOptions = data.filter((data) => data.category === "Categories");
  let compatibiltyOptions = data.filter(
    (data) => data.category === "Compatibilty"
  );
  let techOptions = data.filter((data) => data.category === "Technology");
  let i = 0;


  return (
    <FiltersWrapper>
      <div className="filter">
        <div className="list">
          <p className="heading">
            <strong>Categories:</strong>
          </p>
          <ul>
            {categoriesOptions[0].subdata.map((x) => {
              const types = props.data.filter((data) => data.type === x.value);
              return (
                <li key={x.id}>
                  <label>
                    <input
                      type="checkbox"
                      value={x.value}
                      onChange={props.handleChange}
                    />
                    <span> {x.label}</span>
                    <span key={x.id} className="total">
                      ({types.length})
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="list">
          <p className="heading">
            <strong>Compatibilty:</strong>
          </p>
          <ul>
            {compatibiltyOptions[0].subdata.map((x) => {
              const compatibility = props.data.filter((data) =>
                data.compatibility.includes(x.value)
              );
              return (
                <li key={x.id}>
                  <label>
                    <input
                      type="checkbox"
                      value={x.value}
                      onChange={props.handleChange}
                    />
                    <span> {x.label}</span>
                    <span key={x.id} className="total">
                      ({compatibility.length})
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="list">
          <p className="heading">
            <strong>Technology:</strong>
          </p>
          <ul>
            {techOptions[0].subdata.map((x) => {
              const technology = props.data.filter(
                (data) => data.technology === x.value
              );
              return (
                <li key={x.id}>
                  <label>
                    <input
                      type="checkbox"
                      value={x.value}
                      onChange={props.handleChange}
                    />
                    <span> {x.label}</span>
                    <span key={x.id} className="total">
                      ({technology.length})
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </FiltersWrapper>
  );
};

export default Filters;
