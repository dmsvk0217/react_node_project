import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./NavBar.css";
import NavState from "./NavState.js";

function NavBar() {
  const navigate = useNavigate();
  const [isActive, setisActive] = useState(false);

  const toggleHandler = () => {
    setisActive(!isActive);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">Welove</Link>
      </div>
      <ul className={isActive ? "navbar__menu active" : "navbar__menu"}>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="#">contact</Link>
        </li>
        <li>
          <Link to="#">gallery</Link>
        </li>
        <li>
          <Link to="#">FAQ</Link>
        </li>
      </ul>
      <ul className={isActive ? "navbar__link active" : "navbar__link"}>
        <NavState />
      </ul>
      <a href="#" className="toggleBtn" onClick={toggleHandler}>
        Btn
      </a>
    </nav>
  );
}

export default NavBar;
