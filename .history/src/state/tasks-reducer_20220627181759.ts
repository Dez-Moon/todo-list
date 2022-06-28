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
  AddToDoListActionType,
  changeTodolistEntityStatusAC,
  RemoveToDoListActionType,
  SetTodolistsActionType,
} from "./todolists-reducer";
import {
  RequestStatusType,
  setAppErrorAC,
  setAppStatusAC,
} from "./app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../utils/error-utils";

type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};
type AddTaskActionType = {
  type: "ADD-TASK";
  task: TaskType;
};
export type TaskDomainType = TaskType & {
  entityStatus: RequestStatusType;
};
type ChangeTaskEntityStatusActionType = {
  type: "CHANGE-TASK-ENTITY-STATUS";
  entityStatus: RequestStatusType;
  todolistId: string;
  taskId: string;
};
type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ReturnType<typeof updateTaskAC>
  | AddToDoListActionType
  | RemoveToDoListActionType
  | SetTodolistsActionType
  | SetTasksActionType
  | ChangeTaskEntityStatusActionType;

export type SetTasksActionType = {
  type: "SET-TASKS";
  tasks: Array<TaskType>;
  todolistId: string;
  entityStatus: RequestStatusType;
};

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS":
      const stateCopy6 = { ...state };
      stateCopy6[action.todolistId] = action.tasks.map((t) =>
        t ? { ...t, entityStatus: action.entityStatus } : t
      );
      return stateCopy6;
    case "SET-TODOLISTS":
      const stateCopy0 = { ...state };
      action.todolists.forEach((tl) => {
        stateCopy0[tl.id] = [];
      });
      return stateCopy0;
    case "REMOVE-TASK":
      const stateCopy = { ...state };
      const tasks = state[action.todolistId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy;
    case "ADD-TASK":
      const stateCopy1 = { ...state };
      const tasks1 = stateCopy1[action.task.todoListId];
      const newTasks = [action.task, ...tasks1];
      stateCopy1[action.task.todoListId] = newTasks;
      return stateCopy1;
    case "UPDATE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, ...action.model } : t
        ),
      };
    case "CHANGE-TASK-ENTITY-STATUS":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId
            ? { ...t, entityStatus: action.entityStatus }
            : t
        ),
      };
    case "ADD-TODOLIST":
      const stateCopy4 = { ...state };
      stateCopy4[action.todolist.id] = [];
      return stateCopy4;
    case "REMOVE-TODOLIST":
      const stateCopy5 = { ...state };
      delete stateCopy5[action.id];
      return stateCopy5;
    default:
      return state;
  }
};
export const setTasksAC = (
  tasks: Array<TaskType>,
  todolistId: string,
  entityStatus: RequestStatusType
): SetTasksActionType => {
  return { type: "SET-TASKS", tasks, todolistId, entityStatus };
};
export const RemoveTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => ({ type: "REMOVE-TASK", taskId, todolistId });

export const addTaskAC = (task: TaskType): AddTaskActionType => ({
  type: "ADD-TASK",
  task,
});
export const updateTaskAC = (
  taskId: string,
  model: UpdateDomainTaskModelType,
  todolistId: string
) => ({ type: "UPDATE-TASK", model, todolistId, taskId } as const);

export const changeTaskEntityStatusAC = (
  todolistId: string,
  taskId: string,
  entityStatus: RequestStatusType
) => ({ type: "CHANGE-TASK-ENTITY-STATUS", todolistId, taskId, entityStatus });
export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    tasksAPI
      .getTasks(todolistId)
      .then((res) => {
        const tasks = res.data.items;
        const action = setTasksAC(tasks, todolistId, "idle");
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
    dispatch(changeTaskEntityStatusAC(todolistId, taskId, "loading"));
    tasksAPI
      .deleteTask(todolistId, taskId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const action = RemoveTaskAC(taskId, todolistId);
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
          dispatch(addTaskAC(task));
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
    dispatch(setAppStatusAC("loading"));
    dispatch(changeTaskEntityStatusAC(todolistId, taskId, "loading"));
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
            dispatch(updateTaskAC(taskId, domainModel, todolistId));
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, "succeeded"));
            dispatch(setAppStatusAC("succeeded"));
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