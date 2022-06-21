import React from "react";
import { getAllJSDocTagsOfKind } from "typescript";

type TasksType = {
    id: number,
    title: string;
    isDone: boolean,
}

type PropsType = {
    title : string,
    tasks : Array<TasksType>,
    removeTask: (taskId: number) => void,
}
const ToDoList = (props: PropsType) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input/>
        <button >+</button>
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
        <button onClick={() => {props.change}}
        >
          All
        </button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};

export default ToDoList;
