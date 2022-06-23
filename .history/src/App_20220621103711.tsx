import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ToDoList from "./ToDoList";
import { v1 as uuidv1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
export type ToDoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  let [tasks, setTasks] = useState([
    { id: uuidv1(), title: "HTML&CSS", isDone: true },
    { id: uuidv1(), title: "Js", isDone: true },
    { id: uuidv1(), title: "React", isDone: false },
    { id: uuidv1(), title: "rest API", isDone: false },
    { id: uuidv1(), title: "graphQL", isDone: false },
  ]);
  let [toDoList, setToDoList] = useState<Array<ToDoListType>>([
    { id: uuidv1(), title: "What to learn", filter: "all" },
    { id: uuidv1(), title: "What to buy", filter: "all" },
  ]);

  function addTask(title: string) {
    let task = { id: uuidv1(), title: title, isDone: false };
    let newTasks = [task, ...tasks];
    setTasks(newTasks);
  }
  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }
  function removeTask(id: string) {
    const filteredTasks = tasks.filter((t) => t.id != id);
    setTasks(filteredTasks);
  }
  function changeStatus(id: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === id);
    if (task) {
      task.isDone = isDone;
      setTasks([...tasks]);
    }
  }
  return (
    <div className='App'>
      {toDoList.map((tl) => {
        let taskForToDoList = tasks;
        if (tl.filter === "active") {
          taskForToDoList = tasks.filter((t) => t.isDone === false);
        }
        if (tl.filter === "completed") {
          taskForToDoList = tasks.filter((t) => t.isDone === true);
        }
        <ToDoList
          key={tl.id}
          id={tl.id}
          title={tl.title}
          tasks={taskForToDoList}
          addTask={addTask}
          removeTask={removeTask}
          changeFilter={changeFilter}
          changeStatus={changeStatus}
          filter={tl.filter}
        />;
      })}
    </div>
  );
}

export default App;
