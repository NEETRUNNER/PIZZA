import { RootState } from "./store";
import { useSelector } from "react-redux";

export const selectors = () => { // Селекторы нужны для создания переменных из стейта с которым мы работаем
    const pizzaData = useSelector((state: RootState) => state.pizza.pizzaData)
    const ingridientData = useSelector((state: RootState) => state.ingridient.ingridientData)
    const onPage = useSelector((state: RootState) => state.pagination.onPage)
    const currentPage = useSelector((state: RootState) => state.pagination.currentPage)
    
    const toggleBasketCart = useSelector((state: RootState) => state.basket.toggleCartMenu)

    const selectedPizza = useSelector((state: RootState) => state.pizza.selectedPizza);
    const pricePizza = useSelector((state: RootState) => state.pizza.pizzaPrice);
    const pizzasForDelivery = useSelector((state: RootState) => state.pizza.pizzasForDelivery)
    const pizzaPrice = useSelector((state: RootState) => state.pizza.pizzaPrice)

    const selectedIngridients = useSelector((state: RootState) => state.ingridient.selectedIngridients)

    return {pizzaData, ingridientData, onPage, currentPage, toggleBasketCart, selectedPizza, pricePizza, pizzasForDelivery, pizzaPrice, selectedIngridients};
}

// Через хук селектор получаем доступ к стейту через путь обьекта, и после возвращаем всё в виде обьекта что значит, что мы сможем сделать деструктуризацию