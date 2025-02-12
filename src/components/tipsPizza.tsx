import { Selectors } from "../redux/selectors";

import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {useTransition, animated} from '@react-spring/web'
import { Rating } from "primereact/rating";
import slugify from "slugify";

interface tipPizza {
    pizza_weight: string;
    id: string;
    pizza_title: string;
    pizza_counter: number;
    pizza_price: number;
    pizza_descr: string;
    pizza_img: string;
    amount: number;
    rating: number;
}

const TipsPizza: React.FC = () => {
    const {pizzaData, tipPizzas} = Selectors();
    const location = useLocation();

    const [openTip] = useState<boolean>(true);
    const [tip, setTip] = useState<tipPizza[]>([]);
    const { pizzaTitle } = useParams<{pizzaTitle: string}>();

    const pizzaItem = pizzaData.find(item => (item.pizza_title) === pizzaTitle);

    const startIndex = Math.floor(Math.random() * (pizzaData.length - 4)); // Убедитесь, что не выйдете за пределы массива
    const tips = tipPizzas.filter(pizza => pizza.pizza_title !== pizzaItem?.pizza_title).slice(startIndex, startIndex + 4);

    const transitions = useTransition(openTip, {
        from: { transform: "rotateY(90deg)", opacity: 0 },
        enter: { transform: "rotateY(0deg)", opacity: 1 },
        leave: { transform: "rotateY(90deg)", opacity: 0 },
        config: { duration: 300 }
    });

    useEffect(() => {
        setTip(tips);
    }, [tipPizzas, location.pathname]);

    return transitions((style, item) => item && (
        <div className="tips-pizza">

        <div className="md:w-3/4 xs:w-full mx-auto px-4 py-8">
            <h2 className="md:text-4xl xs:text-2xl font-bold text-black font-nunito border-b-2 w-max">Інші піцци</h2>
            <div className="flex flex-wrap justify-between gap-y-8 md:mt-12 xs:mt-6">
                {tip.map((item) => {
                    return <animated.div style={style} key={item.id} className="pizza-block__item md:max-w-[600px] xs:w-full my-4 relative">

                        <div className="flex justify-between items-center w-full md:absolute xs:relative">
                            <h1 className="text-black md:text-2xl xs:text-md w-max font-nunito uppercase font-extrabold p-1">{item.pizza_title}</h1>
                            <Rating value={item.rating} cancel={false} className="custom-rating px-2 h-12"
                                    style={{color: '#FFA500'}}/>
                        </div>
                        <Link to={`/pizza-product/${slugify(item.pizza_title, {lower: true, locale: 'ru'})}`}>
                            <img
                                alt="pizza_img"
                                src={item.pizza_img}
                                className="w-max"
                            />
                        </Link>
                    </animated.div>
                })}
            </div>
        </div>

        </div>
        )
    )
}

export default TipsPizza;

// Проблема была в том что я брал свой обычный массив pizzaData, и перерисовывал его с помощью экшенов, поэтому при клике на счётчик менялись пиццы, для этого я создал копию массива и использую её для показа рекомендованных пицц