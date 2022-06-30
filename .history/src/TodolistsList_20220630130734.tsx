import { Delete } from "@mui/icons-material";
import { Grid, IconButton, Paper } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AddItemForm from "./AddItemForm";
import { TasksStateType, TodolistType } from "./AppWithRedux";
import { AppRootStateType } from "./state/store";
import { removeTaskAC } from "./state/tasks-reducer";
import {
  addTodolistTC,
  deleteTodolistTC,
  fetchTodolistsTC,
  TodolistDomainType,
} from "./state/todolists-reducer";
import ToDoList from "./ToDoList";

const TodolistsList = () => {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );
  const [{ isOverTodolist }, dropTodolist] = useDrop(() => ({
    accept: "todolist",
    dropTodolist: (item: any) => moveTodolist(item.id),
    collect: (monitor) => ({
      isOverTodolist: !!monitor.isOver(),
    }),
  }));
  const moveTodolist = (id: string) => {
    const thunk = deleteTodolistTC(id);
    thunk(dispatch);
  };
  const [{ isOverTask }, dropTask] = useDrop(() => ({
    accept: "task",
    dropTask: (item: any) => moveTask(item.id),
    collect: (monitor) => ({
      isOverTask: !!monitor.isOver(),
    }),
  }));
  const moveTask = (taskId: string, todolistId: string) => {
    const thunkDelete = removeTaskAC({ taskId, todolistId });
    thunkDelete(dispatch);
  };
  const dispatch = useDispatch();
  const addToDoList = useCallback(
    (title: string) => {
      const thunk = addTodolistTC(title);
      thunk(dispatch);
    },
    [dispatch]
  );
  useEffect(() => {
    if (!isLogedIn) return;
    const thunk = fetchTodolistsTC();
    thunk(dispatch);
  }, []);
  const isLogedIn = useSelector<AppRootStateType>(
    (state) => state.auth.isLoggedIn
  );
  if (!isLogedIn) {
    return <Navigate to='/login' />;
  }
  return (
    <>
      <Grid container style={{ padding: "20px", justifyContent: "center" }}>
        <AddItemForm addItem={addToDoList} />
        <Delete
          sx={{ fontSize: "100px", position: "absolute", right: "0px" }}
          ref={drop}
        />
      </Grid>
      <Grid container spacing={5} style={{ justifyContent: "center" }}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];
          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <ToDoList todolist={tl} tasks={allTodolistTasks} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default TodolistsList;
