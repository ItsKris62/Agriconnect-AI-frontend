import apiClient from '../api/client';
import { useAuthStore } from '../zustand/authStore';

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/api/auth/login', { email, password });
  const { user, token } = response.data;
  useAuthStore.getState().login(email, password);
  return { user, token };
};

export const signup = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'FARMER' | 'BUYER' | 'ADMIN';
  country: 'KENYA' | 'UGANDA' | 'TANZANIA';
}) => {
  const response = await apiClient.post('/api/auth/signup', data);
  const { user, token } = response.data;
  useAuthStore.getState().signup(data);
  return { user, token };
};

export const requestPasswordReset = async (email: string) => {
  await apiClient.post('/api/auth/request-password-reset', { email });
};

export const resetPassword = async (token: string, newPassword: string) => {
  await apiClient.post('/api/auth/reset-password', { token, newPassword });
};

export const logout = () => {
  useAuthStore.getState().logout();
  useUserStore.getState().clearUser();
};