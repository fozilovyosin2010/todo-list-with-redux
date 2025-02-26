import { createSlice } from "@reduxjs/toolkit";

export const todos = createSlice({
  name: "counter",
  initialState: {
    value: [
      { id: 1, name: "todo1", complete: true },
      { id: 2, name: "todo2", complete: false },
      { id: 3, name: "todo3", complete: true },
    ],
  },
  reducers: {
    add: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    del: (state, action) => {
      state.value = state.value.filter((e) => {
        return e.id !== action.payload;
      });
    },
    toggleCheck: (state, action) => {
      state.value = state.value.map((e) => {
        if (e.id == action.payload) {
          e.complete = !e.complete;
        }
        return e;
      });
    },
    edit: (state, action) => {
      const { name, id } = action.payload;
      state.value = state.value.map((e) => {
        if (e.id == id) {
          e.name = name;
        }
        return e;
      });
    },
    search: (state, action) => {},
  },
});

export const { add, change, del, toggleCheck, edit } = todos.actions;
export default todos.reducer;
