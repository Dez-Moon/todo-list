import React, { useEffect, useState } from "react";
import "./App.css";
import {
  AppBar,
  Button,
  CircularProgress,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Container } from "@mui/system";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { TaskType } from "./api/tasks-api";
import { initializeAppTC, logoutTC } from "./state/auth-reducer";
import { RequestStatusType } from "./state/app-reducer";
import { ErrorSnackbar } from "./component/ErrorSnackbar/ErrorSnackbar";
import { Navigate, Route, Routes } from "react-router-dom";
import TodolistsList from "./TodolistsList";
import Login from "./features/Login";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./component/GlobalStyles/globalStyles";
import { darkTheme, lightTheme } from "./component/GlobalStyles/Themes";

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
  const isLogedIn = useSelector<AppRootStateType>(
    (state) => state.auth.isLoggedIn
  );
  const isInitialized = useSelector<AppRootStateType, boolean>(
    (state) => state.app.isInitialized
  );
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

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
  const thunk = logoutTC();
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <DndProvider backend={HTML5Backend}>
          <div className='App'>
            <button onClick={themeToggler}>Switch Theme</button>
            <ErrorSnackbar />
            <AppBar position='static'>
              <Toolbar>
                <IconButton edge='start' color='inherit' aria-label='menu'>
                  <Menu />
                </IconButton>
                <Typography variant='h6'>News</Typography>
                {isLogedIn ? (
                  <Button color='inherit' onClick={() => thunk(dispatch)}>
                    Log out
                  </Button>
                ) : (
                  <Button color='inherit'>Login</Button>
                )}
              </Toolbar>
              {status === "loading" && <LinearProgress color='info' />}
            </AppBar>
            <Container fixed sx={{ position: "relative" }}>
              <Routes>
                <Route path='/' element={<TodolistsList />} />
                <Route path='/login' element={<Login />} />
                <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
                <Route path='*' element={<Navigate to='/404' />} />
              </Routes>
            </Container>
          </div>
        </DndProvider>
      </>
    </ThemeProvider>
  );
}

export default AppWithRedux;
