import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PortfolioChart, { PortfolioChartProps } from '@/components/PortfolioChart';

export default {
  title: 'Components/PortfolioChart',
  component: PortfolioChart,
} as Meta;

const Template: StoryFn<PortfolioChartProps> = (args) => <PortfolioChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  assets: [
    { coinName: 'bitcoin', value: 1.5 },
    { coinName: 'ethereum', value: 3 },
    { coinName: 'dogecoin', value: 1000 },
  ],
};

export const BarChartView = Template.bind({});
BarChartView.args = {
  assets: [
    { coinName: 'bitcoin', value: 1.5 },
    { coinName: 'ethereum', value: 3 },
    { coinName: 'dogecoin', value: 1000 },
  ],
};
