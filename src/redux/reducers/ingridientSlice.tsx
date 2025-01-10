import { createSlice } from "@reduxjs/toolkit";

export interface ingridientState {
    ingridientData: {
        ingridient_id: number;
        ingridient_counter: number;
        id: string;
        ingridient_img: string;
        ingridient_title: string;
        ingridient_price: number;
        ingridient_weight: number;
    }[];
    selectedIngridients: {
        ingridient_title: string;
        ingridient_counter: number;
        ingridient_price: number;
    }[]
}

const initialState: ingridientState = {
    ingridientData: [],
    selectedIngridients: [] // Стейт для выбранных ингридиентов, из него теперь сможем передать данные
}

export const ingridientSlice = createSlice({
    name: 'ingridient',
    initialState,
    reducers: {
        getIngridientsData(state, action) {
            state.ingridientData = action.payload;
        },

        addIngridient(state, action) {
            const {ingridient_title, ingridient_id, ingridient_price, ingridient_counter} = action.payload;
            const ingridientIndex = state.selectedIngridients.findIndex(ingridient => ingridient.ingridient_title === ingridient_title)

            if (ingridientIndex !== -1) {
                console.log('Должен обновляться обьект');

                state.ingridientData = state.ingridientData.map(ingridient => ingridient.id === ingridient_id ? {...ingridient, ingridient_counter: ingridient.ingridient_counter + 1} : ingridient);
                state.selectedIngridients = state.selectedIngridients.map((ingridient, index) => index === ingridientIndex ? {...ingridient, ingridient_title: ingridient_title, ingridient_price: ingridient_price, ingridient_counter: ingridient_counter} : ingridient)

            } else {
                console.log('Должен попадать обьект');

                state.ingridientData = state.ingridientData.map(ingridient => ingridient.id === ingridient_id ? {...ingridient, ingridient_counter: ingridient.ingridient_counter + 1} : ingridient);

                state.selectedIngridients = [...state.selectedIngridients, {ingridient_title: ingridient_title, ingridient_price: ingridient_price, ingridient_counter: ingridient_counter + 1}]
            }
        },

        deleteIngridient(state, action) {
            const {ingridient_price, ingridient_id} = action.payload;
            
            const ingridientFind = state.selectedIngridients.findIndex((ingridient) => ingridient.ingridient_title === action.payload.ingridient_title); // Так мы находим индекс в массиве

            const ingridientForDelete = state.selectedIngridients[ingridientFind];
            console.log(ingridientForDelete)

            if (ingridientFind !== -1) {

                if (ingridientForDelete.ingridient_counter > 0) {
                    state.ingridientData = state.ingridientData.map(ingridient => ingridient.id === ingridient_id ? {...ingridient, ingridient_counter: ingridient.ingridient_counter - 1} : ingridient),
                    state.selectedIngridients = state.selectedIngridients.map((ingridient, index) => index === ingridientFind ? {...ingridient, ingridient_counter: ingridient.ingridient_counter - 1, ingridient_price: ingridient_price} : ingridient)

                } else {
                    state.ingridientData = state.ingridientData.map(ingridient => ingridient.id === ingridient_id ? {...ingridient, ingridient_counter: ingridient.ingridient_counter - 1} : ingridient),
                    state.selectedIngridients = state.selectedIngridients.filter((_, index) => index !== ingridientFind)  

                }

            } else {
                return state;
            }
        },

        resetIngridientCounter(state) {
            state.ingridientData = state.ingridientData.map(ingridient => ({...ingridient, ingridient_counter: 0}), state.selectedIngridients = [])
        }
    }
})

export default ingridientSlice.reducer;