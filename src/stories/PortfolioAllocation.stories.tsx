import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PortfolioAllocation, { PortfolioAllocationProps } from '@/components/PortfolioAllocation';

export default {
  title: 'Components/PortfolioAllocation',
  component: PortfolioAllocation,
} as Meta;

const Template: StoryFn<PortfolioAllocationProps> = (args) => <PortfolioAllocation {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    { asset: 'Bitcoin', percentage: 30 },
    { asset: 'Ethereum', percentage: 25 },
    { asset: 'Cardano', percentage: 15 },
    { asset: 'Litecoin', percentage: 10 },
    { asset: 'Polkadot', percentage: 20 },
  ],
};

export const DiversifiedPortfolio = Template.bind({});
DiversifiedPortfolio.args = {
  data: [
    { asset: 'Bitcoin', percentage: 20 },
    { asset: 'Ethereum', percentage: 20 },
    { asset: 'Ripple', percentage: 10 },
    { asset: 'Cardano', percentage: 15 },
    { asset: 'Chainlink', percentage: 10 },
    { asset: 'Polkadot', percentage: 15 },
    { asset: 'Litecoin', percentage: 10 },
  ],
};

export const HighRiskAllocation = Template.bind({});
HighRiskAllocation.args = {
  data: [
    { asset: 'Dogecoin', percentage: 50 },
    { asset: 'Shiba Inu', percentage: 30 },
    { asset: 'Bitcoin', percentage: 10 },
    { asset: 'Ethereum', percentage: 10 },
  ],
};
