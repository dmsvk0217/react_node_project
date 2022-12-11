import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./view/LandingPage/LandingPage";
import RegisterPage from "./view/RegisterPage/RegisterPage";
import LoginPage from "./view/LoginPage/LoginPage";
import ListDetailPage from "./view/ListDetail/ListDetailPage";
import NavBar from "./view/NavBar/NavBar";
import UpdateDetailPage from "./view/UpdateDetailPage/UpdateDetailPage";

function App() {
  return (
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
}

export default App;
