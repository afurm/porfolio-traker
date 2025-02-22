import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Box, Typography, Paper } from '@mui/material';

export interface PortfolioAllocationProps {
  data: { asset: string; percentage: number }[];
}

const PortfolioAllocation: React.FC<PortfolioAllocationProps> = ({ data }) => {
  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Portfolio Allocation
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="asset" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Radar
              name="Allocation"
              dataKey="percentage"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default PortfolioAllocation;
