import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { Selectors } from "../redux/selectors";
import { useForm } from 'react-hook-form'

import { ReactNode } from "react";
import dateFormat from "dateformat";
import axios from "axios";

import delete_icon from '../img/delete.svg'
import emptyPizza from '../img/empty.png'

import { pizzaSlice } from "../redux/reducers/pizzaSlice";
import { notificationSlice } from "../redux/reducers/notificationSlice";

const Order: React.FC = () => {
    const dispatch = useDispatch();
    const {register, reset, handleSubmit, formState: { errors }} = useForm();

    const totalPizzaPrice = useSelector((state: RootState) => state.pizza.totalPizzaPrice)

    const {toggleAlert} = notificationSlice.actions;
    const {deleteFromBasket, resetAllPizzas} = pizzaSlice.actions;
    
    const {pizzasForDelivery} = Selectors();

    const onSubmit = async (data: any) => {
        data.orderTime = dateFormat(Date.now())
        data.pizzas = pizzasForDelivery.map((pizza) => {
            const pizzaInfo = {
                'Назва піци': pizza.pizza_title,
                'Кількість': pizza.pizza_counter,
                'Ціна': pizza.pizza_price
            }
            return pizzaInfo;
        });
        console.log(data);

        dispatch(resetAllPizzas());
        
        reset({
            name: '',
            address: '',
            phone: ''
        })

        try {
            const response = await axios.post('https://pizza-backend.up.railway.app/order/orderPizza', {
                name: data.name,
                address: data.address,
                phone: data.phone,
                pizzas: data.pizzas,
                orderTime: data.orderTime
            })
            dispatch(toggleAlert({ type: "order", value: true }));
            return response;
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <section className="order">
            <div className="order-container justify-center flex md:w-3/4 xs:w-4/5 mx-auto my-4 gap-x-6 2xl:flex-nowrap xl:flex-wrap lg:flex-wrap xs:flex-wrap">

                <form action="" className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-white p-4 rounded-lg shadow-md md:my-16 xs:my-4 h-max">
                        <h2 className="xl:text-2xl lg:text-xl xm:text-lg xs:text-[18px] font-semibold mb-4 text-black font-nunito">Оформлення замовлення</h2>
                        <input
                        id="name"
                        type="text" 
                        {...register('name', {
                            required: "Ім'я обов'язкове",
                            pattern: {
                                value: /^/,
                                message: "Введіть корректне ім'я",
                            }
                        })}
                        name="name" 
                        placeholder="Ім'я" 
                        className="w-full p-2 border rounded-lg text-black my-2" />
                        
                        {errors.name && (
                        <p className="text-red-500 text-xs font-nunito text-center">
                            {errors.name.message as ReactNode}
                        </p>
                        )}

                        <input 
                        type="text"
                        {...register('address', {
                            required: "Адреса обов'язкова",
                            pattern: {
                                value: /^/,
                                message: "Введіть корректну адресу",
                            }
                        })}
                        name="address" 
                        placeholder="Адреса" 
                        className="w-full p-2 border rounded-lg text-black my-2" />

                        {errors.address && (
                        <p className="text-red-500 text-xs font-nunito text-center">
                            {errors.address.message as ReactNode}
                        </p>
                        )}

                        <input 
                        type="tel" 
                        {...register('phone', {
                            required: "Номер телефону обов'язковий",
                            pattern: {
                                value: /^/,
                                message: "Введіть корректний номер телефону",
                            }
                        })}
                        name="phone" 
                        placeholder="Номер телефону" 
                        className="w-full p-2 border rounded-lg text-black my-2" />

                        {errors.phone && (
                        <p className="text-red-500 text-xs font-nunito text-center">
                            {errors.phone.message as ReactNode}
                        </p>
                        )}

                        <button disabled={pizzasForDelivery.length < 1} className={`uppercase w-full bg-orange-500 text-white p-2 font-nunito font-light mt-4 ${pizzasForDelivery.length >= 1 ? 'bg-orange-500' : 'bg-gray-500'}`}>
                            {pizzasForDelivery.length < 1 ? 'Замовлення відсутні' : 'Замовити'}
                        </button>
                    </div>
                </form>

                <div className="w-full bg-white p-4 rounded-lg shadow-md md:my-16 xs:my-4 h-max">
                    <h2 className="xl:text-2xl lg:text-xl xm:text-lg xs:text-[18px] font-semibold mb-4 text-black font-nunito">Ваше замовлення</h2>
                    {pizzasForDelivery.length > 0 ? (
                        <>
                        <ul className="md:h-48 xs:h-24 overflow-auto">
                            {pizzasForDelivery.map(pizza => (
                                <div key={pizza.id} className="p-2 border-b flex justify-between items-center">
                                    <img src={pizza.pizza_img} alt="" className='w-24 md:block xs:hidden' />
                                    <span className="text-black font-nunito font-bold md:text-base xs:text-xs">x{pizza.pizza_counter}</span>
                                    <span className="text-black font-nunito font-bold md:w-48 xs:w-32 md:text-base xs:text-xs">{pizza.pizza_title}</span>
                                    <span className="text-black font-nunito font-bold md:text-base xs:text-xs">{pizza.pizza_price} грн</span>

                                    <img src={delete_icon} onClick={() => dispatch(deleteFromBasket({pizza_id: pizza.id, pizza_price: pizza.pizza_price}))} alt="" className="md:w-8 xs:w-6 cursor-pointer" />
                                </div>
                            ))}
                        </ul>
                        <div className="cart-pizza__delivery flex items-center justify-between flex-wrap mt-4 flex-row w-full px-4">
                            <p className="cart-pizza cart-pizza__totalprice text-orange-500 md:text-xl xs:text-xs font-bold font-nunito uppercase">Загальна сума:</p>
                            <p className="cart-pizza cart-pizza__totalprice text-orange-500 md:text-xl xs:text-xs font-bold font-nunito uppercase">{totalPizzaPrice} грн</p>
                        </div>
                        </>
                    ) : (
                        <div className="mx-auto w-max">
                            <img src={emptyPizza} alt="" className='w-16 mt-1 mx-auto' />
                            <p className="text-black font-nunito uppercase font-light text-xm">Замовлень немає</p>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default Order;