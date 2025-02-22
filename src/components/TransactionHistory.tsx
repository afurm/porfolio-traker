import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from '@mui/material';

export interface Transaction {
  coinName: string;
  amount: number;
  transactionType: 'buy' | 'sell';
  date: string;
  currentPrice: number; // Price at the time of the transaction
}

export interface TransactionHistoryProps {
  transactions: Transaction[];
}

export interface LatestPrices {
  [key: string]: number | undefined;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const theme = useTheme();
  const [latestPrices, setLatestPrices] = useState<LatestPrices>({});

  useEffect(() => {
    const fetchLatestPrices = async () => {
      try {
        // Create a unique list of coin names (e.g., ['bitcoin', 'ethereum'])
        const uniqueCoins = Array.from(
          new Set(transactions.map((tx) => tx.coinName.toLowerCase()))
        );

        // Fetch the latest price for all the unique coins from CoinGecko
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${uniqueCoins.join(',')}&vs_currencies=usd`
        );

        // Update the latest prices state
        const fetchedPrices: LatestPrices = {};
        uniqueCoins.forEach((coin) => {
          fetchedPrices[coin] = response.data[coin]?.usd;
        });

        setLatestPrices(fetchedPrices);
      } catch (error) {
        console.error('Error fetching latest prices:', error);
      }
    };

    if (transactions.length > 0) {
      fetchLatestPrices();
    }
  }, [transactions]);

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: theme.palette.background.default,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
        Transaction History
      </Typography>
      {transactions.length === 0 ? (
        <Typography textAlign="center" variant="body1" color="textSecondary">
          No transactions found
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ maxWidth: 800, mx: 'auto', borderRadius: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Coin</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Transaction Type</TableCell>
                <TableCell>Transaction Price (USD)</TableCell>
                <TableCell>Current Price (USD)</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => {
                // Fetch the latest price for this transaction's coin
                const latestPrice = latestPrices[transaction.coinName.toLowerCase()];

                return (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor:
                        transaction.transactionType === 'buy'
                          ? theme.palette.success.lighter
                          : theme.palette.error.lighter,
                      '&:hover': {
                        backgroundColor:
                          transaction.transactionType === 'buy'
                            ? theme.palette.success.light
                            : theme.palette.error.light,
                      },
                    }}
                  >
                    <TableCell>{transaction.coinName}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>
                      <Typography
                        color={
                          transaction.transactionType === 'buy' ? 'success.main' : 'error.main'
                        }
                      >
                        {transaction.transactionType.charAt(0).toUpperCase() +
                          transaction.transactionType.slice(1)}
                      </Typography>
                    </TableCell>
                    <TableCell>${transaction.currentPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      {latestPrice !== undefined ? `$${latestPrice.toFixed(2)}` : 'N/A'}
                    </TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TransactionHistory;
