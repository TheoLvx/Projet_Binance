import React, { useState } from "react";
import Crypto from "../components/Crypto";

const Home = () => {
  const [update, setUpdate] = useState(false);

  const handleTransaction = () => {
    setUpdate(!update);
  };

  return (
    <div className="container">
      <Crypto />
    </div>
  );
};

export default Home;
