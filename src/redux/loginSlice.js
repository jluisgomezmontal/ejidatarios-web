import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: false,
    user:{},
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        setLoggedIn: (state, action) => {
            state.loggedIn = true
            state.user = action.payload
        },
        setLoggedOut: (state) => {
            state.loggedIn = false
            state.user = {}
        }
    },
})

// Action creators are generated for each case reducer function
export const { setLoggedIn, setLoggedOut} = loginSlice.actions

export default loginSlice.reducer