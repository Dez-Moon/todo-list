import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { appReducer } from "./app-reducer";
import { authReducer } from "./auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});
export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = configureStore({reducer: rootReducer,   middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .prepend(
      // correctly typed middlewares can just be used
      additionalMiddleware,
      // you can also type middlewares manually
      untypedMiddleware as Middleware<
        (action: Action<'specialAction'>) => number,
        RootState
      >
    )
    // prepend and concat calls can be chained
    .concat(logger),
: applyMiddleware(thunkMiddleware)});

declare global {
  interface Window {
    store: any;
  }
}
window.store = store;
