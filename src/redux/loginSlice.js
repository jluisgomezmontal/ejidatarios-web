import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: JSON.parse(localStorage.getItem("loggedIn")) || false,
  user: JSON.parse(localStorage.getItem("user")) || {},
  recientes: JSON.parse(localStorage.getItem("recientes")) || [],
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
    setRecientes: (state, action) => {
      const nuevo = action.payload;

      // elimina cualquier duplicado (ajusta la clave única)
      const sinDuplicado = state.recientes.filter(
        (item) => item.ejidatario !== nuevo.ejidatario
      );

      // agrega nuevo al principio y corta a máximo 5
      const nuevos = [nuevo, ...sinDuplicado].slice(0, 10);

      state.recientes = nuevos;
      localStorage.setItem("recientes", JSON.stringify(nuevos));
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
export const { setLoggedIn, setLoggedOut, setRecientes } = loginSlice.actions;

export default loginSlice.reducer;
