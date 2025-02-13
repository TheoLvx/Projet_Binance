import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home"; 
import CryptoDetails from "./pages/CryptoDetails"; // Import CryptoDetails
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<h2>Portefeuille</h2>} />
        <Route path="/trading" element={<h2>Trading</h2>} />
        <Route path="/blog" element={<h2>Mini-Blog</h2>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/crypto/:id" element={<CryptoDetails />} /> {/* Route dynamique pour chaque crypto */}
      </Routes>
    </Router>
  );
};

export default App;
