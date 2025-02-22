import slugify from 'slugify';

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { IoMdArrowForward, IoMdClose } from "react-icons/io";
import { Selectors } from '../redux/selectors';

import { menuSlice } from '../redux/reducers/menuSlice';
import { useDispatch } from 'react-redux';

interface filterState {
    pizza_weight: string;
    id: string;
    pizza_title: string;
    pizza_counter: number;
    pizza_price: number;
    pizza_descr: string
    pizza_img: string;
    amount: number;
}

const InputFilter: React.FC<any> = ({className}) => { // Это обьявление функционального компонента который дженериком принимает типы пропсов
    const dispatch = useDispatch();
    const {pizzaData, toggleBurgerMenu} = Selectors();

    const [inputData, setInputData] = useState<string | undefined>('');
    const [filteredPizzas, setFilteredPizzas] = useState<filterState[]>([]);

    const refInputMenu = useRef<HTMLDivElement>(null);
    const refInput = useRef<HTMLDivElement>(null)

    const {toggleMenuBurger} = menuSlice.actions;

/*     const search = pizzaData.filter(item => item.pizza_title.includes(inputData ? inputData : ''));

    useEffect(() => {
        setFilteredPizzas(search)
        if (inputData === '') {
            setInputData('')
            setFilteredPizzas([])
        }
    }, [inputData]) */

    const closeFilter = () => {
        document.addEventListener('click', (e) => {
            if (!refInputMenu.current?.contains(e.target as Node) && !refInput.current?.contains(e.target as Node)) {
                setInputData('')
            }
        })
    }

    const closeMenu = () => {
        dispatch(toggleMenuBurger(!toggleBurgerMenu))
        setInputData('')
    }

    return (
        <div onClick={() => closeFilter()} className={`relative w-full md:w-1/2 xs:w-full px-4 ${className}`}>
            {/* Input Field */}
            <div ref={refInput} className="w-full">
                <div className="relative">
                <input
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder="Пошук піци"
                    type="text"
                    value={inputData || ''}
                    className="w-full bg-gray-100 pl-4 pr-12 py-2 text-gray-800 text-base font-medium shadow focus:outline-none focus:ring focus:ring-blue-300"
                />
                <IoMdClose
                    onClick={() => setInputData('')}
                    color="#000"
                    size="1.5em"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-800"
                />
                </div>
            </div>

            {/* Filtered Results */}
        {filteredPizzas.length > 0 && (
            <div
            ref={refInputMenu}
            className="max-h-80 w-12 overflow-y-auto absolute bg-white top-14 left-0 md:w-full xs:w-max z-50 shadow-lg rounded-lg border border-gray-200"
        >
            {filteredPizzas.length > 0 ? (
                filteredPizzas.map((item, index) => (
                    <Link
                    key={index}
                    to={`/pizza-product/${slugify(item.pizza_title, { lower: true, locale: 'ru' })}`}
                    onClick={() => closeMenu()}
                    className="flex items-center p-4 hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0"
                    >
                    <div className="flex items-center flex-grow whitespace-nowrap">
                        {/* Pizza Image */}
                        <img
                        src={item.pizza_img}
                        alt={item.pizza_title}
                        className="w-16 h-16 rounded-full object-scale-down"
                        />
                        <div className="ml-4">
                        {/* Pizza Title */}
                        <h1 className="text-gray-900 font-semibold md:text-lg xs:text-xs">
                            {item.pizza_title}
                        </h1>
                        {/* Pizza Weight and Price */}
                        <p className="text-gray-600 text-sm mt-1">
                            {item.pizza_weight} г {item.pizza_price} ₴
                        </p>
                        </div>
                    </div>
                    {/* Arrow Icon */}
                    <div>
                        <IoMdArrowForward className='md:block xs:hidden' size="1.2em" color="#000" />
                    </div>
                    </Link>
                ))) : null}
            </div>
        )}
    </div>
    )
}

export default InputFilter;