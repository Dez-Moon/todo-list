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
  const [title, setTitle] = useState<string>("");
  const createTodolist = () => {
    const title = "New todolist";
    todolistAPI.createTodoList(title).then((res) => setState(res.data));
  };

  return (
    <div>
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.currentTarget.value);
        }}
      />
      <button onClick={createTodolist}>create todolist</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
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
  const [todolistId, setTodolistId] = useState<string>("");
  const getTasks = () => {
    tasksAPI.getTasks(todolistId).then((res) => setState(res.data));
  };

  return (
    <div>
      <div>
        <input
          value={todolistId}
          onChange={(e) => setTodolistId(e.currentTarget.value)}
          placeholder='todolistId'
        />
        <button onClick={getTasks}>getTasks</button>
      </div>
      {JSON.stringify(state)}
    </div>
  );
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
      {JSON.stringify(state)}
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");

  const deleteTask = () => {
    tasksAPI.deleteTask(todolistId, taskId).then((res) => setState(res.data));
  };

  return (
    <div>
      <div>
        <input
          value={todolistId}
          onChange={(e) => setTodolistId(e.currentTarget.value)}
          placeholder='todolistId'
        />
        <input
          value={taskId}
          onChange={(e) => setTaskId(e.currentTarget.value)}
          placeholder='taskId'
        />
        <button onClick={deleteTask}>deleteTask</button>
      </div>
      {JSON.stringify(state)}
    </div>
  );
};
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const updateTask = () => {
    tasksAPI
      .updateTask(todolistId, taskId, {
        title: title,
        description: description,
        status: status,
        priority: priority,
        startDate: "",
        deadline: "",
      })
      .then((res) => setState(res.data));
  };

  return (
    <div>
      <input
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
        placeholder='todolistId'
      />
      <input
        value={taskId}
        onChange={(e) => setTaskId(e.currentTarget.value)}
        placeholder='taskId'
      />
      <input
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        placeholder='title'
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
        placeholder='description'
      />
      <input
        value={status}
        type='number'
        onChange={(e) => setStatus(+e.currentTarget.value)}
        placeholder='status'
      />
      <input
        value={priority}
        type='number'
        onChange={(e) => setPriority(+e.currentTarget.value)}
        placeholder='priority'
      />
      <input
        value={startDate}
        onChange={(e) => setStartDate(e.currentTarget.value)}
        placeholder='startDate'
      />
      <input
        value={deadline}
        onChange={(e) => setDeadline(e.currentTarget.value)}
        placeholder='deadline'
      />
      <button onClick={updateTask}>updateTask</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};
