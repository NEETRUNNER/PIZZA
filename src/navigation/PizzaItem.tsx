import { useLocation, useParams } from "react-router-dom";

import { useEffect } from "react";

import { Selectors } from "../redux/selectors";
import { useDispatch } from "react-redux";

import TipsPizza from "../components/RecomendationPizzas";

import { pizzaSlice } from "../redux/reducers/pizzaSlice";
import { notificationSlice } from "../redux/reducers/notificationSlice";

import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import InnerImageZoom from 'react-inner-image-zoom'
import slugify from "slugify";
import { pizzaDataFetch } from "../redux/thunks/Thunks";

const PizzaItem: React.FC = () => {
    const {pizzaPrice, pizzasForDelivery, selectedPizza, pizzaData} = Selectors();
    const { pizzaTitle } = useParams<{pizzaTitle: string}>();
    const location = useLocation();
    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(pizzaDataFetch({page: 1, limit: 20}))
    }, [])
    
    const {addPizza, deletePizza, addToBasketCart, resetPizzaItem} = pizzaSlice.actions;
    const {toggleAlert} = notificationSlice.actions;

    const pizzaItem = pizzaData.find(item => slugify(item.pizza_title, {lower: true, locale: 'ru'}) === pizzaTitle)

    const addPizzaToBasket = (pizza_title: string, pizza_counter: number, pizza_id: string, pizza_price: number, pizza_img: string, pizza_descr: string) => {

        dispatch(addToBasketCart({pizza_title: pizza_title, pizza_counter: pizza_counter, pizza_id: pizza_id, pizza_price: pizza_price, pizza_img: pizza_img, pizza_descr: pizza_descr}))
        dispatch(toggleAlert({ type: "pizza", value: true }));
    }

    useEffect(() => {
        dispatch(resetPizzaItem({pizza_price: pizzaItem?.pizza_price}))
    }, [location.pathname])

    useEffect(() => {
        console.log('Пиццы для заказа(уже в массиве корзины)', pizzasForDelivery)
    }, [pizzasForDelivery, selectedPizza])

    return (
        <section className="pizza-item">
            <div className="pizza-item__container md:my-12 xs:my-0 md:w-3/4 xs:w-11/12 mx-auto flex justify-center">
            {pizzaItem && (
                <>
                    <div className="pizza-item__wrap flex justify-center gap-x-8 lg:flex-nowrap xm:flex-wrap xs:flex-wrap">
                        <InnerImageZoom
                            src={pizzaItem.pizza_img}
                            className="image-zoom"
                            zoomType="hover"
                        />
                        <div className="flex-col flex">
                            <h1 className="pizza-item__wrap pizza-item__title text-black font-extrabold md:text-3xl xs:text-2xl mt-2 font-nunito uppercase">{pizzaItem.pizza_title}</h1>
                            <p className="pizza-item__wrap pizza-item__info text-gray-400 md:text-base xs:text-xm font-light mt-4">Традиційне тісто 40 см, {pizzaItem.pizza_weight} г</p>
                            <p className="pizza-item__wrap pizza-item__info text-gray-400 md:text-base xs:text-xm font-light mt-4">Кількість в порції: {pizzaItem?.amount}</p>
                            <p className="pizza-item__wrap pizza-item__info text-gray-400 md:text-base xs:text-xm font-light mt-4">Склад: {pizzaItem.pizza_descr}</p>
                        <div className="flex md:justify-start xm:justify-center xs:justify-around flex-wrap py-8 xs:gap-x-5 w-full">
                            
                        <div className="flex justify-center items-center gap-x-4">

                        <button
                            onClick={() => dispatch(deletePizza({ pizza_title: pizzaItem.pizza_title, pizza_counter: pizzaItem.pizza_counter, pizza_id: pizzaItem.id, pizza_price: pizzaItem.pizza_price }))}
                            disabled={pizzaItem.pizza_counter === 1}
                            className="text-black md:text-xl xs:text-lg f font-bold bg-gray-200 rounded-full md:w-10 md:h-10 xs:w-7 xs:h-7 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition duration-200">-</button>

                        <span className="md:text-2xl xs:text-xl font-nunito font-extrabold text-gray-800">{pizzaItem.pizza_counter}</span>

                        <button
                            onClick={() => dispatch(addPizza({ pizza_title: pizzaItem.pizza_title, pizza_counter: pizzaItem.pizza_counter, pizza_id: pizzaItem.id, pizza_price: pizzaItem.pizza_price }))}
                            className="text-black temd:xt-xl f xs:text-lg font-bold bg-orange-400 rounded-full md:w-10 md:h-10 xs:w-7 xs:h-7 flex items-center justify-center hover:bg-orange-500 shadow-md transition duration-200">+</button>
                        </div>

                            <div className='text-orange-500 px-2 md:py-2 xs:py-3 tracking-widest uppercase font-black md:text-2xl xs:text-xl flex justify-center items-center font-nunito'>
                                {pizzaPrice === undefined ? pizzaItem.pizza_price : pizzaPrice} грн
                            </div>

                            <button
                                onClick={() => addPizzaToBasket(pizzaItem.pizza_title, pizzaItem.pizza_counter, pizzaItem.id, pizzaItem.pizza_price, pizzaItem.pizza_img, pizzaItem.pizza_descr)}
                                disabled={pizzaItem.pizza_counter <= 0}
                                className={`md:w-48 xs:w-full text-white md:mt-0 xs:mt-4 px-1 justify-center py-2 tracking-widest bg-orange-500 uppercase font-bold md:text-base
                                 xs:text-xm flex items-center font-nunito transition duration-300'}`}>
                                Замовити
                            </button>
                        </div>

                        </div>
                    </div>
                </>
            )}
            </div>

            <div className="pizza-item__recommendations">
                <TipsPizza/>
            </div>

        </section>
    )
}

export default PizzaItem;