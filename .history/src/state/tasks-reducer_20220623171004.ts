import { v1 } from "uuid";
import { TasksStateType } from "./../../.history/src/App_20220621183248";
import {
  AddToDoListActionType,
  RemoveToDoListActionType,
  SetTodolistsActionType,
  toDoList1,
  toDoList2,
} from "./todolists-reducer";

type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};
type AddTaskActionType = {
  type: "ADD-TASK";
  todolistId: string;
  title: string;
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
  | SetTodolistsActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "SET-TODOLISTS":
      const stateCopy0 = { ...state };
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;
    case "REMOVE-TASK":
      const stateCopy = { ...state };
      const tasks = state[action.todolistId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy;
    case "ADD-TASK":
      const stateCopy1 = { ...state };
      const tasks1 = stateCopy1[action.todolistId];
      const NewTask = { id: v1(), title: action.title, isDone: false };
      const NewTasks = [NewTask, ...tasks1];
      stateCopy1[action.todolistId] = NewTasks;
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
      stateCopy4[action.todolistId] = [];
      return stateCopy4;
    case "REMOVE-TODOLIST":
      const stateCopy5 = { ...state };
      delete stateCopy5[action.id];
      return stateCopy5;
    default:
      return state;
  }
};
export const RemoveTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => ({ type: "REMOVE-TASK", taskId, todolistId });

export const addTaskAC = (
  title: string,
  todolistId: string
): AddTaskActionType => ({ type: "ADD-TASK", title, todolistId });

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
