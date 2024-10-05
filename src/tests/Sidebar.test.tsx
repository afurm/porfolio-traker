import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '@/components/Sidebar';

describe('Sidebar Component Snapshot Test', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Sidebar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
