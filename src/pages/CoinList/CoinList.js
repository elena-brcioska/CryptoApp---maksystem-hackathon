import React, { useEffect, useState } from "react";
import CoinCard from "../../components/CoinList/CoinCard";
import { Button, TextField, CircularProgress, Box } from "@mui/material";
import ScrollToTopButton from "../../components/ScrollToTop/ScrollToTop";
import { redirect, useLoaderData } from "react-router";
import styles from "./CoinList.module.css";

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  const data = useLoaderData();

  const loadCoins = async (pageNum) => {
    setLoading(true);
    try {
      const response = await loader(pageNum);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data.length === 0) {
        setHasMore(false);
      }
      setCoins((prevCoins) => [...prevCoins, ...data]);
      setPage(pageNum);
    } catch (error) {
      console.error("Error loading coins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setCoins((prevCoins) => [...prevCoins, ...data]);
    }
  }, [data]);

  useEffect(() => {
    if (sortBy) {
      const sortedCoins = [...coins].sort((a, b) => {
        if (sortBy === "marketCap") {
          return isAscending
            ? a.market_cap - b.market_cap
            : b.market_cap - a.market_cap;
        } else if (sortBy === "price") {
          return isAscending
            ? a.current_price - b.current_price
            : b.current_price - a.current_price;
        }
        return 0;
      });
      setCoins(sortedCoins);
    }
  }, [sortBy, coins, isAscending]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    loadCoins(nextPage);
  };

  const filteredCoins = coins.filter((coin) => {
    const nameIncludesQuery = coin.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isInPriceRange =
      coin.current_price >= minPrice && coin.current_price <= maxPrice;
    return nameIncludesQuery && isInPriceRange;
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(parseFloat(event.target.value));
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(parseFloat(event.target.value));
  };

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setIsAscending(!isAscending);
    } else {
      setSortBy(criteria);
      setIsAscending(true);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Cryptocurrencies</h2>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column", // Column layout for extra small screens
            md: "row", // Row layout for medium screens and up
          },
          alignItems: "center", // Adjust as needed
          padding: {
            xs: 1, // Padding for extra small screens
            md: 2, // Padding for medium screens and up
          },
          // Other styles...
        }}
      >
        <TextField
          color="secondary"
          className={styles["search-field"]}
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <Box>
          <TextField
            className={styles["price-range-input"]}
            type="number"
            label="Min Price"
            value={minPrice}
            onChange={handleMinPriceChange}
            inputProps={{ step: "0.001" }}
          />
          <TextField
            className={styles["price-range-input"]}
            type="number"
            label="Max Price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            inputProps={{ step: "0.001" }}
          />
        </Box>
      </Box>

      <Button className={styles.sort} onClick={() => handleSort("marketCap")}>
        Sort by Market Cap{" "}
        {sortBy === "marketCap" ? (isAscending ? "↑" : "↓") : ""}
      </Button>
      <Button className={styles.sort} onClick={() => handleSort("price")}>
        Sort by Price {sortBy === "price" ? (isAscending ? "↑" : "↓") : ""}
      </Button>

      {filteredCoins.map((coin) => (
        <CoinCard
          className={styles["coin-card"]}
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

      {loading && (
        <Box textAlign="center" marginTop={2}>
          <CircularProgress />
        </Box>
      )}

      {!loading && hasMore && (
        <Button
          className={styles["load-more"]}
          variant="contained"
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      )}
      <ScrollToTopButton />
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

export default CoinList;
