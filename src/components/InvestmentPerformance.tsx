import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography, Paper } from '@mui/material';

export interface InvestmentPerformanceProps {
  data: { month: string; profit: number; loss: number }[];
}

const InvestmentPerformance: React.FC<InvestmentPerformanceProps> = ({ data }) => {
  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Investment Performance
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="profit" fill="#4caf50" />
            <Bar dataKey="loss" fill="#f44336" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default InvestmentPerformance;