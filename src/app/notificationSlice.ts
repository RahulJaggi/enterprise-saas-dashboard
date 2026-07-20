import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppNotification } from '../types';
import { initialNotifications } from '../services/mockData';

interface NotificationState {
  items: AppNotification[];
  unreadCount: number;
}

const initialState: NotificationState = {
  items: initialNotifications,
  unreadCount: initialNotifications.filter((n) => !n.isRead).length,
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      const item = state.items.find((n) => n.id === action.payload);
      if (item && !item.isRead) {
        item.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach((item) => {
        item.isRead = true;
      });
      state.unreadCount = 0;
    },
    addNotification: (state, action: PayloadAction<Omit<AppNotification, 'id' | 'isRead' | 'timestamp'>>) => {
      const newNotif: AppNotification = {
        ...action.payload,
        id: `notif-${Date.now()}`,
        isRead: false,
        timestamp: 'Just now',
      };
      state.items.unshift(newNotif);
      state.unreadCount += 1;
    },
  },
});

export const { markAsRead, markAllAsRead, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
