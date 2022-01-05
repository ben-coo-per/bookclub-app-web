import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ToastType = {
  duration: number; // duration in milliseconds
  message: string;
  type: "warning" | "error" | "success" | "info";
};

export interface NotificationState {
  toasts: ToastType[];
}

const initialState: NotificationState = {
  toasts: [],
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastType>) => {},
  },
});
