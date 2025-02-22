import { useDispatch } from 'react-redux';
import { Selectors } from '../redux/selectors';

import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { menuSlice } from '../redux/reducers/menuSlice';
import { userSlice } from '../redux/reducers/userSlice';

import FilterSearch from './FilterSearch';
import { FaRegUserCircle } from "react-icons/fa";

import { useTransition, animated } from '@react-spring/web';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";

import useCloseMenu from '../hooks/useCloseMenu'; // Импорт кастомного хука

const PizzaMenu: React.FC = () => {
    const { toggleBurgerMenu, loginToken } = Selectors();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {toggleMenuBurger} = menuSlice.actions;
    const {deleteToken} = userSlice.actions;

    const cartButtonRef = document.querySelector<HTMLElement>('.burger-button')
    const menuRef = useRef<HTMLDivElement | null>(null);

    const exitFromAccount = () => {
        dispatch(deleteToken());
        localStorage.removeItem("token")
    }

    useCloseMenu(menuRef, cartButtonRef, () => dispatch(toggleMenuBurger(false)), toggleBurgerMenu) // Кастомный хук

    const transitions = useTransition(toggleBurgerMenu, {
        from: {
            transform: 'translateX(-50%)',
            opacity: 0,
        },
        enter: {
            transform: 'translateX(0)',
            opacity: 1,
        },
        leave: {
            transform: 'translateX(-50%)',
            opacity: 0,
        },
        config: {
            duration: 200, // Чуть больше длительность для плавности
        },
    });

    return transitions((style, item) => item && (
        <animated.div style={style} ref={menuRef} className={`pizza-menu bg-white h-full w-5/6 fixed z-20`}>
            <div className="pizza-menu__container py-16 h-screen">
                <FilterSearch className={'md:hidden xm:block xs:block my-4'}/>

                <div className="account-btn absolute bottom-0 justify-center flex w-full mb-4">
                    {loginToken ? 
                        <Dropdown>
                            <DropdownTrigger>
                                <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-2 py-2 rounded-full tracking-widest uppercase font-semibold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200 items-center md:hidden xm:flex xs:flex">
                                    <FaRegUserCircle size="1.5em" className="mx-auto"/>
                                </button>
                            </DropdownTrigger>
                            <DropdownMenu variant='solid' aria-label="Static Actions">
                                <DropdownItem onPress={() => exitFromAccount()} className='text-black' key="exit">Вийти</DropdownItem>
                                <DropdownItem onPress={() => navigate('/login')} className='text-black' key="privat">Особистий кабінет</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        :
                        <Link to='/login' className='text-center mx-auto'>
                            <button onClick={() => dispatch(toggleMenuBurger(!toggleBurgerMenu))} className="shadow-[inset_0_0_0_2px_#616467] text-black px-8 py-2 rounded-full tracking-widest uppercase font-semibold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200 items-center md:hidden xm:flex xs:flex">
                                <FaRegUserCircle/><span className='ml-2'>Увійти</span>
                            </button>
                        </Link>
                    }
                </div>

            </div>
        </animated.div>
    )
)}

export default  PizzaMenu;