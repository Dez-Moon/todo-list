import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { tasksAPI, TaskStatuses, TaskType } from "./api/tasks-api";
import EditableSpan from "./EditableSpan";
import {
  changeTaskStatusAC,
  changeTaskStatusTC,
  changeTaskTitleAC,
  RemoveTaskAC,
  removeTaskTC,
} from "./state/tasks-reducer";

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
    let newIsDoneValue = e.currentTarget.checked;
    const thunk = changeTaskStatusTC(
      props.task.id,
      newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
      props.todolistId
    );
    debugger;
    thunk(dispatch);
  };
  const onChangeTitle = useCallback(
    (newValue: string) => {
      dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId));
    },
    [dispatch, props.todolistId]
  );

  return (
    <div
      key={props.task.id}
      className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}
    >
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
