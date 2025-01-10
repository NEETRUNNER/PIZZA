import axios from "axios";

export interface pizza {
    id: number;
    pizza_img: string;
    pizza_descr: string;
    pizza_title: string;
    pizza_price: number;
    pizza_weight: string;
}

export interface ingridient {
    id: number;
    ingridient_title: string;
    ingridient_img: string;
    ingridient_counter: number;
    ingridient_price: number;
    ingridient_weight: number;
}

export const GetPizza = async (): Promise<pizza[]> => {
    try {
        const response = await axios.get('https://675b759c9ce247eb193694ae.mockapi.io/api/test/pizzas');
        return response.data;
    } catch (e: unknown) {
        console.log(e);
        return [];
    }
}

export const GetIngridients = async (): Promise<ingridient[]> => {
    try {
        const response = await axios.get('https://675b759c9ce247eb193694ae.mockapi.io/api/test/ingridients');
        return response.data;
    } catch (e: unknown) {
        console.log(e);
        return [];
    }
}