import { ActionTypes } from "@mui/base";
import { TasksStateType } from "./../../.history/src/App_20220621183248";
type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};
type ActionsType = RemoveTaskActionType;

export const tasksReducer = (
  state: TasksStateType,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      const toDoListTasks = state[action.todolistId];
      state[action.taskId] = toDoListTasks.filter((t) => t.id != action.taskId);
      return { ...state };
    default:
      throw new Error("I don't understand this type");
  }
};
export const removeTaskAC = (
  todolistId: string,
  taskId: string
): RemoveTaskActionType => ({ type: "REMOVE-TASK", todolistId, taskId });

test('correct task should be added to correct array', () => {
  const startState: TasksStateType = {
      "todolistId1": [
          { id: "1", title: "CSS", isDone: false },
          { id: "2", title: "JS", isDone: true },
          { id: "3", title: "React", isDone: false }
      ],
      "todolistId2": [
          { id: "1", title: "bread", isDone: false },
          { id: "2", title: "milk", isDone: true },
          { id: "3", title: "tea", isDone: false }
      ]
  };

  const action = addTaskAC("juce", "todolistId2");

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(XXX);
  expect(endState["todolistId2"].length).toBe(XXX);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe(XXX);
  expect(endState["todolistId2"][0].isDone).toBe(XXX);