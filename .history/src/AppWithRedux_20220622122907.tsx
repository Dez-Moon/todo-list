import React, { useReducer, useState } from "react";
import "./App.css";
import ToDoList, { TasksType } from "./ToDoList";
import { v1 } from "uuid";
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
  ChangeToDoListFilterAC,
  ChangeToDoListTitleAC,
  RemoveToDoListAC,
  todolistsReducer,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  RemoveTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type ToDoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TasksStateType = {
  [key: string]: Array<TasksType>;
};
function AppWithRedux() {
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootState, Array<ToDoListType>>(
    (state) => state.todolists
  );
  function addTask(title: string, toDoListId: string) {
    const action = addTaskAC(title, toDoListId);
    dispatch(action);
  }
  function changeFilter(value: FilterValuesType, toDoListId: string) {
    const action = ChangeToDoListFilterAC(toDoListId, value);
    dispatch(action);
  }
  function removeTask(id: string, toDoListId: string) {
    const action = RemoveTaskAC(id, toDoListId);
    dispatch(action);
  }
  function changeStatus(id: string, isDone: boolean, toDoListId: string) {
    const action = changeTaskStatusAC(id, isDone, toDoListId);
    dispatch(action);
  }
  function removeToDoList(id: string) {
    const action = RemoveToDoListAC(id);
    dispatch(action);
  }
  function addToDoList(title: string) {
    const action = AddToDoListAC(title);
    dispatch(action);
  }
  function changeTaskTitle(id: string, newValue: string, toDoListId: string) {
    const action = changeTaskTitleAC(id, newValue, toDoListId);
    dispatch(action);
  }
  function changeToDoListTitle(id: string, newValue: string) {
    const action = ChangeToDoListTitleAC(id, newValue);
    dispatch(action);
  }

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
          {toDoLists.map((tl) => {
            let allToDoListTasks = tasks[tl.id];
            let taskForToDoList = allToDoListTasks;
            if (tl.filter === "active") {
              taskForToDoList = allToDoListTasks.filter(
                (t) => t.isDone === false
              );
            }
            if (tl.filter === "completed") {
              taskForToDoList = allToDoListTasks.filter(
                (t) => t.isDone === true
              );
            }
            return (
              <Grid item>
                <Paper style={{ padding: "10px" }}>
                  <ToDoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={taskForToDoList}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    removeToDoList={removeToDoList}
                    changeTaskTitle={changeTaskTitle}
                    changeToDoListTitle={changeToDoListTitle}
                  />
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
