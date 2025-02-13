import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nom, setNom] = useState("");
  const [mdp, setMdp] = useState(""); 
  const goTo = useNavigate(); 

  const inscrire = () => {
    if (!nom || !mdp) {
      alert("Remplis tous les champs !");
      return;
    }

    const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];

    const existe = utilisateurs.find((user) => user.nom === nom);
    if (existe) {
      alert("Ce nom est déjà pris !");
      return;
    }

    const nouvelUtilisateur = { nom, mdp };
    utilisateurs.push(nouvelUtilisateur);
    localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));

    alert("Compte créé !");
    goTo("/login");
  };

  return (
    <div className="inscription-container">
      <h2>📝 Inscription</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={mdp}
        onChange={(e) => setMdp(e.target.value)}
      />
      <button onClick={inscrire}>Créer un compte</button>
    </div>
  );
};

export default Register;
