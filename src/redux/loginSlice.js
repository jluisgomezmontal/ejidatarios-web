import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: JSON.parse(localStorage.getItem("loggedIn")) || false,
  user: JSON.parse(localStorage.getItem("user")) || {},
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("user", action.payload);
    },
    setLoggedOut: (state) => {
      state.loggedIn = false;
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("user");
      state.user = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoggedIn, setLoggedOut } = loginSlice.actions;

export default loginSlice.reducer;
