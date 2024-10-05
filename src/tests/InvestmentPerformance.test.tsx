import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InvestmentPerformance, { InvestmentPerformanceProps } from '@/components/InvestmentPerformance';

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Sample data for the tests
const testData: InvestmentPerformanceProps['data'] = [
  { month: 'January', profit: 5000, loss: 1000 },
  { month: 'February', profit: 3000, loss: 2000 },
  { month: 'March', profit: 7000, loss: 1500 },
];

describe('InvestmentPerformance Component', () => {
  // Snapshot Test
  it('matches snapshot', () => {
    const { asFragment } = render(<InvestmentPerformance data={testData} />);
    expect(asFragment()).toMatchSnapshot();
  });

  // Render Tests
  it('renders Investment Performance title', () => {
    render(<InvestmentPerformance data={testData} />);
    expect(screen.getByText('Investment Performance')).toBeInTheDocument();
  });
});
