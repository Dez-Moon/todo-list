import React, { useEffect, useState } from "react";
import { todolistAPI } from "../api/todolist-api";
import { tasksAPI } from "../api/tasks-api";

export default {
  title: "API",
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "73ec8e1c-78b6-4662-a649-c11b4e760526";
    tasksAPI.getTasks(todolistId).then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const title = "New todolist";
    todolistAPI.createTodoList(title).then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "c6b277c0-1a35-467f-9bca-40d1b3d2df0e";
    todolistAPI.deleteTodoList(todolistId).then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "4f1927ec-9efa-4870-824a-02658c376511";
    const title = "Hello motorolla";
    todolistAPI
      .updateTodolist(todolistId, title)
      .then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
