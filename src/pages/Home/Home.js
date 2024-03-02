import React, { useEffect, useState } from "react";
import { redirect, useLoaderData } from "react-router";
import CoinCard from "../../components/CoinList/CoinCard";
import styles from "./Home.module.css";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const data = useLoaderData();

  useEffect(() => {
    if (data && data.length > 0) {
      setCoins(data);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <h2>Top 10 cryptocurrencies:</h2>
      {coins.map((coin) => (
        <CoinCard
          name={coin.name}
          price={coin.current_price}
          image={coin.image}
          marketCap={coin.market_cap}
          totalVolume={coin.total_volume}
          high24h={coin.high_24h}
          low24h={coin.low_24h}
          priceChange24h={coin.price_change_24h}
          symbol={coin.symbol}
          key={coin.id}
          id={coin.id}
        />
      ))}
    </div>
  );
};

export const loader = async (page) => {
  const user = localStorage.getItem("loggedInUser");

  if (user) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=false&locale=en`
    );
    return response;
  } else {
    return redirect("/access?mode=login");
  }
};

export default Home;
