import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../app/authSlice';
import themeReducer from '../app/themeSlice';
import notificationReducer from '../app/notificationSlice';
import { baseApi } from '../services/baseApi';

export const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  notifications: notificationReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
