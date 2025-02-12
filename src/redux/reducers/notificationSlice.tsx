import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertsState {
    pizza: boolean;
    login: boolean;
    registration: boolean;
    badLogin: boolean;
    badRegistration: boolean;
    order: boolean;
}

const initialState: AlertsState = {
    pizza: false,
    login: false,
    registration: false,
    badLogin: false,
    badRegistration: false,
    order: false
};

export const notificationSlice = createSlice({
    name: "alerts",
    initialState,
    reducers: {
        toggleAlert(state, action: PayloadAction<{ type: keyof AlertsState; value: boolean }>) { // Так мы делаем установку типа и value вручную, чтобы не создавать кучу редюсеров
            state[action.payload.type] = action.payload.value;
        },
    },
});

export default notificationSlice.reducer;