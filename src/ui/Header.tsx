import { Link } from 'react-router-dom';

import logo from '../img/logo.png'

import { GiShoppingCart } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";

import InputFilter from '../components/InputFilter';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';

import { useSpring, animated } from '@react-spring/web';
import { selectors } from '../redux/selectors';
import { basketSlice } from '../redux/reducers/basketSlice';

const Header = () => {
    const dispatch = useDispatch();
    const cartButtonRef = useRef<HTMLButtonElement>(null);
    const {pizzasForDelivery} = selectors();

    const {toggleMenuCart} = basketSlice.actions;
   
    const counterAnimation = useSpring({
        opacity: pizzasForDelivery.length > 0 ? 1 : 0,
        scale: pizzasForDelivery.length > 0 ? 1 : 0.5,
        config: { tension: 250, friction: 12 },
        reset: true,
    }); 

    return (
        <section className="header border-b-2">
            <div className="header-container flex md:w-4/5 xs:w-11/12 mx-auto py-4 items-center justify-between ">
                <Link to='/' className='md:w-max xs:w-full'>
                    <img src={logo} alt="" className="md:max-w-max xs:max-w-1/2 md:w-full xs:max-w-max xs:w-full" />
                </Link>

                <InputFilter/>

                <div className='flex'>

                    <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-8 py-2 rounded-full tracking-widest uppercase font-semibold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200 items-center md:flex xm:hidden xs:hidden">
                        <FaRegUserCircle/><span className='ml-2'>Увійти</span>
                    </button>

                    <div className="relative">
                        <button 
                            ref={cartButtonRef} 
                            onClick={() => dispatch(toggleMenuCart(true))} 
                            className="cart-button shadow-[inset_0_0_0_2px_#616467] text-black w-10 h-10 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200 ml-2"
                        >
                            <GiShoppingCart size="1.5em" className="mx-auto" />
                        </button>
                            <animated.span style={counterAnimation} className='absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center translate-x-2 -translate-y-2 transform scale-110'>
                                {pizzasForDelivery.length}
                            </animated.span>
                    </div>

                    <button // бургер меню
                    data-collapse-toggle="navbar-hamburger" type="button" className="items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ml-2 md:hidden xs:inline-flex" aria-controls="navbar-hamburger" aria-expanded="false">
                        <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                
            </div>
        </section>
    )
}

export default Header;