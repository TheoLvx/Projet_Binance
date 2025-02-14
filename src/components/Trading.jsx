import React, { useState } from 'react';

const Trading = ({ crypto }) => {
  const [amount, setAmount] = useState(0);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));  // Utilisateur connecté

  if (!loggedInUser) {
    return <h2>🔐 Vous devez être connecté pour trader.</h2>;
  }

  // Vérifie si les données de la crypto sont valides
  if (!crypto || !crypto.market_data || !crypto.market_data.current_price) {
    return <p>📊 Données crypto non valides.</p>;
  }

  const cryptoPrice = crypto.market_data.current_price.usd; // Récupérer le prix actuel

  const handleBuy = () => {
    // Vérifier que le montant d'achat est valide
    if (amount <= 0) {
      alert('Veuillez entrer un montant valide.');
      return;
    }
  
    // Calculer le coût total de l'achat
    const totalCost = cryptoPrice * amount;
  
    // Vérifier que l'utilisateur a suffisamment de fonds
    if (loggedInUser.balance < totalCost) {
      alert('Fonds insuffisants pour cet achat.');
      return;
    }
  
    // Initialiser le portefeuille si nécessaire
    const newPortfolio = loggedInUser.portfolio || {};  // Si portfolio n'existe pas, crée un objet vide
    const currentAmount = newPortfolio[crypto.name] || 0; // Si la crypto n'est pas encore dans le portefeuille, initialiser à 0
  
    // Ajouter la quantité achetée de la crypto au portefeuille
    newPortfolio[crypto.name] = currentAmount + amount;
  
    // Mettre à jour le solde de l'utilisateur
    const newBalance = loggedInUser.balance - totalCost;
  
    // Créer un nouvel objet utilisateur avec les nouvelles valeurs
    const updatedUser = {
      ...loggedInUser,
      balance: newBalance,    // Nouveau solde
      portfolio: newPortfolio // Nouveau portefeuille avec la crypto ajoutée
    };
  
    // Mettre à jour le `localStorage` avec les nouvelles informations
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
  
    // Mettre à jour l'affichage ou l'état du composant si nécessaire
    alert(`Achat de ${amount} ${crypto.name} effectué avec succès !`);
  
    // Optionnel : Rediriger l'utilisateur ou réinitialiser certains états après l'achat
  };
  
  

  return (
    <div>
      <h2>🛒 Trading - {crypto.name} ({crypto.symbol.toUpperCase()})</h2>

      <div>
        <label>Montant:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button onClick={handleBuy}>Acheter</button>

      <h3>Solde actuel: {loggedInUser.balance} $</h3>
      <h3>Portefeuille:</h3>
      <ul>
        {Object.entries(loggedInUser.portfolio || {}).length === 0 ? (
          <p>Aucune crypto dans votre portefeuille.</p>
        ) : (
          Object.entries(loggedInUser.portfolio).map(([cryptoName, qty]) => (
            <li key={cryptoName}>
              {cryptoName}: {qty} unités
            </li>
          ))
        )}
      </ul>

      <p>Prix actuel de {crypto.name}: {cryptoPrice}$</p>
    </div>
  );
};

export default Trading;
