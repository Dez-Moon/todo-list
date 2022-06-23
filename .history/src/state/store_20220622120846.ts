import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";
import { combineReducers, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore(reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
  
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
