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
  },
});
export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    case "APP-IS-INITIALIZED":
      return { ...state, isInitialized: action.value };
    default:
      return state;
  }
};

export const setAppErrorAC = (error: string | null) =>
  ({ type: "APP/SET-ERROR", error } as const);
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: "APP/SET-STATUS", status } as const);
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
