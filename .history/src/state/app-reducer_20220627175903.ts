import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
  status: "idle",
  error: null,
  isInitialized: false,
};
const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setAppStatusAC(
      state,
      action: PayloadAction<{ status: RequestStatusType }>
    ) {
      state.status = action.payload.status;
    },
    setAppInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = action.payload.value;
    },
  },
});
export const appReducer = slice.reducer;
export const { setAppErrorAC, setAppStatusAC, setAppInitializedAC } =
  slice.actions;
