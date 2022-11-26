import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
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
    /*
    axios로 서버에게 register요청하기
    */
    axios // proxy 경로 적용이 왜 안되는지 모르겠음........ 적용이 안됐는데 왜 cors오류는 발생안하는지도 모르겠음......
      .post("http://localhost:7777/api/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data.registerSuccess) {
          // 회원가입성공 -> navigate를 사용하여 로그인 페이지로 라우팅
          console.log("[register] 회원가입 성공입니다.");
          navigate("/login", { replace: true });
        } else if (res.data.existUser) {
          // 이미존재하는 -> ajax 경고 "이메일에 해당하는 계정이 이미 존재합니다."
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
          <Link to="/login">로그인하러 가기</Link>
        </button>
      </div>
    </div>
  );
}

export default Register;
