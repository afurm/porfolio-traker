import React from 'react';
import { Box, Typography, Container } from '@mui/material';

export interface PortfolioSummaryProps {
  totalWorth: number;
  totalProfitLoss: number;
  profitLossPercentage: number;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ totalWorth, totalProfitLoss, profitLossPercentage }) => {
  return (
    <Container maxWidth="sm" sx={{ p: 4, backgroundColor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Portfolio Summary
      </Typography>
      <Box display="flex" flexDirection="column" gap={3}>
        <Box display="flex" justifyContent="space-between">
          <Typography>Total Worth:</Typography>
          <Typography fontWeight="bold">${totalWorth.toFixed(2)}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>Total Profit/Loss:</Typography>
          <Typography fontWeight="bold" color={totalProfitLoss >= 0 ? 'green' : 'red'}>
            ${totalProfitLoss.toFixed(2)} ({profitLossPercentage.toFixed(2)}%)
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default PortfolioSummary;