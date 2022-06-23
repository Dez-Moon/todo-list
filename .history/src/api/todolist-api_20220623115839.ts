import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    // Не забываем заменить API-KEY на собственный
    "API-KEY": "542b88d2-56dc-4f40-8bfd-ce69dc37cdf7",
  },
});

export const todolistAPI = {
  getTodoLists() {
    const promise = instance.get(`todo-lists`);
    return promise;
  },
  updateTodolist(todolistId: string, title: string) {
    const promise = instance.put(`todo-lists/${todolistId}`, { title: title });
    return promise;
  },
  createTodoList(title: string) {
    const promise = instance.post(`todo-lists`, { title });
    return promise;
  },
  deleteTodoList(todolistId: string) {
    const promise = instance.delete(`todo-lists/${todolistId}`);
    return promise;
  },
};
