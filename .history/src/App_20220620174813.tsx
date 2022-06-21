import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoList from './ToDoList';

function App() {
  let [tasks, setTasks] = useState([
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'Js', isDone: true},
    {id: 3, title: 'React', isDone: false},
    {id: 4, title: 'rest API', isDone: false},
    {id: 5, title: 'graphQL', isDone: false}
])
function removeTask(id: number) {
    tasks1 = tasks1.filter(t => t.id != id)
    console.log(tasks)
}
  return (
    <div className="App">
      <ToDoList title={'First'} tasks={tasks} removeTask={removeTask} />
    </div>
  );
}

export default App;
