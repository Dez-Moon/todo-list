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
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input onKeyPress={(e) => {if (e.charCode === 13) {AddTask();}}}
         onChange={(e) => {setTitle(e.currentTarget.value)}} value={title}/>
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
        <button onClick={() => {props.changeFilter('all')}}
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
