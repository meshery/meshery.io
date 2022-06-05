import React from "react";
import  CardWrapper  from "./Card.style";

const Card = ({ data }) => {
  return (
    <CardWrapper >
      <div className="card">
      <div className="chip">
          <small className="pattern-type"> {data.type}</small>
        </div>
          <h4 className="pattern-name">
            {data.name}
          </h4>
          <img
            src = {data.image}
            imgStyle={{ objectFit: "contain" }}
            alt={data.name}
            className="pattern-image"
          />

          <h6 className="pattern-id">  {data.Id}</h6>
      </div>
    </CardWrapper>
  );
};

export default Card;
