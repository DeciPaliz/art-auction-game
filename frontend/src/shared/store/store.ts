import { configureStore } from '@reduxjs/toolkit';
import join from '@features/join-route/store/join.slice';
import auth from './auth.slice';
import api, { apiSlice } from '../api/api.slice';
import notification from './notification.slice';

export const store = configureStore({
  reducer: { join, auth, api, notification },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
