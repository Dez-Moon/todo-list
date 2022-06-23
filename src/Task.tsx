import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import EditableSpan from "./EditableSpan";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  RemoveTaskAC,
} from "./state/tasks-reducer";
import { TaskType } from "./ToDoList";

type TaskPropsType = {
  todolistId: string;
  task: TaskType;
};

const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(RemoveTaskAC(props.task.id, props.todolistId));
  };
  const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    dispatch(
      changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId)
    );
  };
  const onChangeTitle = useCallback(
    (newValue: string) => {
      dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId));
    },
    [dispatch, props.todolistId]
  );

  return (
    <div className={props.task.isDone ? "is-done" : ""}>
      <Checkbox
        checked={props.task.isDone}
        color='primary'
        onChange={onChangeStatus}
      />
      <EditableSpan onChange={onChangeTitle} title={props.task.title} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
}) ;

export default Task;
