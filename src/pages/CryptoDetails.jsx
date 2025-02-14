import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CryptoDetailsCard from '../components/CryptoDetailsCard';

const API_URL = 'https://api.coingecko.com/api/v3/coins/';

const CryptoDetails = () => {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);
  const [sparklineData, setSparklineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const response = await fetch(`${API_URL}${id}?localization=false&sparkline=true`);
        const data = await response.json();
        setCrypto(data);

        if (data.market_data.sparkline_7d) {
          console.log("Sparkline détecté dans API principale :", data.market_data.sparkline_7d.price);
          setSparklineData(data.market_data.sparkline_7d.price.slice(-7));
        } else {
          console.warn("⚠ `sparkline_7d` absent, récupération via market_chart...");
          fetchHistoricalData();
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrypto();
  }, [id]);

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`);
      const data = await response.json();

      console.log("Données historiques récupérées :", data);

      setSparklineData(data.prices.map(price => price[1]));
    } catch (error) {
      console.error("Erreur lors de la récupération des données historiques :", error);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!crypto) return <p>Crypto introuvable.</p>;

  return (
    <div className="crypto-details-container">
      {/* <h2>{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
      <p>Prix actuel : ${crypto.market_data.current_price.usd.toLocaleString()}</p>
      <p>Capitalisation : ${crypto.market_data.market_cap.usd.toLocaleString()}</p>
      <p>Volume 24h : ${crypto.market_data.total_volume.usd.toLocaleString()}</p> */}

       
      <CryptoDetailsCard crypto={crypto} sparklineData={sparklineData} />
    </div>
  );
};

export default CryptoDetails;
