import { useDispatch, useSelector } from "react-redux";
import { Selectors } from "../redux/selectors";
import { useEffect, useRef } from "react";

import { useTransition, animated } from "@react-spring/web";
import { useLocation } from "react-router-dom";

import delete_icon from '../img/delete.svg'

import { menuSlice } from "../redux/reducers/menuSlice";
import { pizzaSlice } from "../redux/reducers/pizzaSlice";
import { RootState } from "../redux/store";

const PizzaCart = () => {
    const {toggleBasketCart, pizzasForDelivery} = Selectors();
    const {toggleMenuCart} = menuSlice.actions;
    const {deleteFromBasket} = pizzaSlice.actions;

    const cartButtonRef = document.querySelector('.cart-button')
    const menuRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const location = useLocation();

    const totalPizzaPrice = useSelector((state: RootState) => state.pizza.totalPizzaPrice);

    const transitions = useTransition(toggleBasketCart, {
      from: {
          transform: 'translateX(50%)',
          opacity: 0,
      },
      enter: {
          transform: 'translateX(0)',
          opacity: 1,
      },
      leave: {
          transform: 'translateX(50%)',
          opacity: 0,
      },
      config: {
          duration: 200, // Чуть больше длительность для плавности
      },
  });

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

    return transitions((style, item) => item && (
      <animated.div
        style={style}
        onClick={() => openMenu()}
        ref={menuRef}
        className="cart bg-white xs:max-h-1/4 lg:w-1/4 md:w-4/12 xs:w-full fixed right-0 z-40 overflow-auto"
      >
        <div className="cart-container w-full h-full">
          <div className="flex border-b justify-between items-center h-max md:py-1 xs:py-0 px-4">
            <h1 className="cart-title font-nunito md:text-xl xs:text-md uppercase text-black">
              Кошик
            </h1>
            <button
              onClick={() => dispatch(toggleMenuCart(false))}
              className="btn btn-circle !text-orange-500 !md:p-3 xs:p-2 xs:px-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="md:h-8 md:w-8 xs:w-6 xs:h-6 bg-transparent"
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

          <div className="pizza-item__wrap px-4 max-h-36 overflow-auto">
            {pizzasForDelivery.map((item, index) => (
              <div key={index} className="cart-pizza__item p-4 flex flex-row items-center gap-x-4 overflow-x-auto">
                <img
                  src={item.pizza_img}
                  alt={item.pizza_title}
                  className="cart-pizza__img w-max lg:w-24 lg:h-20 xs:h-16 object-scale-down md:block xs:hidden"
                />

                <div className="flex flex-row gap-x-3 flex-grow text-center lg:text-left items-center flex-wrap">
                  <h1 className="cart-pizza__title md:text-md uppercase font-nunito xs:text-xs font-extrabold text-gray-800 md:whitespace-nowrap xs:whitespace-nowrap">
                    {item.pizza_title}
                  </h1>
                  <h2 className="cart-pizza__price md:text-md uppercase font-bold font-nunito xs:text-xs text-gray-600 md:whitespace-normal xs:whitespace-nowrap">
                    {item.pizza_price} грн
                  </h2>
                  <h3 className="cart-pizza__count md:text-md uppercase font-bold font-nunito xs:text-xs text-gray-600 md:whitespace-normal xs:whitespace-nowrap">
                    x {item.pizza_counter}
                  </h3>
                </div>
                
              <img src={delete_icon} onClick={() => dispatch(deleteFromBasket({pizza_id: item.pizza_id, pizza_price: item.pizza_price}))} alt="" className="md:w-8 xs:w-6 cursor-pointer" />

              </div>
            ))}
          </div>

          <div className="flex items-center justify-center flex-wrap flex-col w-full p-4">
            {pizzasForDelivery.length <= 0 ? <div className="text-black uppercase font-bold font-nunito my-4 md:text-base xs:text-xs">Кошик порожній</div> : 
            
            <>
            <div className="cart-pizza__delivery flex items-center justify-between flex-wrap my-4 flex-row w-full px-4">
            <p className="cart-pizza cart-pizza__totalprice text-orange-500 md:text-xl xs:text-md font-bold font-nunito uppercase">Загальна сума:</p>
            <p className="cart-pizza cart-pizza__totalprice text-orange-500 md:text-xl xs:text-md font-bold font-nunito uppercase">{totalPizzaPrice} грн</p>
          </div>
          <button className="cart-pizza__btn bg-orange-500 text-white font-nunito p-2 font-bold w-full">Оформити замовлення</button>
            </>}

          </div>
          
        </div>
      </animated.div>
    ))
}

export default PizzaCart;