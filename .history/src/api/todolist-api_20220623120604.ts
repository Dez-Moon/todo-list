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
type CreateTodolistResponseType = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: {
    item: TodolistType;
  };
};
type UpdateTodolistResponseType = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: {};
};

type DeleteTodolistResponseType = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: {};
};

export const todolistAPI = {
  getTodoLists() {
    const promise = instance.get<Array<TodolistType>>(`todo-lists`);
    return promise;
  },
  updateTodolist(todolistId: string, title: string) {
    const promise = instance.put<Array<CreateTodolistResponseType>>(
      `todo-lists/${todolistId}`,
      { title: title }
    );
    return promise;
  },
  createTodoList(title: string) {
    const promise = instance.post<Array<UpdateTodolistResponseType>>(
      `todo-lists`,
      { title }
    );
    return promise;
  },
  deleteTodoList(todolistId: string) {
    const promise = instance.delete<Array<DeleteTodolistResponseType>>(
      `todo-lists/${todolistId}`
    );
    return promise;
  },
};