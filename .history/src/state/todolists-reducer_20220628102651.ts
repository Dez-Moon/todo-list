import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "./../utils/error-utils";
import { Dispatch } from "redux";
import { todolistAPI } from "../api/todolist-api";
import { FilterValuesType, TodolistType } from "../AppWithRedux";
import { RequestStatusType, setAppStatusAC } from "./app-reducer";

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
    removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      });
    },
    changeTodolistTitleAC(
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].title = action.payload.title;
    },
    changeTodolistFilterAC(
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].filter = action.payload.filter;
    },
    changeTodolistEntityStatusAC(
      state,
      action: PayloadAction<{ id: string; status: RequestStatusType }>
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].entityStatus = action.payload.status;
    },
    setTodolistsAC(
      state,
      action: PayloadAction<{ todolists: Array<TodolistType> }>
    ) {
      return action.payload.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    },
  },
});
export const todolistsReducer = slice.reducer;
export const {
  setTodolistsAC,
  removeTodolistAC,
  addTodolistAC,
  changeToDoListFilterAC: changeTodolistFilterAC,
  changeToDoListTitleAC,
  changeTodolistEntityStatusAC,
} = slice.actions;
export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    todolistAPI
      .getTodoLists()
      .then((res) => {
        debugger;
        dispatch(setTodolistsAC({ todolists: res.data }));
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
    dispatch(
      changeTodolistEntityStatusAC({ id: todolistId, entityStatus: "loading" })
    );
    todolistAPI
      .deleteTodoList(todolistId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(removeToDoListAC({ id: todolistId }));
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
    debugger;
    dispatch(setAppStatusAC({ status: "loading" }));
    todolistAPI
      .createTodoList(title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(addToDoListAC({ todolist: res.data.data.item }));
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
          dispatch(
            changeToDoListTitleAC({ toDoListId: toDoListId, title: title })
          );
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
