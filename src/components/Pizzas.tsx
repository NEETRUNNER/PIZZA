import { FiPlus } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";
import { useEffect } from "react";

import { useParams, Link, useLocation } from "react-router-dom";
import slugify from "slugify";

import { selectors } from "../redux/selectors";
import { useDispatch } from "react-redux";

import {Image} from "@nextui-org/react";
import { GiShoppingCart } from "react-icons/gi";

import {Button} from "@nextui-org/react";

import { paginationSlice } from "../redux/reducers/PaginationSlice";
import { pizzaSlice } from "../redux/reducers/pizzaSlice";

const Pizzas = () => {
    const {onPage, currentPage, pizzaData, selectedPizza, pizzasForDelivery, selectedIngridients} = selectors();
    const dispatch = useDispatch();
    
    const { pizzaPage } = useParams<{pizzaPage: string}>();
    const location = useLocation();

    const {setCurrentPage} = paginationSlice.actions;
    const {addPizza, deletePizza, addToBasketCart, resetPizzaCounter} = pizzaSlice.actions;

    const totalIngridientPrice = selectedIngridients.reduce((total, ingridient) => total + ingridient.ingridient_price * ingridient.ingridient_counter, 0);

    const lastPageIndex = currentPage * onPage; // 9
    const firstPageIndex = lastPageIndex - onPage; // 0
    const currentPages = pizzaData.slice(firstPageIndex, lastPageIndex); // 0, 9

    useEffect(() => {
        if (pizzaPage) {
            dispatch(setCurrentPage(pizzaPage))
        }
    }, [currentPage, location.pathname])

    useEffect(() => {
        dispatch(resetPizzaCounter())
    }, [location.pathname])

    useEffect(() => {
        console.log('Выбранные пиццы', selectedPizza)
        console.log('Пиццы для заказа(уже в массиве корзины)', pizzasForDelivery)
    }, [selectedPizza, pizzasForDelivery])

    return (
        <>
        {currentPages?.map((item) => {
            return <div key={item.id} className="pizza-block__item w-72 my-4">
                <Image
                    isZoomed
                    alt="NextUI Fruit Image with Zoom"
                    src={item.pizza_img}
                />
                <h1 className="text-black text-xl font-extrabold min-h-16 font-nunito pt-2">{item.pizza_title}</h1>

                <div className="flex items-center justify-between">
                    <p className="text-black text-xl font-extrabold mt-2 font-nunito">{item.pizza_weight} г</p>

                    <Link to={`/pizza-product/${slugify(item.pizza_title, { lower: true, locale: 'ru'})}`}>
                        <Button 
                        color="primary" variant="ghost">
                            Додати інгридиєнти
                        </Button>
                    </Link>
                </div>

                <h2 className="text-gray-400 text-md font-light mt-4 min-h-24">{item.pizza_descr}</h2>
                
                <div className="flex justify-between items-center">
                <p className="text-black"><span className="text-xl font-bold">{item.pizza_price * item.pizza_counter} грн</span></p>

                    <div className="flex justify-center">
                    <button
                        onClick={() => dispatch(deletePizza({pizza_title: item.pizza_title, pizza_counter: item.pizza_counter, pizza_id: item.id, pizza_price: item.pizza_price, selectedIngridients: selectedIngridients, totalIngridientPrice: totalIngridientPrice}))}
                        disabled={item.pizza_counter === 1}
                        type="button"
                        className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-900 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm"
                    >
                        <LuMinus />
                    </button>
                    <button
                        type="button"
                        className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-900 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 transition-all text-sm"
                    >
                        {item.pizza_counter}
                    </button>
                    <button
                        onClick={() => dispatch(addPizza({pizza_title: item.pizza_title, pizza_counter: item.pizza_counter, pizza_id: item.id, pizza_price: item.pizza_price, selectedIngridients: selectedIngridients, totalIngridientPrice: totalIngridientPrice}))}
                        type="button"
                        className="py-2 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-900 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm"
                    >
                        <FiPlus />
                    </button>
                    </div>
                    
                </div>
                <button
                    onClick={() => dispatch(addToBasketCart({pizza_title: item.pizza_title, pizza_counter: item.pizza_counter, pizza_id: item.id, pizza_price: item.pizza_price, pizza_img: item.pizza_img, selectedIngridients: selectedIngridients}))}
                    disabled={item.pizza_counter <= 0}
                    className={`px-12 py-4 tracking-widest uppercase font-bold text-xs mx-auto flex items-center mt-4 font-nunito transition duration-300 ${item.pizza_counter <= 0 ? 'bg-transparent text-black border-[1px] border-neutral-500 shadow-[inset_0_0_0_2px_#616467] hover:bg-neutral-200 hover:text-black' : 'bg-gradient-to-r from-red-400 to-red-600 text-white shadow-lg hover:from-red-500 hover:to-red-700'}`}>
                    Додати до кошику <GiShoppingCart className="ml-2" size='2em'/>
                </button> 
            </div>
            
        })}
        </>
    )
}
export default Pizzas;