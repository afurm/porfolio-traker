import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '@/components/Navbar';

describe('Navbar Component Snapshot Test', () => {
  it('renders correctly', () => {
    const { asFragment, getByText } = render(<Navbar />);

    // Ensure that the title and dashboard link are present
    expect(getByText('Crypto Portfolio Tracker')).toBeInTheDocument();
    expect(getByText('Dashboard')).toBeInTheDocument();

    // Create a snapshot to validate the rendering
    expect(asFragment()).toMatchSnapshot();
  });
});
