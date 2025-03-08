import axios from 'axios';
import { getSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add a timeout to prevent hanging requests
  timeout: 10000,
});

// Add a request interceptor to include JWT token in requests
api.interceptors.request.use(
  async (config) => {
    // Get the session to access the JWT token
    const session = await getSession();

    // If there's a session with an access token, add it to the request headers
    if (session?.user?.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }

    // Add NextAuth token for OAuth callback validation
    if (process.env.NEXTAUTH_SECRET) {
      config.headers['X-NextAuth-Token'] = process.env.NEXTAUTH_SECRET;
    }

    return config;
  },
  (error) => {
    console.error('API request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Network errors (API not available)
    if (!error.response) {
      console.error('Network error - API may be unavailable:', error.message);
      // You could show a toast notification here
      return Promise.reject(new Error('API server is unavailable. Please try again later.'));
    }

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Redirect to sign-in page if unauthorized
      if (typeof window !== 'undefined') {
        window.location.href = '/signin';
      }
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// User API functions
export const userApi = {
  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/me');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData: { name?: string; email?: string; image?: string }) => {
    const response = await api.patch('/users', { user: userData });
    return response.data;
  },

  // OAuth callback to get JWT token
  oauthCallback: async (oauthData: {
    provider: string;
    provider_id: string;
    name: string;
    email: string;
    image?: string;
  }) => {
    const response = await api.post('/auth/oauth_callback', oauthData);
    return response.data;
  },

  // Login with email and password
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Register a new user
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    const response = await api.post('/auth/register', { user: userData });
    return response.data;
  },

  // Request email verification code
  requestVerificationCode: async (email: string) => {
    const response = await api.post('/auth/request_verification', { email });
    return response.data;
  },

  // Verify email with OTP code
  verifyEmail: async (email: string, code: string) => {
    const response = await api.post('/auth/verify_email', { email, code });
    return response.data;
  },

  // Validate token (used for direct token authentication)
  validateToken: async (token: string) => {
    const response = await api.post(
      '/auth/validate_token',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  // Request password reset
  requestPasswordReset: async (email: string) => {
    const response = await api.post('/auth/request_password_reset', { email });
    return response.data;
  },

  // Reset password with OTP code
  resetPassword: async (
    email: string,
    code: string,
    password: string,
    password_confirmation: string
  ) => {
    const response = await api.post('/auth/reset_password', {
      email,
      code,
      password,
      password_confirmation,
    });
    return response.data;
  },
};

export default api;
