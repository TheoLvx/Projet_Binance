import React, { useState } from 'react';
import "../styles/Trading.css";

const Trading = ({ crypto }) => {
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('buy');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')));

  if (!user) {
    return <h2>🔐 Vous devez être connecté pour trader.</h2>;
  }

  if (!crypto || !crypto.market_data || !crypto.market_data.current_price) {
    return <p>📊 Données crypto non valides.</p>;
  }

  const cryptoPrice = crypto.market_data.current_price.usd;
  const portfolio = user.portfolio || {};
  const ownedCrypto = portfolio[crypto.name] || 0;

  const handleTransaction = () => {
    const totalCost = cryptoPrice * amount;

    if (amount <= 0 || isNaN(amount)) {
      alert('Veuillez entrer un montant valide.');
      return;
    }

    if (transactionType === 'buy') {
      if (user.balance < totalCost) {
        alert('Fonds insuffisants pour cet achat.');
        return;
      }

      const newPortfolio = { ...portfolio, [crypto.name]: ownedCrypto + amount };
      const newBalance = user.balance - totalCost;

      updateUser(newBalance, newPortfolio);
      alert(`✅ Achat de ${amount} ${crypto.name} effectué !`);

    } else if (transactionType === 'sell') {
      if (ownedCrypto < amount) {
        alert(`Vous ne possédez que ${ownedCrypto} ${crypto.name}.`);
        return;
      }

      const newPortfolio = { ...portfolio, [crypto.name]: ownedCrypto - amount };
      if (newPortfolio[crypto.name] <= 0) delete newPortfolio[crypto.name];

      const newBalance = user.balance + totalCost;

      updateUser(newBalance, newPortfolio);
      alert(`✅ Vente de ${amount} ${crypto.name} effectuée !`);
    }
  };

  const updateUser = (newBalance, newPortfolio) => {
    const updatedUser = { ...user, balance: newBalance, portfolio: newPortfolio };
    setUser(updatedUser);
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
  };

  return (
    <div className="trading-container">
      <h2>🛒 Trading - {crypto.name} ({crypto.symbol.toUpperCase()})</h2>

      <div className="transaction-toggle">
        <div
          className={`toggle-option ${transactionType === 'buy' ? 'active' : ''}`}
          onClick={() => setTransactionType('buy')}
        >
          Achat
        </div>
        <div
          className={`toggle-option ${transactionType === 'sell' ? 'active' : ''}`}
          onClick={() => setTransactionType('sell')}
        >
          Vente
        </div>
      </div>

      <div className="amount-container">
        <label>Montant:</label>
        <input
          type="number"
          value={amount}
          min="1"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <p>Prix actuel de {crypto.name}: {cryptoPrice.toFixed(2)}$</p>

      <button
        className={`submit-button ${transactionType}`}
        onClick={handleTransaction}
      >
        {transactionType === 'buy' ? 'Acheter' : 'Vendre'}
      </button>
      

      <h3>💰 Solde actuel: {user.balance.toFixed(2)} $</h3>
      <h3> Portefeuille:</h3>

      <div className="portfolio">
        {Object.keys(user.portfolio).length === 0 ? (
          <p>Aucune crypto dans votre portefeuille.</p>
        ) : (
          Object.entries(user.portfolio).map(([cryptoName, qty]) => (
            <div className="portfolio-item" key={cryptoName}>
              <div className="crypto-box">
                <h4>{cryptoName}</h4>
                <p>Quantité: {qty}</p>
                <p>Prix: ${cryptoPrice.toFixed(2)}</p>
                <p>Total: ${(cryptoPrice * qty).toFixed(2)} USD</p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Trading;
