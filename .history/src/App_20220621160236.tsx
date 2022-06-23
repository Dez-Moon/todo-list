import React, { useState } from "react";
import "./App.css";
import ToDoList, { TasksType } from "./ToDoList";
import { v1 as uuidv1 } from "uuid";
import AddItemForm from "./AddItemForm";
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Container } from "@mui/system";

export type FilterValuesType = "all" | "active" | "completed";
export type ToDoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
type TasksStateType = {
  [key: string]: Array<TasksType>;
};
function App() {
  let toDoList1 = uuidv1();
  let toDoList2 = uuidv1();
  let [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
    { id: toDoList1, title: "What to learn", filter: "all" },
    { id: toDoList2, title: "What to buy", filter: "all" },
  ]);
  let [tasks, setTasks] = useState<TasksStateType>({
    [toDoList1]: [
      { id: uuidv1(), title: "HTML&CSS", isDone: true },
      { id: uuidv1(), title: "JS", isDone: true },
    ],
    [toDoList2]: [
      { id: uuidv1(), title: "Milk", isDone: true },
      { id: uuidv1(), title: "React Book", isDone: true },
    ],
  });
  function addTask(title: string, toDoListId: string) {
    let task = { id: uuidv1(), title: title, isDone: false };
    let toDoListTasks = tasks[toDoListId];
    tasks[toDoListId] = [task, ...toDoListTasks];
    setTasks({ ...tasks });
  }
  function changeFilter(value: FilterValuesType, toDoListId: string) {
    let toDoList = toDoLists.find((tl) => tl.id === toDoListId);
    if (toDoList) {
      toDoList.filter = value;
      setToDoLists([...toDoLists]);
    }
  }
  function removeTask(id: string, toDoListId: string) {
    const toDoListTasks = tasks[toDoListId];
    tasks[toDoListId] = toDoListTasks.filter((t) => t.id === id);
    setTasks({ ...tasks });
  }
  function changeStatus(id: string, isDone: boolean, toDoListId: string) {
    let toDoListTasks = tasks[toDoListId];
    let task = toDoListTasks.find((t) => t.id === id);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasks });
    }
  }
  function removeToDoList(id: string) {
    setToDoLists(toDoLists.filter((tl) => tl.id != id));
    delete tasks[id];
    setTasks({ ...tasks });
  }
  function addToDoList(title: string) {
    let newToDoListId = uuidv1();
    let newToDoList: ToDoListType = {
      id: newToDoListId,
      title: title,
      filter: "all",
    };
    setToDoLists([newToDoList, ...toDoLists]);
    setTasks({ ...tasks, [newToDoListId]: [] });
  }
  function changeTaskTitle(id: string, newValue: string, toDoListId: string) {
    let toDoListTasks = tasks[toDoListId];
    let task = toDoListTasks.find((t) => t.id === id);
    if (task) {
      task.title = newValue;
      setTasks({ ...tasks });
    }
  }
  function changeToDoListTitle(id: string, newValue: string) {
    const toDoList = toDoLists.find((tl) => tl.id === id);
    if (toDoList) {
      toDoList.title = newValue;
      setToDoLists([...toDoLists]);
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
        <Grid container>
          <AddItemForm addItem={addToDoList} />
        </Grid>
        <Grid container>
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
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
