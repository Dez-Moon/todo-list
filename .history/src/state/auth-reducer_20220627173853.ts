import { action } from "@storybook/addon-actions";
import { handleServerNetworkError } from "./../utils/error-utils";
import { authAPI } from "../api/auth-api";
import { handleServerAppError } from "../utils/error-utils";
import {
  SetAppErrorActionType,
  setAppInitializedAC,
  setAppStatusAC,
  SetAppStatusActionType,
} from "./app-reducer";
import { Dispatch } from "redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};
const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{value: boolean}) {
      state.isLoggedIn = action.payload.value;
    },
  },
});
export const authReducer = slice.reducer;
export const { setIsLoggedInAC } = slice.actions;

export const loginTC = (data: any) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC({ value: true }));
          dispatch(setAppStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
export const initializeAppTC = () => {
  return (dispatch: Dispatch) => {
    authAPI
      .me()
      .then((res) => {
        dispatch(setAppInitializedAC(true));
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
