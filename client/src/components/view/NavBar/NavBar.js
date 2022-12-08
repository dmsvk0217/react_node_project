import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="nav">
      <a className="navMenu" href="/">
        home
      </a>
      <a className="navMenu" href="/about">
        about
      </a>
      <a className="navMenu" href="/login">
        login
      </a>
    </div>
  );
}

export default NavBar;
