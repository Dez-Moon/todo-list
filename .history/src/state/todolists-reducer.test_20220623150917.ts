import { SetTodolistsAC } from "./../../.history/src/state/todolists-reducer_20220623144441";
import { todolistsReducer } from "./../../.history/src/state/todolists-reducer_20220623145352";
import { FilterValuesType } from "./../../.history/src/App_20220620181237";
import { ToDoListType } from "./../../.history/src/App_20220621102428";
import {
  AddToDoListAC,
  ChangeToDoListFilterAC,
  ChangeToDoListTitleAC,
  RemoveToDoListAC,
  todolistsReducer,
} from "./todolists-reducer";
import { v1 } from "uuid";

let todolistId1: string;
let todolistId2: string;
let startState: Array<ToDoListType> = [];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];
});
test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, RemoveToDoListAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});
test("correct todolist should be added", () => {
  let newTodolistTitle = "New Todolist";

  const endState = todolistsReducer(
    startState,
    AddToDoListAC(newTodolistTitle)
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[0].filter).toBe("all");
});

test("correct todolist should change its name", () => {
  let newTodolistTitle = "New Todolist";

  const endState = todolistsReducer(
    startState,
    ChangeToDoListTitleAC(todolistId2, newTodolistTitle)
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});
test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValuesType = "completed";

  const endState = todolistsReducer(
    startState,
    ChangeToDoListFilterAC(todolistId2, newFilter)
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
test("todolists must change", () => {
  const todolists = [
    { id: "1", title: "Hello", addedDate: "222222", order: 0 },
  ];
  const endState = todolistsReducer([], SetTodolistsAC(todolists));
  expect(endState.length).toBe(2);
});
