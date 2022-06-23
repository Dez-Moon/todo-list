import { v1 } from "uuid";
import { ActionTypes } from "@mui/base";
import { TasksStateType } from "./../../.history/src/App_20220621183248";

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
  | changeTaskTitleActionType;

export const tasksReducer = (
  state: TasksStateType,
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
      const stateCopy2 = { ...state };
      const tasks2 = stateCopy2[action.todolistId];
      const NewTasks1 = tasks2.find((t) => t.id === action.taskId);
      NewTasks1.isDone = action.isDone;
      stateCopy2[action.todolistId] = NewTasks1;
      return stateCopy2;
    case "CHANGE-TASK-TITLE":
      const stateCopy3 = { ...state };
      const tasks3 = stateCopy3[action.todolistId];
      const NewTasks2 = tasks3.find((t) => t.id === action.taskId);
      stateCopy2[action.todolistId] = NewTasks1;
      return stateCopy3;
    default:
      throw new Error("I don't understand this type");
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
