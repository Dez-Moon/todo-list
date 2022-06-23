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
import { AddToDoListAC, ChangeToDoListFilterAC, ChangeToDoListTitleAC, RemoveToDoListAC, todolistsReducer } from "./state/todolists-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, RemoveTaskAC, tasksReducer } from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type ToDoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TasksStateType = {
  [key: string]: Array<TasksType>;
};
function AppWithReducers() {
  let toDoList1 = v1();
  let toDoList2 = v1();
  let [toDoLists, dispatchToTodolist] = useReducer(todolistsReducer, [
    { id: toDoList1, title: "What to learn", filter: "all" },
    { id: toDoList2, title: "What to buy", filter: "all" },
  ]);
  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [toDoList1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
    ],
    [toDoList2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "React Book", isDone: true },
    ],
  });
  function addTask(title: string, toDoListId: string) {
    const action = addTaskAC(title, toDoListId)
    dispatchToTasks(action)
  }
  function changeFilter(value: FilterValuesType, toDoListId: string) {
    const action = ChangeToDoListFilterAC(value, toDoListId)
    dispatchToTodolist(action)
  }
  function removeTask(id: string, toDoListId: string) {
    const action = RemoveTaskAC(id, toDoListId)
    dispatchToTasks(action)
  }
  function changeStatus(id: string, isDone: boolean, toDoListId: string) {
    const action = changeTaskStatusAC(id, isDone, toDoListId)
    dispatchToTasks(action)
  }
  function removeToDoList(id: string) {
    const action = RemoveToDoListAC(id)
    dispatchToTodolist(action)
    dispatchToTasks(action)
  }
  function addToDoList(title: string) {
    const action = AddToDoListAC(title);
    dispatchToTasks(action);
    dispatchToTodolist(action);
  }
  function changeTaskTitle(id: string, newValue: string, toDoListId: string) {
    const action = changeTaskTitleAC(id, newValue, toDoListId);
    dispatchToTasks(action)
  }
  function changeToDoListTitle(id: string, newValue: string) {
    const action = ChangeToDoListTitleAC(id, newValue);
    dispatchToTodolist(action)
    }
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

export default AppWithReducers;
