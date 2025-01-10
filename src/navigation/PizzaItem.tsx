import { useLocation, useParams } from "react-router-dom";
import slugify from "slugify";

import { FiPlus } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";
import { GiShoppingCart } from "react-icons/gi";
import { useEffect } from "react";

import { selectors } from "../redux/selectors";
import { useDispatch } from "react-redux";

import {Image} from "@nextui-org/react";

import { pizzaSlice } from "../redux/reducers/pizzaSlice";
import { ingridientSlice } from "../redux/reducers/ingridientSlice";

const PizzaItem = () => {
    const dispatch = useDispatch();
    const {pizzaData, ingridientData, pizzaPrice, selectedIngridients, pizzasForDelivery, selectedPizza} = selectors();
    const { pizzaTitle } = useParams<{pizzaTitle: string}>();
    const location = useLocation();

    const pizzaItem = pizzaData.find(item => slugify(item.pizza_title, { lower: true, locale: 'ru'}) === pizzaTitle);

    const {addPizza, deletePizza, addToBasketCart, changePizzaPrice, resetPizzaCounter, addIngridientPrice, deleteIngridientPrice} = pizzaSlice.actions;
    const {addIngridient, deleteIngridient, resetIngridientCounter} = ingridientSlice.actions;

    const totalIngridientPrice = selectedIngridients.reduce((total, ingridient) => total + ingridient.ingridient_price * ingridient.ingridient_counter, 0);

    const joinIngridient = (ingridient_title: string, ingridient_id: string, pizza_price: number, ingridient_price: number, ingridient_counter: number, selectedPizza: object[]) => { // Обьединяем в одну функцию так как нам нужно вызвать сразу два dispatch
        dispatch(addIngridient({ingridient_title, ingridient_id, pizza_price, ingridient_price, ingridient_counter, selectedPizza}))
        dispatch(addIngridientPrice({ingridient_price: ingridient_price}))
    }

    const removeIngridient = (ingridient_title: string, ingridient_id: string, pizza_price: number, ingridient_price: number, ingridient_counter: number, selectedPizza: object[]) => { // Обьединяем в одну функцию так как нам нужно вызвать сразу два dispatch
        dispatch(deleteIngridient({ingridient_title, ingridient_id, pizza_price, ingridient_price, ingridient_counter, selectedPizza}))
        dispatch(deleteIngridientPrice({ingridient_price: ingridient_price}))
    }

    const addToBasket = (pizza_title: string, pizza_counter: number, pizza_id: string, pizza_price: number, pizza_img: string, selectedIngridients: object[], totalIngridientPrice: number) => {
        dispatch(addToBasketCart({pizza_title, pizza_counter, pizza_id, pizza_price, pizza_img, selectedIngridients, totalIngridientPrice}))
        dispatch(resetIngridientCounter());
    }

    useEffect(() => {
        dispatch(resetPizzaCounter())
        dispatch(resetIngridientCounter())
    }, [location.pathname])

    useEffect(() => {
        if (pizzaItem?.pizza_price) {
            dispatch(changePizzaPrice({pizza_price: pizzaItem.pizza_price, pizza_counter: pizzaItem.pizza_counter, ingridient_price: totalIngridientPrice}))
        }
    }, [pizzaItem])

    useEffect(() => {
        console.log('Выбранные ингридиенты', selectedIngridients);
        console.log('Выбранные пиццы', selectedPizza)
        console.log('Пиццы для заказа(уже в массиве корзины)', pizzasForDelivery)
    }, [selectedIngridients, pizzasForDelivery, selectedPizza])

    return (
        <section className="pizza-item">
            <div className="pizza-item__container md:w-3/4 xs:w-11/12 mx-auto my-12 flex justify-center">
            {pizzaItem && (
                <>
                    <div className="pizza-item__wrap flex justify-center gap-x-8 lg:flex-nowrap xm:flex-wrap xs:flex-wrap">
                        <Image
                            isZoomed
                            alt="NextUI Fruit Image with Zoom"
                            src={pizzaItem.pizza_img}
                            className="w-[400px] h-max"
                        />
                        <div className="flex-col flex">
                            <h1 className="pizza-item__wrap pizza-item__title text-black font-extrabold md:text-3xl xs:text-2xl mt-2 font-nunito">{pizzaItem.pizza_title}</h1>
                            <p className="pizza-item__wrap pizza-item__info text-gray-400 text-md font-light mt-4">Традиційне тісто 25 см, {pizzaItem.pizza_weight} г</p>

                            <p className="pizza-item__wrap pizza-item__info text-gray-400 text-md font-light mt-4">Склад: {pizzaItem.pizza_descr}</p>

                            <div className="flex md:justify-around xs:justify-center flex-wrap py-8 xs:gap-x-5 xs:gap-y-5 w-full">
                            <div className="flex">
                                <button
                                    disabled={pizzaItem.pizza_counter === 1}
                                    onClick={() => dispatch(deletePizza({pizza_title: pizzaItem.pizza_title, pizza_counter: pizzaItem.pizza_counter, pizza_id: pizzaItem.id, pizza_price: pizzaItem.pizza_price, totalIngridientPrice: totalIngridientPrice, selectedIngridients: selectedIngridients}))}
                                    type="button"
                                    className="md:py-2 md:px-4 xs:py-1 xs:px-2 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-900 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all md:text-sm"
                                >
                                    <LuMinus />
                                </button>
                                <button
                                    type="button"
                                    className="md:py-2 md:px-4 xs:py-1 xs:px-3 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-900 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 transition-all text-sm"
                                >
                                    {pizzaItem.pizza_counter}
                                </button>
                                <button
                                    onClick={() => dispatch(addPizza({pizza_title: pizzaItem.pizza_title, pizza_counter: pizzaItem.pizza_counter, pizza_id: pizzaItem.id, pizza_price: pizzaItem.pizza_price, totalIngridientPrice: totalIngridientPrice, selectedIngridients: selectedIngridients}))}
                                    type="button"
                                    className="md:py-2 md:px-4 xs:py-1 xs:px-2 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-900 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm"
                                >
                                    <FiPlus />
                                </button>
                            </div>
                            
                            <div className='text-black md:px-6 md:py-2 xs:px-8 xs:py-3 tracking-widest uppercase font-normal md:text-2xl xs:text-xl flex justify-center items-center font-nunito'>
                                {pizzaPrice} грн
                            </div>

                            <button
                                onClick={() => addToBasket(pizzaItem.pizza_title, pizzaItem.pizza_counter, pizzaItem.id, pizzaItem.pizza_price, pizzaItem.pizza_img, selectedIngridients, totalIngridientPrice)}
                                disabled={pizzaItem.pizza_counter <= 0}
                                className={`px-6 py-4 md:w-max xs:w-full tracking-widest uppercase font-bold text-xs flex justify-center items-center font-nunito transition duration-300 ${pizzaItem.pizza_counter <= 0 ? 'bg-transparent text-black border-[1px] border-neutral-500 shadow-[inset_0_0_0_2px_#616467] hover:bg-neutral-200 hover:text-black' : 'bg-gradient-to-r from-red-400 to-red-600 text-white shadow-lg hover:from-red-500 hover:to-red-700'}`}>
                                Додати до кошику <GiShoppingCart className="ml-2" size='2em'/>
                            </button> 
                            </div>

                            <div className="pizza-item__ingridients flex flex-row flex-wrap justify-center">

                            {ingridientData.map((item, index) => {
                                return <div key={index} className="pizza-item__ingridients pizza-item__ingridients-block px-4">
                                    <img src={item.ingridient_img} alt="" className="w-24 mx-auto" />

                                    <div className="flex my-3">
                                        <p className="text-black border-r-2 px-2 font-semibold">{item.ingridient_weight} г</p>
                                        <p className="text-black px-2 font-semibold">{item.ingridient_price} грн</p>
                                    </div>

                                    <button className="text-base font-semibold m-6 group relative w-max">
                                    <span className="text-black font-nunito">{item.ingridient_title}</span>
                                    <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-full"></span>
                                    </button>

                                    <div className="flex justify-center">           
                                        <button
                                            onClick={() => removeIngridient(item.ingridient_title, item.id, pizzaPrice, item.ingridient_price, item.ingridient_counter, selectedPizza)}
                                            disabled={item.ingridient_counter === 0}
                                            type="button"
                                            className="py-1 px-2 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-900 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm"
                                        >
                                            <LuMinus />
                                        </button>
                                        <div className="py-1 px-2 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-900 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 transition-all text-xs">
                                            {item.ingridient_counter}
                                        </div>
                                        <button
                                            onClick={() => joinIngridient(item.ingridient_title, item.id, pizzaPrice, item.ingridient_price, item.ingridient_counter, selectedPizza)}
                                            type="button"
                                            className="py-1 px-2 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-900 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm">
                                            <FiPlus />
                                        </button>
                                    </div>
                                </div>
                                })}
                            
                            </div>
                        </div>
                    </div>
                </>
            )}
            </div>
        </section>
    )
}

export default PizzaItem;