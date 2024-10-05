import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortfolioSummary, { PortfolioSummaryProps } from '@/components/PortfolioSummary';

describe('PortfolioSummary Component Snapshot Test', () => {
  it('renders correctly with positive profit', () => {
    const mockProps: PortfolioSummaryProps = {
      totalWorth: 10000,
      totalProfitLoss: 2000,
      profitLossPercentage: 20,
    };

    const { asFragment } = render(<PortfolioSummary {...mockProps} />);

    // Take a snapshot of the initial rendering
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with negative profit', () => {
    const mockProps: PortfolioSummaryProps = {
      totalWorth: 10000,
      totalProfitLoss: -1500,
      profitLossPercentage: -15,
    };

    const { asFragment } = render(<PortfolioSummary {...mockProps} />);

    // Take a snapshot of the rendering when profit/loss is negative
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with zero profit', () => {
    const mockProps: PortfolioSummaryProps = {
      totalWorth: 10000,
      totalProfitLoss: 0,
      profitLossPercentage: 0,
    };

    const { asFragment } = render(<PortfolioSummary {...mockProps} />);

    // Take a snapshot of the rendering when profit/loss is zero
    expect(asFragment()).toMatchSnapshot();
  });
});
