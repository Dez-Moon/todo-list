import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ToDoList from "./ToDoList";
import { v1 as uuidv1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState([
    { id: uuidv1(), title: "HTML&CSS", isDone: true },
    { id: uuidv1(), title: "Js", isDone: true },
    { id: uuidv1(), title: "React", isDone: false },
    { id: uuidv1(), title: "rest API", isDone: false },
    { id: uuidv1(), title: "graphQL", isDone: false },
  ]);
  let [filter, setFilter] = useState<FilterValuesType>("all");
  let taskForToDoList = tasks;
  if (filter === "active") {
    taskForToDoList = tasks.filter((t) => t.isDone === false);
  }
  if (filter === "completed") {
    taskForToDoList = tasks.filter((t) => t.isDone === true);
  }
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
      <ToDoList
        title={"First"}
        tasks={taskForToDoList}
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
