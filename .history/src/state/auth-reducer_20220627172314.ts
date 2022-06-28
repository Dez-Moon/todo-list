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
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};
type InitialStateType = typeof initialState;
const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: any) {
      state.isLoggedIn = action.value;
    },
  },
});
export const authReducer = slice.reducer;

export const setIsLoggedInAC = (value: boolean) => ({
  type: "login/SET-IS-LOGGED-IN",
  value,
});

export const loginTC = (data: any) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true));
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
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
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

type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | SetAppStatusActionType
  | SetAppErrorActionType;
