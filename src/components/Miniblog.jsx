import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/MiniBlog.css";

const MiniBlog = ({ cryptoId }) => {
  const [crypto, setCrypto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
        const data = await response.json();
        setCrypto(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoDetails();
  }, [cryptoId]);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (!crypto) {
    return <p>Erreur : Crypto non trouvée</p>;
  }

  return (
    <div className="mini-blog">
      <h2>{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
      <p dangerouslySetInnerHTML={{ __html: crypto.description.fr || crypto.description.en }} />
    </div>
  );
};

MiniBlog.propTypes = {
  cryptoId: PropTypes.string.isRequired,
};

export default MiniBlog;
