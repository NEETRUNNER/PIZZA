import Slider from "react-slick";

import {useDispatch} from "react-redux";
import {filterSlice} from "../redux/reducers/filterSlice";
import {Selectors} from "../redux/selectors";
import {pizzaSlice} from "../redux/reducers/pizzaSlice";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect } from "react";
import { paginationSlice } from "../redux/reducers/paginationSlice";
import { useSearchParams } from "react-router-dom";

const FilterSlider: React.FC = () => {
    const dispatch = useDispatch();
    const {selectedOption, pizzaData, filteredPizzas} = Selectors();
    const [searchParams, ] = useSearchParams();
    console.log(searchParams)

    const {setOption} = filterSlice.actions;
    const {setFilterMode} = pizzaSlice.actions;
    const {setCurrentPage} = paginationSlice.actions;

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

    useEffect(() => {
        console.log('Отлифильтрованные пиццы', filteredPizzas)
    }, [selectedOption, filteredPizzas])

    useEffect(() => {
        switch (selectedOption) {
            case 'exspensive':
                dispatch(setFilterMode(filteredExspensive));
                break;
            case 'cheap':
                dispatch(setFilterMode(filteredCheap))
                break;
            case 'rating':
                dispatch(setFilterMode(filteredRating))
                break;
            case 'tomato':
                dispatch(setFilterMode(tomatoPizzas))
                break;
            case 'cheese':
                dispatch(setFilterMode(cheesePizzas))
                break;
            case 'salami':
                dispatch(setFilterMode(salamiPizzas))
                break;
            case 'cheeseSauce':
                dispatch(setFilterMode(cheeseSauce))
                break;
            case 'pineapple':
                dispatch(setFilterMode(pineapple))
                break;
            case 'sousage':
                dispatch(setFilterMode(sousage))
                break;
            case 'mushroom':
                dispatch(setFilterMode(mushroom))
                break;
            case 'all':
                dispatch(setFilterMode(pizzaData))
                break;
            default:
                dispatch(setFilterMode(pizzaData))
        }
    }, [selectedOption])

      return (
        <div className="slider-container md:w-[35%] xs:w-5/6 my-4">
            <Slider {...settings}>
                <div>
                    <label className="label bg-black">
                        <input onChange={(e) => dispatch(setOption(e.target.value))} value="all" name="value-radio" id="value-1" className="radio-input" type="radio"/>
                        <div className="label-text font-nunito xl:text-md md:text-xs xs:text-xs">Усі</div>
                    </label>
                </div>
                <div>
                    <label className="label">
                        <input onChange={(e) => dispatch(setOption(e.target.value))} value="salami" name="value-radio" id="value-1" className="radio-input" type="radio"/>
                        <div className="label-text font-nunito xl:text-md md:text-xs xs:text-xs">З Салямі</div>
                    </label>
                </div>
                <div>
                    <label className="label">
                        <input onChange={(e) => {
                            dispatch(setOption(e.target.value));
                            dispatch(setCurrentPage(1));
                        }} 
                        value="cheese" name="value-radio" id="value-2" className="radio-input" type="radio"/>
                        <div className="label-text font-nunito xl:text-md md:text-xs xs:text-xs">З сиром</div>
                    </label>
                </div>
                <div>
                    <label className="label">
                        <input onChange={(e) => dispatch(setOption(e.target.value))} value="cheeseSauce" name="value-radio" id="value-3" className="radio-input" type="radio"/>
                        <div className="label-text font-nunito xl:text-md md:text-xs xs:text-xs whitespace-nowrap">З сирним соусом</div>
                    </label>
                </div>
                <div>
                    <label className="label">
                        <input onChange={(e) => dispatch(setOption(e.target.value))} value="tomato" name="value-radio" id="value-4" className="radio-input" type="radio"/>
                        <div className="label-text font-nunito xl:text-md md:text-xs xs:text-xs">З помідорами</div>
                    </label>
                </div>
                <div>
                    <label className="label">
                        <input onChange={(e) => dispatch(setOption(e.target.value))} value="pineapple" name="value-radio" id="value-5" className="radio-input" type="radio"/>
                        <div className="label-text font-nunito xl:text-md md:text-xs xs:text-xs">З ананасами</div>
                    </label>
                </div>
                <div>
                    <label className="label">
                        <input onChange={(e) => dispatch(setOption(e.target.value))} value="sousage" name="value-radio" id="value-5" className="radio-input" type="radio"/>
                        <div className="label-text font-nunito xl:text-md md:text-xs xs:text-xs">З ковбасками</div>
                    </label>
                </div>
                <div>
                    <label className="label">
                        <input onChange={(e) => dispatch(setOption(e.target.value))} value="mushroom" name="value-radio" id="value-5" className="radio-input" type="radio"/>
                        <div className="label-text font-nunito xl:text-md md:text-xs xs:text-xs">З грибами</div>
                    </label>
                </div>
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