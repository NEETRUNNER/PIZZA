import menuSlice from './reducers/menuSlice'
import paginationSlice from "./reducers/paginationSlice";
import pizzaSlice from "./reducers/pizzaSlice";
import filterSlice from './reducers/filterSlice';
import userSlice from './reducers/userSlice';
import notificationSlice from './reducers/notificationSlice';

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        pizza: pizzaSlice,
        pagination: paginationSlice,
        menu: menuSlice,
        filter: filterSlice,
        notification: notificationSlice,
        user: userSlice,
    }
})

// Типизация RootState
export type RootState = ReturnType<typeof store.getState>; // Для типизации селекторов

// Типизация AppDispatch
export type AppDispatch = typeof store.dispatch; // Для типизации диспатча