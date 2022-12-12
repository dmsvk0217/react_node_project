/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function NavState(props) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logoutHandler = () => {
    const endPoint = "/api/user/logout"; // find all

    axios
      .post(endPoint)
      .then((res) => {
        console.log(res.data);
        if (res.data.logoutSuccess) {
          console.log("로그아웃 성공 - 네이게이트");
          navigate("/login", { replace: true });
        }
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <li>
        <Link to="/login">login</Link>
      </li>
    );
  } else {
    return (
      <li>
        <Link onClick={logoutHandler} to="/login">
          logout
        </Link>
      </li>
    );
  }
}

export default NavState;
