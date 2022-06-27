import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { ChangeEvent, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddItemForm from "./AddItemForm";
import { TaskPriorities, TaskStatuses } from "./api/tasks-api";
import { FilterValuesType, TodolistType } from "./AppWithRedux";
import EditableSpan from "./EditableSpan";
import { RequestStatusType } from "./state/app-reducer";
import { AppRootStateType } from "./state/store";
import { addTaskTC, fetchTasksTC } from "./state/tasks-reducer";
import {
  ChangeToDoListFilterAC,
  ChangeToDoListTitleAC,
  changeToDoListTitleTC,
  deleteTodolistTC,
  RemoveToDoListAC,
} from "./state/todolists-reducer";
import Task from "./Task";

export type TaskType = {
  addedDate: string;
  deadline: any;
  description: any;
  id: string;
  order: number;
  priority: TaskPriorities;
  startDate: any;
  status: TaskStatuses;
  title: string;
  todoListId: string;
};
type PropsType = {
  title: string;
  id: string;
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
const ToDoList = React.memo((props: PropsType) => {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootStateType, Array<TaskType>>(
    (state) => state.tasks[props.id]
  );
  useEffect(() => {
    const thunk = fetchTasksTC(props.id);
    thunk(dispatch);
  }, []);
  const addTask = useCallback(
    (title: string) => {
      const thunk = addTaskTC(title, props.id);
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
    const thunk = changeToDoListTitleTC(props.id, newValue);
    thunk(dispatch);
  };
  let taskForToDoList = tasks;
  if (props.filter === "active") {
    taskForToDoList = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (props.filter === "completed") {
    taskForToDoList = tasks.filter((t) => t.status === TaskStatuses.Completed);
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
          disabled={props.entityStatus === "loading"}
        >
          <Delete />
        </IconButton>
      </div>
      <AddItemForm
        addItem={addTask}
        disabled={props.entityStatus === "loading"}
      />
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
