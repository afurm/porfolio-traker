import React from 'react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import AddCryptoForm from '@/components/AddCryptoForm';

describe('AddCryptoForm Snapshot Test', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<AddCryptoForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
