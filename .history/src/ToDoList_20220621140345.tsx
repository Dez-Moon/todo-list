import { IconButton } from "@mui/material";
import React, { ChangeEvent } from "react";
import AddItemForm from "./AddItemForm";
import { FilterValuesType } from "./App";
import EditableSpan from "./EditableSpan";
import { Delete } from "@mui/icons";

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  id: string;
  tasks: Array<TasksType>;
  removeTask: (taskId: string, toDoListId: string) => void;
  changeFilter: (value: FilterValuesType, toDoListId: string) => void;
  addTask: (title: string, toDoListId: string) => void;
  changeStatus: (id: string, isDone: boolean, toDoListId: string) => void;
  filter: FilterValuesType;
  removeToDoList: any;
  changeTaskTitle: (id: string, newValue: string, toDoListId: string) => void;
  changeToDoListTitle: (id: string, newValue: string) => void;
};
const ToDoList = (props: PropsType) => {
  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };
  const onAllClickHandler = () => {
    props.changeFilter("all", props.id);
  };
  const onActiveClickHandler = () => {
    props.changeFilter("active", props.id);
  };
  const onCompletedClickHandler = () => {
    props.changeFilter("completed", props.id);
  };
  const onDeleteTaskList = (id: string) => {
    props.removeToDoList(id);
  };
  const changeToDoListTitle = (newValue: string) => {
    props.changeToDoListTitle(props.id, newValue);
  };
  return (
    <div>
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
      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => {
            props.removeTask(t.id, props.id);
          };
          const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeStatus(t.id, newIsDoneValue, props.id);
          };
          const onChangeTitle = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          };

          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={onChangeStatus}
              />
              <EditableSpan onChange={onChangeTitle} title={t.title} />
              <button onClick={onClickHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
