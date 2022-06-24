import { ToDoListType } from "./../../.history/src/App_20220621160236";
import axios from "axios";
import { ResponseType } from "./todolist-api";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
  withCredentials: true,
  headers: {
    "API-KEY": "542b88d2-56dc-4f40-8bfd-ce69dc37cdf7",
  },
});
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};
type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};
export const tasksAPI = {
  getTasks(todolistId: string) {
    const promise = instance.get<GetTasksResponse>(`${todolistId}/tasks`);
    return promise;
  },
  createTask(todolistId: string, title: string) {
    const promise = instance.post<ResponseType<{ item: TaskType }>>(
      `${todolistId}/tasks`,
      { title }
    );
    return promise;
  },
  deleteTask(todolistId: string, taskId: string) {
    const promise = instance.delete<ResponseType<{}>>(
      `${todolistId}/tasks/${taskId}`
    );
    return promise;
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    const promise = instance.put<ResponseType<{}>>(
      `${todolistId}/tasks/${taskId}`,
      model
    );
    return promise;
  },
};
