import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo')
                          ? JSON.parse(localStorage.getItem('userInfo'))
                          : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setCreds: (state,action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        removeCreds: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
})

export const { setCreds, removeCreds } = authSlice.actions;

export default authSlice.reducer;