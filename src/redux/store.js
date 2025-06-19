import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice.js";
import themeReducer from "./themeSlice.js";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    theme: themeReducer,
  },
});
