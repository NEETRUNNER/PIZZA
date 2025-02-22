/* import FilterPizza from "../components/FilterPizza"; */
import Pizzas from "../components/Pizzas";

import { Pagination } from "@nextui-org/pagination";

import { useNavigate, useSearchParams } from "react-router-dom";
import { Selectors } from "../redux/selectors";

import SelectPizza from "../components/SelectPizza";
import FilterSlider from "../components/FilterSlider";

import React, { useEffect } from "react";

import { filteredByCategory, filteredByPrice, getTotalPages } from "../redux/thunks/Thunks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Main: React.FC = () => {
    const {currentPage, filteredPizzas} = Selectors();
    const [searchParams, ] = useSearchParams();

    const totalPages = useSelector((state: RootState) => state.pizza.totalPages);

    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const changePage = (page: number, category: string) => { // Не работает только сортировка от дорогих к дешевым
        console.log("Changing page:", page, "Category:", category);
        
        if (searchParams.get("sortBy") === null && searchParams.get("sortOrder") === null) {
            navigate(`/pizzas-list/${page}?category=${category}`, {replace: true})
            dispatch(filteredByCategory({page: page, limit: 8, category: (searchParams.get("category") as string)}))

            searchParams.delete("sortBy");
            searchParams.delete("sortOrder")
            
            console.log('Навигация по фильтрам')
        } else {
            navigate(`/pizzas-list/${page}?category=${category}&sortBy=${searchParams.get('sortBy') || 'pizza_price'}&sortOrder=${searchParams.get('sortOrder')}`, {replace: true})
            dispatch(filteredByPrice({page: page, limit: 8, category: 'all', sortBy: "pizza_price", sortOrder: (searchParams.get('sortOrder') as string)}))
            
            console.log('Навигация по сортировке цен')
        }

    }

    useEffect(() => {
        dispatch(getTotalPages({page: 1, limit: 8, category: (searchParams.get("category") as string), sortBy: undefined, sortOrder: undefined})); // Получение страниц
    }, [filteredPizzas, searchParams])
    
    useEffect(() => {
        console.log(searchParams.get("category"))
        console.log(searchParams.get("sortBy"))
        console.log(searchParams.get("sortOrder"))
    }, [filteredPizzas])

    return (
        <section className="main">
            <div className="main-container md:w-11/12 xs:w-11/12 mx-auto">

                <div className="flex items-center mt-8 gap-x-8 md:justify-around xs:justify-center md:flex-wrap xs:flex-wrap">
                    <h1 className="md:text-4xl xs:text-3xl text-black font-extrabold font-nunito">Усі піцци</h1>
                        <FilterSlider/>
                        <SelectPizza/>
                </div>

                <div className="pizza-wrap flex xs:justify-center py-4 flex-wrap gap-y-12 gap-x-32 mt-12 justify-center">
                    <Pizzas/>
                </div>
                <Pagination className="flex justify-center py-12" initialPage={currentPage} total={totalPages} onChange={(currentPage) => changePage(currentPage, (searchParams.get("category") as string))}/>
            </div>
        </section>
    )
}

export default Main;