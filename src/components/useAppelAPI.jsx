import { useState, useEffect } from "react";

const API_URL = "https://api.coingecko.com/api/v3/simple/price";

const useAppelAPI = (cryptoList = ["bitcoin", "ethereum", "ripple", "cardano", "polkadot"]) => {
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(`${API_URL}?ids=${cryptoList.join(",")}&vs_currencies=usd`);
        const data = await response.json();

        setCryptoPrices({
          BTC: data.bitcoin?.usd || 0,
          ETH: data.ethereum?.usd || 0,
          XRP: data.ripple?.usd || 0,
          ADA: data.cardano?.usd || 0,
          DOT: data.polkadot?.usd || 0,
        });

      } catch (err) {
        setError("Erreur lors du chargement des prix.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [cryptoList]);

  return { cryptoPrices, loading, error };
};

export default useAppelAPI; // ✅ Retourne bien `useAppelAPI`
