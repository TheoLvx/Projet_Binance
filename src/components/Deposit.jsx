import React, { useState, useContext } from "react";
import { UserContext } from "../components/UserContext";

const Deposit = () => {
  const { user, depositFunds, withdrawCrypto } = useContext(UserContext);
  const [depositAmount, setDepositAmount] = useState("");
  const [depositCrypto, setDepositCrypto] = useState("");

  const [withdrawCryptoType, setWithdrawCryptoType] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");

  const handleDeposit = () => {
    if (!depositAmount || isNaN(depositAmount) || depositAmount <= 0) {
      alert("Saisis un montant valide !");
      return;
    }

    if (depositCrypto) {
      depositFunds(parseFloat(depositAmount), depositCrypto);
    } else {
      depositFunds(parseFloat(depositAmount));
    }

    alert("✅ Dépôt effectué !");
    setDepositAmount("");
    setDepositCrypto("");
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || isNaN(withdrawAmount) || withdrawAmount <= 0) {
      alert("Saisis un montant valide !");
      return;
    }

    if (!withdrawCryptoType || !withdrawAddress) {
      alert("Sélectionne une crypto et entre une adresse !");
      return;
    }

    withdrawCrypto(withdrawCryptoType, parseFloat(withdrawAmount), withdrawAddress);
    setWithdrawCryptoType("");
    setWithdrawAmount("");
    setWithdrawAddress("");
  };

  return (
    <div className="deposit-withdraw-container">
      <h2>💰 Dépôt & Retrait</h2>

      <div className="deposit-section">
        <h3>🟢 Dépôt</h3>
        <input
          type="number"
          placeholder="Montant en USD ou Crypto"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Crypto (laisser vide pour USD)"
          value={depositCrypto}
          onChange={(e) => setDepositCrypto(e.target.value)}
        />
        <button onClick={handleDeposit}>💰 Déposer</button>
      </div>

      <div className="withdraw-section">
        <h3>🔴 Retrait</h3>
        <input
          type="text"
          placeholder="Crypto (ex: BTC, ETH)"
          value={withdrawCryptoType}
          onChange={(e) => setWithdrawCryptoType(e.target.value)}
        />
        <input
          type="number"
          placeholder="Montant"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Adresse du portefeuille"
          value={withdrawAddress}
          onChange={(e) => setWithdrawAddress(e.target.value)}
        />
        <button onClick={handleWithdraw}>📤 Retirer</button>
      </div>
    </div>
  );
};

export default Deposit;
