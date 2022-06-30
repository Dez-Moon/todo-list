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
  handleAsyncServerNetworkError,
  handleServerAppError,
} from "../utils/error-utils";

export type TaskDomainType = TaskType & {
  entityStatus: RequestStatusType;
};

export type SetTasksActionType = {
  type: "SET-TASKS";
  tasks: Array<TaskType>;
  todolistId: string;
  entityStatus: RequestStatusType;
};

const initialState: TasksStateType = {};
const slice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    setTasksAC(
      state,
      action: PayloadAction<{
        tasks: Array<TaskType>;
        todolistId: string;
        entityStatus: RequestStatusType;
      }>
    ) {
      state[action.payload.todolistId] = action.payload.tasks;
    },
    removeTaskAC(
      state,
      action: PayloadAction<{ taskId: string; todolistId: string }>
    ) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks.splice(index, 1);
      }
    },
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task);
    },
    updateTaskAC(
      state,
      action: PayloadAction<{
        taskId: string;
        model: UpdateDomainTaskModelType;
        todolistId: string;
      }>
    ) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    },
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
  },
});
export const {
  setTasksAC,
  removeTaskAC,
  addTaskAC,
  updateTaskAC,
  changeTaskEntityStatusAC,
} = slice.actions;
export const tasksReducer = slice.reducer;

export type FieldErrorType = { field: string; error: string };

export type ThunkError = {
  rejectValue: { errors: Array<string>; fieldsErrors?: Array<FieldErrorType> };
};

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
  } catch (error) {
    return handleAsyncServerNetworkError(error, thunkAPI);
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
  } catch (error) {
    return handleAsyncServerNetworkError(error, thunkAPI);
  }
});

export const removeTaskTC = (taskId: string, todolistId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    dispatch(
      changeTaskEntityStatusAC({ todolistId, taskId, entityStatus: "loading" })
    );
    tasksAPI
      .deleteTask(todolistId, taskId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const action = removeTaskAC({ taskId, todolistId });
          dispatch(action);
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
export const addTaskTC =
  (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    tasksAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const task = res.data.data.item;
          dispatch(addTaskAC({ task }));
          dispatch(setAppStatusAC({ status: "succeeded" }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const updateTaskTC = (
  taskId: string,
  domainModel: UpdateDomainTaskModelType,
  todolistId: string
) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    dispatch(
      changeTaskEntityStatusAC({ todolistId, taskId, entityStatus: "loading" })
    );
    tasksAPI.getTasks(todolistId).then((res) => {
      const task = res.data.items.find((t) => t.id === taskId);
      if (!task) {
        console.warn("Task no fount in the state");
        return;
      }
      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel,
      };
      tasksAPI
        .updateTask(todolistId, taskId, apiModel)
        .then((res) => {
          if (res.data.resultCode === 0) {
            dispatch(updateTaskAC({ taskId, model: domainModel, todolistId }));
            dispatch(
              changeTaskEntityStatusAC({
                todolistId,
                taskId,
                entityStatus: "succeeded",
              })
            );
            dispatch(setAppStatusAC({ status: "succeeded" }));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch);
        });
    });
  };
};
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
