import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/UserContext"; 
import Navbar from "./components/Navbar";
import Login from "./components/login/Login.jsx";
import Register from "./components/login/Register.jsx";
import MiniBlog from "./pages/MiniBlog.jsx";
import Home from "./pages/Home"; 
import CryptoDetails from "./pages/CryptoDetails"; 
import "./App.css";
import Wallet from "./components/Wallet.jsx";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/trading" element={<h2>Trading</h2>} />
          <Route path="/blog" element={<h2>Mini-Blog</h2>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/crypto/:id" element={<CryptoDetails />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
