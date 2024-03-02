import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
      <Link to="/">Home</Link>
        <Link to="/coins">Cryptocurrencies</Link>
        <Link to="/platforms">Asset Platforms</Link>
      </div>
      <div className={styles.info}>
        <p>CryptoApp &copy; 2024</p>
      </div>
      <div className={styles.social}>
        <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://instagram.com/example" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;