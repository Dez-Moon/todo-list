import { FilterValuesType } from "./../../.history/src/App_20220620181237";
import { v1 } from "uuid";
import { ToDoListType } from "./../../.history/src/App_20220621102428";
type RemoveToDoListActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
type AddToDoListActionType = {
  type: "ADD-TODOLIST";
  id: string;
  title: string;
};
type ChangeToDoListTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
type ChangeToDoListFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};
type ActionsType =
  | RemoveToDoListActionType
  | AddToDoListActionType
  | ChangeToDoListTitleActionType
  | ChangeToDoListFilterActionType;
export const todolistsReducer = (
  state: Array<ToDoListType>,
  action: ActionsType
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
      const toDoList = state.find((tl) => tl.id === action.id);
      if (toDoList) {
        toDoList.title = action.title;
      }
      return [...state];
    case "CHANGE-TODOLIST-FILTER":
      const toDoList1 = state.find((tl) => tl.id === action.id);
      if (toDoList1) {
        toDoList1.filter = action.filter;
      }
      return { ...state };
    default:
      throw new Error("I don't understand this type");
  }
};

export const RemoveToDoListAC = (
  toDoListId: string
): RemoveToDoListActionType => ({
  type: "REMOVE-TODOLIST",
  id: toDoListId,
});
export const AddToDoListAC = (
  toDoListId: string,
  title: string
): AddToDoListActionType => ({
  type: "ADD-TODOLIST",
  id: toDoListId,
  title: title,
});
export const ChangeToDoListTitleAC = (
  toDoListId: string,
  title: string
): ChangeToDoListTitleActionType => ({
  type: "CHANGE-TODOLIST-TITLE",
  id: toDoListId,
  title: title,
});
export const ChangeToDoListFilterAC = (
  toDoListId: string,
  filter: FilterValuesType
): ChangeToDoListFilterActionType => ({
  type: "CHANGE-TODOLIST-FILTER",
  id: toDoListId,
  filter: filter,
});
