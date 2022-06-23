import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    // Не забываем заменить API-KEY на собственный
    "API-KEY": "542b88d2-56dc-4f40-8bfd-ce69dc37cdf7",
  },
};

export const todolistAPI = {
  updateTodolist(todolistId: string, title: string) {
    const promise = axios.put(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
      { title: title },
      settings
    );
    return promise;
  },
  createTodoList(title: string) {
    const promise = axios.post(
      `https://social-network.samuraijs.com/api/1.1//todo-lists`,
      { title }
    );
  },
};
