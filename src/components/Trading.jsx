import React, { useState, useContext } from 'react';
import { UserContext } from "../components/UserContext";  // ✅ Import du contexte

const Trading = ({ crypto }) => {
  const { user, updateUserPortfolio, updateUserBalance } = useContext(UserContext); // ✅ Récupère les fonctions du contexte
  const [amount, setAmount] = useState(0);

  if (!user) {
    return <h2>🔐 Vous devez être connecté pour trader.</h2>;
  }

  if (!crypto || !crypto.market_data || !crypto.market_data.current_price) {
    return <p>📊 Données crypto non valides.</p>;
  }

  const cryptoPrice = crypto.market_data.current_price.usd;

  const handleBuy = () => {
    if (amount <= 0) {
      alert('Veuillez entrer un montant valide.');
      return;
    }

    const totalCost = cryptoPrice * amount;

    if (user.balance < totalCost) {
      alert('Fonds insuffisants pour cet achat.');
      return;
    }

    updateUserPortfolio(crypto.symbol.toUpperCase(), amount); // ✅ Ajoute la crypto au portefeuille
    updateUserBalance(user.balance - totalCost); // ✅ Met à jour le solde

    alert(`Achat de ${amount} ${crypto.name} effectué avec succès !`);
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

      <h3>Solde actuel: {user.balance} $</h3>
      <h3>Portefeuille:</h3>
      <ul>
        {Object.entries(user.portfolio || {}).length === 0 ? (
          <p>Aucune crypto dans votre portefeuille.</p>
        ) : (
          Object.entries(user.portfolio).map(([cryptoName, qty]) => (
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
