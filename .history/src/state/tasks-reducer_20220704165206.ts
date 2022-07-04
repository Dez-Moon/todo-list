import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  TaskPriorities,
  tasksAPI,
  TaskStatuses,
  UpdateTaskModelType,
} from "../api/tasks-api";
import { TasksStateType } from "../App";
import { TaskType } from "../components/ToDoList";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../utils/error-utils";
import { RequestStatusType, setAppStatusAC } from "./app-reducer";
import {
  addTodolistAC,
  removeTodolistAC,
  setTodolistsAC,
} from "./todolists-reducer";

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

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    tasksAPI
      .getTasks(todolistId)
      .then((res) => {
        const tasks = res.data.items;
        const action = setTasksAC({ tasks, todolistId, entityStatus: "idle" });
        dispatch(action);
        dispatch(setAppStatusAC({ status: "succeeded" }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
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
