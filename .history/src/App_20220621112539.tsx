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
  let toDoList1 = uuidv1();
  let toDoList2 = uuidv1();
  let [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
    { id: toDoList1, title: "What to learn", filter: "all" },
    { id: toDoList2, title: "What to buy", filter: "all" },
  ]);
  let [tasks, setTasks] = useState({
    [toDoList1]: [
      { id: uuidv1(), title: "HTML&CSS", isDone: true },
      { id: uuidv1(), title: "JS", isDone: true },
    ],
    [toDoList2]: [
      { id: uuidv1(), title: "Milk", isDone: true },
      { id: uuidv1(), title: "React Book", isDone: true },
    ],
  });
  function addTask(title: string, toDoListId: string) {
    let task = { id: uuidv1(), title: title, isDone: false };
    let toDoListTasks = tasks[toDoListId];
    tasks[toDoListId] = [task, ...toDoListTasks];
    setTasks({ ...tasks });
  }
  function changeFilter(value: FilterValuesType, toDoListId: string) {
    let toDoList = toDoLists.find((tl) => tl.id === toDoListId);
    if (toDoList) {
      toDoList.filter = value;
      setToDoLists([...toDoLists]);
    }
  }
  function removeTask(id: string, toDoListId: string) {
    const toDoListTasks = tasks[toDoListId];
    tasks[toDoListId] = toDoListTasks.filter((t) => t.id === id);
    setTasks({ ...tasks });
  }
  function changeStatus(id: string, isDone: boolean, toDoListId: string) {
    let toDoListTasks = tasks[toDoListId];
    let task = toDoListTasks.find((t) => t.id === id);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasks });
    }
  }
  function removeToDoList(id: string) {
    setToDoLists(toDoLists.filter((tl) => tl.id != id));
    delete tasks[id];
    setTasks({ ...tasks });
  }
  return (
    <div className='App'>
      {toDoLists.map((tl) => {
        let allToDoListTasks = tasks[tl.id];
        let taskForToDoList = allToDoListTasks;
        if (tl.filter === "active") {
          taskForToDoList = allToDoListTasks.filter((t) => t.isDone === false);
        }
        if (tl.filter === "completed") {
          taskForToDoList = allToDoListTasks.filter((t) => t.isDone === true);
        }
        return (
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
            removeToDoList={removeToDoList}
          />
        );
      })}
    </div>
  );
}

export default App;
