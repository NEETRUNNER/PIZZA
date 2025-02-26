import { ReactNode } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useDispatch } from 'react-redux';
import { notificationSlice } from '../redux/reducers/notificationSlice';

import { NewUser } from './Login';

const Registration: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {register, reset, handleSubmit, formState: { errors }} = useForm();
    const {toggleAlert} = notificationSlice.actions;

    const onSubmit = async (data: NewUser) => {
        try {
            reset({
                email: '',
                password: ''
            })
            console.log(data.password, data.email)
    
            const response = await axios.post<NewUser>('https://pizza-backend.up.railway.app/auth/registration', {
                email: data.email,
                password: data.password
            })
    
            // Обработка ответа
            console.log('Response:', response);

            if (response.data.message) {
                navigate('/login');
                dispatch(toggleAlert({ type: "registration", value: true }));
            }
            return response;

        } catch(e) {
            console.log(e);
        }
    };

    return (
        <>
        <div className="md:w-[400px] xs:w-[300px] max-w-md md:p-8 xs:p-4 bg-white shadow-lg rounded-lg">
            <h1 className="text-orange-500 md:text-3xl xs:text-2xl font-bold mb-8 text-center uppercase font-nunito">
                Регістрація
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
                        name="email"
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
                        id="phone"
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
                        placeholder="380*********"
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-2 font-nunito text-center">
                            {errors.password.message as ReactNode}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 px-4 font-semibold md:text-lg xs:text-xm tracking-wider hover:bg-orange-600 !mt-3"
                >
                    Зареєструватися
                </button>
            </form>
        </div>
        </>
    )
}

export default Registration;