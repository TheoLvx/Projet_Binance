import React, { useState } from 'react';

const Trading = ({ user, crypto }) => {
  const [orderType, setOrderType] = useState('marketOrder');
  const [quantity, setQuantity] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleLimitPriceChange = (e) => {
    setLimitPrice(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    const quantityNum = parseFloat(quantity);
    const limitPriceNum = parseFloat(limitPrice);

    if (isNaN(quantityNum) || quantityNum <= 0) {
      setError('La quantité doit être un nombre positif.');
      return;
    }

    if (orderType === 'limitOrder' && (isNaN(limitPriceNum) || limitPriceNum <= 0)) {
      setError('Le prix limite doit être un nombre positif.');
      return;
    }

    if (quantityNum * crypto.market_data.current_price.usd > user.balance) {
      setError('Fonds insuffisants pour effectuer cet achat.');
      return;
    }

    if (orderType === 'marketOrder') {
      setSuccess(`Achat de ${quantityNum} ${crypto.name} effectué au prix actuel.`);
    } else if (orderType === 'limitOrder') {
      setSuccess(`Ordre à cours limité passé pour acheter ${quantityNum} ${crypto.name} à ${limitPriceNum} USD.`);
    }

    setQuantity('');
    setLimitPrice('');
  };

  return (
    <div className="trading-box">
      <div className="tabs">
        <button
          onClick={() => setOrderType('marketOrder')}
          className={orderType === 'marketOrder' ? 'active' : ''}
        >
          Acheter au marché
        </button>
        <button
          onClick={() => setOrderType('limitOrder')}
          className={orderType === 'limitOrder' ? 'active' : ''}
        >
          Ordre à cours limité
        </button>
      </div>

      <form onSubmit={handleOrderSubmit} className="order-form">
        <div>
          <label>Quantité :</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            required
          />
        </div>

        {orderType === 'limitOrder' && (
          <div>
            <label>Prix limite (USD) :</label>
            <input
              type="number"
              value={limitPrice}
              onChange={handleLimitPriceChange}
              required
            />
          </div>
        )}

        <button type="submit">Passer l'ordre</button>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default Trading;
