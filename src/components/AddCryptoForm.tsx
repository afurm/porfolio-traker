import React, { useState, useEffect } from 'react';
import { getCryptoList } from '@/api/cryptoService';
import { TextField, Button, Box, ToggleButtonGroup, ToggleButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

interface Crypto {
  id: string;
  symbol: string;
  name: string;
}

const AddCryptoForm = () => {
  const [coinName, setCoinName] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');
  const [suggestions, setSuggestions] = useState<Crypto[]>([]);
  const [cryptoList, setCryptoList] = useState<Crypto[]>([]);

  const handleUpdatePortfolio = async (coinName: string, amount: number, type: 'buy' | 'sell') => {
 
  };

  useEffect(() => {
    const fetchCryptoList = async () => {
      const data = await getCryptoList();
      setCryptoList(data);
    };
    fetchCryptoList();
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (coinName && amount > 0) {
      handleUpdatePortfolio(coinName, amount, transactionType);
      setCoinName('');
      setAmount(0);
      setSuggestions([]);
    }
  };

  return (
    <Box component="div" sx={{ padding: 4, maxWidth: 600, margin: '0 auto', backgroundColor: '#ffffff', borderRadius: 2, boxShadow: 3 }}>
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
            {suggestions.slice(0, 10).map((suggestion, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => handleSelectSuggestion(suggestion.name)}>
                  <ListItemText primary={`${suggestion.name} (${suggestion.symbol.toUpperCase()})`} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
        <TextField
          label="Amount"
          type="number"
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