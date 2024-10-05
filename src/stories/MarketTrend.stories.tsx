import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import MarketTrend, { MarketTrendProps } from '@/components/MarketTrend';


export default {
  title: 'Components/MarketTrend',
  component: MarketTrend,
} as Meta;

const Template: StoryFn<MarketTrendProps> = (args) => <MarketTrend {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    { date: '2024-09-01', price: 30000 },
    { date: '2024-09-02', price: 31000 },
    { date: '2024-09-03', price: 30500 },
    { date: '2024-09-04', price: 32000 },
    { date: '2024-09-05', price: 31500 },
  ],
  coinName: 'Bitcoin',
};

export const VolatileTrend = Template.bind({});
VolatileTrend.args = {
  data: [
    { date: '2024-09-01', price: 30000 },
    { date: '2024-09-02', price: 28000 },
    { date: '2024-09-03', price: 35000 },
    { date: '2024-09-04', price: 34000 },
    { date: '2024-09-05', price: 36000 },
  ],
  coinName: 'Ethereum',
};

export const SteadyIncrease = Template.bind({});
SteadyIncrease.args = {
  data: [
    { date: '2024-09-01', price: 100 },
    { date: '2024-09-02', price: 120 },
    { date: '2024-09-03', price: 140 },
    { date: '2024-09-04', price: 160 },
    { date: '2024-09-05', price: 180 },
  ],
  coinName: 'Litecoin',
};