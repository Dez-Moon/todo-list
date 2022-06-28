export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
const initialState: InitialStateType = {
  status: "loading" as RequestStatusType,
  error: null,
};
type InitialStateType = typeof initialState;
type ActionsType = SetAppErrorActionType | SetAppStatusActionType;
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
): SetAppStatusActionType => ({ type: "APP/SET-STATUS", status });

export const setAppErrorAC = (error: string | null): SetAppErrorActionType =>
  ({
    type: "APP/SET-ERROR",
    error,
  } as const);