import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransactionHistory, { TransactionHistoryProps } from '@/components/TransactionHistory';

describe('TransactionHistory Component Snapshot Test', () => {
  it('renders correctly with transactions', () => {
    const props: TransactionHistoryProps = {
      transactions: [
        {
          coinName: 'Bitcoin',
          amount: 2,
          transactionType: 'buy',
          date: '2024-10-01',
          currentPrice: 50000.00
        },
        {
          coinName: 'Ethereum',
          amount: 5,
          transactionType: 'sell',
          date: '2024-10-02',
          currentPrice: 3000.00
        },
      ],
    };
    const { asFragment } = render(<TransactionHistory {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly without transactions', () => {
    const props: TransactionHistoryProps = {
      transactions: [],
    };
    const { asFragment } = render(<TransactionHistory {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
