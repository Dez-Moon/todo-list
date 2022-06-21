import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { FilterValuesType } from "./App";

type TasksType = {
    id: string,
    title: string;
    isDone: boolean,
}

type PropsType = {
    title : string,
    tasks : Array<TasksType>,
    removeTask: (taskId: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: (title: string) => void
}
const ToDoList = (props: PropsType) => {
  let [title, setTitle] = useState('')
  const AddTask = () => {
    props.addTask(title)
    setTitle('')
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) 
    AddTask();
  }
  const onAllClickHandler = () => {
    props.changeFilter('all')
  }
  const onActiveClickHandler = () => {
    props.changeFilter('active')
  }
  const onCompletedClickHandler = () => {
    props.changeFilter('completed')
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input onKeyPress={onKeyPressHandler}
         onChange={onChangeHandler} value={title}/>
        <button onClick={AddTask}>+</button>
      </div>
      <ul>
        {props.tasks.map((t) => (
          <li key={t.id}>
            <input type='checkbox' checked={t.isDone}/>
            <span>{t.title}</span>
            <button
              onClick={() => {
                props.removeTask(t.id);
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={onAllClickHandler}
        >
          All
        </button>
        <button onClick={() => {props.changeFilter('active')}}>Active</button>
        <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
      </div>
    </div>
  );
};

export default ToDoList;
