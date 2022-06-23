import React, { useEffect, useState } from "react";
import axios from "axios";

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
    axios
      .get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
      .then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  axios
    .post(
      "https://social-network.samuraijs.com/api/1.1/todo-lists",
      { title: "newTodolist" },
      settings
    )
    .then((res) => {
      setState(res.data);
    });

  useEffect(() => {}, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const todolistId = "52af4e9d-f127-4ae0-b08a-377ed2fe872f";
  axios
    .delete(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
      settings
    )
    .then((res) => {
      setState(res.data);
    });

  useEffect(() => {}, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {}, []);

  return <div> {JSON.stringify(state)}</div>;
};
