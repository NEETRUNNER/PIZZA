import { Link } from 'react-router-dom';

import pizza from '../img/pizza.gif'

const Start = () => {

    return (
        <section className="start"> {/* bg-pizza_bg bg-auto bg-repeat h-screen */}
            <div className="start-container flex flex-col py-32">
                <img src={pizza} alt="" className='md:w-1/3 xs:w-3/4 mx-auto'/>
                <Link to='/pizzas-list/1' className='w-max mx-auto'>
                    <button className=" shadow-[inset_0_0_0_2px_#616467] text-black md:px-8 md:py-3 xs:px-4 xs:py-2 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
                    Обрати піццу
                    </button>
                </Link>
            </div>
        </section>
    )
}

export default Start;