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

  const loginUser = (userData) => {
    const updatedUser = { 
      ...userData, 
      balance: userData.balance ?? 10000, 
      portfolio: userData.portfolio ?? {} 
    };
    
    setUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === updatedUser.username ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const logoutUser = () => {
    setUser(null); // Réinitialiser l'état utilisateur
    localStorage.removeItem("loggedInUser"); // Supprimer l'utilisateur du localStorage
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

    const updatedPortfolio = { ...user.portfolio, [crypto]: (user.portfolio[crypto] || 0) + quantity };

    const updatedUser = { ...user, portfolio: updatedPortfolio };
    setUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === updatedUser.username ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <UserContext.Provider value={{ user, loginUser, updateUserBalance, updateUserPortfolio, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
  
};
