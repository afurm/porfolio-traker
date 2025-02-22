import { renderHook, act } from '@testing-library/react';
import { usePortfolio } from '../usePortfolio';
import { AuthContext } from '@/context/AuthContext';
import { ReactNode } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import axios from 'axios';

// Mock firebase config
jest.mock('@/lib/firebaseConfig', () => ({
    firestore: {},
}));

// Mock other dependencies
jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    doc: jest.fn(),
    onSnapshot: jest.fn(),
}));

jest.mock('axios');

describe('usePortfolio', () => {
    const mockUser = { uid: '123', email: 'test@example.com' };
    const mockAssets = [
        { coinName: 'Bitcoin', amount: 1 },
        { coinName: 'Ethereum', amount: 2 },
    ];

    const mockAuthContext = {
        user: mockUser,
        login: jest.fn(),
        logout: jest.fn(),
    };

    const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthContext.Provider value={mockAuthContext}>
            {children}
        </AuthContext.Provider>
    );

    beforeEach(() => {
        jest.clearAllMocks();
        (collection as jest.Mock).mockReturnValue('portfolios');
        (doc as jest.Mock).mockReturnValue('userDoc');
    });

    it('initializes with loading state and empty assets', () => {
        (onSnapshot as jest.Mock).mockImplementation((_, callback) => {
            callback({ exists: () => false });
            return jest.fn();
        });

        const { result } = renderHook(() => usePortfolio(), { wrapper });
        expect(result.current.loading).toBe(false);
        expect(result.current.assets).toEqual([]);
    });

    it('fetches assets when user is authenticated', () => {
        (onSnapshot as jest.Mock).mockImplementation((_, callback) => {
            callback({ exists: () => true, data: () => ({ assets: mockAssets }) });
            return jest.fn();
        });

        const { result } = renderHook(() => usePortfolio(), { wrapper });
        expect(result.current.assets).toEqual(mockAssets);
    });

    it('fetches suggestions from API', async () => {
        const mockSuggestions = [
            { name: 'Bitcoin' },
            { name: 'Ethereum' },
        ];

        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: { coins: mockSuggestions },
        });

        const { result } = renderHook(() => usePortfolio(), { wrapper });

        await act(async () => {
            await result.current.fetchSuggestions('bit');
        });

        expect(result.current.suggestions).toEqual(['Bitcoin', 'Ethereum']);
    });

    it('handles API error when fetching suggestions', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

        const { result } = renderHook(() => usePortfolio(), { wrapper });

        await act(async () => {
            await result.current.fetchSuggestions('bit');
        });

        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });

    it('does not fetch suggestions for short queries', async () => {
        const { result } = renderHook(() => usePortfolio(), { wrapper });

        await act(async () => {
            await result.current.fetchSuggestions('b');
        });

        expect(axios.get).not.toHaveBeenCalled();
    });
}); 