import React from "react";
import { Link } from "react-router-dom";

function GridCard(props) {
  return (
    <div>
      <div style={{ position: "relative", padding: "1rem 1rem" }}>
        <Link to={`/list/${props.item.id}`}>
          <img
            style={{ width: "240px", height: "280px" }}
            src={props.item.image}
            alt={props.item.title}
          />
        </Link>
      </div>
    </div>
  );
}

export default GridCard;
