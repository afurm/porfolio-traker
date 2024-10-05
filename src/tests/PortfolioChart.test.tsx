import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortfolioChart, { PortfolioChartProps } from '@/components/PortfolioChart';

describe('PortfolioChart Component Snapshot Test', () => {
  it('renders correctly with Pie chart initially', () => {
    const mockData: PortfolioChartProps['assets'] = [
      { coinName: 'Bitcoin', value: 50 },
      { coinName: 'Ethereum', value: 30 },
      { coinName: 'Litecoin', value: 20 },
    ];

    const { asFragment, getByText } = render(<PortfolioChart assets={mockData} />);

    // Ensure the button text is "Toggle to Bar Chart"
    expect(getByText('Toggle to Bar Chart')).toBeInTheDocument();

    // Take a snapshot of the initial rendering (Pie chart)
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly when toggled to Bar chart', () => {
    const mockData: PortfolioChartProps['assets'] = [
      { coinName: 'Bitcoin', value: 50 },
      { coinName: 'Ethereum', value: 30 },
      { coinName: 'Litecoin', value: 20 },
    ];

    const { asFragment, getByText } = render(<PortfolioChart assets={mockData} />);

    // Simulate button click to toggle to Bar chart
    const toggleButton = getByText('Toggle to Bar Chart');
    fireEvent.click(toggleButton);

    // Ensure the button text updates to "Toggle to Pie Chart"
    expect(getByText('Toggle to Pie Chart')).toBeInTheDocument();

    // Take a snapshot after toggling (Bar chart)
    expect(asFragment()).toMatchSnapshot();
  });
});
