import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
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
        if (res.data.logoutSuccess) {
          navigate("/login", { replace: true });
        }
      })
      .catch((err) => {
        console.log("err is ", err);
      });
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
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <span onClick={logoutHandler}>logout</span>
        </li>
      </ul>
      <a href="#" className="toggleBtn" onClick={toggleHandler}>
        Btn
      </a>
    </nav>
  );
}

export default NavBar;
