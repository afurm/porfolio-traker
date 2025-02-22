import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Paper } from '@mui/material';

interface Transaction {
  coinName: string;
  amount: number;
  type: 'buy' | 'sell';
  date: string;
}

export interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Recent Transactions
        </Typography>
        {transactions.length === 0 ? (
          <Typography textAlign="center" variant="body1" color="textSecondary">
            No recent transactions found
          </Typography>
        ) : (
          <List>
            {transactions.map((transaction, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={`${transaction.type === 'buy' ? 'Bought' : 'Sold'} ${transaction.amount} ${transaction.coinName}`}
                    secondary={transaction.date}
                  />
                </ListItem>
                {index < transactions.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default RecentTransactions;
