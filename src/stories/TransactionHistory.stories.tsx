import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import TransactionHistory, { TransactionHistoryProps } from '@/components/TransactionHistory';

export default {
  title: 'Components/TransactionHistory',
  component: TransactionHistory,
} as Meta;

const Template: StoryFn<TransactionHistoryProps> = (args) => <TransactionHistory {...args} />;

export const Default = Template.bind({});
Default.args = {
  transactions: [
    {
      coinName: 'Bitcoin',
      amount: 0.5,
      type: 'buy',
      date: '2024-10-01',
    },
    {
      coinName: 'Ethereum',
      amount: 2,
      type: 'sell',
      date: '2024-10-03',
    },
    {
      coinName: 'Dogecoin',
      amount: 1000,
      type: 'buy',
      date: '2024-10-05',
    },
  ],
};

export const Empty = Template.bind({});
Empty.args = {
  transactions: [],
};