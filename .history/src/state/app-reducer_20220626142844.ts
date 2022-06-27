export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type SetAppErrorActionType = {
  type: "APP/SET-ERROR";
  error: string | null;
};
type setAppStatusActionType = {
  type: "APP/SET-STATUS";
  status: RequestStatusType;
};
const initialState = {
  status: "loading" as RequestStatusType,
  error: null,
};
type InitialStateType = typeof initialState;
type ActionsType = SetAppErrorActionType | setAppStatusActionType;
export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const setAppStatusAC = (
  status: RequestStatusType
): setAppStatusActionType => ({ type: "APP/SET-STATUS", status });

export const setAppErrorAC = (error: string): SetAppErrorActionType => ({
  type: "APP/SET-ERROR",
  error,
});
