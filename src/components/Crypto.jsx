import React, { useEffect, useState } from 'react';
import { Table, Container, Title, Loader, Anchor } from '@mantine/core';

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets';
const API_PARAMS = '?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false';

const Crypto = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}${API_PARAMS}`);
        const data = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des cryptos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Title order={2} align="center" mb={20}>Top 20 Cryptomonnaies</Title>
      {loading ? (
        <Loader size="lg" />
      ) : (
        <Table highlightOnHover striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Symbole</th>
              <th>Prix (USD)</th>
              <th>Évolution 24h</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto, index) => (
              <tr key={crypto.id}>
                <td>{index + 1}</td>
                <td>
                  <Anchor href={`https://www.coingecko.com/fr/pi%C3%A8ces/${crypto.id}`} target="_blank" rel="noopener noreferrer">
                    {crypto.name}
                  </Anchor>
                </td>
                <td>{crypto.symbol.toUpperCase()}</td>
                <td>${crypto.current_price.toLocaleString()}</td>
                <td style={{ color: crypto.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Crypto;
