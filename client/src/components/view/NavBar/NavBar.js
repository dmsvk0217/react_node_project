import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="navBar">
      <div className="navIcon">
        <p>Welove</p>
      </div>
      <div className="navMenus">
        <p className="navMenu">Home</p>
        <p className="navMenu">Gallery</p>
        <p className="navMenu">Weddings</p>
        <p className="navMenu">FAQ</p>
        <p className="navMenu">Bookings</p>
      </div>
      <div className="navLink">
        <p className="navLinks">twitter</p>
        <p className="navLinks">facebook</p>
        <p className="navLinks">youtube</p>
      </div>
      <div className="toggleButton">
        <p>toggle</p>
      </div>
    </div>
  );
}

export default NavBar;
