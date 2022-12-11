import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alramText, setalramText] = useState("");

  const nameHandler = function (event) {
    setName(event.target.value);
  };
  const emailHandler = function (event) {
    setEmail(event.target.value);
  };
  const passwordHandler = function (event) {
    setPassword(event.target.value);
  };

  const registerHandler = function () {
    const dataToSubmit = {
      name: name,
      email: email,
      password: password,
    };

    dispatch(registerUser(dataToSubmit))
      .then((response) => {
        console.log(response);
        console.log(response.payload);
        if (response.payload.registerSuccess) {
          console.log("[register] 회원가입 성공입니다.");
          navigate("/login", { replace: true });
        } else if (response.data.existUser) {
          setalramText("이메일에 해당하는 계정이 이미 존재합니다");
        } else {
          // other cases
          setalramText("무슨 케이스지?");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
      }}
    >
      <h1>회원가입 페이지</h1>
      <h1>{alramText}</h1>
      <div>
        이름
        <input type="text" value={name} name="name" onChange={nameHandler} />
      </div>
      <div>
        이메일
        <input type="text" value={email} name="email" onChange={emailHandler} />
      </div>
      <div>
        비밀번호
        <input
          type="text"
          value={password}
          name="password"
          onChange={passwordHandler}
        />
      </div>
      <br />
      <div>
        <button onClick={registerHandler}>제출하기</button>
        <button>
          <Link style={{ color: "black" }} to="/login">
            로그인하러 가기
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Register;
