import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import PortfolioSummary, { PortfolioSummaryProps } from '@/components/PortfolioSummary';

export default {
  title: 'Components/PortfolioSummary',
  component: PortfolioSummary,
} as Meta;

const Template: StoryFn<PortfolioSummaryProps> = (args) => <PortfolioSummary {...args} />;

export const Default = Template.bind({});
Default.args = {
  totalWorth: 50000,
  totalProfitLoss: 15000,
  profitLossPercentage: 30,
};

export const NegativeProfit = Template.bind({});
NegativeProfit.args = {
  totalWorth: 50000,
  totalProfitLoss: -5000,
  profitLossPercentage: -10,
};