import { FormatListNumberedTwoTone } from "@mui/icons-material";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { v1 } from "uuid";
import { AppRootStateType, store } from "../state/store";
import { tasksReducer } from "../state/tasks-reducer";
import { todolistsReducer } from "../state/todolists-reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});
const initialGlobalState = {};
const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as AppRootStateType
);

export const ReduxStoreProviderDecorator = (story: any) => {
  return <Provider store={storyBookStore}>{story()}</Provider>;
};
