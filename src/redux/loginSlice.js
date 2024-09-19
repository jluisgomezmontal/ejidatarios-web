import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: false,
    user:{},
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
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