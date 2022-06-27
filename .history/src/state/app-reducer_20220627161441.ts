export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};
const initialState: InitialStateType = {
  status: "idle" as RequestStatusType,
  error: null,
  isInitialized: false,
};
type ActionsType =
  | SetAppErrorActionType
  | SetAppStatusActionType
  | SetIsInitializedActionType;
export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP-IS-INITIALIZED":
      return { ...state, isInitialized: action.isInitialized };
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const setAppErrorAC = (error: string | null) =>
  ({ type: "APP/SET-ERROR", error } as const);
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: "APP/SET-STATUS", status } as const);
export const setIsInitializedAC = (isInitialized: boolean) => ({
  type: "APP-IS-INITIALIZED",
  isInitialized,
});
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>;
