import { useDispatch } from "react-redux";
import { selectors } from "../redux/selectors";
import { useEffect, useRef } from "react";

import { useTransition, animated } from "@react-spring/web";
import { useLocation } from "react-router-dom";

import delete_icon from '../img/delete.svg'

import { basketSlice } from "../redux/reducers/basketSlice";
import { pizzaSlice } from "../redux/reducers/pizzaSlice";

const pizzaCart = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const {toggleBasketCart, pizzasForDelivery} = selectors();

    const cartButtonRef = document.querySelector('.cart-button')
    const menuRef = useRef<HTMLDivElement>(null);

    const {toggleMenuCart} = basketSlice.actions;
    const {deleteFromBasket} = pizzaSlice.actions;

    const openMenu = () => {
        document.addEventListener('click', (e) => {
            if (menuRef.current && cartButtonRef) {
                
                if (!menuRef.current.contains(e.target as Node) && !cartButtonRef.contains(e.target as Node)) {
                    dispatch(toggleMenuCart(false));
                }
            }
        })
    }

    useEffect(() => {    
        openMenu();

        document.addEventListener('click', openMenu);
        return () => document.removeEventListener('click', openMenu)
    }, [toggleBasketCart])

    useEffect(() => {
        dispatch(toggleMenuCart(false));
    }, [location.pathname])

    const transitions = useTransition(toggleBasketCart, {
        from: { opacity: 0, transform: 'translateX(20px)' },
        enter: { opacity: 1, transform: 'translateX(0px)' },
        leave: { opacity: 0, transform: 'translateX(20px)' },
        config: { duration: 300 },
    });

    return transitions((style, item) => item && (
      <animated.div
        style={style}
        onClick={() => openMenu()}
        ref={menuRef}
        className="cart bg-white h-full md:w-1/4 xs:w-11/12 fixed right-0 z-20 overflow-auto"
      >
        <div className="cart-container w-full">
          <div className="flex border-b justify-between items-center h-max py-3 px-4">
            <h1 className="cart-title font-nunito text-2xl uppercase text-black">
              Кошик
            </h1>
            <button
              onClick={() => dispatch(toggleMenuCart(false))}
              className="btn btn-circle text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 bg-transparent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="pizza-item__wrap px-4">
            {pizzasForDelivery.map((item, index) => (
              <div
                key={index}
                className="cart-pizza__item p-4 flex flex-row items-center bg-gray-50 my-4 gap-x-4 overflow-x-auto"
              >
                <img
                  src={item.pizza_img}
                  alt={item.pizza_title}
                  className="cart-pizza__img w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover"
                />

                <div className="flex flex-col flex-grow text-center lg:text-left">
                  <h1 className="cart-pizza__title text-base font-semibold text-gray-800">
                    {item.pizza_title}
                  </h1>
                  <h2 className="cart-pizza__price text-sm text-gray-600 mt-1">
                    {item.pizza_price} ₴
                  </h2>
                  <h3 className="cart-pizza__count text-sm text-gray-600 mt-1">
                    Кількість: {item.pizza_counter}
                  </h3>
                </div>

                {item.selectedIngridients.length > 0 && (
                  <div className="cart-pizza__ingredients mt-4 lg:mt-0 w-full lg:w-auto border-t lg:border-t-0 lg:pl-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Інгредієнти:
                    </h4>
                    <ul className="space-y-2">
                      {item.selectedIngridients.map((ingridient: any, i: number) => (
                        <li
                          key={i}
                          className="flex justify-between items-center text-xs text-gray-600"
                        >
                          <span className="truncate">{ingridient.ingridient_title}</span>
                          <span className="mx-2">× {ingridient.ingridient_counter}</span>
                          <span>{ingridient.ingridient_price} ₴</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <img
                  onClick={() => dispatch(deleteFromBasket(item.pizza_id))}
                  src={delete_icon}
                  alt="Delete"
                  className="w-8 h-8 cursor-pointer mt-2 lg:mt-0"
                />
              </div>
            ))}
          </div>
        </div>
      </animated.div>
    ))
}

export default pizzaCart;