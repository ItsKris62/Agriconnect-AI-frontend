import { create } from 'zustand';
import axios from 'axios';
import { useAuthStore } from './authStore';

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'FARMER' | 'BUYER' | 'ADMIN';
  country: 'KENYA' | 'UGANDA' | 'TANZANIA';
  phoneNumber?: string;
  county?: string;
  subCounty?: string;
  latitude?: number;
  longitude?: number;
  idNumber?: string;
  idImageUrl?: string;
  verificationStatus: 'NOT_VERIFIED' | 'VERIFIED';
  avatarUrl?: string;
  averageRating?: number;
};

type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    const { token } = useAuthStore.getState();
    if (!token) {
      set({ error: 'No authentication token found' });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await axios.get('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ user: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch user', loading: false });
    }
  },

  updateUser: async (data: Partial<User>) => {
    const { token } = useAuthStore.getState();
    if (!token) {
      set({ error: 'No authentication token found' });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await axios.patch('/api/user/profile', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ user: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to update user', loading: false });
    }
  },

  clearUser: () => set({ user: null, loading: false, error: null }),
}));