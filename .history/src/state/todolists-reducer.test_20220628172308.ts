import { v1 } from "uuid";
import {
  addTodolistAC,
  changeTodolistEntityStatusAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
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
  expect(endState[0].id).toBe(todolist.id);
});

test("correct todolist's title should be changed", () => {
  const endState = todolistsReducer(
    startState,
    changeTodolistTitleAC({ id: todolistId1, title: "HO-HO-HO" })
  );

  expect(endState[0].title).toBe("HO-HO-HO");
  expect(endState[1].title).toBe(startState[1].title);
});

test("correct todolist's filter should be changed", () => {
  const endState = todolistsReducer(
    startState,
    changeTodolistFilterAC({ id: todolistId1, filter: "active" })
  );

  expect(endState[0].filter).toBe("active");
  expect(endState[1].filter).toBe("all");
});

test("correct todolist's entityStatus should be changed", () => {
  const endState = todolistsReducer(
    startState,
    changeTodolistEntityStatusAC({ id: todolistId1, status: "loading" })
  );

  expect(endState[0].entityStatus).toBe("loading");
  expect(endState[1].entityStatus).toBe("idle");
});
