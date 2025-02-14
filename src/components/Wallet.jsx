import React, { useContext } from "react";
import { UserContext } from "../components/UserContext";
import DepositWithdraw from "../components/Deposit";
import useAppelAPI from "./useAppelAPI";

const Wallet = () => {
  const { user } = useContext(UserContext);
  const { cryptoPrices, loading } = useAppelAPI();

  if (!user) {
    return <h2>🔐 Vous devez être connecté pour voir votre portefeuille.</h2>;
  }

  const cryptoValue = Object.entries(user.portfolio || {}).reduce((total, [crypto, qty]) => {
    return total + (cryptoPrices[crypto] || 0) * qty;
  }, 0);

  const totalBalance = user.balance + cryptoValue;

  return (
    <div>
      <h2>💰 Portefeuille</h2>
      <p>Solde en dollars : {user.balance}$</p> {/* ✅ Affichage dynamique */}
      {loading ? <p>Chargement...</p> : <p>Valeur des cryptos : {cryptoValue.toFixed(2)}$</p>}
      <p>Valeur totale : {totalBalance.toFixed(2)}$</p>

      <h3>Cryptos détenues :</h3>
      <ul>
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

      <h3>Historique des Transactions :</h3>
      <ul>
        {user.transactions && user.transactions.length > 0 ? (
          user.transactions.map((tx, index) => (
            <li key={index}>
              {tx.date} - {tx.type} : {tx.amount} {tx.crypto} {tx.info}
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
