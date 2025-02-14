import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

const CryptoDetailsCard = ({ crypto }) => {
  if (!crypto || !crypto.market_data || !crypto.market_data.sparkline_7d || !crypto.market_data.sparkline_7d.price) {
    return <p>📊 Données indisponibles pour le graphique.</p>;
  }

  const sparklineData = crypto.market_data.sparkline_7d.price.slice(-7); // ✅ Récupère les 7 derniers jours
  if (!sparklineData.length) {
    return <p>❌ Aucun historique disponible.</p>;
  }

  return (
    <div className="crypto-card">
      <h2>{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
      <p>Prix actuel : ${crypto.market_data.current_price.usd.toLocaleString()}</p>
      <p>Capitalisation : ${crypto.market_data.market_cap.usd.toLocaleString()}</p>
      <p>Volume 24h : ${crypto.market_data.total_volume.usd.toLocaleString()}</p>

      <Line
        data={{
          labels: ['7j', '6j', '5j', '4j', '3j', '2j', '1j'],
          datasets: [{
            label: 'Évolution du prix (USD)',
            data: sparklineData,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            fill: true,
          }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { display: true },
            y: { display: true }
          }
        }}
      />
    </div>
  );
};

export default CryptoDetailsCard;
