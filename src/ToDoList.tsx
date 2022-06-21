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
    addTask: (title: string) => void,
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
        {props.tasks.map(t => {
          const onClickHandler = () => {props.removeTask(t.id)}
        return <li key={t.id}>
            <input type='checkbox' checked={t.isDone} />
            <span>{t.title}</span>
            <button onClick={onClickHandler}>x</button>
          </li>
})}
      </ul>
      <div>
        <button onClick={onAllClickHandler}
        >
          All
        </button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
};

export default ToDoList;
