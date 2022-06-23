import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import AddItemForm from "./AddItemForm";
import { FilterValuesType } from "./App";

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
};
const ToDoList = (props: PropsType) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);
  const AddTask = () => {
    if (title.trim() !== "") {
      props.addTask(title, props.id);
      setTitle("");
    } else {
      setError("Title is required");
    }
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
  return (
    <div>
      <div className='title'>
        <h3>{props.title}</h3>
        <button
          onClick={() => {
            onDeleteTaskList(props.id);
          }}
        >
          x
        </button>
      </div>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => {
            props.removeTask(t.id, props.id);
          };
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeStatus(t.id, newIsDoneValue, props.id);
          };

          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={onChangeHandler}
              />
              <span>{t.title}</span>
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
