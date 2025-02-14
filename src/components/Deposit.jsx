import React, { useState, useContext } from "react";
import { UserContext } from "../components/UserContext";

const DepositWithdraw = () => {
  const { depositFunds, withdrawCrypto } = useContext(UserContext);
  const [depositAmount, setDepositAmount] = useState("");  // Montant du dépôt
  const [withdrawAmount, setWithdrawAmount] = useState(""); // Montant du retrait
  const [crypto, setCrypto] = useState("");
  const [address, setAddress] = useState("");

  const handleDeposit = () => {
    if (!depositAmount || isNaN(depositAmount) || depositAmount <= 0) {
      alert("Saisis un montant valide !");
      return;
    }

    depositFunds(parseFloat(depositAmount));

    setDepositAmount(""); // Réinitialisation du champ après dépôt
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || isNaN(withdrawAmount) || withdrawAmount <= 0) {
      alert("Saisis un montant valide !");
      return;
    }

    if (!crypto) {
      alert("Sélectionne une crypto !");
      return;
    }

    if (!address) {
      alert("Entrez une adresse de retrait !");
      return;
    }

    withdrawCrypto(crypto, parseFloat(withdrawAmount), address);

    setWithdrawAmount(""); // Réinitialisation du champ après retrait
    setCrypto("");
    setAddress("");
  };

  return (
    <div>
      <h3>Déposer ou retirer des fonds</h3>

      {/* Dépôt en USD */}
      <div>
        <h4>💰 Dépôt en USD</h4>
        <input
          type="number"
          placeholder="Montant en dollars"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button onClick={handleDeposit}>💰 Déposer</button>
      </div>

      {/* Retrait de cryptos */}
      <div>
        <h4>💸 Retrait de cryptos</h4>
        <input
          type="number"
          placeholder="Montant en crypto"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />
        <select value={crypto} onChange={(e) => setCrypto(e.target.value)}>
          <option value="">Sélectionne une crypto</option>
          <option value="BTC">Bitcoin</option>
          <option value="ETH">Ethereum</option>
          <option value="XRP">Ripple</option>
          <option value="ADA">Cardano</option>
          <option value="DOT">Polkadot</option>
        </select>
        <input
          type="text"
          placeholder="Adresse du portefeuille"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={handleWithdraw}>💸 Retirer</button>
      </div>
    </div>
  );
};

export default DepositWithdraw;
