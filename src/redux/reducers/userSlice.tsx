import { createSlice } from "@reduxjs/toolkit"

interface initialState {
    token: string | null;
}

const initialState: initialState = {
    token: localStorage.getItem("token") || null,
}

export const userSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        getLoginToken(state, action) {
            state.token = action.payload;
        },
        deleteToken(state) {
            state.token = null;
        }
    }
})

export default userSlice.reducer;