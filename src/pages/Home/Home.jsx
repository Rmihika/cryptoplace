import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Show top 10 by default
    setDisplayCoin(allCoin.slice(0, 10));
  }, [allCoin]);

  useEffect(() => {
    // Live search as user types
    const filtered = allCoin.filter((coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // If search bar is empty, show top 10
    if (searchQuery.trim() === '') {
      setDisplayCoin(allCoin.slice(0, 10));
    } else {
      setDisplayCoin(filtered);
    }
  }, [searchQuery, allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>Largest Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search crypto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout header">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: 'center' }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>

        {displayCoin.length > 0 ? (
          displayCoin.slice(0, 10).map((item) => (
            <Link to={`/coin/${item.id}`} className="table-layout" key={item.id}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt={item.name} />
                <p>{`${item.name} - ${item.symbol.toUpperCase()}`}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h > 0 ? 'green' : 'red'}>
                {item.price_change_percentage_24h?.toFixed(2)}%
              </p>
              <p className="market-cap">{currency.symbol} {item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        ) : (
          <p className="no-results">No cryptocurrencies found for your search.</p>
        )}
      </div>
    </div>
  );
};

export default Home;