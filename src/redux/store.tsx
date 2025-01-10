import basketSlice from './reducers/basketSlice'
import paginationSlice from "./reducers/PaginationSlice";
import pizzaSlice from "./reducers/pizzaSlice";
import ingridientSlice from "./reducers/ingridientSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        pizza: pizzaSlice,
        ingridient: ingridientSlice,
        pagination: paginationSlice,
        basket: basketSlice // Было basket: basketReducer
    }
})

// Типизация RootState
export type RootState = ReturnType<typeof store.getState>; // Для типизации селекторов

// Типизация AppDispatch
export type AppDispatch = typeof store.dispatch; // Для типизации диспатча