import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import Sidebar from '@/components/Sidebar';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
} as Meta;

const Template: StoryFn = () => <Sidebar />;

export const Default = Template.bind({});
Default.parameters = {
  nextRouter: {
    path: '/dashboard',
    asPath: '/dashboard',
  },
};
