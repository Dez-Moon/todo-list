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
  type: "CHANGE-TASK-STATUS", id: string, isDone: boolean, todolistId: string
}
type ActionsType = RemoveTaskActionType | AddTaskActionType;

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

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string)