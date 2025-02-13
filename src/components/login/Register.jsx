import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (storedUsers.find((u) => u.username === username)) {
      alert("Ce nom d'utilisateur est déjà pris !");
      return;
    }

    const newUser = { username, password };
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    alert("Inscription réussie !");
    navigate("/login"); // Rediriger vers la page de connexion
  };

  return (
    <div className="register-container">
      <h2>📝 Inscription</h2>
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
      <button onClick={handleRegister}>S'inscrire</button>
    </div>
  );
};

export default Register;
