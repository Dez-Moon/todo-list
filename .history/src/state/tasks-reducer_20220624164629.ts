import { tasksAPI, TaskType } from "./../api/tasks-api";
import { Dispatch } from "redux";
import { TasksStateType } from "./../../.history/src/App_20220621183248";
import {
  AddToDoListActionType,
  RemoveToDoListActionType,
  SetTodolistsActionType,
} from "./todolists-reducer";

type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};
type AddTaskActionType = {
  type: "ADD-TASK";
  task: TaskType;
};
type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  taskId: string;
  isDone: boolean;
  todolistId: string;
};
type changeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  title: string;
  todolistId: string;
};
type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | changeTaskTitleActionType
  | AddToDoListActionType
  | RemoveToDoListActionType
  | SetTodolistsActionType
  | SetTasksActionType;

export type SetTasksActionType = {
  type: "SET-TASKS";
  tasks: Array<TaskType>;
  todolistId: string;
};

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS":
      const stateCopy6 = { ...state };
      stateCopy6[action.todolistId] = action.tasks;
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
    case "CHANGE-TASK-STATUS":
      const stateCopy2 = { ...state };
      let todolistTasks = stateCopy2[action.todolistId];
      stateCopy2[action.todolistId] = todolistTasks.map((t) =>
        t.id === action.taskId ? { ...t, isDone: action.isDone } : t
      );
      return stateCopy2;
    case "CHANGE-TASK-TITLE":
      const stateCopy3 = { ...state };
      let tasks2 = stateCopy3[action.todolistId];
      stateCopy3[action.todolistId] = tasks2.map((t) =>
        t.id === action.taskId ? { ...t, title: action.title } : t
      );
      return stateCopy3;
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
  todolistId: string
): SetTasksActionType => {
  return { type: "SET-TASKS", tasks, todolistId };
};
export const RemoveTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => ({ type: "REMOVE-TASK", taskId, todolistId });

export const addTaskAC = (task: TaskType): AddTaskActionType => ({
  type: "ADD-TASK",
  task,
});

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
): ChangeTaskStatusActionType => ({
  type: "CHANGE-TASK-STATUS",
  taskId,
  isDone,
  todolistId,
});
export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): changeTaskTitleActionType => ({
  type: "CHANGE-TASK-TITLE",
  taskId,
  title,
  todolistId,
});

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId).then((res) => {
      const tasks = res.data.items;
      const action = setTasksAC(tasks, todolistId);
      dispatch(action);
    });
  };
};
export const removeTaskTC = (taskId: string, todolistId: string) => {
  return (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId).then((res) => {
      const action = RemoveTaskAC(taskId, todolistId);
      dispatch(action);
    });
  };
};
export const createTaskTC = (title: string, todolistId: string) => {
  return (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title).then((res) => {
      const task = res.data.data.item;
      const action = addTaskAC(task);
      dispatch(action);
    });
  };
};
