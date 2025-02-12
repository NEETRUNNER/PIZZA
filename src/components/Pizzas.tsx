import React, { useEffect, useState } from "react";

import { useParams, Link, useLocation } from "react-router-dom";
import slugify from "slugify";

import { Selectors } from "../redux/selectors";
import { useDispatch } from "react-redux";

import { Rating } from "primereact/rating";

import { paginationSlice } from "../redux/reducers/PaginationSlice";
import { pizzaSlice } from "../redux/reducers/pizzaSlice";
import { notificationSlice } from "../redux/reducers/notificationSlice";

import { LoadSkeleton } from "../other/Skeleton";

const Pizzas: React.FC = () => {
    const {currentPage, onPage, selectedPizza, pizzasForDelivery, filteredPizzas, pizzaData, selectedOption} = Selectors();
    const [loading, setLoading] = useState<boolean>(true);
    const { pizzaPage } = useParams<{pizzaPage: string}>();

    const location = useLocation();
    const dispatch = useDispatch();

    const {setCurrentPage} = paginationSlice.actions;
    const {addPizza, deletePizza, addToBasketCart, setFilterMode} = pizzaSlice.actions;
    const {toggleAlert} = notificationSlice.actions;

    const lastPageIndex = currentPage * onPage; // 8
    const firstPageIndex = lastPageIndex - onPage; // 0
    const sliced = filteredPizzas.slice(firstPageIndex, lastPageIndex);

    const addPizzaToBasket = (pizza_title: string, pizza_counter: number, pizza_id: string, pizza_price: number, pizza_img: string, pizza_descr: string) => {

        dispatch(addToBasketCart({pizza_title: pizza_title, pizza_counter: pizza_counter, pizza_id: pizza_id, pizza_price: pizza_price, pizza_img: pizza_img, pizza_descr: pizza_descr}))

        dispatch(dispatch(toggleAlert({ type: "pizza", value: true })))
    }

    useEffect(() => {
        if (pizzaPage) {
            dispatch(setCurrentPage(pizzaPage))
        }
    }, [currentPage, location.pathname])

    useEffect(() => {
        dispatch(setFilterMode(pizzaData))
    }, [location.pathname])

    useEffect(() => {
        setLoading(true);

        const timeOut = setTimeout(() => {
            setLoading(false);
        }, 1200);

        return () => clearTimeout(timeOut)
    }, [selectedOption, currentPage])

    useEffect(() => {
        console.log('Выбранные пиццы', selectedPizza)
        console.log('Пиццы для заказа(уже в массиве корзины)', pizzasForDelivery)
    }, [selectedPizza, pizzasForDelivery])

    return (
        <>
        {loading ? <div className=""><LoadSkeleton/></div> : sliced.map((item) => {
            return <div key={item.id} className="pizza-block__item md:max-w-[600px] xs:w-full my-4 relative">

            <div className="flex justify-between items-center w-full md:absolute xs:relative">
                <h1 className="text-black md:text-2xl xs:text-md w-max font-nunito uppercase font-extrabold p-1">{item.pizza_title}</h1>
                <Rating value={item.rating} cancel={false} className="custom-rating px-2 h-12" style={{color: '#FFA500'}} />
            </div>
                <Link to={`/pizza-product/${slugify(item.pizza_title, { lower: true, locale: 'ru'})}`}>
                    <img
                        alt="pizza_img"
                        src={item.pizza_img}
                        className="w-max"
                    />                
                </Link>

                <div className="flex items-center justify-between my-4 flex-wrap">

                    <p className="text-orange-500 md:text-2xl xs:text-xl font-nunito uppercase font-extrabold">{item.pizza_price} грн</p>
                    <div className="flex justify-center items-center gap-x-4">
                        <button 
                            onClick={() => dispatch(deletePizza({ pizza_title: item.pizza_title, pizza_counter: item.pizza_counter, pizza_id: item.id, pizza_price: item.pizza_price }))}
                            disabled={item.pizza_counter === 1} 
                            className="text-black md:text-xl xs:text-lg font-bold bg-gray-200 rounded-full md:w-10 md:h-10 xs:w-7 xs:h-7 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition duration-200">-</button>

                        <span className="md:text-2xl xs:text-xl font-nunito font-extrabold text-gray-800">{item.pizza_counter}</span>

                        <button
                            onClick={() => dispatch(addPizza({ pizza_title: item.pizza_title, pizza_counter: item.pizza_counter, pizza_id: item.id, pizza_price: item.pizza_price }))}
                            className="text-black temd:xt-xl f xs:text-lg font-bold bg-orange-400 rounded-full md:w-10 md:h-10 xs:w-7 xs:h-7 flex items-center justify-center hover:bg-orange-500 shadow-md transition duration-200">+</button>
                    </div>

                    <button
                    onClick={() => addPizzaToBasket(item.pizza_title, item.pizza_counter, item.id, item.pizza_price, item.pizza_img, item.pizza_descr)}
                    disabled={item.pizza_counter <= 0}
                    className={`md:w-48 xs:w-full text-white md:mt-0 xs:mt-4 px-1 justify-center py-2 tracking-widest bg-orange-500 uppercase font-bold md:text-base xs:text-xm flex items-center font-nunito transition duration-300'}`}>
                    Замовити
                </button> 
                </div>
                
            </div>
        })}
        </>
    )
}
export default Pizzas;