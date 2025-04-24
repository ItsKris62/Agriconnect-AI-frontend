import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'FARMER' | 'BUYER' | 'ADMIN';
  country: 'KENYA' | 'UGANDA' | 'TANZANIA';
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  isPasswordResetOpen: boolean;
  isFeedbackOpen: boolean; // Added
  login: (email: string, password: string) => Promise<void>;
  signup: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'FARMER' | 'BUYER' | 'ADMIN';
    country: 'KENYA' | 'UGANDA' | 'TANZANIA';
  }) => Promise<void>;
  logout: () => void;
  toggleLogin: () => void;
  toggleSignup: () => void;
  togglePasswordReset: () => void;
  toggleFeedback: () => void; // Added
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoginOpen: false,
      isSignupOpen: false,
      isPasswordResetOpen: false,
      isFeedbackOpen: false, // Added

      login: async (email: string, password: string) => {
        try {
          const response = await axios.post('/api/auth/login', { email, password });
          const { user, token } = response.data;
          set({ isAuthenticated: true, user, token, isLoginOpen: false });
          localStorage.setItem('token', token);
        } catch (error) {
          throw new Error('Login failed. Please check your credentials.');
        }
      },

      signup: async (data) => {
        try {
          const response = await axios.post('/api/auth/signup', data);
          const { user, token } = response.data;
          set({ isAuthenticated: true, user, token, isSignupOpen: false });
          localStorage.setItem('token', token);
        } catch (error) {
          throw new Error('Signup failed. Please try again.');
        }
      },

      logout: () => {
        set({ isAuthenticated: false, user: null, token: null });
        localStorage.removeItem('token');
      },

      toggleLogin: () =>
        set((state) => ({
          isLoginOpen: !state.isLoginOpen,
          isSignupOpen: false,
          isPasswordResetOpen: false,
          isFeedbackOpen: false, // Added
        })),

      toggleSignup: () =>
        set((state) => ({
          isSignupOpen: !state.isSignupOpen,
          isLoginOpen: false,
          isPasswordResetOpen: false,
          isFeedbackOpen: false, // Added
        })),

      togglePasswordReset: () =>
        set((state) => ({
          isPasswordResetOpen: !state.isPasswordResetOpen,
          isLoginOpen: false,
          isSignupOpen: false,
          isFeedbackOpen: false, // Added
        })),

      toggleFeedback: () =>
        set((state) => ({
          isFeedbackOpen: !state.isFeedbackOpen,
          isLoginOpen: false,
          isSignupOpen: false,
          isPasswordResetOpen: false,
        })), // Added
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);