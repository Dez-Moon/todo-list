import React, { useCallback, useEffect } from "react";
import "./App.css";
import ToDoList, { TaskType } from "./ToDoList";
import AddItemForm from "./AddItemForm";
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Container } from "@mui/system";
import {
  AddToDoListAC,
  fetchTodolistsTC,
  SetTodolistsAC,
} from "./state/todolists-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { todolistAPI } from "./api/todolist-api";

export type FilterValuesType = "all" | "active" | "completed";
export type ToDoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
function AppWithRedux() {
  useEffect(() => {
    fetchTodolistsTC();
  }, []);

  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, Array<ToDoListType>>(
    (state) => state.todolists
  );

  const addToDoList = useCallback(
    (title: string) => {
      const action = AddToDoListAC(title);
      dispatch(action);
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