import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import AddItemForm from "./AddItemForm";
import { TaskPriorities, TaskStatuses } from "./api/tasks-api";
import EditableSpan from "./EditableSpan";
import { addTaskTC, fetchTasksTC, removeTaskAC } from "./state/tasks-reducer";
import {
  changeTodolistFilterAC,
  changeToDoListTitleTC,
  deleteTodolistTC,
  TodolistDomainType,
} from "./state/todolists-reducer";
import Task from "./Task";
export type TaskType = {
  addedDate: string;
  deadline: any;
  description: any;
  order: number;
  priority: TaskPriorities;
  startDate: any;
  status: TaskStatuses;
  title: string;
  id: string;
  todoListId: string;
  entityStatus?: any;
};
type PropsType = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
};
const ToDoList = React.memo((props: PropsType) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todolist",
    item: { id: props.todolist.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    const thunk = fetchTasksTC(props.todolist.id);
    thunk(dispatch);
  }, []);
  const addTask = useCallback(
    (title: string) => {
      const thunk = addTaskTC(title, props.todolist.id);
      thunk(dispatch);
    },
    [props.todolist.id]
  );

  const onDeleteTaskList = (id: string) => {
    const thunk = deleteTodolistTC(props.todolist.id);
    thunk(dispatch);
  };
  const changeToDoListTitle = (newValue: string) => {
    const thunk = changeToDoListTitleTC(props.todolist.id, newValue);
    thunk(dispatch);
  };
  const onAllClickHandler = useCallback(() => {
    dispatch(changeTodolistFilterAC({ id: props.todolist.id, filter: "all" }));
  }, [dispatch, props.todolist.id]);
  const onActiveClickHandler = useCallback(() => {
    dispatch(
      changeTodolistFilterAC({
        id: props.todolist.id,
        filter: "active",
      })
    );
  }, [dispatch, props.todolist.id]);
  const onCompletedClickHandler = useCallback(() => {
    dispatch(
      changeTodolistFilterAC({
        id: props.todolist.id,
        filter: "completed",
      })
    );
  }, [dispatch, props.todolist.id]);
  let taskForToDoList = props.tasks;
  if (props.todolist.filter === "active") {
    taskForToDoList = props.tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (props.todolist.filter === "completed") {
    taskForToDoList = props.tasks.filter(
      (t) => t.status === TaskStatuses.Completed
    );
  }
  return (
    <div
      className='todo-list'
      ref={drag}
      style={{ border: isDragging ? "5px solid red" : "opx" }}
    >
      <div className='title'>
        <h3>
          <EditableSpan
            onChange={changeToDoListTitle}
            title={props.todolist.title}
            disabled={props.todolist.entityStatus === "loading"}
          />
        </h3>
        <IconButton
          onClick={() => {
            onDeleteTaskList(props.todolist.id);
          }}
          disabled={props.todolist.entityStatus === "loading"}
        >
          <Delete />
        </IconButton>
      </div>
      <AddItemForm
        addItem={addTask}
        disabled={props.todolist.entityStatus === "loading"}
      />
      <div>
        {taskForToDoList.map((task) => (
          <Task
            todolistId={props.todolist.id}
            task={task}
            key={task.id}
            entityStatus={task.entityStatus}
          />
        ))}
      </div>
      <div>
        <Button
          variant={props.todolist.filter === "all" ? "contained" : "text"}
          onClick={onAllClickHandler}
          color='inherit'
        >
          All
        </Button>
        <Button
          variant={props.todolist.filter === "active" ? "contained" : "text"}
          onClick={onActiveClickHandler}
          color='primary'
        >
          Active
        </Button>
        <Button
          variant={props.todolist.filter === "completed" ? "contained" : "text"}
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
