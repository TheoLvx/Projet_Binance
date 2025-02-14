import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const updateUserBalance = (newBalance) => {
    if (!user) return;
    
    const updatedUser = { ...user, balance: newBalance };
    setUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === updatedUser.username ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const updateUserPortfolio = (crypto, quantity) => {
    if (!user) return;

    const updatedPortfolio = { 
      ...user.portfolio, 
      [crypto]: (user.portfolio[crypto] || 0) + quantity 
    };

    const updatedUser = { ...user, portfolio: updatedPortfolio };
    setUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === updatedUser.username ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // ✅ Dépôt de fonds en dollars ou en cryptos
  const depositFunds = (amount, crypto = null) => {
    if (!user) return;

    if (crypto) {
      updateUserPortfolio(crypto, amount);
      addTransaction("Dépôt Crypto", crypto, amount, "N/A");
    } else {
      updateUserBalance(user.balance + amount);
      addTransaction("Dépôt USD", "USD", amount, "N/A");
    }
  };

  // ✅ Retrait de cryptos vers une adresse fictive
  const withdrawCrypto = (crypto, amount, address) => {
    if (!user || !user.portfolio[crypto] || user.portfolio[crypto] < amount) {
      alert("❌ Solde insuffisant pour ce retrait !");
      return;
    }

    updateUserPortfolio(crypto, -amount);
    addTransaction("Retrait", crypto, amount, address);
    alert(`✅ Retrait de ${amount} ${crypto} envoyé à ${address} !`);
  };

  // ✅ Ajouter une transaction à l'historique
  const addTransaction = (type, crypto, amount, info) => {
    if (!user) return;

    const newTransaction = {
      date: new Date().toLocaleString(),
      type,
      crypto,
      amount,
      info
    };

    const updatedTransactions = [...(user.transactions || []), newTransaction];
    const updatedUser = { ...user, transactions: updatedTransactions };

    setUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === updatedUser.username ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <UserContext.Provider value={{ 
      user, updateUserBalance, updateUserPortfolio, depositFunds, withdrawCrypto 
    }}>
      {children}
    </UserContext.Provider>
  );
};
