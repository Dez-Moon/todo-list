import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  RemoveTaskAC,
  tasksReducer,
} from "./tasks-reducer";
import { TasksStateType } from "../AppWithRedux";
import { AddToDoListAC, RemoveToDoListAC } from "./todolists-reducer";

let startState: TasksStateType;

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        addedDate: "2022-06-24T10:36:39.5573724Z",
        deadline: "",
        description: "",
        id: "c245cd23-51fa-4512-9152-c9d4e5ddc151",
        order: -2,
        priority: 1,
        startDate: "",
        status: 0,
        title: "xd",
        todoListId: "56989097-b942-40d8-a268-c7405789610c",
      },
    ],
    todolistId2: [
      {
        addedDate: "2022-06-24T10:36:39.5573724Z",
        deadline: "",
        description: "",
        id: "c245cd23-51fa-4512-9152-c9d4e5ddc151",
        order: -2,
        priority: 1,
        startDate: "",
        status: 0,
        title: "1",
        todoListId: "56989097-b942-40d8-a268-c7405789610c",
      },
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  const action = RemoveTaskAC("2", "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "3", title: "tea", isDone: false },
    ],
  });
});

test("correct task should be added to correct array", () => {
  const action = addTaskAC(startState["todolistId1"][0]);

  const endState = tasksReducer({}, action);

  expect(endState["todolistId1"].length).toBe(1);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("xd");
});

test("status of specified task should be changed", () => {
  const action = changeTaskStatusAC("2", false, "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId2"][1].isDone).toBeFalsy;
  expect(endState["todolistId1"][1].isDone).toBeTruthy;
});

test("title of specified task should be changed", () => {
  const action = changeTaskTitleAC("2", "Rahmet", "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId2"][1].title).toBe("Rahmet");
  expect(endState["todolistId1"][1].title).toBe("JS");
});

test("new property with new array should be added when new todolist is added", () => {
  const action = AddToDoListAC("Hello moto");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const action = RemoveToDoListAC("todolistId2");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});