import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    toggleCartMenu: false,
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: { // Из-за библиотеки immer функции пишутся по другому
        toggleMenuCart(state, action: PayloadAction<boolean>) {
            state.toggleCartMenu = action.payload;
        }
    }
})

export default basketSlice.reducer; // Автоматически создается экшен

// Прописывать .reducer при экспорте из слайса нужно, чтобы предоставить доступ к основной логике управления состоянием, которую ожидает configureStore в Redux Toolkit. */