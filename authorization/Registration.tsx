import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [emailValue, setEmailValue] = useState<string>('');
    const [numberValue, setNumberValue] = useState<string>('');
    const {register, handleSubmit, formState: { errors }} = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        console.log(data);
        try {
            setEmailValue('')
            setNumberValue('')
    
            const response = await axios.post('http://localhost:5000/auth/registration', {
                username: data.email,
                password: data.number
            })
    
            // Обработка ответа
            console.log('Response:', response);

            if (response.data.message) {
                navigate('/login')
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
                                message: "Введіть корректний номер (10 цифр)",
                            },
                        })}
                        value={numberValue}
                        onChange={(e) => setNumberValue(e.target.value)}
                        placeholder="Введіть номер телефону"
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {errors.number && (
                        <p className="text-red-500 text-xs mt-2 font-nunito text-center">
                            {errors.root?.message}
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