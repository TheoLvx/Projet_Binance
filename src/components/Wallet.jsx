import React, { useContext } from "react";
import { UserContext } from "../components/UserContext";
import DepositWithdraw from "../components/Deposit";
import useAppelAPI from "./useAppelAPI";
import "../styles/Wallet.css";  // 🔥 Import du CSS amélioré

const Wallet = () => {
  const { user } = useContext(UserContext);
  const { cryptoPrices, loading } = useAppelAPI();

  if (!user) {
    return <h2 className="wallet-container">🔐 Vous devez être connecté pour voir votre portefeuille.</h2>;
  }

  const cryptoValue = Object.entries(user.portfolio || {}).reduce((total, [crypto, qty]) => {
    return total + (cryptoPrices[crypto] || 0) * qty;
  }, 0);

  const totalBalance = user.balance + cryptoValue;

  return (
    <div className="wallet-container"> {/* 🎨 Applique le style */}
      <h2>💰 Portefeuille</h2>
      <p className="wallet-balance">Solde en dollars : <span>{user.balance}$</span></p>
      {loading ? <p>Chargement...</p> : <p className="wallet-balance">Valeur des cryptos : <span>{cryptoValue.toFixed(2)}$</span></p>}
      <p className="wallet-balance">Valeur totale : <span>{totalBalance.toFixed(2)}$</span></p>

      <h3>📊 Cryptos détenues :</h3>
      <ul className="crypto-list">
        {Object.entries(user.portfolio || {}).length === 0 ? (
          <p>Aucune crypto.</p>
        ) : (
          Object.entries(user.portfolio).map(([crypto, qty]) => (
            <li key={crypto}>
              {crypto}: {qty} unités (~{(cryptoPrices[crypto] || 0) * qty}$)
            </li>
          ))
        )}
      </ul>

      <DepositWithdraw />

      <h3>📜 Historique des Transactions :</h3>
      <ul className="transaction-history">
        {user.transactions && user.transactions.length > 0 ? (
          user.transactions.map((tx, index) => (
            <li key={index}>
              <span>{tx.date}</span> - <strong>{tx.type}</strong> : {tx.amount} {tx.crypto} {tx.info}
            </li>
          ))
        ) : (
          <p>Aucun historique.</p>
        )}
      </ul>
    </div>
  );
};

export default Wallet;
