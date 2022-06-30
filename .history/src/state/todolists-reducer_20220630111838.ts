import { todolistAPI } from "./../api/todolist-api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appActions } from "../../features/CommonActions/App";
import { TodolistType } from "../AppWithRedux";
import { ThunkError } from "./tasks-reducer";
import {
  handleAsyncServerAppError,
  handleAsyncServerNetworkError,
} from "../utils/error-utils";
import { RequestStatusType } from "./app-reducer";

const { setAppStatus } = appActions;

export const slice = createSlice({
  name: "todolists",
  initialState: [] as Array<TodolistDomainType>,
  reducers: {
    changeTodolistFilter(
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].filter = action.payload.filter;
    },
    changeTodolistEntityStatus(
      state,
      action: PayloadAction<{ id: string; status: RequestStatusType }>
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].entityStatus = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({
          ...tl,
          filter: "all",
          entityStatus: "idle",
        }));
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.id);
        if (index > -1) {
          state.splice(index, 1);
        }
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({
          ...action.payload.todolist,
          filter: "all",
          entityStatus: "idle",
        });
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.id);
        state[index].title = action.payload.title;
      });
  },
});

// Thunk

const fetchTodolists = createAsyncThunk<
  { todolists: TodolistType[] },
  undefined,
  ThunkError
>("todolists/fetchTodolists", async (param, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({ status: "loading" }));
  try {
    const res = await todolistAPI.getTodoLists();
    thunkAPI.dispatch(setAppStatus({ status: "succeeded" }));
    return { todolists: res.data };
  } catch (error) {
    return handleAsyncServerNetworkError(error, thunkAPI);
  }
});
const removeTodolist = createAsyncThunk<{ id: string }, string, ThunkError>(
  "todolists/removeTodolist",
  async (todolistId, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: "loading" }));
    dispatch(changeTodolistEntityStatus({ id: todolistId, status: "loading" }));
    const res = await todolistAPI.deleteTodoList(todolistId);
    dispatch(setAppStatus({ status: "succeeded" }));
    return { id: todolistId };
  }
);
const addTodolist = createAsyncThunk<
  { todolist: TodolistType },
  string,
  ThunkError
>("todolists/addTodolist", async (title, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({ status: "loading" }));
  try {
    const res = await todolistAPI.createTodoList(title);
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatus({ status: "succeeded" }));
      return { todolist: res.data.data.item };
    } else {
      return handleAsyncServerAppError(res.data, thunkAPI, false);
    }
  } catch (error) {
    return handleAsyncServerNetworkError(error, thunkAPI, false);
  }
});
const changeTodolistTitle = createAsyncThunk(
  "todolists/changeTodolistTitle",
  async (param: { id: string; title: string }, thunkAPI) => {
    try {
      const res = await todolistAPI.updateTodolist(param.id, param.title);
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatus({ status: "succeeded" }));
        return { id: param.id, title: param.title };
      } else {
        return handleAsyncServerAppError(res.data, thunkAPI);
      }
    } catch (error) {
      return handleAsyncServerNetworkError(error, thunkAPI, false);
    }
  }
);

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

// Actions

export const asyncActions = {
  fetchTodolists,
  removeTodolist,
  addTodolist,
  changeTodolistTitle,
};

export const { changeTodolistFilter, changeTodolistEntityStatus } =
  slice.actions;
