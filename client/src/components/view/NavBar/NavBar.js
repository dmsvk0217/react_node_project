import React from "react";
import "./NavBar.css";

function NavBar() {
  const toggleHandler = () => {
    this.navbar__menu.classList.toggle("active");
    this.navbar__link.classList.toggle("active");
  };
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <a href="#">Welove</a>
      </div>
      <ul
        className="navbar__menu"
        ref={(c) => {
          this.navbar__menu = c;
        }}
      >
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Gallery</a>
        </li>
        <li>
          <a href="#">Weddings</a>
        </li>
        <li>
          <a href="#">FAQ</a>
        </li>
      </ul>
      <ul
        className="navbar__link"
        ref={(c) => {
          this.navbar__link = c;
        }}
      >
        <li>
          <a href="#">twitter</a>
        </li>
        <li>
          <a href="#">facebook</a>
        </li>
      </ul>
      <a href="#" className="navbar__toogleBtn" onClick={toggleHandler}>
        Btn
      </a>
    </nav>
  );
}

export default NavBar;
