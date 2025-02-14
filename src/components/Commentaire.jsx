import React, { useState, useEffect } from "react";
import "../styles/Commentaire.css";

const Commentaire = ({ cryptoId }) => {
  const [commentaire, setCommentaire] = useState("");
  const [commentaires, setCommentaires] = useState([]);
  const [username, setUsername] = useState("");

  // Charger l'utilisateur connecté depuis le localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser && storedUser.username) {
      setUsername(storedUser.username);
    }

    const savedCommentaires = JSON.parse(localStorage.getItem(`commentaires-${cryptoId}`)) || [];
    setCommentaires(savedCommentaires);
  }, [cryptoId]);

  // Ajouter un commentaire
  const ajouterCommentaire = () => {
    if (commentaire.trim() === "" || !username) return;

    const newComment = {
      user: username,
      message: commentaire,
    };

    const newCommentaires = [...commentaires, newComment];
    setCommentaires(newCommentaires);
    localStorage.setItem(`commentaires-${cryptoId}`, JSON.stringify(newCommentaires));
    setCommentaire("");
  };

  return (
    <div className="commentaire-container">
      <h3>💬 Commentaires</h3>
      <div className="commentaire-list">
        {commentaires.length > 0 ? (
          commentaires.map((com, index) => (
            <div key={index} className="commentaire">
              <strong>{com.user} :</strong> {com.message}
            </div>
          ))
        ) : (
          <p className="no-comment">Aucun commentaire pour le moment.</p>
        )}
      </div>

      <textarea
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
        placeholder="Laissez votre commentaire..."
      />
      <button onClick={ajouterCommentaire}>Envoyer</button>
    </div>
  );
};

export default Commentaire;
