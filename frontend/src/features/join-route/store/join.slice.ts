import { createSlice } from '@reduxjs/toolkit';

export type GameListOptions = {
  noPassword: boolean;
  started: boolean;
  unavailable: boolean;
};

export interface JoinSlice {
  gameListOptions: GameListOptions;
}

const initialState: JoinSlice = {
  gameListOptions: {
    noPassword: false,
    started: false,
    unavailable: false,
  },
};

export const joinSlice = createSlice({
  name: 'join',
  initialState,
  reducers: {
    switchPassword: (state) => {
      state.gameListOptions.noPassword = !state.gameListOptions.noPassword;
    },
    switchStarted: (state) => {
      state.gameListOptions.started = !state.gameListOptions.started;
    },
    switchUnavailable: (state) => {
      state.gameListOptions.unavailable = !state.gameListOptions.unavailable;
    },
  },
});

export const { switchPassword, switchStarted, switchUnavailable } =
  joinSlice.actions;

export default joinSlice.reducer;
