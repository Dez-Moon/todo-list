import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoList from './ToDoList';

 let FilterValuesType = "all" | "active" | "completed"
function App() {
  let [tasks, setTasks] = useState([
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'Js', isDone: true},
    {id: 3, title: 'React', isDone: false},
    {id: 4, title: 'rest API', isDone: false},
    {id: 5, title: 'graphQL', isDone: false}
])
  let [filter, setFilter] = useState<FilterValuesType>('all')
  let taskForToDoList = tasks
  if (filter === 'active') {
    taskForToDoList = tasks.filter(t => t.isDone === false)
  }
  if (filter === 'completed') {
    taskForToDoList = tasks.filter(t => t.isDone === true)
  }
  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }
function removeTask(id: number) {
    const filteredTasks = tasks.filter(t => t.id != id)
    setTasks(filteredTasks)
}
  return (
    <div className="App">
      <ToDoList title={'First'} tasks={taskForToDoList} removeTask={removeTask} />
    </div>
  );
}

export default App;
