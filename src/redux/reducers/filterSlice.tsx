import { createSlice } from "@reduxjs/toolkit"

interface initialState {
    selectedOption: string | undefined;
}

const initialState: initialState = {
    selectedOption: '',
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setOption(state, action) {
            state.selectedOption = action.payload;
        }
    }
})

export default filterSlice.reducer;