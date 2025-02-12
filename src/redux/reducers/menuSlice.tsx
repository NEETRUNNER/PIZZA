import { createSlice } from "@reduxjs/toolkit"

interface initialState {
    toggleCartMenu: boolean;
    toggleBurgerMenu: boolean;
    notificationOpen: boolean;
}

const initialState: initialState = {
    toggleCartMenu: false,
    toggleBurgerMenu: false,
    notificationOpen: false
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: { // Из-за библиотеки immer функции пишутся по другому
        toggleMenuCart(state, action) {
            state.toggleCartMenu = action.payload;
        },
        toggleMenuBurger(state, action) {
            state.toggleBurgerMenu = action.payload;
        }

    }
})

export default menuSlice.reducer; // Автоматически создается экшен

// Прописывать .reducer при экспорте из слайса нужно, чтобы предоставить доступ к основной логике управления состоянием, которую ожидает configureStore в Redux Toolkit. */