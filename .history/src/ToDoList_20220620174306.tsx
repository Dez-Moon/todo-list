import React from "react";

type TasksType = {
    id: number,
    title: string;
    isDone: boolean,
}

type PropsType = {
    title : string,
    tasks : Array<TasksType>
    removeTask: (taskId: number) => void
}
const ToDoList = (props: any) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((t) => (
          <li key={t.id}>
            <input type='checkbox' />
            <span>{t.title}</span>
            <button
              onClick={() => {
                alert("hi");
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={(e) => {
            alert("1");
          }}
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
