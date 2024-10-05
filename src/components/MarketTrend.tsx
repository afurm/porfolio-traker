import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography, Paper } from '@mui/material';

export interface MarketTrendProps {
  data: { date: string; price: number }[];
  coinName: string;
}

const MarketTrend: React.FC<MarketTrendProps> = ({ data, coinName }) => {
  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          {coinName} Market Trend
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default MarketTrend;