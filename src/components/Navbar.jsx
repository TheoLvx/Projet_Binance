import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">Binance-Like</div>
      <ul className="nav-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/portfolio">Portefeuille</Link></li>
        <li><Link to="/trading">Trading</Link></li>
        <li><Link to="/blog">Mini-Blog</Link></li>
        {user ? (
          <li>
            <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
          </li>
        ) : (
          <li><Link to="/login">Connexion</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
