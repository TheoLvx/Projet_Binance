export const getWalletData = () => {
    return JSON.parse(localStorage.getItem("wallet")) || { balance: 1000, cryptos: {} };
  };
  
  export const saveWalletData = (wallet) => {
    localStorage.setItem("wallet", JSON.stringify(wallet));
  };
  
  export const getTransactions = () => {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  };
  
  export const saveTransactions = (transactions) => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  };
  