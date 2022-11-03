import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

// const AuthenticPage = Auth({ PAGENAME }, false)
// const AuthenticPage  = Auth( {PAGENAME} , false)

function App() {
  // router v6부터 element사용. element안에는 무조건 컴포넌트만
  // 함수는 들어갈 수 없으므로 auth()로 컴포넌트를 만든후에 element에 넣기.
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLandingPage />} />
        <Route path="/login" element={<AuthLoginPage />} />
        <Route path="/register" element={<AuthRegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
