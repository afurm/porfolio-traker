import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecentTransactions, { RecentTransactionsProps } from '@/components/RecentTransactions';

describe('RecentTransactions Component Snapshot Test', () => {
  it('renders correctly with no transactions', () => {
    const mockProps: RecentTransactionsProps = {
      transactions: [],
    };

    const { asFragment } = render(<RecentTransactions {...mockProps} />);

    // Take a snapshot of the initial rendering with no transactions
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with some transactions', () => {
    const mockProps: RecentTransactionsProps = {
      transactions: [
        {
          coinName: 'Bitcoin',
          amount: 1.5,
          type: 'buy',
          date: '2024-10-05',
        },
        {
          coinName: 'Ethereum',
          amount: 2,
          type: 'sell',
          date: '2024-10-06',
        },
        {
          coinName: 'Dogecoin',
          amount: 1000,
          type: 'buy',
          date: '2024-10-07',
        },
      ],
    };

    const { asFragment } = render(<RecentTransactions {...mockProps} />);

    // Take a snapshot of the rendering with some transactions
    expect(asFragment()).toMatchSnapshot();
  });
});
