// import { ToDoListType } from "./../../.history/src/App_20220621102428";
// import { TasksStateType } from "../App";
// import { tasksReducer } from "./tasks-reducer";
// import { AddToDoListAC, todolistsReducer } from "./todolists-reducer";

// test("ids should be equals", () => {
//   const startTasksState: TasksStateType = {};
//   const startTodolistsState: Array<ToDoListType> = [];

//   const action = AddToDoListAC("new todolist");
// //
//   const endTasksState = tasksReducer(startTasksState, action);
//   const endTodolistsState = todolistsReducer(startTodolistsState, action);

//   const keys = Object.keys(endTasksState);
//   const idFromTasks = keys[0];
//   const idFromTodolists = endTodolistsState[0].id;

//   expect(idFromTasks).toBe(action.todolistId);
//   expect(idFromTodolists).toBe(action.todolistId);
// });
