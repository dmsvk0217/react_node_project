import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NavBar.css";

function NavBar() {
  const [isActive, setisActive] = useState(false);

  const toggleHandler = () => {
    setisActive(!isActive);
  };

  const logoutHandler = () => {
    const endPoint = "/api/user/logout"; // find all

    axios
      .post(endPoint)
      .then((res) => {
        //res.data로 lists가 넘어옴.
        console.log(res.data);
      })
      .catch((err) => {
        console.log("err is ", err);
      });
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
          <a href="#" onClick={logoutHandler}>
            logout
          </a>
        </li>
      </ul>
      <a href="#" className="toggleBtn" onClick={toggleHandler}>
        Btn
      </a>
    </nav>
  );
}

export default NavBar;
