import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";
import { v1 } from "uuid";
import { todolistAPI } from "../api/todolist-api";
import { FilterValuesType, ToDoListType } from "../AppWithRedux";

export type RemoveToDoListActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddToDoListActionType = {
  type: "ADD-TODOLIST";
  todolist: ToDoListFromDomainType;
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
  todolists: Array<ToDoListFromDomainType>;
};
type ActionsType =
  | RemoveToDoListActionType
  | AddToDoListActionType
  | ChangeToDoListTitleActionType
  | ChangeToDoListFilterActionType
  | SetTodolistsActionType;

type ToDoListFromDomainType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export let toDoList1 = v1();
export let toDoList2 = v1();

const initialState: Array<ToDoListType> = [];

export const todolistsReducer = (
  state: Array<ToDoListType> = initialState,
  action: ActionsType
): Array<ToDoListType> => {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
      }));
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id != action.id);
    case "ADD-TODOLIST":
      return [...state];
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
  todolists: Array<ToDoListFromDomainType>
): SetTodolistsActionType => {
  return { type: "SET-TODOLISTS", todolists };
};

export const RemoveToDoListAC = (id: string): RemoveToDoListActionType => ({
  type: "REMOVE-TODOLIST",
  id,
});
export const AddToDoListAC = (
  todolist: ToDoListFromDomainType
): AddToDoListActionType => ({
  type: "ADD-TODOLIST",
  todolist,
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

export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    todolistAPI.getTodoLists().then((res) => {
      dispatch(SetTodolistsAC(res.data));
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
