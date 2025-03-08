import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { userApi } from '@/utils/api';

/**
 * NextAuth configuration options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password' },
        token: { label: 'Token', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null;
        }

        try {
          // If token is provided, use it directly (for email verification flow)
          if (credentials.token) {
            // Validate the token by making a request to the API
            try {
              const response = await userApi.validateToken(credentials.token);
              if (response.user) {
                return {
                  id: response.user.id,
                  name: response.user.name,
                  email: response.user.email,
                  image: response.user.image,
                  accessToken: credentials.token,
                };
              }
            } catch (error) {
              console.error('Token validation error:', error);
              return null;
            }
          }

          // Otherwise, use email/password authentication
          if (!credentials.password) {
            return null;
          }

          console.log('Using email/password for authentication');
          const response = await userApi.login({
            email: credentials.email,
            password: credentials.password,
          });
          console.log('Login response:', response);

          if (response.user && response.token) {
            return {
              id: response.user.id,
              name: response.user.name,
              email: response.user.email,
              image: response.user.image,
              accessToken: response.token,
            };
          }
          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log('JWT callback - token:', token);
      console.log('JWT callback - user:', user);

      // Initial sign in with OAuth
      if (account && user && account.provider === 'google') {
        try {
          // Send OAuth data to Rails API to get JWT token
          const response = await userApi.oauthCallback({
            provider: account.provider,
            provider_id: account.providerAccountId,
            name: user.name || '',
            email: user.email || '',
            image: user.image || '',
          });

          return {
            ...token,
            accessToken: response.token,
            userId: response.user.id,
            provider: account.provider,
          };
        } catch (error) {
          console.error('Error during JWT callback:', error);
          return token;
        }
      }

      // Sign in with credentials
      if (user && 'accessToken' in user) {
        console.log('Setting token from credentials');
        return {
          ...token,
          accessToken: user.accessToken as string,
          userId: user.id as string,
          provider: 'credentials',
        };
      }

      return token;
    },
    async session({ session, token }) {
      console.log('Session callback - token:', token);
      console.log('Session callback - session:', session);

      // Send properties to the client
      if (token.userId) {
        session.user.id = token.userId as string;
      }
      session.user.accessToken = token.accessToken as string | undefined;
      session.user.provider = token.provider as string | undefined;

      return session;
    },
  },
  pages: {
    signIn: '/signin',
    verifyRequest: '/verify-email',
  },
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
