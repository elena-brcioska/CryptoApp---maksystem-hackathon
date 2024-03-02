// ErrorPage.js
import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import styles from "./ErrorPage.module.css"

const ErrorPage = () => {
  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.message}>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" className={styles.message}>
        The page you are looking for might have been removed or doesn't exist.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Home
      </Button>
    </div>
  );
};

export default ErrorPage;
