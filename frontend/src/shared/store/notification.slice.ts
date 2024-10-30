import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const defaultDisappearTime = 5000;

export interface NotificationSlice {
  shown: boolean;
  queue: NotificationAction[];
  header?: string;
  message?: string;
  disappearTime?: number;
}

export type NotificationAction = {
  header: string;
  message?: string;
  disappear?: number;
};

const initialState: NotificationSlice = {
  shown: false,
  queue: [],
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    closeNotification: (state) => {
      state.shown = false;
      state.header = undefined;
      state.message = undefined;
      state.disappearTime = undefined;
    },

    showNotification: (
      state,
      action: PayloadAction<NotificationAction | string>,
    ) => {
      const payload =
        typeof action.payload === 'string'
          ? { header: action.payload }
          : action.payload;
      if (state.shown === true || state.queue.length > 0) {
        state.queue.push(payload);
        return;
      }

      state.header = payload.header;
      state.message = payload.message;
      state.disappearTime = payload.disappear ?? defaultDisappearTime;
      state.shown = true;
    },

    nextInQueue: (state) => {
      if (state.shown || state.queue.length === 0) return;
      const last = state.queue.shift() as NotificationAction;
      state.header = last.header;
      state.message = last.message;
      state.disappearTime = last.disappear ?? defaultDisappearTime;
      state.shown = true;
    },
  },
});

export const { closeNotification, showNotification, nextInQueue } =
  notificationSlice.actions;

export default notificationSlice.reducer;
