import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const goTo = useNavigate(); 

  const inscrire = () => {
    if (!username || !password) {
      alert("Remplis tous les champs !");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.username === username)) {
      alert("Ce nom d'utilisateur est déjà pris !");
      return;
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Compte créé !");
    goTo("/login");
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
      <button onClick={inscrire}>Créer un compte</button>
    </div>
  );
};

export default Register;
