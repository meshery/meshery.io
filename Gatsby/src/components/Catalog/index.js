import React from "react";
import Card from "./Card";
import  CommingSoonCard from "./Card/commingSoon_Card"
import { Row, Col } from "../../reusecore/Layout";

import { GridWrapper } from "./Grid.style";

const CatalogGrid = (props) => {

  return (
    <GridWrapper>
      <div className="resource-grid-wrapper">
        <Row>
          {props.data.map(( data ) => {
             if(data.Status !== "ComingSoon") {
           return ( <Col  xs={12} sm={6} xl={4}>   
             <Card data={data} />
            </Col>
           )
             }

            })}
         {props.data.map(( data ) => {
           if (data.Status === "ComingSoon") {
              return ( <Col  xs={12} sm={6} xl={4}>   
                <CommingSoonCard data={data} />
               </Col>
              )
             }
            })}
        </Row> 
      </div>
     </GridWrapper>
  );
};

export default CatalogGrid;
