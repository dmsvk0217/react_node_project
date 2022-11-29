import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import LandingPage from "./LandingPage";

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
