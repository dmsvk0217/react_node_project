import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/hello").then((res) => console.log(res));
  }, []);

  const onClickHandler = () => {
    axios.post("/api/users/logout").then((response) => {
      if (response.data) {
        navigate("/login", { replace: true });
      } else {
        alert("로그아웃에 실패하였습니다.");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작페이지 입니다.</h2>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default LandingPage;
