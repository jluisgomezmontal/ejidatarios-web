import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: JSON.parse(localStorage.getItem("loggedIn")) || false,
    user:{},
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.loggedIn = true
            state.user = action.payload
            localStorage.setItem("loggedIn", true);
        },
        setLoggedOut: (state) => {
            state.loggedIn = false
            localStorage.removeItem("loggedIn");

            state.user = {}
        }
    },
})

// Action creators are generated for each case reducer function
export const { setLoggedIn, setLoggedOut} = loginSlice.actions

export default loginSlice.reducer