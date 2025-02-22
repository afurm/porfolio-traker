import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import AddCryptoForm from '@/components/AddCryptoForm';

export default {
  title: 'Components/AddCryptoForm',
  component: AddCryptoForm,
  argTypes: {
    onUpdatePortfolio: { action: 'updated' },
  },
} as Meta;

const Template = (args) => <AddCryptoForm />;

export const Default = Template.bind({});
Default.args = {
  onUpdatePortfolio: (coinName: string, amount: number, type: 'buy' | 'sell') => {
    console.log(`Transaction: ${type} ${amount} of ${coinName}`);
  },
};
