import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/task/taskSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    task: taskReducer,
    user: userReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("tasks", JSON.stringify(state.task.taskList));
});

export { store };
