import React, { useEffect, useState } from "react";
import axios from "axios";
import { todolistAPI } from "../api/todolist-api";
import { tasksAPI } from "../api/tasks-api";

export default {
  title: "API",
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
    const title = "New todolist";
    todolistAPI.createTodoList(title).then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "b46845ad-ccbb-4066-b1f4-5bd555fc6ad5";
    todolistAPI.deleteTodoList(todolistId).then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "4672edb5-fc3c-4efb-b79f-c580a928881e";
    const title = "3 Todolist";
    todolistAPI
      .updateTodolist(todolistId, title)
      .then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "73ec8e1c-78b6-4662-a649-c11b4e760526";
    tasksAPI.getTasks(todolistId).then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const createTask = () => {
    tasksAPI.createTask(todolistId, title).then((res) => {
      setState(res.data);
    });
  };
  return (
    <div>
      {" "}
      {JSON.stringify(state)}
      <div>
        <input
          value={todolistId}
          onChange={(e) => setTodolistId(e.currentTarget.value)}
          placeholder='todolistId'
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder='title'
        />
        <button onClick={createTask}>createTask</button>
      </div>
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "73ec8e1c-78b6-4662-a649-c11b4e760526";
    const taskId = "061590b8-37fd-40bc-a9b7-87620000b0c1";
    tasksAPI.deleteTask(todolistId, taskId).then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "73ec8e1c-78b6-4662-a649-c11b4e760526";
    const taskId = "3fe87903-215e-4e40-bf89-f38953aca15c";
    const newTaskData = {
      title: "New name Task",
      description: "Some task",
      completed: false,
      status: 12.1,
      priority: 10.2,
      startDate: 12.05,
      deadline: 12.06,
    };
    tasksAPI
      .updateTask(
        todolistId,
        taskId,
        newTaskData.title,
        newTaskData.description,
        newTaskData.completed,
        newTaskData.status,
        newTaskData.priority,
        newTaskData.startDate,
        newTaskData.deadline
      )
      .then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
