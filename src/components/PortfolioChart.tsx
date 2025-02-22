import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { Button, Box, Container } from '@mui/material';

export interface PortfolioChartProps {
  assets: { coinName: string; value: number }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const PortfolioChart: React.FC<PortfolioChartProps> = ({ assets }) => {
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');

  const handleChartToggle = () => {
    setChartType((prev) => (prev === 'pie' ? 'bar' : 'pie'));
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Button variant="contained" color="primary" onClick={handleChartToggle}>
          Toggle to {chartType === 'pie' ? 'Bar' : 'Pie'} Chart
        </Button>
      </Box>
      {chartType === 'pie' ? (
        <PieChart width={400} height={400}>
          <Pie
            data={assets}
            cx={200}
            cy={200}
            label={({ name, value }) => `${name}: $${value}`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            nameKey="coinName"
          >
            {assets.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number, name: string) => [`$${value}`, name]} />
          <Legend />
        </PieChart>
      ) : (
        <BarChart
          width={500}
          height={300}
          data={assets}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="coinName" />
          <YAxis />
          <Tooltip formatter={(value: number, name: string) => [`$${value}`, name]} />
          <Legend />
          <Bar dataKey="value" fill="#8884d8">
            {assets.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      )}
    </Container>
  );
};

export default PortfolioChart;
