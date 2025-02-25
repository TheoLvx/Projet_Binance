import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import "../styles/NavBar.css";

const Navbar = () => {
  const { user, loginUser, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logoutUser) {
      logoutUser();  
      navigate("/login");
    } else {
      console.error("Erreur : logoutUser n'est pas défini");
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">💹 Binance-Like</div>
      <ul className="nav-links">
        <li><Link to="/">🏠 Accueil</Link></li>
        <li><Link to="/wallet">💰 Portefeuille</Link></li>
        {user ? (
          <>
            <li className="user-info">👤 {user.username} - 💲{user.balance ?? 0}</li>
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
