import { Delete } from "@mui/icons-material";
import { Button, Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddItemForm from "./AddItemForm";
import { FilterValuesType, TasksStateType } from "./AppWithRedux";
import EditableSpan from "./EditableSpan";
import { AppRootState } from "./state/store";
import { addTaskAC } from "./state/tasks-reducer";

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
  const dispatch = useDispatch;
  const tasks = useSelector<AppRootState, TasksStateType>(
    (state) => state.tasks
  );
  function addTask(title: string) {
    const action = addTaskAC(title, props.id);
    dispatch(action);
  }
  function removeTask(id: string, toDoListId: string) {
    const action = RemoveTaskAC(id, toDoListId);
    dispatch(action);
  }
  function changeTaskTitle(id: string, newValue: string, toDoListId: string) {
    const action = changeTaskTitleAC(id, newValue, toDoListId);
    dispatch(action);
  }
  function changeStatus(id: string, isDone: boolean, toDoListId: string) {
    const action = changeTaskStatusAC(id, isDone, toDoListId);
    dispatch(action);
  }
  const onAllClickHandler = () => {
    changeFilter("all", props.id);
  };
  const onActiveClickHandler = () => {
    changeFilter("active", props.id);
  };
  const onCompletedClickHandler = () => {
    changeFilter("completed", props.id);
  };
  const onDeleteTaskList = (id: string) => {
    removeToDoList(id);
  };
  const changeToDoListTitle = (newValue: string) => {
    changeToDoListTitle(props.id, newValue);
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
