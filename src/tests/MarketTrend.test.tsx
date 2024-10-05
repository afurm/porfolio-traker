import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MarketTrend, { MarketTrendProps } from '@/components/MarketTrend';

// Mock ResizeObserver to avoid errors during testing
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('MarketTrend Component Snapshot Test', () => {
  it('renders correctly with provided data', () => {
    const mockData: MarketTrendProps = {
      coinName: 'Bitcoin',
      data: [
        { date: '2024-09-01', price: 30000 },
        { date: '2024-09-02', price: 31000 },
        { date: '2024-09-03', price: 30500 },
        { date: '2024-09-04', price: 32000 },
        { date: '2024-09-05', price: 31500 },
      ],
    };

    const { asFragment, getByText } = render(<MarketTrend {...mockData} />);

    // Ensure that the coin name is displayed
    expect(getByText(`${mockData.coinName} Market Trend`)).toBeInTheDocument();

    // Create a snapshot of the MarketTrend component
    expect(asFragment()).toMatchSnapshot();
  });
});
