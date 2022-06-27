export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
type setAppStatusActionType = {
  type: "APP/SET-STATUS";
  status: RequestStatusType;
};
const initialState = {
  status: "loading" as RequestStatusType,
};
type InitialStateType = typeof initialState;
type ActionsType = any;
export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    default:
      return state;
  }
};

export const setAppStatusAC = (
  status: RequestStatusType
): setAppStatusActionType => ({ type: "APP/SET-STATUS" });
