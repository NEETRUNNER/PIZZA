import Slider from "react-slick";

import { useDispatch } from "react-redux";
import { Selectors } from "../redux/selectors";
import { pizzaSlice } from "../redux/reducers/pizzaSlice";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect } from "react";

import { useLocation, useSearchParams } from "react-router-dom";
import { filterSlice } from "../redux/reducers/filterSlice";

const FilterSlider: React.FC = () => {
    const dispatch = useDispatch();
    const {selectedOption, pizzaData, filteredPizzas, currentPage} = Selectors();
    const location = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();

    const {setFilterMode} = pizzaSlice.actions;
    const {setOption} = filterSlice.actions;

    const settings = {
        className: "center",
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
              breakpoint: 1280,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: false
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: false
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                infinite: false
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false
              }
            }
        ],
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>
    };
    
    const filterArr = (string: string) => {
        return pizzaData.filter((pizza: { pizza_descr: string; }) => pizza.pizza_descr?.toLowerCase().includes(string));
    }

    const allPizzas = filterArr('')
    const tomatoPizzas = filterArr('помідори');
    const cheesePizzas = filterArr('твердий сир');
    const salamiPizzas = filterArr('салямі');
    const cheeseSauce = filterArr('сирний соус')
    const pineapple = filterArr('ананас')
    const sousage = filterArr('ковбаски')
    const mushroom = filterArr('печериці');

    const filteredExspensive = [...pizzaData].sort((a, b) => b.pizza_price - a.pizza_price);
    const filteredCheap = [...pizzaData].sort((a, b) => a.pizza_price - b.pizza_price);
    const filteredRating = [...pizzaData].sort((a, b) => b.rating - a.rating);
    const filteredFamous = [...pizzaData];
    
    useEffect(() => {
        console.log('Отлифильтрованные пиццы', filteredPizzas)
        console.log(selectedOption) // Тоже самое что searchParams.toString().slice(1, searchParams.toString().length)
    }, [selectedOption, filteredPizzas, searchParams])

    const updateFilters = (newFilters: { sort?: string }) => {
        searchParams.set("sort", (newFilters.sort as string));
        dispatch(setOption(searchParams.toString().slice(5, searchParams.toString().length)))
        setSearchParams(searchParams); // Устанавливается url надпись сверху
    };

    useEffect(() => {
        console.log('Текущий фильтр', searchParams.toString().slice(5, searchParams.toString().length))
        console.log('Текущий фильтр', selectedOption)
    }, [searchParams, selectedOption])

    useEffect(() => {
        switch (selectedOption) {
            case 'exspensive':
                dispatch(setFilterMode(filteredExspensive.slice(0, filteredExspensive.length)));
                break;
            case 'cheap':
                dispatch(setFilterMode(filteredCheap.slice(0, filteredCheap.length)))
                break;
            case 'rating':
                dispatch(setFilterMode(filteredRating.slice(0, filteredRating.length)))
                break;
            case 'famous':
                dispatch(setFilterMode(filteredFamous.slice(0, filteredFamous.length)))
                break;
            case 'tomato':
                dispatch(setFilterMode(tomatoPizzas.slice(0, tomatoPizzas.length)))
                break;
            case 'cheese':
                dispatch(setFilterMode(cheesePizzas.slice(0, cheesePizzas.length)))
                break;
            case 'salami':
                dispatch(setFilterMode(salamiPizzas.slice(0, salamiPizzas.length)))
                break;
            case 'cheeseSauce':
                dispatch(setFilterMode(cheeseSauce.slice(0, cheeseSauce.length)))
                break;
            case 'pineapple':
                dispatch(setFilterMode(pineapple.slice(0, pineapple.length)))
                break;
            case 'sousage':
                dispatch(setFilterMode(sousage.slice(0, sousage.length)))
                break;
            case 'mushroom':
                dispatch(setFilterMode(mushroom.slice(0, mushroom.length)))
                break;
            case 'all':
                dispatch(setFilterMode(allPizzas))
                break;
            default:
                dispatch(setFilterMode(pizzaData))
                break;
        }
    }, [currentPage, selectedOption])

    useEffect(() => {
        setSearchParams({sort: 'all'}) // При перезапуске страницы возвращается ко всем пиццам
    }, [location.pathname]);

      return (
        <div className="slider-container md:w-[35%] xs:w-5/6 md:my-4 xs:my-8">
            <Slider {...settings}>

            <button className={`py-2 font-nunito font-bold xl:text-md md:text-xs xs:text-xs text-black uppercase flex justify-center items-center h-full transition-all ${searchParams.toString().slice(5, searchParams.toString().length) === 'all' ? 'bg-orange-500' : 'bg-transparent'}`} onClick={() => updateFilters({ sort: "all" })}>
                Усі
            </button>

            <button className={`py-2 font-nunito font-bold xl:text-md md:text-xs xs:text-xs text-black uppercase flex justify-center items-center h-full transition-all ${searchParams.toString().slice(5, searchParams.toString().length) === 'salami' ? 'bg-orange-500' : 'bg-transparent'}`} onClick={() => updateFilters({ sort: "salami" })}>
                З салямі
            </button>

            <button className={`py-2 font-nunito font-bold xl:text-md md:text-xs xs:text-xs text-black uppercase flex justify-center items-center h-full transition-all ${searchParams.toString().slice(5, searchParams.toString().length) === 'chease' ? 'bg-orange-500' : 'bg-transparent'}`} onClick={() => updateFilters({ sort: "chease" })}>
                З сиром
            </button>

            <button className={`py-2 font-nunito font-bold xl:text-md md:text-xs xs:text-xs text-black uppercase flex justify-center items-center h-full transition-all ${searchParams.toString().slice(5, searchParams.toString().length) === 'mushroom' ? 'bg-orange-500' : 'bg-transparent'}`} onClick={() => updateFilters({ sort: "mushroom" })}>
                З грибами
            </button>

            <button className={`py-2 font-nunito font-bold xl:text-md md:text-xs xs:text-xs text-black uppercase flex justify-center items-center h-full transition-all ${searchParams.toString().slice(5, searchParams.toString().length) === 'cheaseSauce' ? 'bg-orange-500' : 'bg-transparent'}`} onClick={() => updateFilters({ sort: "cheaseSauce" })}>
                З сирним соусом
            </button>

            <button className={`py-2 font-nunito font-bold xl:text-md md:text-xs xs:text-xs text-black uppercase flex justify-center items-center h-full transition-all ${searchParams.toString().slice(5, searchParams.toString().length) === 'sousage' ? 'bg-orange-500' : 'bg-transparent'}`} onClick={() => updateFilters({ sort: "sousage" })}>
                З ковбасками
            </button>

            <button className={`py-2 font-nunito font-bold xl:text-md md:text-xs xs:text-xs text-black uppercase flex justify-center items-center h-full transition-all ${searchParams.toString().slice(5, searchParams.toString().length) === 'pineapple' ? 'bg-orange-500' : 'bg-transparent'}`} onClick={() => updateFilters({ sort: "pineapple" })}>
                З ананасами
            </button>

            <button className={`py-2 font-nunito font-bold xl:text-md md:text-xs xs:text-xs text-black uppercase flex justify-center items-center h-full transition-all ${searchParams.toString().slice(5, searchParams.toString().length) === 'tomato' ? 'bg-orange-500' : 'bg-transparent'}`} onClick={() => updateFilters({ sort: "tomato" })}>
                З помідорами
            </button>

            </Slider>
        </div>
      );
}

export default FilterSlider;

const SampleNextArrow = (props: any) => {
    const { className, style, onClick } = props;

    return (
    <div
        className={className}
        style={{ ...style, display: "block", background: "transparent", color: 'black', borderRadius: "100%" }}
        onClick={onClick}
        />
    );
}

const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props;

    return (
    <div
        className={className}
        style={{ ...style, display: "block", background: "transparent", color: 'black', borderRadius: "100%" }}
        onClick={onClick}
        />
    );
}