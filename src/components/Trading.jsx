import React, { useState, useContext } from 'react';
import { UserContext } from '../components/UserContext';

const Trading = ({ crypto }) => {
  const { users, setUsers } = useContext(UserContext);  // Accède au contexte des utilisateurs
  const user = users && users.length > 0 ? users[0] : null; // Sécurise l'accès à l'utilisateur
  
  const [orderType, setOrderType] = useState('marketOrder');
  const [quantity, setQuantity] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Si aucun utilisateur n'est connecté, afficher un message d'erreur
  if (!user) {
    return <p>Veuillez vous connecter pour accéder à cette page.</p>;
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleLimitPriceChange = (e) => {
    setLimitPrice(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    const quantityNum = parseFloat(quantity);
    const limitPriceNum = parseFloat(limitPrice);

    // Vérification des entrées
    if (isNaN(quantityNum) || quantityNum <= 0) {
      setError('La quantité doit être un nombre positif.');
      return;
    }

    if (orderType === 'limitOrder' && (isNaN(limitPriceNum) || limitPriceNum <= 0)) {
      setError('Le prix limite doit être un nombre positif.');
      return;
    }

    const totalCost = quantityNum * crypto.market_data.current_price.usd;

    // Vérification des fonds disponibles
    if (totalCost > user.balance) {
      setError('Fonds insuffisants pour effectuer cet achat.');
      return;
    }

    // Mise à jour du portefeuille et de la balance après un achat réussi
    const updatedBalance = user.balance - totalCost;
    const updatedPortfolio = { ...user.portfolio };

    if (updatedPortfolio[crypto.symbol]) {
      updatedPortfolio[crypto.symbol] += quantityNum;
    } else {
      updatedPortfolio[crypto.symbol] = quantityNum;
    }

    // Ajout d'une transaction dans l'historique des transactions
    const updatedTransactions = Array.isArray(user.transactions) ? [...user.transactions] : [];

    updatedTransactions.push({
      date: new Date().toLocaleString(),
      type: 'Achat',
      amount: quantityNum,
      crypto: crypto.symbol,
      info: `Achat à ${crypto.market_data.current_price.usd} USD`,
    });

    // Mettre à jour les informations utilisateur dans le contexte
    setUsers([
      {
        ...user,
        balance: updatedBalance,
        portfolio: updatedPortfolio,
        transactions: updatedTransactions,
      }
    ]);

    // Réinitialiser les champs après une transaction réussie
    setQuantity('');
    setLimitPrice('');
    setSuccess(`Achat de ${quantityNum} ${crypto.symbol} effectué avec succès.`);
  };

  return (
    <div className="trading-box">
      <div className="tabs">
        <button onClick={() => setOrderType('marketOrder')} className={orderType === 'marketOrder' ? 'active' : ''}>
          Acheter au marché
        </button>
        <button onClick={() => setOrderType('limitOrder')} className={orderType === 'limitOrder' ? 'active' : ''}>
          Ordre à cours limité
        </button>
      </div>

      <form onSubmit={handleOrderSubmit} className="order-form">
        <div>
          <label>Quantité :</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            required
          />
        </div>

        {orderType === 'limitOrder' && (
          <div>
            <label>Prix limite (USD) :</label>
            <input
              type="number"
              value={limitPrice}
              onChange={handleLimitPriceChange}
              required
            />
          </div>
        )}

        <button type="submit">Passer l'ordre</button>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default Trading;
