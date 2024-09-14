import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./loginSlice.js";

export const store = configureStore({
    reducer: {
        login: loginReducer
    },
})