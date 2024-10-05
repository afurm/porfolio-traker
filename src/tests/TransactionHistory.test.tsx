import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransactionHistory, { TransactionHistoryProps } from '@/components/TransactionHistory';

describe('TransactionHistory Component Snapshot Test', () => {
  it('renders correctly with transactions', () => {
    const props: TransactionHistoryProps = {
      transactions: [
        { coinName: 'Bitcoin', amount: 2, type: 'buy', date: '2024-10-01' },
        { coinName: 'Ethereum', amount: 5, type: 'sell', date: '2024-10-02' },
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
