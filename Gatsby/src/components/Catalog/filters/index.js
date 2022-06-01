import React from 'react'
import filtersoption from "./filter.options"
import FilterWrapper from "./filters.style"

const Filters = (props) => {
    // const data = React.useMemo(() => Filtersoption);
let typeOptions = filtersoption.filter((filtersoption) => filtersoption.category === "Categories");
let productOptions = filtersoption.filter((filtersoption) => filtersoption.category === "Compatibilty");
let meshOptions = filtersoption.filter((filtersoption) => filtersoption.category === "Technology");
  return (
    <FilterWrapper>
      
      <p><strong>Categories</strong></p>
    <div className="list">
    <ul className="ul-open">
      {typeOptions.map((typeOptions) => {
        return typeOptions.subdata.map((x) =>{
          return(
        <li key={x.id}>
          <label>
            <input type="checkbox"  value={x.value}  onChange={props.handleChange} />
            <span> {x.label}</span>
            </label>
            </li>
          )})          
})}
      </ul>
      </div>
      <p><strong>Compatibilty</strong></p>
    <div className="list">
      <ul className= "ul-open">
      {productOptions[0].subdata.map((x) => (
          <li key={x.id}>
            <label>
              <input type="checkbox"  value={x.value}  onChange={props.handleChange} />
              <span> {x.label}</span>
            </label> 
          </li>
        ))}
      </ul>
    </div>
    <p><strong>Technology:</strong></p>
    <div className="list">
      <ul className= "ul-open">
        {meshOptions[0].subdata.map((x) => (
          <li key={x.id}>
            <label>
              <input type="checkbox"  value={x.value}   onChange={props.handleChange} />
              <span> {x.label}</span>
            </label> 
          </li>
        ))}
      </ul>
    </div> 
    </FilterWrapper>
  )
}

export default Filters