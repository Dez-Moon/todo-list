import { action } from "@storybook/addon-actions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};
const initialState: InitialStateType = {
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
export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP-IS-INITIALIZED":
      return { ...state, isInitialized: action.value };
    default:
      return state;
  }
};

export const setAppInitializedAC = (value: boolean) =>
  ({
    type: "APP-IS-INITIALIZED",
    value,
  } as const);
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetIsInitializedActionType = ReturnType<typeof setAppInitializedAC>;
type ActionsType =
  | SetIsInitializedActionType
  | SetAppErrorActionType
  | SetAppStatusActionType;
