import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '@/components/Sidebar';
import { AuthContext } from '@/context/AuthContext';

describe('Sidebar Component', () => {
  it('renders correctly when user is authenticated', () => {
    const mockAuthContext = {
      user: { uid: '123', email: 'test@example.com' },
      login: jest.fn(),
      logout: jest.fn(),
    };

    const { asFragment } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <Sidebar />
      </AuthContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly when user is not authenticated', () => {
    const mockAuthContext = {
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
    };

    const { asFragment } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <Sidebar />
      </AuthContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
