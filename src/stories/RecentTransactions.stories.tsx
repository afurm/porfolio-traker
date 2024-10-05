
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import RecentTransactions, { RecentTransactionsProps } from '@/components/RecentTransactions';


export default {
  title: 'Components/RecentTransactions',
  component: RecentTransactions,
} as Meta;

const Template: StoryFn<RecentTransactionsProps> = (args) => <RecentTransactions {...args} />;

export const Default = Template.bind({});
Default.args = {
  transactions: [
    { coinName: 'Bitcoin', amount: 1.2, type: 'buy', date: '2024-10-01' },
    { coinName: 'Ethereum', amount: 3.5, type: 'sell', date: '2024-10-03' },
    { coinName: 'Dogecoin', amount: 500, type: 'buy', date: '2024-10-05' },
  ],
};

export const NoTransactions = Template.bind({});
NoTransactions.args = {
  transactions: [],
};