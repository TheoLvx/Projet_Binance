import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MiniBlog from "../components/Miniblog";
import { Line } from 'react-chartjs-2';

const API_URL = 'https://api.coingecko.com/api/v3/coins/';

const CryptoDetails = () => {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}${id}`);
        const data = await response.json();
        setCrypto(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!crypto) return <p>Chargement...</p>;

  return (
    <div className="crypto-details-container">
      <h2>{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
      <p>Prix actuel : ${crypto.market_data.current_price.usd.toLocaleString()}</p>
      <p>Capitalisation : ${crypto.market_data.market_cap.usd.toLocaleString()}</p>
      <p>Volume 24h : ${crypto.market_data.total_volume.usd.toLocaleString()}</p>

       {/* Ajout d'un graphique simple
            <Line
              data={{
                labels: ['7j', '6j', '5j', '4j', '3j', '2j', '1j'],
                datasets: [{
                  label: 'Évolution du prix (USD)',
                  data: crypto.market_data.sparkline_7d.price.slice(-7),
                  borderColor: 'blue',
                  fill: false
                }]
              }}
            /> */}

            {/* Intégration du MiniBlog avec crypto.name */}
            <MiniBlog cryptoId={crypto.name.toLowerCase()}
      />
    </div>
  );
};

export default CryptoDetails;
