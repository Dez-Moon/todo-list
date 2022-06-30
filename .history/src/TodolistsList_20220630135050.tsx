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
import { addTaskTC, removeTaskAC } from "./state/tasks-reducer";
import {
  addTodolistTC,
  deleteTodolistTC,
  fetchTodolistsTC,
  TodolistDomainType,
} from "./state/todolists-reducer";
import ToDoList, { TaskType } from "./ToDoList";

const TodolistsList = () => {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todolist",
    drop: (item: any) => {
      moveTodolist(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const moveTodolist = (id: string) => {
    console.log(id);
    const thunk = deleteTodolistTC(id);
    thunk(dispatch);
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
