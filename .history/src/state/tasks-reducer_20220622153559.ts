import { v1 } from "uuid";
import { TasksStateType } from "./../../.history/src/App_20220621183248";
import {
  AddToDoListActionType,
  RemoveToDoListActionType,
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
  | RemoveToDoListActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
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
      const tasks2 = state[action.todolistId];
      const task = tasks2.find((t) => t.id === action.taskId);
      if (task) {
        task.isDone = action.isDone;
      }
      state[action.todolistId] = [...tasks2];
      return { ...state };
    case "CHANGE-TASK-TITLE":
      const stateCopy3 = { ...state };
      const tasks3 = stateCopy3[action.todolistId];
      const task1 = tasks3.find((t) => t.id === action.taskId);
      if (task1) {
        task1.title = action.title;
      }
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
