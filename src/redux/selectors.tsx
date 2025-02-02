import { RootState } from "./store";
import { useSelector } from "react-redux";

export const Selectors = () => { // Селекторы нужны для создания переменных из стейта с которым мы работаем

    const pizzaData = useSelector((state: RootState) => state.pizza.pizzaData);
    const tipPizzas = useSelector((state: RootState) => state.pizza.tipData);

    const onPage = useSelector((state: RootState) => state.pagination.onPage)
    const currentPage = useSelector((state: RootState) => state.pagination.currentPage)
    
    const toggleBasketCart = useSelector((state: RootState) => state.menu.toggleCartMenu)
    const toggleBurgerMenu = useSelector((state:RootState) => state.menu.toggleBurgerMenu)

    const selectedPizza = useSelector((state: RootState) => state.pizza.selectedPizza);
    const pricePizza = useSelector((state: RootState) => state.pizza.pizzaPrice);
    const pizzasForDelivery = useSelector((state: RootState) => state.pizza.pizzasForDelivery)
    const pizzaPrice = useSelector((state: RootState) => state.pizza.pizzaPrice)

    const selectedOption = useSelector((state: RootState) => state.filter.selectedOption);

    const filteredPizzas = useSelector((state: RootState) => state.pizza.filteredPizzas);

    const loginToken = useSelector((state: RootState) => state.user.token);

    return {pizzaData, onPage, currentPage, toggleBasketCart, selectedPizza, pricePizza, pizzasForDelivery, pizzaPrice, selectedOption, toggleBurgerMenu, filteredPizzas, tipPizzas, loginToken};
}

// Через хук селектор получаем доступ к стейту через путь обьекта, и после возвращаем всё в виде обьекта что значит, что мы сможем сделать деструктуризацию