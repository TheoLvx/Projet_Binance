import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../components/UserContext";

const Wallet = () => {
  const { user } = useContext(UserContext);
  const [cryptoPrices, setCryptoPrices] = useState({});

  useEffect(() => {
    // 🔥 Récupérer les prix des cryptos en temps réel
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano,polkadot&vs_currencies=usd")
      .then(res => res.json())
      .then(data => setCryptoPrices({
        BTC: data.bitcoin.usd,
        ETH: data.ethereum.usd,
        XRP: data.ripple.usd,
        ADA: data.cardano.usd,
        DOT: data.polkadot.usd,
      }))
      .catch(err => console.error("Erreur API:", err));
  }, []);

  if (!user) {
    return <h2>🔐 Vous devez être connecté pour voir votre portefeuille.</h2>;
  }

  // ✅ Calculer la valeur des cryptos détenues
  const cryptoValue = Object.entries(user.portfolio || {}).reduce((total, [crypto, qty]) => {
    return total + (cryptoPrices[crypto] || 0) * qty;
  }, 0);

  // ✅ Calculer la valeur totale du portefeuille
  const totalBalance = user.balance + cryptoValue;

  return (
    <div className="wallet-container">
      <h2>💰 Portefeuille</h2>
      <p><strong>Solde en dollars :</strong> {user.balance}$</p>
      <p><strong>Valeur des cryptos :</strong> {cryptoValue.toFixed(2)}$</p>
      <p><strong>Valeur totale du portefeuille :</strong> {totalBalance.toFixed(2)}$</p>

      <h3>📊 Cryptos détenues :</h3>
      <ul>
        {Object.entries(user.portfolio || {}).length === 0 ? (
          <p>🚀 Vous n'avez encore aucune crypto !</p>
        ) : (
          Object.entries(user.portfolio).map(([crypto, qty]) => (
            <li key={crypto}>
              {crypto}: {qty} unités (~{(cryptoPrices[crypto] || 0) * qty}$)
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Wallet;
