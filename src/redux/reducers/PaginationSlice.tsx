import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentPage: 1,
    onPage: 9
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