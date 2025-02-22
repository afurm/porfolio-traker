import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Typography, Box } from '@mui/material';
import { formatCurrency } from '@/utils/formatCurrency';

export interface TransactionHistoryProps {
  transactions: Array<{
    coinName: string;
    amount: number;
    transactionType: 'buy' | 'sell';
    date: string;
    currentPrice: number;
  }>;
}

const TransactionRow = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.background.paper
      : theme.palette.background.default,
  transition: 'background-color 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.action.hover : theme.palette.grey[100],
  },
}));

const TransactionAmount = styled(Typography)<{ transactiontype: 'buy' | 'sell' }>(
  ({ theme, transactiontype }) => ({
    color: transactiontype === 'buy' ? theme.palette.success.main : theme.palette.error.main,
    fontWeight: 'bold',
  })
);

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          No transactions to display
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {transactions.map((transaction, index) => (
        <TransactionRow
          key={index}
          elevation={1}
          sx={(theme) => ({
            backgroundColor:
              transaction.transactionType === 'buy'
                ? theme.palette.success.light
                : theme.palette.error.light,
            '&:hover': {
              backgroundColor:
                transaction.transactionType === 'buy'
                  ? theme.palette.success.main
                  : theme.palette.error.main,
            },
          })}
        >
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {transaction.coinName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(transaction.date).toLocaleDateString()}
            </Typography>
          </Box>
          <Box textAlign="right">
            <TransactionAmount transactiontype={transaction.transactionType}>
              {transaction.transactionType === 'buy' ? '+' : '-'}
              {transaction.amount} {transaction.coinName}
            </TransactionAmount>
            <Typography variant="body2" color="text.secondary">
              @ {formatCurrency(transaction.currentPrice)}
            </Typography>
          </Box>
        </TransactionRow>
      ))}
    </Box>
  );
}
