import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Home"; // Garde Home


const App = () => {
  return (
    <Router>
      <Navbar /> {/* La navbar est ajoutée ici */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<h2>Portefeuille</h2>} />
        <Route path="/trading" element={<h2>Trading</h2>} />
        <Route path="/blog" element={<h2>Mini-Blog</h2>} />
        <Route path="/login" element={<h2>Connexion</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
