import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AssetPlatformCard from "../../components/AssetPlatformCard/AssetPlatformCard";
import { redirect, useLoaderData } from "react-router";
import ScrollToTopButton from "../../components/ScrollToTop/ScrollToTop";
import styles from "./AssetPlatforms.module.css"

const AssetPlatforms = () => {
  const [platforms, setPlatforms] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMorePlatforms, setHasMorePlatforms] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const data = useLoaderData();

  useEffect(() => {
    if (data && data.length > 0) {
      const initialPlatforms = data.slice(0, 10);
      setPlatforms(initialPlatforms);
      setPage(1);
    }
  }, [data]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const startIndex = nextPage * 10;
    const endIndex = startIndex + 10;
    if (data && endIndex <= data.length) {
      const nextPlatforms = data.slice(startIndex, endIndex);
      setPlatforms((prevPlatforms) => [...prevPlatforms, ...nextPlatforms]);
      setPage(nextPage);
    } else {
      setHasMorePlatforms(false);
    }
  };

  const filteredPlatforms = platforms.filter((platform) =>
    platform.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>Asset Platforms</h2>
      <TextField
        color="secondary"
        className={styles["search-field"]}
        label="Search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {filteredPlatforms.map((platform) => (
        <AssetPlatformCard
          name={platform.name}
          id={platform.id}
          key={platform.id}
        />
      ))}
      {hasMorePlatforms && (
        <Button className={styles["load-more"]} onClick={handleLoadMore} disabled={loading}>
          Load More
        </Button>
      )}
      {!hasMorePlatforms && <p>No more platforms to load</p>}

      <ScrollToTopButton />
    </div>
  );
};

export const loader = async () => {
  const user = localStorage.getItem("loggedInUser");

  if (user) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/asset_platforms`
    );
    const data = await response.json();
    return data;
  } else {
    return redirect("/access?mode=login");
  }
};

export default AssetPlatforms;
