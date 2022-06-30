import { appActions } from "./../../features/CommonActions/App";
import { ResponseType } from "../api/todolist-api";

type ThunkAPIType = {
  dispatch: (action: any) => any;
  rejectWithValue: Function;
};
export const handleAsyncServerAppError = <D>(
  data: ResponseType<D>,
  thunkAPI: ThunkAPIType,
  showError = true
) => {
  if (showError) {
    thunkAPI.dispatch(
      appActions.setAppError({
        error: data.messages.length ? data.messages[0] : "Some error occurred",
      })
    );
  }
  thunkAPI.dispatch(appActions.setAppStatus({ status: "failed" }));
  return thunkAPI.rejectWithValue({
    errors: data.messages,
    fieldsErrors: data.fieldsErrors,
  });
};

export const handleAsyncServerNetworkError = (
  error: any,
  thunkAPI: ThunkAPIType,
  showError = true
) => {
  if (showError) {
    thunkAPI.dispatch(
      setAppErrorAC({
        error: error.message ? error.message : "Some error occurred",
      })
    );
  }
  thunkAPI.dispatch(setAppStatusAC({ status: "failed" }));

  return thunkAPI.rejectWithValue({
    errors: [error.message],
    fieldsErrors: undefined,
  });
};