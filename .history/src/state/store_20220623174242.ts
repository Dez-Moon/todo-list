import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";
import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createStore } from "redux";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});
export type AppRootStateType = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, applyMiddleware(thunk));
