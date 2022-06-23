import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
  withCredentials: true,
  headers: {
    // Не забываем заменить API-KEY на собственный
    "API-KEY": "542b88d2-56dc-4f40-8bfd-ce69dc37cdf7",
  },
});

export const tasksApi = {
  getTodoLists(todolistId: string) {
    const promise = instance.get(`${todolistId}/tasks`);
    return promise;
  },
};
