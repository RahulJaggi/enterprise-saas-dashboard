import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, UserProfile } from '../types';

const defaultUser: UserProfile = {
  id: 'usr-1',
  name: 'Rahul Jaggi',
  email: 'rahul.jaggi@enterprise.io',
  role: 'Super Admin',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  department: 'Executive Leadership',
  permissions: {
    users: { view: true, create: true, edit: true, delete: true },
    products: { view: true, create: true, edit: true, delete: true },
    orders: { view: true, create: true, edit: true, delete: true },
    analytics: { view: true, export: true },
    reports: { view: true, create: true, export: true },
    settings: { view: true, edit: true },
    auditLogs: { view: true },
  },
};

const initialState: AuthState = {
  user: defaultUser,
  token: 'mock-jwt-token-xyz-99410',
  isAuthenticated: true,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: UserProfile; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { loginSuccess, logout, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;
