import { Grid, Paper } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AddItemForm from "./AddItemForm";
import { TasksStateType } from "./AppWithRedux";
import { AppRootStateType } from "./state/store";
import {
  addTodolistTC,
  ChangeToDoListFilterAC,
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
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addToDoList} />
      </Grid>
      <Grid container spacing={5}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];
          const onAllClickHandler = useCallback(() => {
            dispatch(ChangeToDoListFilterAC(todolist.id, "all"));
          }, [dispatch, props.todolist.id]);
          const onActiveClickHandler = useCallback(() => {
            dispatch(ChangeToDoListFilterAC(todolist.id, "active"));
          }, [dispatch, props.todolist.id]);
          const onCompletedClickHandler = useCallback(() => {
            dispatch(ChangeToDoListFilterAC(todolist.id, "completed"));
          }, [dispatch, props.todolist.id]);

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
