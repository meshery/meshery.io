import React from "react";

// Components
import CatalogGrid from "./index";
import DataWrapper from "./DataWrapper";
import { options } from "./filters/options";


const CatalogList = (props) => {
  let data = [];
  let all = [];
  //arrays to store filtered list of resources based on individual filters
  let categoriesData = [];  
  let compatibilityData = [];  
  let techData = [];   
  let result = [];
  
  //arrays storing the options selected to filter
  let categories =[];
  let compatibilities =[];
  let tech =[];

  const optionData = React.useMemo(() => options);
  let categoriesOptions = optionData.filter((data) => data.category === "Categories");
  let compatibiltyOptions = optionData.filter((data) => data.category === "Compatibilty");
  let technologyOptions = optionData.filter((data) => data.category === "Technology");

  //mapping all filters to separate individual category filters
  props.resources.map((type) => {
    categoriesOptions[0].subdata.map((x) => {
      if(type === x.value){
        categories.push(type);
      }
    });
    compatibiltyOptions[0].subdata.map((x) => {
      if(type === x.value){
        compatibilities.push(type);
      }
    });
    technologyOptions[0].subdata.map((x) => {
      if(type === x.value){
        tech.push(type);
      }
    });
  });

  let totalCategories = categories.length;
  let totalCompatibilities = compatibilities.length;
  let totalTech = tech.length;

  if(props.resources.length>0) {
    props.allResources.forEach((resources) => {
      all.push(resources);
      categories.map((category) => {
        if(resources.type === category) {
          categoriesData.push(resources);
        }
      });

      compatibilities.map((compatibility) => {
        if(resources.compatibility.includes(compatibility)) {
          compatibilityData.push(resources);
        }
      });

      tech.map((tech) => {
        if(resources.technology === tech) {
          techData.push(resources);
          console.log(resources)
        }
      });

      if(totalCategories === 0) categoriesData = all;
      if(totalCompatibilities === 0) compatibilityData = all;
      if(totalTech === 0) techData = all;

      result = [categoriesData, compatibilityData, techData]
      
      data = result.reduce((a, b) => a.filter(c => b.includes(c)));
    });
  } else{ 
    props.allResources.forEach((resources) => {
      data.push(resources);
    });
  }
    
    return <CatalogGrid data={[...new Set(data)]} {...props} />;

};

export default DataWrapper(CatalogList);
