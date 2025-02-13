import React, { useEffect, useState } from "react";
import { getWalletData } from "../utils/localStorage";

const Wallet = () => {
  const [wallet, setWallet] = useState(getWalletData());

  useEffect(() => {
    setWallet(getWalletData());
  }, []);

  return (
    <div className="wallet-container">
      <h2>💰 Mon Portefeuille</h2>
      <p>💵 Solde disponible : <strong>${wallet.balance.toFixed(2)}</strong></p>

      <h3>📊 Cryptos détenues :</h3>
      {Object.keys(wallet.cryptos).length > 0 ? (
        <ul>
          {Object.entries(wallet.cryptos).map(([crypto, amount]) => (
            <li key={crypto}>
              {crypto}: {amount.toFixed(4)}
            </li>
          ))}
        </ul>
      ) : (
        <p>🚀 Aucun actif pour le moment.</p>
      )}
    </div>
  );
};

export default Wallet;
