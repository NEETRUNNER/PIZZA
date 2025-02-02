import { createSlice } from "@reduxjs/toolkit"

interface initialState {
    currentPage: number;
    onPage: number;
}

const initialState: initialState = {
    currentPage: 1,
    onPage: 8,
}

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = Number(action.payload)
        }
    }
})

export default paginationSlice.reducer;