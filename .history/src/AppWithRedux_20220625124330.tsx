import React, { useCallback, useEffect } from "react";
import "./App.css";
import ToDoList from "./ToDoList";
import AddItemForm from "./AddItemForm";
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Container } from "@mui/system";
import {
  AddToDoListAC,
  addTodolistTC,
  fetchTodolistsTC,
  TodolistDomainType,
} from "./state/todolists-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { TaskType } from "./api/tasks-api";
import { RequestStatusType } from "./state/app-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
function AppWithRedux() {
  const dispatch = useDispatch();
  useEffect(() => {
    const thunk = fetchTodolistsTC();
    thunk(dispatch);
    return;
  }, []);
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    (state) => state.todolists
  );
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  );

  const addToDoList = useCallback(
    (title: string) => {
      const thunk = addTodolistTC(title);
      thunk(dispatch);
    },
    [dispatch]
  );

  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <Menu />
          </IconButton>
          <Typography variant='h6'>News</Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
        {status === "loading" && <LinearProgress color='primary' />}
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addToDoList} />
        </Grid>
        <Grid container spacing={5}>
          {todolists.map((tl) => {
            return (
              <Grid item key={tl.id}>
                <Paper style={{ padding: "10px" }}>
                  <ToDoList id={tl.id} title={tl.title} filter={tl.filter} />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;