import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import styles from "./CoinCard.module.css";
import { useMyCoins } from "../../context/MyCoinsContext";
import { useLocation } from "react-router";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CoinCard = ({
  name,
  price,
  image,
  symbol,
  marketCap,
  totalVolume,
  high24h,
  low24h,
  priceChange24h,
  id,
}) => {
  const location = useLocation();
  const { savedCoins, saveCoin } = useMyCoins();

  const isCoinSaved = savedCoins?.some((coin) => coin.name === name);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSaveCoin = () => {
    if (!isCoinSaved) {
      saveCoin({
        name,
        price,
        image,
        symbol,
        marketCap,
        totalVolume,
        high24h,
        low24h,
        priceChange24h,
        id,
      });
    }
    handleClose();
  };

  return (
    <div>
      <Accordion sx={{margin: "16px 0", border: "2px solid #331D2C", background: "#2f3136"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className={styles.coincard}>
            <div className={styles.name}>
              <img src={image} alt={name} />
              <p>{name}</p>
            </div>
            <div>
              <p>Symbol:</p>
              <p>
                <span>{symbol}</span>
              </p>
            </div>
            <div>
              <p>Price:</p>
              <p>
                <span>${price}</span>
              </p>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={`${styles.coincard} ${styles.details}`}>
            <div>
              <p>Market Cap:</p>
              <p>
                <span>{marketCap}</span>
              </p>
            </div>
            <div>
              <p>Price change 24h:</p>
              <p>
                <span>{priceChange24h}</span>
              </p>
            </div>
            <div>
              <p>Total Volume:</p>
              <p>
                <span>{totalVolume}</span>
              </p>
            </div>
            <div>
              <p>
                24h high: <span>{high24h}</span>
              </p>
              <p>
                24h low: <span>{low24h}</span>
              </p>
            </div>
          </div>
          <div>
            <Button className={styles.saved} onClick={handleOpen} disabled={isCoinSaved}>
              {isCoinSaved ? "Coin Saved" : "Save Coin"}
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h3">
            Save Coin Confirmation
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to save this coin?
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button className={styles.modal} onClick={handleClose} sx={{ my: 1 }}>
              Cancel
            </Button>
            <Button className={styles.modal} onClick={handleSaveCoin} sx={{ my: 1 }} variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CoinCard;
