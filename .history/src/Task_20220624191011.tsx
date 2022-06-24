import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { tasksAPI, TaskStatuses } from "./api/tasks-api";
import EditableSpan from "./EditableSpan";
import { AppRootStateType } from "./state/store";
import {
  changeTaskStatusAC,
  changeTaskStatusTC,
  changeTaskStatusTCC,
  changeTaskTitleAC,
  changeTaskTitleTC,
  RemoveTaskAC,
  removeTaskTC,
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
  const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.checked;
    const thunk = changeTaskStatusTCC(
      props.task.id,
      newValue ? TaskStatuses.Completed : TaskStatuses.New,
      props.todolistId
    );
    thunk(dispatch, { tasks: {}, todolists: [] });
  };
  const onChangeTitle = useCallback(
    (newValue: string) => {
      const thunk = changeTaskTitleTC(
        props.task.id,
        newValue,
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
      />
      <EditableSpan onChange={onChangeTitle} title={props.task.title} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});

export default Task;
