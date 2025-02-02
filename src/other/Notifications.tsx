import { useEffect } from "react";

import { Selectors } from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { notificationSlice } from "../redux/reducers/notificationSlice";

import { FcApproval } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";

import { useTransition, animated } from "@react-spring/web";

export const PizzaNotification = () => {
    const {pizzasForDelivery} = Selectors();
    const {toggleAlert} = notificationSlice.actions;
    const dispatch = useDispatch();

    const pizzaAlert = useSelector((state: RootState) => state.notification.pizza)
    
    const transitions = useTransition(pizzaAlert, {
        from: { opacity: 0},
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 350 },
    });

    const lastPizza = pizzasForDelivery.slice(-1)[0];
    
    useEffect(() => {
        const interval = setTimeout(() => {
            dispatch(toggleAlert({ type: "pizza", value: false }));
        }, 2000);

        return () => clearInterval(interval)
    }, [pizzasForDelivery])

    return transitions((style, item) => item && (
    <animated.div style={style} className='notification top-0 bg-white shadow-lg w-full p-2 z-40 fixed'>
        <div className="notification-container w-full space-y-4 overflow-x-auto">
        {[lastPizza].map((pizza, index) => (
            <div
                key={index}
                className="border-b border-gray-200 last:border-none flex items-center justify-center"
            >   
                {pizzasForDelivery.length > 0 && (
                    <div className="flex gap-x-4 items-center flex-wrap justify-center">
                    <h2 className="md:text-md xs:text-xs uppercase text-orange-500 mt-1 font-nunito">
                        🍕 {pizza.pizza_title}
                    </h2>
                    
                    <h2 className="md:text-md xs:text-xs uppercase text-orange-500 mt-1 font-nunito">
                        x <span className="font-semibold">{pizza.pizza_counter}</span>
                    </h2>
                    <h2 className="md:text-md xs:text-xs uppercase text-orange-500 mt-1 font-nunito">
                        <span className="font-semibold">{pizza.pizza_price} ГРН</span>
                    </h2>
                    <h1 className="md:text-md xs:text-xs uppercase text-black mt-1 font-nunito">
                        Додано до кошику
                    </h1>
                </div>
                )}
            </div>
        ))}
        </div>
    </animated.div>

    )
)}

export const LoginNotification = () => {
    const {loginToken} = Selectors();
    const {toggleAlert} = notificationSlice.actions;
    const dispatch = useDispatch();
    
    const loginAlert = useSelector((state: RootState) => state.notification.login)

    const transitions = useTransition(loginAlert, {
        from: { opacity: 0},
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 350 },
    });
    
    useEffect(() => {
        const interval = setTimeout(() => {
            dispatch(toggleAlert({ type: "login", value: false }));
        }, 2000);
        return () => clearInterval(interval)
    }, [loginToken])

    return transitions((style, item) => item && (
        <animated.div style={style} className='notification top-0 bg-white shadow-lg w-full p-2 z-40 fixed'>
            <div className="notification-container w-full space-y-4 overflow-x-auto">
                <div className="border-b border-gray-200 last:border-none flex items-center justify-center">   
                    <h1 className="md:text-md xs:text-xs uppercase text-black mt-1 font-nunito">Вхід в акаунт успішно виконано</h1><FcApproval className="ml-1" size='1.3em' />
                </div>
            </div>
        </animated.div>
    )
)}

export const BadLoginNotification = () => {
    const {toggleAlert} = notificationSlice.actions;
    const dispatch = useDispatch();

    const badLoginAlert = useSelector((state: RootState) => state.notification.badLogin)

    const transitions = useTransition(badLoginAlert, {
        from: { opacity: 0},
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 350 },
    });
    
    useEffect(() => {
        const interval = setTimeout(() => {
            dispatch(toggleAlert({ type: "badLogin", value: false }));
        }, 5000);

        return () => clearInterval(interval)
    }, [badLoginAlert])

    return transitions((style, item) => item && (
        <animated.div style={style} className='notification top-0 bg-white shadow-lg w-full p-2 z-40 fixed'>
            <div className="notification-container w-full space-y-4 overflow-x-auto">
                <div className="border-b border-gray-200 last:border-none flex items-center justify-center">   
                    <h1 className="md:text-md xs:text-xs uppercase text-black mt-1 font-nunito w-fit">Не вдалося увійти в акаунт, неправильний пароль або такого користувача немає</h1><FcHighPriority className="ml-1" size='1.3em' />
                </div>
            </div>
        </animated.div>
    )
)}

export const RegistrationNotification = () => {
    const {toggleAlert} = notificationSlice.actions;
    const dispatch = useDispatch();

    const registrationAlert = useSelector((state: RootState) => state.notification.registration)

    const transitions = useTransition(registrationAlert, {
        from: { opacity: 0},
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 350 },
    });
    
    useEffect(() => {
        const interval = setTimeout(() => {
            dispatch(toggleAlert({ type: "registration", value: false }));
        }, 5000);

        return () => clearInterval(interval)
    }, [registrationAlert])

    return transitions((style, item) => item && (
        <animated.div style={style} className='notification top-0 bg-white shadow-lg w-full p-2 z-40 fixed'>
            <div className="notification-container w-full space-y-4 overflow-x-auto">
                <div className="border-b border-gray-200 last:border-none flex items-center justify-center">   
                    <h1 className="md:text-md xs:text-xs uppercase text-black mt-1 font-nunito w-fit">Акаунт успішно зареєстровано, авторизуйтесь будь ласка</h1><FcApproval className="ml-1" size='1.3em' />
                </div>
            </div>
        </animated.div>
    )
)}