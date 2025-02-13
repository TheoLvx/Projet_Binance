import React, { useState } from "react";
import Wallet from "./Wallet";
import Trading from "./Trading";

const Home = () => {
  const [update, setUpdate] = useState(false);

  const handleTransaction = () => {
    setUpdate(!update);
  };

  return (
    <div className="container">
      <h1>🚀 Crypto Trading</h1>
      <Wallet key={update} />
      <Trading onTransaction={handleTransaction} />
    </div>
  );
};

export default Home;
