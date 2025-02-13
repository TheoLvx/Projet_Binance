import React, { useState } from "react";
import Wallet from "../components/Wallet";
import Trading from "../components/Trading";
import Crypto from "../components/Crypto";

const Home = () => {
  const [update, setUpdate] = useState(false);

  const handleTransaction = () => {
    setUpdate(!update);
  };

  return (
    <div className="container">
      {/* <h1>🚀 Crypto Trading</h1> */}
      <Crypto />
      {/* <Wallet key={update} />
      <Trading onTransaction={handleTransaction} /> */}
    </div>
  );
};

export default Home;
