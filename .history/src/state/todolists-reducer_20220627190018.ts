import { ToDoListType } from "./../../.history/src/App_20220621121714";
import { TodolistDomainType } from "./../../.history/src/state/todolists-reducer_20220625125234";
import { ToDoListType } from "./../../.history/src/AppWithRedux_20220624124454";
import { action } from "@storybook/addon-actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { action } from "@storybook/addon-actions";
import { createSlice } from "@reduxjs/toolkit";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "./../utils/error-utils";
import { Dispatch } from "redux";
import { todolistAPI } from "../api/todolist-api";
import { FilterValuesType, TodolistType } from "../AppWithRedux";
import {
  RequestStatusType,
  setAppErrorAC,
  setAppStatusAC,
} from "./app-reducer";

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
export type ChangeTodolistEntityStatusActionType = {
  type: "CHANGE-TODOLIST-ENTITY-STATUS";
  id: string;
  entityStatus: RequestStatusType;
};
type ActionsType =
  | RemoveToDoListActionType
  | AddToDoListActionType
  | ChangeToDoListTitleActionType
  | ChangeToDoListFilterActionType
  | SetTodolistsActionType
  | ChangeTodolistEntityStatusActionType;

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

const initialState: Array<TodolistDomainType> = [];
const slice = createSlice({
  name: "todolists",
  initialState: initialState,
  reducers: {
    setTodolistsAC(
      state,
      action: PayloadAction<{ todolists: TodolistDomainType }>
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.todolists);
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    removeToDoListAC(state, action: PayloadAction<{ id: string }>) {
      state.filter((tl) => tl.id !== action.payload.id);
    },
    addToDoListAC(state, action: PayloadAction<{ todolist: ToDoListType }>) {
      state.push({
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      });
    },
    changeToDoListFilterAC(
      state,
      action: PayloadAction<{ toDoListId: string; filter: FilterValuesType }>
    ) {
      state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );
    },
    changeToDoListTitleAC(
      state,
      action: PayloadAction<{ toDoListId: string; title: string }>
    ) {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.toDoListId
      );
      state[index].title = action.payload.title;
    },
    changeTodolistEntityStatusAC(
      state,
      action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>
    ) {},
  },
});
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
      return [
        { ...action.todolist, filter: "all", entityStatus: "succeeded" },
        ...state,
      ];
    case "CHANGE-TODOLIST-TITLE":
      const toDoList = state.find((tl) => tl.id === action.id);
      if (toDoList) {
        toDoList.title = action.title;
      }
      return [...state];
    case "CHANGE-TODOLIST-FILTER":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );
    case "CHANGE-TODOLIST-ENTITY-STATUS":
      const todolist1 = state.find((tl) => tl.id === action.id);
      if (todolist1) {
        todolist1.entityStatus = action.entityStatus;
      }
      return [...state];
    default:
      return state;
  }
};

export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    todolistAPI
      .getTodoLists()
      .then((res) => {
        dispatch(setTodolistsAC(res.data));
        dispatch(setAppStatusAC({ status: "succeeded" }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
export const deleteTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"));
    todolistAPI
      .deleteTodoList(todolistId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(RemoveToDoListAC(todolistId));
          dispatch(setAppStatusAC({ status: "succeeded" }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    todolistAPI
      .createTodoList(title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const todolist = res.data.data.item;
          dispatch(AddToDoListAC(todolist));
          dispatch(setAppStatusAC({ status: "succeeded" }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
export const changeToDoListTitleTC = (toDoListId: string, title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    todolistAPI
      .updateTodolist(toDoListId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(ChangeToDoListTitleAC(toDoListId, title));
          dispatch(setAppStatusAC({ status: "succeeded" }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
