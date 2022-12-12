import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

function LoginPage() {
  const dispatch = useDispatch();
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
    const dataToSubmit = {
      email: email,
      password: password,
    };

    dispatch(loginUser(dataToSubmit))
      .then((response) => {
        // console.log(response);
        // console.log(response.data);
        if (response.payload.loginSuccess) {
          navigate("/", { replace: true });
        } else if (response.payload.notExistEmail) {
          setalramText("이메일에 해당하는 계정이 존재하지 않습니다.");
        } else if (response.payload.worngPassword) {
          setalramText("비밀번호가 틀렸습니다.");
        } else {
          setalramText(
            "[error] 로그인 과정에서 알 수 없는 에러가 발생했습니다."
          );
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
          <Link style={{ color: "black" }} to="/register">
            회원가입하러 가기
          </Link>
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
