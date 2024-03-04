import React, { createContext, useState, useContext, useEffect } from 'react';

export const MyCoinsContext = createContext();

export const MyCoinsProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [savedCoins, setSavedCoins] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
    const storedCoins = JSON.parse(localStorage.getItem(`savedCoins_${storedUser}`));
    if (storedCoins) {
      setSavedCoins(storedCoins);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('loggedInUser', loggedInUser);
  }, [loggedInUser]);

  useEffect(() => {
    localStorage.setItem(`savedCoins_${loggedInUser}`, JSON.stringify(savedCoins));
  }, [loggedInUser, savedCoins]);

  const saveCoin = (coin) => {
    setSavedCoins((prevCoins) => {
      const isCoinSaved = prevCoins.some((savedCoin) => savedCoin.id === coin.id);

      if (!isCoinSaved) {
        return [...prevCoins, coin];
      } else {
        return prevCoins;
      }
    });
  };


  const deleteSelectedCoins = (selectedCoinIds) => {
    setSavedCoins((prevCoins) => prevCoins.filter((coin) => !selectedCoinIds.includes(coin.id)));
  };

  const clearAll = () => {
    setLoggedInUser("");
    setSavedCoins([]);
    localStorage.clear()
  };

  return (
    <MyCoinsContext.Provider value={{ loggedInUser, setLoggedInUser, savedCoins, saveCoin, deleteSelectedCoins, clearAll }}>
      {children}
    </MyCoinsContext.Provider>
  );
};

export const useMyCoins = () => useContext(MyCoinsContext);
