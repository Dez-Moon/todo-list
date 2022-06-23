import { Delete } from "@mui/icons-material";
import { Button, Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddItemForm from "./AddItemForm";
import { FilterValuesType, TasksStateType } from "./AppWithRedux";
import EditableSpan from "./EditableSpan";
import { AppRootState } from "./state/store";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  RemoveTaskAC,
} from "./state/tasks-reducer";
import {
  ChangeToDoListFilterAC,
  ChangeToDoListTitleAC,
  RemoveToDoListAC,
} from "./state/todolists-reducer";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  id: string;
  filter: FilterValuesType;
};
const ToDoList = (props: PropsType) => {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootState, Array<TaskType>>(
    (state) => state.tasks[props.id]
  );
  const addTask = (title: string) => {
    dispatch(addTaskAC(title, props.id));
  };
  const onAllClickHandler = () => {
    dispatch(ChangeToDoListFilterAC(props.id, "all"));
  };
  const onActiveClickHandler = () => {
    dispatch(ChangeToDoListFilterAC(props.id, "active"));
  };
  const onCompletedClickHandler = () => {
    dispatch(ChangeToDoListFilterAC(props.id, "completed"));
  };
  const onDeleteTaskList = (id: string) => {
    dispatch(RemoveToDoListAC(id));
  };
  const changeToDoListTitle = (newValue: string) => {
    dispatch(ChangeToDoListTitleAC(props.id, newValue));
  };
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
        {tasks.map((t) => {
          const onClickHandler = () => {
            dispatch(RemoveTaskAC(t.id, props.id));
          };
          const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id));
          };
          const onChangeTitle = (newValue: string) => {
            dispatch(changeTaskTitleAC(t.id, newValue, props.id));
          };

          return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
              <Checkbox
                checked={t.isDone}
                color='primary'
                onChange={onChangeStatus}
              />
              <EditableSpan onChange={onChangeTitle} title={t.title} />
              <IconButton onClick={onClickHandler}>
                <Delete />
              </IconButton>
            </div>
          );
        })}
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
};

export default ToDoList;
