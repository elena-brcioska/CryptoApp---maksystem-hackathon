import React, { useState } from "react";
import { useMyCoins } from "../../context/MyCoinsContext";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Paper, Typography } from "@mui/material";
import styles from "./MyCoins.module.css"

const MyCoins = () => {
  const { savedCoins, deleteSelectedCoins } = useMyCoins();
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const handleDeleteSelectedCoins = () => {
    deleteSelectedCoins(rowSelectionModel);
    setRowSelectionModel([]);
  };

  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "symbol", headerName: "Symbol", width: 110 },
    { field: "marketCap", headerName: "Market Cap", width: 160 },
    { field: "totalVolume", headerName: "Total Volume", width: 160 },
    { field: "high24h", headerName: "24h High", width: 160 },
    { field: "low24h", headerName: "24h Low", width: 160 },
    { field: "priceChange24h", headerName: "Price Change 24h", width: 160 },
  ];

  return (
    <div className={styles.container}>
      <h2>My Coins</h2>
      {savedCoins.length === 0 ? (
        <Paper elevation={3} style={{ padding: 250, margin: 20 }}>
          <Typography variant="h5" component="div">
            No saved coins to display
          </Typography>
        </Paper>
      ) : (
        <>
        <Paper>
          <DataGrid
            rows={savedCoins}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onRowSelectionModelChange={setRowSelectionModel}
            selectionModel={rowSelectionModel}
          />
        </Paper>
      <Button className={styles.delete} onClick={handleDeleteSelectedCoins}>Delete Selected Coins</Button>
      </>
      )}
    </div>
  );
};

export default MyCoins;
