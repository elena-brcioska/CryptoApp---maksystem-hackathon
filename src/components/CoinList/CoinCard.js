import React from 'react';
import styles from './CoinCard.module.css'
import { Paper } from '@mui/material';

const CoinCard = ({name, price, image}) => {
    return (
        <Paper elevation={3} className={styles.coincard}>

        {/* <div className={styles.coincard}> */}
            <img src={image} alt='coin' />
            <p>{name}</p>
            <p>${price}</p>
        {/* </div> */}
        </Paper>

    );
};

export default CoinCard;