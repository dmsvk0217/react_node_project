import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alramText, setalramText] = useState("");

  const emailHandler = function (event) {
    setEmail(event.target.value);
  };
  const passwordHandler = function (event) {
    setPassword(event.target.value);
  };

  const loginHandler = function () {
    //axios로 서버에게 login요청하기
    axios
      .post("http://localhost:7777/api/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        // console.log("res.data.loginSuccess is ", res.data.loginSuccess);
        // console.log("res.data.notExistEmail is ", res.data.notExistEmail);
        // console.log("res.data.worngPassword is ", res.data.worngPassword);
        if (res.data.loginSuccess) {
          //성공적으로 로그인 된경우 -> 랜딩 페이지로 라우팅
          navigate("/main", { replace: false });
        } else if (res.data.notExistEmail) {
          //존재하지 않는 이메일인 경우 -> ajax 경고 "이메일에 해당하는 계정이 존재하지 않습니다."
          setalramText("이메일에 해당하는 계정이 존재하지 않습니다.");
        } else if (res.data.worngPassword) {
          //이메일은 맞지만 비밀번호가 틀린경우 -> ajax 경고 "비밀번호가 틀렸습니다."
          setalramText("비밀번호가 틀렸습니다.");
        } else {
          setalramText("[로그인] 이건 무슨 상황인가여..");
        }
      })
      .catch((err) => {
        console.log("err is ", err);
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
      <h1>로그인 페이지</h1>
      <h1>{alramText}</h1>
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

      <div>
        <button onClick={loginHandler}>로그인</button>
        <button>
          <Link to="/register">회원가입하러 가기</Link>
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
