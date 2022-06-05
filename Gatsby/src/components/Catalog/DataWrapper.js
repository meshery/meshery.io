import React from "react";

const DataWrapper = (WrappedComponent) => {
 
  return (props) => {
    return <WrappedComponent {...props} />;
  };
};

export default DataWrapper;
