import { User } from '@/types';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  login: (user: User, token: string) => {
    set({ user, token, isLoggedIn: true });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },
  logout: () => {
    set({ user: null, token: null, isLoggedIn: false });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  setUser: (user: User) => {
    set({ user });
    localStorage.setItem('user', JSON.stringify(user));
  },
}));

// Initialize store from localStorage
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      useAuthStore.setState({ user, token, isLoggedIn: true });
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
    }
  }
}
