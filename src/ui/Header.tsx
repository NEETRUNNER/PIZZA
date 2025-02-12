import { Link, useNavigate } from 'react-router-dom';

import { GiShoppingCart } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";

import InputFilter from '../components/FilterSearch';

import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { Selectors } from '../redux/selectors';
import { menuSlice } from '../redux/reducers/menuSlice';
import { userSlice } from '../redux/reducers/userSlice';

import classNames from 'classnames';
import logo from '../img/logo.png'

import { useSpring, animated } from '@react-spring/web';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [opened, setOpened] = useState<boolean>(false);

    const {toggleMenuCart, toggleMenuBurger} = menuSlice.actions;
    const {deleteToken} = userSlice.actions;

    const cartButtonRef = useRef<HTMLButtonElement>(null);

    const {pizzasForDelivery, toggleBurgerMenu, loginToken} = Selectors();
   
    const counterAnimation = useSpring({
        opacity: pizzasForDelivery.length > 0 ? 1 : 0,
        scale: pizzasForDelivery.length > 0 ? 1 : 0.5,
        config: { tension: 250, friction: 12 },
        reset: true,
    });
    
    const openBurgerMenu = () => {
        setOpened(!opened);
        dispatch(toggleMenuBurger(!toggleBurgerMenu))
    }

    const exitFromAccount = () => {
        dispatch(deleteToken());
        localStorage.removeItem("token")
    }

    return (
        <section className="header border-b-2">
            <div className="header-container flex md:w-4/5 xs:w-11/12 mx-auto py-2 items-center justify-between  min-h-16">

            <div onClick={() => openBurgerMenu()} className={classNames(`burger-button tham tham-e-squeeze tham-w-6 md:hidden xs:block h-max z-30`, { 'tham-active': toggleBurgerMenu})}>
                <div className="tham-box">
                    <div className="tham-inner" />
                </div>
            </div>

                <Link to='/' className='md:w-max xs:w-3/5'>
                    <img src={logo} alt="" className="md:max-w-max xs:max-w-1/2 md:w-11/12 xm:w-3/6 xs:w-3/4 z-30 relative" />
                </Link>

                <InputFilter className='md:block xm:hidden xs:hidden'/>

                <div className='flex items-center justify-center'>

                    {loginToken ? 
                    <Dropdown>
                        <DropdownTrigger>
                            <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-2 py-2 rounded-full tracking-widest uppercase font-semibold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200 items-center md:flex xm:hidden xs:hidden">
                                <FaRegUserCircle size="1.5em" className="mx-auto"/>
                            </button>
                        </DropdownTrigger>
                        <DropdownMenu variant='solid' aria-label="Static Actions">
                            <DropdownItem onPress={() => exitFromAccount()} className='text-black' key="exit">Вийти</DropdownItem>
                            <DropdownItem onPress={() => navigate('/login')} className='text-black' key="privat">Особистий кабінет</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    :
                    <Link to='/login'>
                        <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-8 py-2 rounded-full tracking-widest uppercase font-semibold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200 items-center md:flex xm:hidden xs:hidden">
                            <FaRegUserCircle/><span className='ml-2'>Увійти</span>
                        </button>
                    </Link>
                    }

                    <div className="relative flex">
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

                    
                </div>
                
            </div>
        </section>
    )
}

export default Header;