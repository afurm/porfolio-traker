import React, { useState, useEffect } from 'react';
import { getCryptoList } from '@/api/cryptoService';
import { TextField, Button, Box, ToggleButtonGroup, ToggleButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { ref, set, push } from 'firebase/database';
import { database } from '../lib/firebaseConfig';

import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

interface Crypto {
  id: string;
  symbol: string;
  name: string;
}

const AddCryptoForm = () => {
  const { user } = useAuth();
  const [coinName, setCoinName] = useState<string>('');
  const [amount, setAmount] = useState<number>();
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');
  const [suggestions, setSuggestions] = useState<Crypto[]>([]);
  const [cryptoList, setCryptoList] = useState<Crypto[]>([]);

  useEffect(() => {
    const fetchCryptoList = async () => {
      const data = await getCryptoList();
      setCryptoList(data);
    };
    fetchCryptoList();
  }, []);

  const fetchCoinPrice = async (coinId: string) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
      );
      return response.data[coinId]?.usd ?? 0;
    } catch (error) {
      console.error('Error fetching coin price:', error);
      return 0;
    }
  };

  // Function to write the transaction to Firebase Realtime Database
  const handleUpdatePortfolio = async (coinName: string, amount: number, type: 'buy' | 'sell') => {
    if (!user) {
      console.error('User is not authenticated');
      return;
    }

    try {
      // Find the corresponding coin ID for CoinGecko from the crypto list
      const coin = cryptoList.find((c) => c.name.toLowerCase() === coinName.toLowerCase());
      if (!coin) {
        console.error('Coin not found');
        return;
      }

      // Fetch the current price of the coin from CoinGecko
      const currentPrice = await fetchCoinPrice(coin.id);
      if (currentPrice === 0) {
        console.error('Unable to fetch coin price');
        return;
      }

      // Use the authenticated user's ID to store the transaction in their specific path
      const userId = user.uid;
      const portfolioRef = ref(database, `users/${userId}/portfolio`);
      const newTransactionRef = push(portfolioRef);

      await set(newTransactionRef, {
        coinName,
        amount,
        transactionType: type,
        currentPrice, // Store the fetched price
        date: new Date().toISOString(), // Store the date in a readable format
      });

      console.log('Transaction added to Firebase successfully');
    } catch (error) {
      console.error('Error updating portfolio:', error);
    }
  };

  const handleToggleTransactionType = (event: React.MouseEvent<HTMLElement>, newType: 'buy' | 'sell' | null) => {
    if (newType !== null) {
      setTransactionType(newType);
    }
  };

  const handleCoinNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCoinName(value);

    if (value.length > 0) {
      const filteredSuggestions = cryptoList.filter((coin) =>
        coin.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setCoinName(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (coinName && amount > 0) {
      await handleUpdatePortfolio(coinName, amount, transactionType);
      setCoinName('');
      setAmount(0);
      setSuggestions([]);
    }
  };

  return (
    <Box
      component="div"
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      
        <form onSubmit={handleSubmit}>
          <ToggleButtonGroup
            value={transactionType}
            exclusive
            onChange={handleToggleTransactionType}
            sx={{ marginBottom: 2 }}
          >
            <ToggleButton value="buy" aria-label="buy">
              Buy
            </ToggleButton>
            <ToggleButton value="sell" aria-label="sell">
              Sell
            </ToggleButton>
          </ToggleButtonGroup>
          <TextField
            label="Coin Name"
            value={coinName}
            onChange={handleCoinNameChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          {suggestions.length > 0 && (
            <List>
              {suggestions.slice(0, 10).map((suggestion) => (
                <ListItem key={suggestion.id}>
                  <ListItemButton onClick={() => handleSelectSuggestion(suggestion.name)}>
                    <ListItemText
                      primary={`${suggestion.name} (${suggestion.symbol.toUpperCase()})`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
          <TextField
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit Transaction
          </Button>
        </form>
    </Box>
  );
};

export default AddCryptoForm;
