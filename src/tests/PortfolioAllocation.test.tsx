
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortfolioAllocation, { PortfolioAllocationProps } from '@/components/PortfolioAllocation';

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('PortfolioAllocation Component Snapshot Test', () => {
  it('renders correctly', () => {
    const mockData: PortfolioAllocationProps['data'] = [
      { asset: 'Bitcoin', percentage: 30 },
      { asset: 'Ethereum', percentage: 25 },
      { asset: 'Cardano', percentage: 15 },
      { asset: 'Litecoin', percentage: 10 },
      { asset: 'Polkadot', percentage: 20 },
    ];

    const { asFragment, getByText } = render(<PortfolioAllocation data={mockData} />);

    // Ensure that the title is present
    expect(getByText('Portfolio Allocation')).toBeInTheDocument();

    // Create a snapshot to validate the rendering
    expect(asFragment()).toMatchSnapshot();
  });
});
