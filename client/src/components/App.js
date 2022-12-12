import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./view/LandingPage/LandingPage";
import RegisterPage from "./view/RegisterPage/RegisterPage";
import LoginPage from "./view/LoginPage/LoginPage";
import ListDetailPage from "./view/ListDetail/ListDetailPage";
import NavBar from "./view/NavBar/NavBar";
import UpdateDetailPage from "./view/UpdateDetailPage/UpdateDetailPage";
import Auth from "../hoc/auth";

const AuthLandingPage = Auth(LandingPage, null);
const AuthLoginPage = Auth(LoginPage, false);
const AuthRegisterPage = Auth(RegisterPage, false);
const AuthListDetailPage = Auth(ListDetailPage, true);
const AuthUpdateDetailPage = Auth(UpdateDetailPage, true);

function App() {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <React.StrictMode>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<AuthLandingPage />} />
          <Route path="/login" element={<AuthLoginPage />} />
          <Route path="/register" element={<AuthRegisterPage />} />
          <Route path="/list/:listid" element={<AuthListDetailPage />} />
          <Route
            path="/updateList/:listid"
            element={<AuthUpdateDetailPage />}
          />
        </Routes>
      </Router>
    </React.StrictMode>
    /* </Suspense> */
  );
}

export default App;
