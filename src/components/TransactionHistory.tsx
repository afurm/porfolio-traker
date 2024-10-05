import React from 'react';
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

interface Transaction {
  coinName: string;
  amount: number;
  type: 'buy' | 'sell';
  date: string;
}

export interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 4, backgroundColor: theme.palette.background.default, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
        Transaction History
      </Typography>
      {transactions.length === 0 ? (
        <Typography textAlign="center" variant="body1" color="textSecondary">
          No transactions found
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={3} sx={{ maxWidth: 800, mx: 'auto', borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Coin</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: transaction.type === 'buy' 
                      ? theme.palette.success.lighter 
                      : theme.palette.error.lighter,
                    '&:hover': {
                      backgroundColor: transaction.type === 'buy' 
                        ? theme.palette.success.light 
                        : theme.palette.error.light,
                    },
                  }}
                >
                  <TableCell>{transaction.coinName}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <Typography color={transaction.type === 'buy' ? 'success.main' : 'error.main'}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </Typography>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TransactionHistory;
