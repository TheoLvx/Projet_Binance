import React, { useState, useContext } from "react";
import { UserContext } from "../components/UserContext";

const DepositWithdraw = () => {
  const { depositFunds, withdrawCrypto } = useContext(UserContext);
  const [amount, setAmount] = useState("");
  const [crypto, setCrypto] = useState("");

  const handleDeposit = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Saisis un montant valide !");
      return;
    }

    if (crypto) {
      depositFunds(parseFloat(amount), crypto);
    } else {
      depositFunds(parseFloat(amount));
    }

    setAmount("");
    setCrypto("");
  };

  const handleWithdraw = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Saisis un montant valide !");
      return;
    }

    if (!crypto) {
      alert("Sélectionne une crypto !");
      return;
    }

    withdrawCrypto(crypto, parseFloat(amount));

    setAmount("");
    setCrypto("");
  };

  return (
    <div>
      <h3>Déposer ou retirer des fonds</h3>
      <div className="wallet-actions">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Montant"
          className="wallet-input"
        />
        <select value={crypto} onChange={(e) => setCrypto(e.target.value)}>
          <option value="">Sélectionne une crypto</option>
          <option value="BTC">Bitcoin</option>
          <option value="ETH">Ethereum</option>
          <option value="XRP">Ripple</option>
          <option value="ADA">Cardano</option>
          <option value="DOT">Polkadot</option>
        </select>
        <button className="wallet-btn deposit-btn" onClick={handleDeposit}>
          ➕ Déposer
        </button>
        <button className="wallet-btn withdraw-btn" onClick={handleWithdraw}>
          ➖ Retirer
        </button>
      </div>
    </div>
  );

};

export default DepositWithdraw;
