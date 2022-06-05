import React from "react";
import { options } from "./options";


import FiltersWrapper from "./filters.style";

const Filters = (props) => {

  const data = React.useMemo(() => options);
  let categoriesOptions = data.filter((data) => data.category === "Categories");
  let compatibiltyOptions = data.filter((data) => data.category === "Compatibilty");
  let techOptions = data.filter((data) => data.category === "Technology");
  let i=0;


  return (
    <FiltersWrapper>
      <div className="filter">
        <div className="list">
        <p className="heading"><strong>Categories:</strong></p>
          <ul >
            {categoriesOptions[0].subdata.map((x) => (
              <li key={x.id}>
                <label>
                  <input type="checkbox"  value={x.value} onChange={props.handleChange} />
                  <span> {x.label}</span>     
                </label> 
              </li>
            ))}
          </ul>
        </div>

        <div className="list">
        <p className="heading"><strong>Compatibilty:</strong></p>
          <ul >
            {compatibiltyOptions[0].subdata.map((x) => (
              <li key={x.id}>
                <label>
                  <input type="checkbox"  value={x.value} onChange={props.handleChange} />
                  <span> {x.label}</span>
  
                </label> 
              </li>
            ))}
          </ul>
        </div>

        <div className="list">
        <p className="heading"><strong>Technology:</strong></p>
          <ul >
            {techOptions[0].subdata.map((x) => (
              <li key={x.id}>
                <label>
                  <input type="checkbox"  value={x.value} onChange={props.handleChange} />
                  <span> {x.label}</span>

                </label> 
              </li>
            ))}
          </ul>
        </div>
      

      </div>
      
    </FiltersWrapper>
  );
};

export default Filters;