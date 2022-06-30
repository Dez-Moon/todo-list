import { Delete } from "@mui/icons-material";
import { createTheme, Grid, IconButton, Paper } from "@mui/material";
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
    drop: (item: any) => moveTodolist(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const moveTodolist = (id: string) => {
    console.log(id);
    const thunk = deleteTodolistTC(id);
    thunk(dispatch);
  };
  const darkTheme = createTheme({ palette: { mode: "dark" } });
  const lightTheme = createTheme({ palette: { mode: "light" } });

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
      <Grid container spacing={2}>
        {[lightTheme, darkTheme].map((theme, index) => (
          <Grid item xs={6} key={index}>
            <ThemeProvider theme={theme}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "background.default",
                  display: "grid",
                  gridTemplateColumns: { md: "1fr 1fr" },
                  gap: 2,
                }}
              >
                {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
                  <Item key={elevation} elevation={elevation}>
                    {`elevation=${elevation}`}
                  </Item>
                ))}
              </Box>
            </ThemeProvider>
          </Grid>
        ))}
      </Grid>
      <Grid container style={{ padding: "20px", justifyContent: "center" }}>
        <AddItemForm addItem={addToDoList} />
        <Delete
          sx={{ fontSize: "100px", position: "absolute", right: "0px" }}
          color='disabled'
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
