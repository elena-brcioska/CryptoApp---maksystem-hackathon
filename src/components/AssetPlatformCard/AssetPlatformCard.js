import React from "react";
import { Paper } from "@mui/material";
import styles from "./AssetPlatformCard.module.css"

const AssetPlatformCard = ({name}) => {
  return <Paper className={styles.card} sx={{margin: "16px 0"}}><p>{name}</p></Paper>;
};

export default AssetPlatformCard;
