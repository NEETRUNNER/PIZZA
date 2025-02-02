import { useState } from 'react';
import { useForm } from 'react-hook-form'
import axios from 'axios';

import { userSlice } from '../src/redux/reducers/userSlice';
import { useDispatch } from 'react-redux';

import { saveState } from '../src/App'; // Сохранение состояния в state

import { Link } from 'react-router-dom';
import { notificationSlice } from '../src/redux/reducers/notificationSlice';

const Login = () => {
    const dispatch = useDispatch();
    const [emailValue, setEmailValue] = useState<string>('');
    const [numberValue, setNumberValue] = useState<string>('');

    const {getLoginToken} = userSlice.actions;
    const {toggleAlert} = notificationSlice.actions;
    
    const {register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = async (data: any) => {
        console.log(data);
        setEmailValue('')
        setNumberValue('')

        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                username: data.email,
                password: data.number
            })
            const token = response.data.token;
            if (token) {
                dispatch(getLoginToken(token))
                dispatch(toggleAlert({ type: "login", value: true }));
                saveState(token, "token");
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        placeholder="Введіть email"
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-2 font-nunito text-center">
                            {errors.root?.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                        Номер телефону
                    </label>
                    <input
                        id="phone"
                        type="text"
                        {...register("number", {
                            required: "Номер телефону обов'язковий",
                            pattern: {
                                value: /^\d{12}$/,
                                message: "Введіть корректний номер (12 цифр)",
                            },
                        })}
                        value={numberValue}
                        onChange={(e) => setNumberValue(e.target.value)}
                        placeholder="380*********"
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {errors.number && (
                        <p className="text-red-500 text-xs mt-2 font-nunito text-center">
                            {errors.root?.message}
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