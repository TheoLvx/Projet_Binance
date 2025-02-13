import React, { useState } from "react";
import { getWalletData, saveWalletData, getTransactions, saveTransactions } from "../utils/localStorage";

const cryptos = {
  BTC: 40000,
  ETH: 2800,
  XRP: 1.2
};

const Trading = ({ onTransaction }) => {
  const [wallet, setWallet] = useState(getWalletData());
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [amount, setAmount] = useState("");

  const handleBuy = () => {
    const cost = amount * cryptos[selectedCrypto];
    if (cost > wallet.balance) {
      alert("Fonds insuffisants !");
      return;
    }

    const newWallet = {
      ...wallet,
      balance: wallet.balance - cost,
      cryptos: {
        ...wallet.cryptos,
        [selectedCrypto]: (wallet.cryptos[selectedCrypto] || 0) + parseFloat(amount),
      },
    };

    setWallet(newWallet);
    saveWalletData(newWallet);
    saveTransactions([...getTransactions(), { type: "Achat", crypto: selectedCrypto, amount, price: cryptos[selectedCrypto] }]);

    onTransaction(); // Met à jour le portefeuille
    setAmount("");
  };

  const handleSell = () => {
    if (!wallet.cryptos[selectedCrypto] || wallet.cryptos[selectedCrypto] < amount) {
      alert("Pas assez de cryptos à vendre !");
      return;
    }

    const newWallet = {
      ...wallet,
      balance: wallet.balance + amount * cryptos[selectedCrypto],
      cryptos: {
        ...wallet.cryptos,
        [selectedCrypto]: wallet.cryptos[selectedCrypto] - parseFloat(amount),
      },
    };

    if (newWallet.cryptos[selectedCrypto] <= 0) {
      delete newWallet.cryptos[selectedCrypto];
    }

    setWallet(newWallet);
    saveWalletData(newWallet);
    saveTransactions([...getTransactions(), { type: "Vente", crypto: selectedCrypto, amount, price: cryptos[selectedCrypto] }]);

    onTransaction(); // Met à jour le portefeuille
    setAmount("");
  };

  return (
    <div className="trading-container">
      <h2>📈 Trading</h2>

      <label>Crypto :</label>
      <select value={selectedCrypto} onChange={(e) => setSelectedCrypto(e.target.value)}>
        {Object.keys(cryptos).map((crypto) => (
          <option key={crypto} value={crypto}>{crypto} (${cryptos[crypto]})</option>
        ))}
      </select>

      <input type="number" placeholder="Quantité" value={amount} onChange={(e) => setAmount(e.target.value)} />

      <div className="trading-buttons">
        <button className="btn-buy" onClick={handleBuy}>Acheter</button>
        <button className="btn-sell" onClick={handleSell}>Vendre</button>
      </div>
    </div>
  );
};

export default Trading;
