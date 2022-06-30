import { RequestStatusType } from "./../../src/state/app-reducer";
import { createAction } from "@reduxjs/toolkit";

const setAppStatus = createAction<{ status: RequestStatusType }>(
  "appActions/setAppStatus"
);
const setAppError = createAction<{ error: string | null }>(
  "appActions/setAppError"
);

export const appActions = {
  setAppStatus,
  setAppError,
};
