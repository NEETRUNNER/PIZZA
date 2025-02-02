import { createSlice } from "@reduxjs/toolkit";
import { pizzaDataFetch, filteredDataFetch, tipsDataFetch } from "../thunks/Thunks"; // Импортируем данные из Thunks

export interface pizzaState {
    pizzaData: {
        pizza_weight: string;
        id: string; // ?
        pizza_id: number;
        pizza_title: string;
        pizza_counter: number;
        pizza_price: number;
        pizza_descr: string;
        pizza_img: string;
        amount: number;
        rating: number;
    }[];

    tipData: {
        pizza_weight: string;
        id: string;
        pizza_id: number;
        pizza_title: string;
        pizza_counter: number;
        pizza_price: number;
        pizza_descr: string;
        pizza_img: string;
        amount: number;
        rating: number;
    }[];
    
    selectedPizza: {
        pizza_id: number;
        pizza_title: string;
        pizza_counter: number;
        pizza_price: number;
    }[];
    pizzaPrice: number;
    pizzasForDelivery: {
        pizza_id: number;
        pizza_title: string;
        pizza_counter: number;
        pizza_price: number;
        pizza_img: string;
        pizza_descr: string;
    }[];
    totalPizzaPrice: any;
    filteredPizzas: {
        pizza_weight: string;
        id: any;
        pizza_id: number;
        pizza_title: string;
        pizza_counter: number;
        pizza_price: number;
        pizza_descr: string;
        pizza_img: string;
        amount: number;
        rating: number;
    }[];
}

const initialState: pizzaState = {
    pizzaData: [],
    filteredPizzas: [],
    tipData: [],
    selectedPizza: [],
    pizzaPrice: 0,
    pizzasForDelivery: [],
    totalPizzaPrice: []
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        addPizza(state, action) {
            console.log('Добавление пиццы')
            
            const {pizza_counter, pizza_id, pizza_price, pizza_title} = action.payload; // Получили пропсы через payload
            console.log(pizza_price * pizza_counter);

            state.filteredPizzas = state.filteredPizzas.map(pizza => pizza.id === pizza_id ? {...pizza, pizza_counter: pizza.pizza_counter + 1} : pizza);
            state.pizzaData = state.pizzaData.map(pizza => pizza.id === pizza_id ? {...pizza, pizza_counter: pizza.pizza_counter + 1} : pizza);


            state.selectedPizza = state.selectedPizza.some(pizza => pizza.pizza_id === pizza_id) ? state.selectedPizza.map(pizza => pizza.pizza_title === pizza_title ? {...pizza, pizza_counter: pizza_counter + 1, pizza_price: pizza_price * (pizza_counter + 1)} : pizza) : [...state.selectedPizza, {
                pizza_counter: pizza_counter + 1,
                pizza_id: pizza_id,
                pizza_price: pizza_price * (pizza_counter + 1),
                pizza_title: pizza_title
            }],
            state.pizzaPrice = pizza_price * (pizza_counter + 1);
        },

        deletePizza(state, action) {
            console.log('Удаление пиццы')
            
            const {pizza_counter, pizza_id, pizza_price, pizza_title} = action.payload; // Получили пропсы через payload

            state.filteredPizzas = state.filteredPizzas.map(pizza => pizza.id === pizza_id ? {...pizza, pizza_counter: pizza.pizza_counter - 1} : pizza);
            state.pizzaData = state.pizzaData.map(pizza => pizza.id === pizza_id ? {...pizza, pizza_counter: pizza.pizza_counter - 1} : pizza);


            state.selectedPizza = state.selectedPizza.some(pizza => pizza.pizza_id === pizza_id) ? state.selectedPizza.map(pizza => pizza.pizza_title === pizza_title ? {...pizza, pizza_counter: pizza_counter - 1, pizza_price: pizza_price * (pizza_counter - 1)} : pizza) : [...state.selectedPizza, {
                pizza_counter: pizza_counter - 1,
                pizza_id: pizza_id,
                pizza_price: pizza_price * (pizza_counter - 1),
                pizza_title: pizza_title
            }],
            state.pizzaPrice = pizza_price * (pizza_counter - 1);
        },

        addToBasketCart(state, action) {
            const {pizza_counter, pizza_id, pizza_price, pizza_title, pizza_img, pizza_descr} = action.payload;
            console.log(pizza_price)
            console.log(pizza_counter)
            console.log(state.totalPizzaPrice)

            state.pizzasForDelivery = state.pizzasForDelivery.some(pizza => pizza.pizza_title === pizza_title) ? state.pizzasForDelivery.map(pizza => pizza.pizza_title === pizza_title ? {...pizza, pizza_counter: pizza.pizza_counter + pizza_counter, pizza_price: pizza.pizza_price + (pizza_price * pizza_counter)} : pizza) : [...state.pizzasForDelivery, {
                pizza_counter: pizza_counter,
                pizza_id: pizza_id,
                pizza_price: pizza_price * pizza_counter,
                pizza_title: pizza_title,
                pizza_img: pizza_img,
                pizza_descr: pizza_descr
            }];
            state.filteredPizzas = state.filteredPizzas.map((pizza) => pizza.id === pizza_id ? ({...pizza, pizza_counter: 1}) : pizza);
            state.pizzaData = state.pizzaData.map(pizza => ({...pizza, pizza_counter: 1}));
            state.pizzaPrice = pizza_price;
            state.totalPizzaPrice = state.pizzasForDelivery.map(pizza => pizza.pizza_price).reduce((acc, pizza) => acc + pizza, 0)
        },


        deleteFromBasket(state, action) {
            const {pizza_id, pizza_price} = action.payload;
            console.log(pizza_id)
            state.pizzasForDelivery = state.pizzasForDelivery.filter(pizza => pizza.pizza_id !== pizza_id);
            state.totalPizzaPrice -= pizza_price;
        },

        resetPizzaItem(state, action) {
            const {pizza_price} = action.payload;

            state.filteredPizzas = state.filteredPizzas.map(pizza => ({...pizza, pizza_counter: 1}));
            state.pizzaData = state.pizzaData.map(pizza => ({...pizza, pizza_counter: 1}));
            state.pizzaPrice = pizza_price;
        },

        setFilterMode(state, action) {
            state.filteredPizzas = action.payload;
        },

    },
    extraReducers: (builder) => { // Они нужны для работы с createAsyncThunk
        builder.addCase(pizzaDataFetch.fulfilled, (state, action) => {
            state.pizzaData = action.payload;
        }),
        builder.addCase(filteredDataFetch.fulfilled, (state, action) => {
            state.filteredPizzas = action.payload;
        }),
        builder.addCase(tipsDataFetch.fulfilled, (state, action) => {
            state.tipData = action.payload;
        })
    }
})

export default pizzaSlice.reducer;