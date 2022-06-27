import { Dispatch } from "redux";
import { todolistAPI } from "../api/todolist-api";
import { FilterValuesType, TodolistType } from "../AppWithRedux";
// import { setAppStatusAC } from "./app-reducer";

export type RemoveToDoListActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddToDoListActionType = {
  type: "ADD-TODOLIST";
  todolist: TodolistType;
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
export type SetTodolistsActionType = {
  type: "SET-TODOLISTS";
  todolists: Array<TodolistDomainType>;
};
type ActionsType =
  | RemoveToDoListActionType
  | AddToDoListActionType
  | ChangeToDoListTitleActionType
  | ChangeToDoListFilterActionType
  | SetTodolistsActionType;

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
};

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionsType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
      }));
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id != action.id);
    case "ADD-TODOLIST":
      return [{ ...action.todolist, filter: "all" }, ...state];
    case "CHANGE-TODOLIST-TITLE":
      const toDoList = state.find((tl) => tl.id === action.id);
      if (toDoList) {
        toDoList.title = action.title;
      }
      return [...state];
    case "CHANGE-TODOLIST-FILTER":
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state];
    default:
      return state;
  }
};

export const SetTodolistsAC = (
  todolists: Array<TodolistDomainType>
): SetTodolistsActionType => {
  return { type: "SET-TODOLISTS", todolists };
};

export const RemoveToDoListAC = (id: string): RemoveToDoListActionType => ({
  type: "REMOVE-TODOLIST",
  id,
});
export const AddToDoListAC = (todolist: TodolistType): AddToDoListActionType =>
  ({ type: "ADD-TODOLIST", todolist } as const);
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

export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    // dispatch(setAppStatusAC("loading"));
    todolistAPI.getTodoLists().then((res) => {
      dispatch(SetTodolistsAC(res.data));
      // dispatch(setAppStatusAC("succeeded"));
    });
  };
};
export const deleteTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.deleteTodoList(todolistId).then((res) => {
      dispatch(RemoveToDoListAC(todolistId));
    });
  };
};
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.createTodoList(title).then((res) => {
      const todolist = res.data.data.item;
      dispatch(AddToDoListAC(todolist));
    });
  };
};
export const changeToDoListTitleTC = (toDoListId: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(toDoListId, title).then((res) => {
      dispatch(ChangeToDoListTitleAC(toDoListId, title));
    });
  };
};
