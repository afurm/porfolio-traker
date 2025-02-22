import { renderHook } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { AuthContext } from '@/context/AuthContext';

describe('useAuth', () => {
  it('throws error when used outside AuthProvider', () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within an AuthProvider');
  });

  it('returns auth context when used within AuthProvider', () => {
    const mockAuthContext = {
      user: { uid: '123', email: 'test@example.com' },
      login: jest.fn(),
      logout: jest.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={mockAuthContext}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toBe(mockAuthContext);
  });
});
