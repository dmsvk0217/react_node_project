import React from "react";

export default function MainImage(props) {
  return (
    <div
      style={{
        backgroundImage: `url('${props.item.image}')`,
        height: "500px",
        backgroundPosition: "center, center",
        width: "100%",
        position: "relative",
      }}
    >
      <div>
        <div
          style={{
            position: "absolute",
            maxWidth: "500px",
            bottom: "2rem",
            marginLeft: "2rem",
          }}
        >
          <h2 style={{ color: "white" }}>{props.item.title}</h2>
          <p style={{ color: "white", fontSize: "1rem" }}>
            {props.item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
