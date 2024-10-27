import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthSlice {
  accessToken: string | null;
}

const initialState: AuthSlice = {
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;

export default authSlice.reducer;
