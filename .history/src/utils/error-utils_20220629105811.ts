import { AxiosError } from "axios";
import { Dispatch } from "redux";
import { ResponseType } from "../api/todolist-api";
import {
  setAppErrorAC,
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from "../state/app-reducer";

type ThunkAPIType = {
  dispatch: (action: any) => any;
  rejectWithValue: Function;
};
export const handleServerAppError = <T>(
  data: ResponseType<T>,
  dispatch: ErrorUtilsDispatchType
) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({ error: data.messages[0] }));
  } else {
    dispatch(setAppErrorAC({ error: "Some error occurred" }));
  }
  dispatch(setAppStatusAC({ status: "failed" }));
};

export const handleAsyncServerNetworkError = (
  error: AxiosError,
  thunkAPI: ThunkAPIType,
  showError = true
) => {
  if (showError) {
    thunkAPI.dispatch(
      appActions.setAppError({
        error: error.message ? error.message : "Some error occurred",
      })
    );
  }
  thunkAPI.dispatch(appActions.setAppStatus({ status: "failed" }));

  return thunkAPI.rejectWithValue({
    errors: [error.message],
    fieldsErrors: undefined,
  });
};

type ErrorUtilsDispatchType = Dispatch<
  SetAppErrorActionType | SetAppStatusActionType
>;
