import { ReactNode } from 'react';
import { useForm } from 'react-hook-form'

import { userSlice } from '../redux/reducers/userSlice';
import { notificationSlice } from '../redux/reducers/notificationSlice';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import axios from 'axios';

import useSaveLocalStorage from '../hooks/useSaveLocalStorage';

export interface NewUser {
    message?: string;
    token?: string;
    email: string;
    password: string | number;
};

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const {register, reset, handleSubmit, formState: { errors }} = useForm();

    const {getLoginToken} = userSlice.actions;
    const {toggleAlert} = notificationSlice.actions;

    const onSubmit = async (data: NewUser) => {

        reset({
            email: '',
            password: ''
        })

        try {
            const response = await axios.post<NewUser>('https://pizza-backend.up.railway.app/auth/login', {
                // Тело запроса
                email: data.email,
                password: data.password
            })

            const token = response.data.token; // Токен

            if (token) {
                dispatch(getLoginToken(token))
                dispatch(toggleAlert({ type: "login", value: true }));
                useSaveLocalStorage(token, "token");
            }
            return response;

        } catch(error) {
            dispatch(toggleAlert({ type: "badLogin", value: true }));
            console.log(error);
        }
    };

    return (
        <>
        <div className="md:w-[400px] xs:w-[300px] max-w-md md:p-8 xs:p-4 bg-white shadow-lg rounded-lg">
            <h1 className="text-orange-500 md:text-3xl xs:text-2xl font-bold mb-8 text-center uppercase font-nunito">
                Увійти до кабінету
            </h1>
            <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-2"> 
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "Email обов'язковий",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Введіть корректний email",
                            },
                        })}
                        placeholder="Введіть email"
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-2 font-nunito text-center">
                            {errors.email.message as ReactNode}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                        Пароль
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="on"
                        {...register("password", {
                            required: "Пароль обов'язковий",
                            pattern: {
                                value: /^[a-zA-Zа-яА-ЯёЁ0-9_]{8,}$/,
                                message: "Пароль не може бути менше 8 символів",
                            },
                        })}
                        name="password"
                        placeholder="Пароль"
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-2 font-nunito text-center">
                            {errors.password.message as ReactNode}
                        </p>
                    )}
                </div>
                <Link className='w-max block mx-auto !mt-0' to='/registration'>
                    <h1
                        className="md:text-base xs:text-xs text-sky-400 font-nunito text-center	font-semibold my-2"
                    >
                        Зареєструватися якщо не маєте аккаунт
                    </h1>
                </Link>
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 px-4 font-semibold md:text-lg xs:text-xm tracking-wider hover:bg-orange-600 !mt-0"
                >
                    Увійти
                </button>
            </form>
        </div>
        </>
    )
}

export default Login;