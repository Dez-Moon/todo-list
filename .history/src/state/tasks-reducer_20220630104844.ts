import { AppRootStateType } from "./store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TaskPriorities,
  tasksAPI,
  TaskStatuses,
  TaskType,
  UpdateTaskModelType,
} from "./../api/tasks-api";
import { Dispatch } from "redux";
import { TasksStateType } from "./../../.history/src/App_20220621183248";
import {
  addTodolistAC,
  AddToDoListActionType,
  removeTodolistAC,
  setTodolistsAC,
} from "./todolists-reducer";
import { RequestStatusType, setAppStatusAC } from "./app-reducer";
import {
  handleAsyncServerAppError,
  handleAsyncServerNetworkError,
  handleServerAppError,
} from "../utils/error-utils";

const initialState: TasksStateType = {};

// Reducer

export const tasksReducer = slice.reducer;

//Actions

const slice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    changeTaskEntityStatusAC(
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        entityStatus: RequestStatusType;
      }>
    ) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks[index] = {
          ...tasks[index],
          entityStatus: action.payload.entityStatus,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.id];
    });
    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach((tl: any) => {
        state[tl.id] = [];
      });
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state[action.payload.todolistId] = action.payload.tasks;
    });
    builder.addCase(removeTask.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks.splice(index, 1);
      }
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state[action.payload.todoListId].unshift(action.payload);
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    });
  },
});

// Thunks

export const fetchTasks = createAsyncThunk<
  { tasks: TaskType[]; todolistId: string },
  string,
  ThunkError
>("tasks/fetchTasks", async (todolistId, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
  try {
    const res = await tasksAPI.getTasks(todolistId);
    const tasks = res.data.items;
    thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
    return { tasks, todolistId };
  } catch (err) {
    return handleAsyncServerNetworkError(err, thunkAPI);
  }
});

export const removeTask = createAsyncThunk<
  { taskId: string; todolistId: string },
  { taskId: string; todolistId: string },
  ThunkError
>("tasks/removeTask", async (param, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
  try {
    const res = await tasksAPI.deleteTask(param.todolistId, param.taskId);
    thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
    return { taskId: param.taskId, todolistId: param.todolistId };
  } catch (err) {
    return handleAsyncServerNetworkError(err, thunkAPI);
  }
});

export const addTask = createAsyncThunk<
  TaskType,
  { title: string; todolistId: string },
  ThunkError
>("tasks/addTask", async (param, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
  try {
    tasksAPI.createTask(param.todolistId, param.title).then((res) => {
      if (res.data.resultCode === 0) {
        const task = res.data.data.item;
        thunkAPI.dispatch(addTaskAC({ task }));
      } else {
        handleAsyncServerAppError(res.data, thunkAPI);
      }
      thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
    });
  } catch (err) {
    return handleAsyncServerNetworkError(err, thunkAPI, false);
  }
});

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (
    param: {
      taskId: string;
      model: UpdateDomainTaskModelType;
      todolistId: string;
    },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as AppRootStateType;

    const task = state.tasks[param.todolistId].find(
      (t) => t.id === param.taskId
    );
    if (!task) {
      return thunkAPI.rejectWithValue("task not found in the state");
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...param.model,
    };

    const res = await tasksAPI.updateTask(
      param.todolistId,
      param.taskId,
      apiModel
    );
    try {
      if (res.data.resultCode === 0) {
        return param;
      } else {
        return handleAsyncServerAppError(res.data, thunkAPI);
      }
    } catch (error) {
      return handleAsyncServerNetworkError(error, thunkAPI);
    }
  }
);

//Types

export type FieldErrorType = { field: string; error: string };

export type ThunkError = {
  rejectValue: { errors: Array<string>; fieldsErrors?: Array<FieldErrorType> };
};

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

export type TaskDomainType = TaskType & {
  entityStatus: RequestStatusType;
};

export type SetTasksActionType = {
  type: "SET-TASKS";
  tasks: Array<TaskType>;
  todolistId: string;
  entityStatus: RequestStatusType;
};
