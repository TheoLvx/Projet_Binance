import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext"; 
import "../../styles/Login.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(UserContext); 
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      alert("Remplis tous les champs !");
      return;
    }
  
    loginUser(username, password);
    navigate("/wallet"); 
  };
  

  return (
    <div className="login-container">
      <h2>🔑 Connexion</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Se connecter</button>
      <p>Pas encore de compte ? <Link to="/register">Inscrivez-vous ici</Link></p>
    </div>
  );
};

export default Login;
