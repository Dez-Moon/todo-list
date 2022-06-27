import React, { useCallback, useEffect } from "react";
import "./App.css";
import ToDoList from "./ToDoList";
import AddItemForm from "./AddItemForm";
import {
  AppBar,
  Button,
  CircularProgress,
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
import { ErrorSnackbar } from "./component/ErrorSnackbar/ErrorSnackbar";
import { Navigate, Route, Routes } from "react-router-dom";
import TodolistsList from "./TodolistsList";
import Login from "./features/Login";
import { initializeAppTC } from "./state/auth-reducer";

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
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  );
  const isInitialized = useSelector<AppRootStateType, boolean>(
    (state) => state.app.isInitialized
  );

  useEffect(() => {
    const thunk = initializeAppTC();
    thunk(dispatch);
  });

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className='App'>
      <ErrorSnackbar />
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <Menu />
          </IconButton>
          <Typography variant='h6'>News</Typography>
          {isInitialized ? <Button color='inherit'>Log out</Button>}
          <Button color='inherit'>Login</Button>
        </Toolbar>
        {status === "loading" && <LinearProgress color='info' />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path='/' element={<TodolistsList />} />
          <Route path='/login' element={<Login />} />
          <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path='*' element={<Navigate to='/404' />} />
        </Routes>
      </Container>
    </div>
  );
}

export default AppWithRedux;
