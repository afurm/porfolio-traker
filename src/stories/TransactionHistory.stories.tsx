import React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Meta, StoryFn } from '@storybook/react';
import TransactionHistory from '@/components/TransactionHistory';

export default {
  title: 'Components/TransactionHistory',
  component: TransactionHistory,
} as Meta;

const theme = createTheme();

const Template: StoryFn<typeof TransactionHistory> = (args) => (
  <ThemeProvider theme={theme}>
    <Box sx={{ maxWidth: 1000, margin: '0 auto', padding: 4 }}>
      <TransactionHistory {...args} />
    </Box>
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  transactions: [
    {
      coinName: 'Bitcoin',
      amount: 1.5,
      transactionType: 'buy',
      date: '2024-10-06T18:04:06.528Z',
      currentPrice: 50000,
    },
    {
      coinName: 'Ethereum',
      amount: 10,
      transactionType: 'sell',
      date: '2024-10-05T15:30:00.528Z',
      currentPrice: 3500,
    },
    {
      coinName: 'Moonriver',
      amount: 100,
      transactionType: 'buy',
      date: '2024-10-04T12:20:00.528Z',
      currentPrice: 9.64,
    },
  ],
};

export const Empty = Template.bind({});
Empty.args = {
  transactions: [],
};
