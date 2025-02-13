import React from 'react';
import { Line } from 'react-chartjs-2';

const CryptoDetailsCard = ({ crypto }) => {
  return (
    <div className="crypto-card">
      <h2>{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
      <p>Prix actuel : ${crypto.market_data.current_price.usd.toLocaleString()}</p>
      <p>Capitalisation : ${crypto.market_data.market_cap.usd.toLocaleString()}</p>
      <p>Volume 24h : ${crypto.market_data.total_volume.usd.toLocaleString()}</p>

      {/* Ajout d'un graphique simple */}
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
      />
    </div>
  );
};

export default CryptoDetailsCard;
