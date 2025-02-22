import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddCryptoForm from '../components/AddCryptoForm';
import { getCryptoList } from '@/api/cryptoService';
import { ref, set, push } from 'firebase/database';
import { database } from '@/lib/firebaseConfig';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';

// Mock the modules
jest.mock('@/api/cryptoService');
jest.mock('firebase/database');
jest.mock('axios');

// Mock data
const mockCryptoList = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
  { id: 'binancecoin', symbol: 'bnb', name: 'Binance Coin' },
];

const mockUser = {
  uid: 'test-user-id',
  email: 'test@example.com',
};

const mockAuthContext = {
  user: mockUser,
  login: jest.fn(),
  logout: jest.fn(),
};

describe('AddCryptoForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCryptoList as jest.Mock).mockResolvedValue(mockCryptoList);
    (axios.get as jest.Mock).mockResolvedValue({ data: { bitcoin: { usd: 50000 } } });
    (ref as jest.Mock).mockReturnValue({});
    (push as jest.Mock).mockReturnValue({});
    (set as jest.Mock).mockResolvedValue(undefined);
  });

  const renderComponent = () => {
    return render(
      <AuthContext.Provider value={mockAuthContext}>
        <AddCryptoForm />
      </AuthContext.Provider>
    );
  };

  it('renders the form with initial state', async () => {
    await act(async () => {
      renderComponent();
    });

    expect(screen.getByLabelText(/coin name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit transaction/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buy/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sell/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(getCryptoList).toHaveBeenCalledTimes(1);
    });
  });

  it('toggles transaction type between buy and sell', async () => {
    await act(async () => {
      renderComponent();
    });

    const buyButton = screen.getByRole('button', { name: /buy/i });
    const sellButton = screen.getByRole('button', { name: /sell/i });

    expect(buyButton).toHaveAttribute('aria-pressed', 'true');
    expect(sellButton).toHaveAttribute('aria-pressed', 'false');

    await act(async () => {
      fireEvent.click(sellButton);
    });

    expect(buyButton).toHaveAttribute('aria-pressed', 'false');
    expect(sellButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows suggestions when typing coin name', async () => {
    await act(async () => {
      renderComponent();
    });

    const coinNameInput = screen.getByLabelText(/coin name/i);
    await act(async () => {
      await userEvent.type(coinNameInput, 'bit');
    });

    await waitFor(() => {
      expect(screen.getByText(/bitcoin \(btc\)/i)).toBeInTheDocument();
    });
  });

  it('selects a suggestion when clicked', async () => {
    await act(async () => {
      renderComponent();
    });

    const coinNameInput = screen.getByLabelText(/coin name/i);
    await act(async () => {
      await userEvent.type(coinNameInput, 'bit');
    });

    await waitFor(() => {
      expect(screen.getByText(/bitcoin \(btc\)/i)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/bitcoin \(btc\)/i));
    });
    expect(coinNameInput).toHaveValue('Bitcoin');
  });

  it('handles form submission successfully', async () => {
    await act(async () => {
      renderComponent();
    });

    const coinNameInput = screen.getByLabelText(/coin name/i);
    const amountInput = screen.getByLabelText(/amount/i);

    await act(async () => {
      await userEvent.type(coinNameInput, 'Bitcoin');
      await userEvent.type(amountInput, '1');
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit transaction/i }));
    });

    await waitFor(() => {
      expect(ref).toHaveBeenCalledWith(database, 'users/test-user-id/portfolio');
      expect(push).toHaveBeenCalled();
      expect(set).toHaveBeenCalled();
    });

    expect(coinNameInput).toHaveValue('');
    expect(amountInput).toHaveValue('0');
  });

  it('handles errors during form submission', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (set as jest.Mock).mockRejectedValue(new Error('Firebase error'));

    await act(async () => {
      renderComponent();
    });

    const coinNameInput = screen.getByLabelText(/coin name/i);
    const amountInput = screen.getByLabelText(/amount/i);

    await act(async () => {
      await userEvent.type(coinNameInput, 'Bitcoin');
      await userEvent.type(amountInput, '1');
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit transaction/i }));
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error updating portfolio:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });

  it('handles errors when fetching coin price', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (axios.get as jest.Mock).mockRejectedValue(new Error('API error'));

    await act(async () => {
      renderComponent();
    });

    const coinNameInput = screen.getByLabelText(/coin name/i);
    const amountInput = screen.getByLabelText(/amount/i);

    await act(async () => {
      await userEvent.type(coinNameInput, 'Bitcoin');
      await userEvent.type(amountInput, '1');
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit transaction/i }));
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching coin price:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });

  it('prevents submission when user is not authenticated', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <AuthContext.Provider value={{ ...mockAuthContext, user: null }}>
        <AddCryptoForm />
      </AuthContext.Provider>
    );

    const coinNameInput = screen.getByLabelText(/coin name/i);
    const amountInput = screen.getByLabelText(/amount/i);

    await act(async () => {
      await userEvent.type(coinNameInput, 'Bitcoin');
      await userEvent.type(amountInput, '1');
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit transaction/i }));
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('User is not authenticated');
    });

    expect(push).not.toHaveBeenCalled();
    expect(set).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('prevents submission when coin is not found', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await act(async () => {
      renderComponent();
    });

    const coinNameInput = screen.getByLabelText(/coin name/i);
    const amountInput = screen.getByLabelText(/amount/i);

    await act(async () => {
      await userEvent.type(coinNameInput, 'InvalidCoin');
      await userEvent.type(amountInput, '1');
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit transaction/i }));
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Coin not found');
    });

    expect(push).not.toHaveBeenCalled();
    expect(set).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('should handle selecting a suggestion from the dropdown list', async () => {
    const mockUser = { uid: '123', email: 'test@example.com' };
    const mockCryptoList = [
      { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
      { id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
    ];
    (getCryptoList as jest.Mock).mockResolvedValue(mockCryptoList);

    const { getByRole, findByText } = render(
      <AuthContext.Provider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
        <AddCryptoForm />
      </AuthContext.Provider>
    );

    // Wait for the component to load the crypto list
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Type in the coin name input to trigger suggestions
    const coinInput = getByRole('textbox', { name: /coin name/i });
    await act(async () => {
      fireEvent.change(coinInput, { target: { value: 'bit' } });
    });

    // Wait for and click the suggestion
    const suggestion = await findByText('Bitcoin (BTC)');
    await act(async () => {
      fireEvent.click(suggestion);
    });

    // Verify the input has been updated with the selected coin
    expect(coinInput).toHaveValue('Bitcoin');
  });
});
