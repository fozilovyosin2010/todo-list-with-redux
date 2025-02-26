import { configureStore } from "@reduxjs/toolkit";
import todos from "../reducers/todo";

export const store = configureStore({
  reducer: {
    todos: todos,
  },
});
