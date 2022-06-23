import React, { useEffect, useState } from "react";
import axios from "axios";
import { todolistAPI } from "../api/todolist-api";

export default {
  title: "API",
};
const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "542b88d2-56dc-4f40-8bfd-ce69dc37cdf7",
  },
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.getTodoLists().then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    axios
      .post(
        "https://social-network.samuraijs.com/api/1.1/todo-lists",
        { title: "newTodolist" },
        settings
      )
      .then((res) => {
        setState(res.data);
      });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "4a9f3dcd-12dd-491c-a0f4-3d838f4d4489";
    axios
      .delete(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
        settings
      )
      .then((res) => {
        setState(res.data);
      });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "";
    axios
      .put(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
        { title: "REACT>>>>>>>>>" },
        settings
      )
      .then((res) => {
        setState(res.data);
      });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
