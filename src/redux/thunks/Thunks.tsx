import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const pizzaDataFetch = createAsyncThunk(
    'pizzaData/PizzaDataFetch',
    async () => {
        const response = await axios.get('https://675b759c9ce247eb193694ae.mockapi.io/api/test/pizzas');
        return response.data;
    }
)

export const filteredDataFetch = createAsyncThunk(
    'filteredData/FilteredDataFetch',
    async () => {
        const response = await axios.get('https://675b759c9ce247eb193694ae.mockapi.io/api/test/pizzas');
        return response.data;
    }
)

export const tipsDataFetch = createAsyncThunk(
    'tipsData/TipsDataFetch',
    async () => {
        const response = await axios.get('https://675b759c9ce247eb193694ae.mockapi.io/api/test/pizzas');
        return response.data;
    }
)