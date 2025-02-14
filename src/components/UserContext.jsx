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

  const loginUser = (username, password) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find((u) => u.username === username && u.password === password);
    if (!foundUser) {
      alert("Identifiants incorrects !");
      return;
    }

    setUser(foundUser);
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
  };

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
      [crypto]: (user.portfolio[crypto] || 0) + quantity,
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

  const depositFunds = (amount) => {
    if (!user) return;

    let updatedUser = { ...user };
    updatedUser.balance += amount;

    addTransaction("Dépôt USD", "USD", amount, "Ajout de fonds");

    setUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === updatedUser.username ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const withdrawCrypto = (crypto, amount, address) => {
    if (!user || !user.portfolio || !user.portfolio[crypto] || user.portfolio[crypto] < amount) {
      alert("❌ Solde insuffisant !");
      return;
    }

    let updatedUser = { ...user };

    updatedUser.portfolio[crypto] -= amount;

    if (updatedUser.portfolio[crypto] <= 0) {
      delete updatedUser.portfolio[crypto];
    }

    addTransaction("Retrait", crypto, amount, `Envoyé à ${address}`);

    setUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === updatedUser.username ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert(`✅ Retrait de ${amount} ${crypto} envoyé à ${address}`);
  };

  const addTransaction = (type, crypto, amount, info) => {
    if (!user) return;

    const newTransaction = {
      date: new Date().toLocaleString(),
      type,
      crypto,
      amount,
      info,
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

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        updateUserBalance,
        updateUserPortfolio,
        depositFunds,
        withdrawCrypto,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
