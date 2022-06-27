import { Dispatch } from "redux";
import { authAPI } from "../api/auth-api";
import { handleServerAppError } from "../utils/error-utils";
import {
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from "./app-reducer";

const initialState = {
  isLoggedIn: false,
};
type InitialStateType = typeof initialState;

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};

export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value } as const);

export const loginTC = (data: any) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC("loading"));
  const { email, password, rememberMe, captcha } = data;
  authAPI.login(email, password, rememberMe, captcha).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true));
      dispatch(setAppStatusAC("succeeded"));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  });
};

type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | SetAppStatusActionType
  | SetAppErrorActionType;
