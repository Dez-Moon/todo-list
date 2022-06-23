import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { AppRootState, store } from "../state/store";
import { tasksReducer } from "../state/tasks-reducer";

const rootReducer = combineReducers({
  todolists: tasksReducer,
  tasks: tasksReducer,
});
const initialGlobalState = {
  tasks: {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
    ],
  },
  todolists: [
    { id: "todolistId1", title: "What to learn", filter: "all" },
    { id: "todolistId2", title: "What to buy", filter: "all" },
  ],
};
const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as AppRootState
);
export const ReduxStoreProviderDecorator = (story: any) => {
  return <Provider store={initialGlobalState}>{story()}</Provider>;
};
