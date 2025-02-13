import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">💹 Binance-Like</div>
      <ul className="nav-links">
        <li><Link to="/">🏠 Accueil</Link></li>
        <li><Link to="/portfolio">💰 Portefeuille</Link></li>
        <li><Link to="/trading">📈 Trading</Link></li>
        <li><Link to="/blog">📝 Mini-Blog</Link></li>
        {user ? (
          <>
            <li className="user-info">👤 {user.username}</li>
            <li><button className="logout-btn" onClick={handleLogout}>🚪 Déconnexion</button></li>
          </>
        ) : (
          <li><Link to="/login">🔑 Connexion</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
