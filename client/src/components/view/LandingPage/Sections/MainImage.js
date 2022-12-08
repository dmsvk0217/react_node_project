import React from "react";

export default function MainImage(props) {
  return (
    <div
      style={{
        backgroundImage: `url('${props.list.image}')`,
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
          <h2 style={{ color: "white" }}>{props.list.title}</h2>
          <p style={{ color: "white", fontSize: "1rem" }}>
            {props.list.description}
          </p>
        </div>
      </div>
    </div>
  );
}
