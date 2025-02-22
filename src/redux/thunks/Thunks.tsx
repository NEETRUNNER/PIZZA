import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface propsForCategory {
    page: number;
    limit: number;
    category: string | undefined;
}

interface propsForPrice {
    page: number;
    limit: number;
    category: string | undefined;
    sortBy: string | undefined;
    sortOrder: string | undefined;
}

export const pizzaDataFetch = createAsyncThunk(
    'pizzaData/PizzaDataFetch',
    async ({page = 1, limit = 8}: {page: number, limit: number}) => {
        const response = await axios.get(`https://pizza-backend.up.railway.app/pizza/getPaginatePizza/?page=${page}&limit=${limit}`);
        return response.data.pizzas;
    }
) 

export const filteredByPrice = createAsyncThunk(
    'filteredData/filteredByPrice',
    async ({page = 1, limit = 8, category, sortBy, sortOrder}: propsForPrice) => {
        const response = await axios.get(`https://pizza-backend.up.railway.app/pizza/sortByPrice?page=${page}&limit=${limit}&category=${category}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
        console.log('Получение пицц по цене', response)
        return response.data.pizzas;
    }
)

export const filteredByCategory = createAsyncThunk(
    'filteredData/filteredByCategory',
    async ({page = 1, limit = 8, category}: propsForCategory) => {
        const response = await axios.get(`https://pizza-backend.up.railway.app/pizza/sortByCategory?page=${page}&limit=${limit}&category=${category}`);
        console.log('Получение пицц по категории', response)
        return response.data.pizzas;
    }
)

export const getTotalPages = createAsyncThunk(
    'getPages/getTotalPages',
    async ({page = 1, limit = 8, category, sortBy, sortOrder}: {page: number, limit: number, category: string, sortBy: string | undefined, sortOrder: string | undefined}) => {
        const response = await axios.get(`https://pizza-backend.up.railway.app/pizza/getPages?page=${page}&limit=${limit}&category=${category}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
        console.log('Получение страниц', response)
        return response.data.pages;
    }
)

/* export const sortDataFetch = createAsyncThunk(
    'sortedData/SortedDataFetch',
    async ({page = 1, limit = 8, sortBy, sortOrder}: {page: number, limit: number, sortBy: string, sortOrder: string | undefined}) => {
        const response = await axios.get(`http://localhost:5000/pizza/getSortPizza?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
        return response.data.pizzas; // Либо pizzas либо total
    }
) */