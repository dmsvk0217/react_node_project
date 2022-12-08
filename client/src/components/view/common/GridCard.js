import React from "react";

function GridCard(props) {
  return (
    <div>
      <div style={{ position: "relative", padding: "1rem 1rem" }}>
        <a href={`/lists/${props.item.id}`}>
          <img
            style={{ width: "240px", height: "280px" }}
            src={props.item.image}
            alt={props.item.title}
          />
        </a>
      </div>
    </div>
  );
}

export default GridCard;
