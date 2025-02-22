import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import InvestmentPerformance, {
  InvestmentPerformanceProps,
} from '@/components/InvestmentPerformance';

export default {
  title: 'Components/InvestmentPerformance',
  component: InvestmentPerformance,
} as Meta;

const Template: StoryFn<InvestmentPerformanceProps> = (args) => <InvestmentPerformance {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    { month: 'January', profit: 5000, loss: 1000 },
    { month: 'February', profit: 3000, loss: 2000 },
    { month: 'March', profit: 7000, loss: 1500 },
    { month: 'April', profit: 6000, loss: 3000 },
    { month: 'May', profit: 4000, loss: 2500 },
  ],
};

export const HighProfitMonths = Template.bind({});
HighProfitMonths.args = {
  data: [
    { month: 'June', profit: 10000, loss: 500 },
    { month: 'July', profit: 12000, loss: 800 },
    { month: 'August', profit: 15000, loss: 1000 },
  ],
};

export const HighLossMonths = Template.bind({});
HighLossMonths.args = {
  data: [
    { month: 'September', profit: 2000, loss: 7000 },
    { month: 'October', profit: 1000, loss: 8000 },
    { month: 'November', profit: 1500, loss: 9000 },
  ],
};
