import React, { useEffect, useState } from 'react';
import CoinCard from '../../components/CoinList/CoinCard';
import { json, useLoaderData, useNavigate } from "react-router-dom";
import { Button } from '@mui/material';

const CoinList = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("loggedInUser");
  const data = useLoaderData();

  const [perPage, setPerPage] = useState(10); // Number of items to load initially
  const [totalLoaded, setTotalLoaded] = useState(10); // Total number of items loaded
  const [coins, setCoins] = useState([]); // State to hold loaded coins

  useEffect(() => {
    if (!user) {
      navigate("/access");
    }
  }, [user, navigate]);

  useEffect(() => {
    // Load initial set of coins when component mounts
    if (data && data.length > 0) {
      loadCoins(0, perPage);
    }
  }, [data, perPage]);

  const loadCoins = (start, end) => {
    setCoins(data.slice(start, end)); // Slice data to get subset of coins
  };

  const handleLoadMore = () => {
    const newPerPage = perPage + 10; // Increment perPage by 10
    setPerPage(newPerPage); // Update perPage state
    setTotalLoaded(totalLoaded + 10); // Update totalLoaded state
  };

  return (
    <div>
      {coins.map((coin) => (
        <CoinCard
          name={coin.name}
          price={coin.current_price}
          image={coin.image}
          key={coin.id}
        />
      ))}
      {totalLoaded < data.length && ( // Render load more button if more items available
        <Button onClick={handleLoadMore}>Load More</Button>
      )}
    </div>
  );
};

export const loader = () => {
  const user = localStorage.getItem("loggedInUser");

  if (user) {
    return fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en`)
      .then((response) => {
        if (!response.ok) {
          throw json({ message: "Could not fetch events" }, { status: 500 });
        } else {
          return response.json();
        }
      });
  } else {
    return Promise.reject(new Error('User not logged in')); // Reject promise if user is not logged in
  }
};

export default CoinList;
