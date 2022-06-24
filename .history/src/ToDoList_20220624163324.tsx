import { Delete } from "@mui/icons-material";
import { Button, Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddItemForm from "./AddItemForm";
import { FilterValuesType } from "./AppWithRedux";
import EditableSpan from "./EditableSpan";
import { AppRootStateType } from "./state/store";
import { createTaskTC, fetchTasksTC } from "./state/tasks-reducer";
import {
  ChangeToDoListFilterAC,
  ChangeToDoListTitleAC,
  deleteTodolistTC,
  RemoveToDoListAC,
} from "./state/todolists-reducer";
import Task from "./Task";

export type TaskType = {
  item: any;
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  id: string;
  filter: FilterValuesType;
};
const ToDoList = React.memo((props: PropsType) => {
  console.log("todolist");
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootStateType, Array<TaskType>>(
    (state) => state.tasks[props.id]
  );
  useEffect(() => {
    const thunk = fetchTasksTC(props.id);
    thunk(dispatch);
  });
  const addTask = useCallback(
    (title: string) => {
      const thunk = createTaskTC(title, props.id);
      thunk(dispatch);
    },
    [props.id]
  );
  const onAllClickHandler = useCallback(() => {
    dispatch(ChangeToDoListFilterAC(props.id, "all"));
  }, [dispatch, props.id]);
  const onActiveClickHandler = useCallback(() => {
    dispatch(ChangeToDoListFilterAC(props.id, "active"));
  }, [dispatch, props.id]);
  const onCompletedClickHandler = useCallback(() => {
    dispatch(ChangeToDoListFilterAC(props.id, "completed"));
  }, [dispatch, props.id]);
  const onDeleteTaskList = (id: string) => {
    const thunk = deleteTodolistTC(props.id);
    thunk(dispatch);
  };
  const changeToDoListTitle = (newValue: string) => {
    dispatch(ChangeToDoListTitleAC(props.id, newValue));
  };
  let taskForToDoList = tasks;
  if (props.filter === "active") {
    taskForToDoList = tasks.filter((task) => task.isDone === false);
  }
  if (props.filter === "completed") {
    taskForToDoList = tasks.filter((task) => task.isDone === true);
  }

  return (
    <div className='todo-list'>
      <div className='title'>
        <h3>
          <EditableSpan onChange={changeToDoListTitle} title={props.title} />
        </h3>
        <IconButton
          onClick={() => {
            onDeleteTaskList(props.id);
          }}
        >
          <Delete />
        </IconButton>
      </div>
      <AddItemForm addItem={addTask} />
      <div>
        {taskForToDoList.map((task) => (
          <Task todolistId={props.id} task={task} key={task.id} />
        ))}
      </div>
      <div>
        <Button
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={onAllClickHandler}
          color='inherit'
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "contained" : "text"}
          onClick={onActiveClickHandler}
          color='primary'
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={onCompletedClickHandler}
          color='success'
        >
          Completed
        </Button>
      </div>
    </div>
  );
});

export default ToDoList;