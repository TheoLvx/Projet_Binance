import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Binance-Like</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/portfolio">Portefeuille</Link></li>
        <li><Link to="/trading">Trading</Link></li>
        <li><Link to="/blog">Mini-Blog</Link></li>
        <li><Link to="/login">Connexion</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
