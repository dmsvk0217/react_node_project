import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./components/view/LandingPage/LandingPage";
import RegisterPage from "./components/view/RegisterPage/RegisterPage";
import LoginPage from "./components/view/LoginPage/LoginPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
