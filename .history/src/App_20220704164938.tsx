import { useEffect } from "react";
import "./App.css";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { TaskType } from "./api/tasks-api";
import { initializeAppTC, logoutTC } from "./state/auth-reducer";
import { RequestStatusType } from "./state/app-reducer";
import { ErrorSnackbar } from "./components/ErrorSnackbar/ErrorSnackbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./features/Login";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DarkMode from "./components/GlobalStyles/DarkMode";
import TodolistsList from "./components/TodolistsList";

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
  const darkMode = useSelector<AppRootStateType>((state) => state.app.darkMode);
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  );
  const isLogedIn = useSelector<AppRootStateType>(
    (state) => state.auth.isLoggedIn
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
  const thunk = logoutTC();
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='App'>
        <ErrorSnackbar />

        <Box>
          <AppBar position='static'>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <DarkMode />
                {!darkMode ? (
                  <Typography variant='h6'>Light mode</Typography>
                ) : (
                  <Typography variant='h6'>Dark mode</Typography>
                )}
              </div>
              <div>
                {isLogedIn ? (
                  <Button color='inherit' onClick={() => thunk(dispatch)}>
                    Log out
                  </Button>
                ) : (
                  <Button color='inherit'>Login</Button>
                )}
              </div>
            </Toolbar>
            {status === "loading" && <LinearProgress color='info' />}
          </AppBar>
        </Box>
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
  );
}

export default AppWithRedux;
