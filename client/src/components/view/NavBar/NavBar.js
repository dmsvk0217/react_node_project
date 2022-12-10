import React, { useState, useRef } from "react";
import "./NavBar.css";

function NavBar() {
  const [isActive, setisActive] = useState(false);

  const toggleHandler = () => {
    setisActive(!isActive);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <a href="#">Welove</a>
      </div>
      <ul className={isActive ? "navbar__menu active" : "navbar__menu"}>
        <li>
          <a href="/">home</a>
        </li>
        <li>
          <a href="#">contact</a>
        </li>
        <li>
          <a href="#">gallery</a>
        </li>
        <li>
          <a href="#">FAQ</a>
        </li>
      </ul>
      <ul className={isActive ? "navbar__link active" : "navbar__link"}>
        <li>
          <a href="/login">login</a>
        </li>
        <li>
          <a href="#">facebook</a>
        </li>
      </ul>
      <a href="#" className="toggleBtn" onClick={toggleHandler}>
        Btn
      </a>
    </nav>
  );
}

export default NavBar;
