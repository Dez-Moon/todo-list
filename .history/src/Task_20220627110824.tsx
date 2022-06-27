import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { tasksAPI, TaskStatuses } from "./api/tasks-api";
import { TodolistType } from "./AppWithRedux";
import EditableSpan from "./EditableSpan";
import { RequestStatusType } from "./state/app-reducer";
import { AppRootStateType } from "./state/store";
import {
  removeTaskTC,
  TaskDomainType,
  updateTaskTC,
} from "./state/tasks-reducer";
import { TaskType } from "./ToDoList";

type TaskPropsType = {
  todolistId: string;
  task: TaskType;
};

const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    const thunk = removeTaskTC(props.task.id, props.todolistId);
    thunk(dispatch);
  };
  const entityStatus = useSelector<AppRootStateType>(
    (state) => state.tasks.entityStatus
  );
  const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.checked;
    const thunk = updateTaskTC(
      props.task.id,
      { status: newValue ? TaskStatuses.Completed : TaskStatuses.New },
      props.todolistId
    );
    thunk(dispatch);
  };
  const onChangeTitle = useCallback(
    (newValue: string) => {
      const thunk = updateTaskTC(
        props.task.id,
        { title: newValue },
        props.todolistId
      );
      thunk(dispatch);
    },
    [dispatch, props.todolistId]
  );

  return (
    <div className={props.task.status ? "is-done" : ""}>
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        color='primary'
        onChange={onChangeStatus}
        disabled={entityStatus === "loading"}
      />
      <EditableSpan onChange={onChangeTitle} title={props.task.title} />
      <IconButton
        onClick={onClickHandler}
        disabled={entityStatus === "loading"}
      >
        <Delete />
      </IconButton>
    </div>
  );
});

export default Task;
