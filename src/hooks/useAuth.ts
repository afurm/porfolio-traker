import { useSession, signIn, signOut } from 'next-auth/react';
import { useCallback } from 'react';

export function useAuth() {
  const { data: session, status } = useSession();

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  const user = session?.user;
  const accessToken = session?.user?.accessToken;

  const login = useCallback(async (provider: string, callbackUrl?: string) => {
    try {
      await signIn(provider, {
        callbackUrl: callbackUrl || '/dashboard',
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }, []);

  const getAuthHeader = useCallback(() => {
    if (!accessToken) return {};
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }, [accessToken]);

  return {
    isAuthenticated,
    isLoading,
    user,
    accessToken,
    login,
    logout,
    getAuthHeader,
  };
}
