import { TaskType } from "./../ToDoList";
import axios from "axios";
import { string } from "prop-types";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
  withCredentials: true,
  headers: {
    // Не забываем заменить API-KEY на собственный
    "API-KEY": "542b88d2-56dc-4f40-8bfd-ce69dc37cdf7",
  },
});
type UpdateTaskModelType = {
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
    const promise = instance.post(`${todolistId}/tasks`, { title });
    return promise;
  },
  deleteTask(todolistId: string, taskId: string) {
    const promise = instance.delete(`${todolistId}/tasks/${taskId}`);
    return promise;
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    const promise = instance.put(`${todolistId}/tasks/${taskId}`, model);
  },
};
