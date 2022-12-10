import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./components/view/LandingPage/LandingPage";
import RegisterPage from "./components/view/RegisterPage/RegisterPage";
import LoginPage from "./components/view/LoginPage/LoginPage";
import ListDetailPage from "./components/view/ListDetail/ListDetailPage";
import NavBar from "./components/view/NavBar/NavBar";
import UpdateDetailPage from "./components/view/UpdateDetailPage/UpdateDetailPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NavBar />
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/nav" element={<NavBar />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/list/:listid" element={<ListDetailPage />} />
        <Route path="/updateList/:listid" element={<UpdateDetailPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
