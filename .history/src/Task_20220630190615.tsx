import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, useCallback } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { TaskStatuses } from "./api/tasks-api";
import EditableSpan from "./EditableSpan";
import { RequestStatusType } from "./state/app-reducer";
import { removeTaskTC, updateTaskTC } from "./state/tasks-reducer";
import { TaskType } from "./ToDoList";

type TaskPropsType = {
  todolistId: string;
  task: TaskType;
  entityStatus: RequestStatusType;
};

const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { task: props.task, todolistId: props.todolistId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const onClickHandler = () => {
    const thunk = removeTaskTC(props.task.id, props.todolistId);
    thunk(dispatch);
  };
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
    <div className={props.task.status ? "is-done" : ""} ref={drag}>
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        color='primary'
        onChange={onChangeStatus}
        disabled={props.entityStatus === "loading"}
      />
      <EditableSpan
        onChange={onChangeTitle}
        title={props.task.title}
        disabled={props.entityStatus === "loading"}
      />
      <IconButton
        onClick={onClickHandler}
        disabled={props.entityStatus === "loading"}
      >
        <Delete />
      </IconButton>
    </div>
  );
});

export default Task;
