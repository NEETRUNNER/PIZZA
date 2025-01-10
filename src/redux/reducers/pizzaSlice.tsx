import { createSlice } from "@reduxjs/toolkit";
export interface pizzaState {
    pizzaData: {
        pizza_weight: string;
        id: any;
        pizza_id: number;
        pizza_title: string;
        pizza_counter: number;
        pizza_price: number;
        pizza_descr: string;
        pizza_img: string;
    }[];
    
    selectedPizza: {
        pizza_id: number;
        pizza_title: string;
        pizza_counter: number;
        pizza_price: number;
        selectedIngridients: any
    }[];

    pizzaPrice: number;
    pizzasForDelivery: {
        pizza_id: number;
        pizza_title: string;
        pizza_counter: number;
        pizza_price: number;
        selectedIngridients: any
        pizza_img: string;
    }[]
}

const initialState: pizzaState = {
    pizzaData: [],
    selectedPizza: [],
    pizzaPrice: 0,
    pizzasForDelivery: []
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        getPizzasData(state, action) {
            state.pizzaData = action.payload;
        },

        addPizza(state, action) {
            console.log('Добавление пиццы')
            
            const {pizza_counter, pizza_id, pizza_price, pizza_title, selectedIngridients, totalIngridientPrice, ingridient_price} = action.payload; // Получили пропсы через payload
            state.pizzaData = state.pizzaData.map(pizza => pizza.id === pizza_id ? {...pizza, pizza_counter: pizza.pizza_counter + 1} : pizza);

            state.selectedPizza = state.selectedPizza.some(pizza => pizza.pizza_id === pizza_id) ? state.selectedPizza.map(pizza => pizza.pizza_title === pizza_title ? {...pizza, pizza_counter: pizza_counter + 1, pizza_price: pizza_price * (pizza_counter + 1), selectedIngridients: [...selectedIngridients]} : pizza) : [...state.selectedPizza, {
                pizza_counter: action.payload.pizza_counter + 1,
                pizza_id: pizza_id,
                pizza_price: pizza_price * (pizza_counter + 1) + totalIngridientPrice,
                pizza_title: pizza_title,
                selectedIngridients: [...selectedIngridients]
            }],
            state.pizzaPrice = state.pizzaPrice + ingridient_price;
        },

        deletePizza(state, action) {
            console.log('Удаление пиццы')
            
            const {pizza_counter, pizza_id, pizza_price, pizza_title, selectedIngridients, totalIngridientPrice, ingridient_price} = action.payload; // Получили пропсы через payload
            state.pizzaData = state.pizzaData.map(pizza => pizza.id === pizza_id ? {...pizza, pizza_counter: pizza.pizza_counter - 1} : pizza);

            state.selectedPizza = state.selectedPizza.some(pizza => pizza.pizza_id === pizza_id) ? state.selectedPizza.map(pizza => pizza.pizza_title === pizza_title ? {...pizza, pizza_counter: pizza_counter - 1, pizza_price: pizza_price * (pizza_counter - 1), selectedIngridients: [...selectedIngridients]} : pizza) : [...state.selectedPizza, {
                pizza_counter: pizza_counter - 1,
                pizza_id: pizza_id,
                pizza_price: pizza_price * (pizza_counter - 1) + totalIngridientPrice,
                pizza_title: pizza_title,
                selectedIngridients: [...selectedIngridients]
            }],
            state.pizzaPrice = state.pizzaPrice + ingridient_price;
        },

        addToBasketCart(state, action) {
            const {pizza_counter, pizza_id, pizza_price, pizza_title, selectedIngridients, totalIngridientPrice, pizza_img} = action.payload;

            const mergeIngridients = (oldIngridients: any, newIngridients: any) => {
                const merged = [...oldIngridients];

                newIngridients.forEach((newIngridient: any) => {
                    const existingIng = merged.find((oldIngridient) => oldIngridient.ingridient_title === newIngridient.ingridient_title);

                    if (existingIng) {
                        existingIng.ingridient_counter += newIngridient.ingridient_counter
                    } else {
                        merged.push(newIngridient);
                    }
                });
                return merged;
            }

            state.pizzasForDelivery = state.pizzasForDelivery.some(pizza => pizza.pizza_title === pizza_title) ? state.pizzasForDelivery.map(pizza => pizza.pizza_title === pizza_title ? {...pizza, pizza_counter: pizza.pizza_counter + pizza_counter, pizza_price: pizza.pizza_price + (pizza_price * pizza_counter), selectedIngridients: mergeIngridients(pizza.selectedIngridients, selectedIngridients)} : pizza) : [...state.pizzasForDelivery, {
                pizza_counter: pizza_counter,
                pizza_id: pizza_id,
                pizza_price: pizza_price * pizza_counter + (totalIngridientPrice ? totalIngridientPrice : null),
                pizza_title: pizza_title,
                pizza_img: pizza_img,
                selectedIngridients: [...selectedIngridients]
            }],
            state.pizzaData = state.pizzaData.map(pizza => ({...pizza, pizza_counter: 1}))
        },

        changePizzaPrice(state, action) {
            const {pizza_price, pizza_counter, ingridient_price} = action.payload;
            state.pizzaPrice = pizza_price * pizza_counter + ingridient_price;
        },

        deleteFromBasket(state, action) {
            const {pizza_id} = action.payload;
            state.pizzasForDelivery = state.pizzasForDelivery.filter(pizza => pizza.pizza_id !== pizza_id);
        },

        resetPizzaCounter(state) {
            state.pizzaData = state.pizzaData.map(pizza => ({...pizza, pizza_counter: 1}))
        },
        
        addIngridientPrice(state, action) {
            const {ingridient_price} = action.payload;
            console.log(ingridient_price)
            state.pizzaPrice += ingridient_price
        },
        
        deleteIngridientPrice(state, action) {
            const {ingridient_price} = action.payload;
            state.pizzaPrice -= ingridient_price
        }
        
    }
})

export default pizzaSlice.reducer;
