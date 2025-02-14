import React, { useState, useContext } from "react";
import { UserContext } from "../components/UserContext";

const DepositWithdraw = () => {
  const { depositFunds, withdrawCrypto, user } = useContext(UserContext);
  const [amount, setAmount] = useState("");
  const [crypto, setCrypto] = useState("");
  const [address, setAddress] = useState("");

  const handleDeposit = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Saisis un montant valide !");
      return;
    }

    depositFunds(parseFloat(amount), crypto || null);

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

    if (!address) {
      alert("Entrez une adresse de retrait !");
      return;
    }

    withdrawCrypto(crypto, parseFloat(amount), address);

    setAmount("");
    setCrypto("");
    setAddress("");
  };

  return (
    <div>
      <h3>Déposer ou retirer des fonds</h3>
      <input
        type="number"
        placeholder="Montant"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
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

      <button onClick={handleDeposit}>💰 Déposer</button>
      <button onClick={handleWithdraw}>💸 Retirer</button>
    </div>
  );
};

export default DepositWithdraw;
