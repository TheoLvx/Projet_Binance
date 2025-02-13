import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/UserContext"; 
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/login/Register.jsx";
import MiniBlog from "./pages/MiniBlog.jsx";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<h2>Portefeuille</h2>} />
          <Route path="/trading" element={<h2>Trading</h2>} />
          <Route path="/blog" element={<MiniBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
