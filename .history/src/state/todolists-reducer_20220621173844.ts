import { v1 } from "uuid";
import { ToDoListType } from "./../../.history/src/App_20220621102428";
type ActionType = {
  type: string;
  [key: string]: any;
};
export const todolistsReducer = (
  state: Array<ToDoListType>,
  action: ActionType
): Array<ToDoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id != action.id);
    case "ADD-TODOLIST":
      return [
        ...state,
        {
          id: v1(),
          title: action.title,
          filter: "all",
        },
      ];
    case "CHANGE-TODOLIST-TITLE":
      return [...state];
    default:
      throw new Error("I don't understand this type");
  }
};
