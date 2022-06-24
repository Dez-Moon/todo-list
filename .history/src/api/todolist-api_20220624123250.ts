import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    // Не забываем заменить API-KEY на собственный
    "API-KEY": "542b88d2-56dc-4f40-8bfd-ce69dc37cdf7",
  },
});

type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};
export type ResponseType<D> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: D;
};

export const todolistAPI = {
  getTodoLists() {
    const promise = instance.get<Array<TodolistType>>(`todo-lists`);
    return promise;
  },
  updateTodolist(todolistId: string, title: string) {
    const promise = instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {
      title: title,
    });
    return promise;
  },
  createTodoList(title: string) {
    const promise = instance.post<ResponseType<{ item: TodolistType }>>(
      `todo-lists`,
      { title }
    );
    return promise;
  },
  deleteTodoList(todolistId: string) {
    const promise = instance.delete<ResponseType<{}>>(
      `todo-lists/${todolistId}`
    );
    return promise;
  },
};
