import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthSlice {
  accessToken: string | null;
  authState: 'signin' | 'signup';
}

const initialState: AuthSlice = {
  accessToken: null,
  authState: localStorage.getItem('wasLoggedIn') === null ? 'signup' : 'signin',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
      state.authState = 'signin';
      localStorage.setItem('wasLoggedIn', 'true');
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
    switchState: (state) => {
      state.authState = state.authState === 'signin' ? 'signup' : 'signin';
    },
  },
});

export const { setAccessToken, clearAccessToken, switchState } =
  authSlice.actions;

export default authSlice.reducer;
