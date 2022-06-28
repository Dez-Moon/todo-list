import { v1 } from "uuid";
import {
  addTodolistAC,
  removeTodolistAC,
  TodolistDomainType,
  todolistsReducer,
} from "./todolists-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
      entityStatus: "idle",
      addedDate: "",
      order: 0,
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
      entityStatus: "idle",
      addedDate: "",
      order: 0,
    },
  ];
});

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(
    startState,
    removeTodolistAC({ id: todolistId1 })
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  let todolist: TodolistDomainType = {
    id: "silver",
    title: "What to learn",
    filter: "all",
    entityStatus: "idle",
    addedDate: "",
    order: 0,
  };
  const endState = todolistsReducer(startState, addTodolistAC({ todolist }));

  expect(endState.length).toBe(3);
  expect(endState[0].id).toBe(todolistId2);
});
