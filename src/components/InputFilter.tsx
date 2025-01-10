import slugify from 'slugify';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { IoMdArrowForward, IoMdClose } from "react-icons/io";
import { selectors } from '../redux/selectors';

import { pizza } from '../other/GetService';

const InputFilter = () => {
    const [inputData, setInputData] = useState<string | undefined>();
    const [filteredPizzas, setFilteredPizzas] = useState<pizza[]>([]);

    const refInputMenu = useRef<HTMLDivElement>(null);
    const refInput = useRef<HTMLDivElement>(null)

    const {pizzaData} = selectors();

    const search = pizzaData?.filter(item => item.pizza_title.toUpperCase().includes(inputData ? inputData : ''.toUpperCase()));

    useEffect(() => {
        setFilteredPizzas(search)
        if (inputData === '') {
            setInputData('')
            setFilteredPizzas([])
        }
    }, [inputData])

    const closeFilter = () => {
        document.addEventListener('click', (e) => {
            if (!refInputMenu.current?.contains(e.target as Node) && !refInput.current?.contains(e.target as Node)) {
                setInputData('')
            }
            if (refInput.current?.contains(e.target as Node)) {
            }
        })
    }
    
    return (
        <div onClick={() => closeFilter()} className="relative w-full md:w-1/2 px-4 md:block xm:hidden xs:hidden">
  {/* Input Field */}
  <div ref={refInput} className="w-full">
    <div className="relative">
      <input
        onChange={(e) => setInputData(e.target.value.toUpperCase())}
        placeholder="Пошук піци"
        type="text"
        value={inputData || ''}
        className="w-full bg-gray-100 rounded-lg pl-4 pr-12 py-3 text-gray-800 text-base font-medium shadow focus:outline-none focus:ring focus:ring-blue-300"
      />
      <IoMdClose
        onClick={() => setInputData('')}
        color="#000"
        size="1.5em"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-800"
      />
    </div>
  </div>

  {/* Filtered Results */}
  <div
    ref={refInputMenu}
    className="max-h-80 overflow-y-auto absolute bg-white top-14 left-0 w-full md:w-full z-50 shadow-lg rounded-lg border border-gray-200"
  >
    {filteredPizzas.length > 0 ? (
        filteredPizzas.map((item, index) => (
            <Link
            key={index}
            to={`/pizza-product/${slugify(item.pizza_title, { lower: true, locale: 'ru' })}`}
            onClick={() => setInputData('')}
            className="flex items-center p-4 hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0"
            >
            <div className="flex items-center flex-grow">
                {/* Pizza Image */}
                <img
                src={item.pizza_img}
                alt={item.pizza_title}
                className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                {/* Pizza Title */}
                <h1 className="text-gray-900 font-semibold text-lg uppercase">
                    {item.pizza_title}
                </h1>
                {/* Pizza Weight and Price */}
                <p className="text-gray-600 text-sm mt-1">
                    {item.pizza_weight} грам • {item.pizza_price} ₴
                </p>
                </div>
            </div>
            {/* Arrow Icon */}
            <div>
                <IoMdArrowForward size="1.2em" color="#000" />
            </div>
            </Link>
        ))) : null}
    </div>
    </div>
    )
}

export default InputFilter;