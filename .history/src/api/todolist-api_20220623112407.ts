import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    // Не забываем заменить API-KEY на собственный
    "API-KEY": "1cdd9f77-c60e-4af5-b194-659e4ebd5d41",
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
};
