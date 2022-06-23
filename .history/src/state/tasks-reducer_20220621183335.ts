import { TasksStateType } from './../../.history/src/App_20220621183248';
type ActionsType = ();

export const tasksReducer = (
  state: TasksStateType,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id != action.id);
    case "ADD-TODOLIST":
      return [
        ...state,
        {
          id: v1(),
          title: action.title,
          filter: "all",
        },
      ];
    case "CHANGE-TODOLIST-TITLE":
      const toDoList = state.find((tl) => tl.id === action.id);
      if (toDoList) {
        toDoList.title = action.title;
      }
      return [...state];
    case "CHANGE-TODOLIST-FILTER":
      const toDoList1 = state.find((tl) => tl.id === action.id);
      if (toDoList1) {
        toDoList1.filter = action.filter;
      }
      return { ...state };
    default:
      throw new Error("I don't understand this type");
  }
};