import Slider from "react-slick";

import { useDispatch } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { filteredByCategory } from "../redux/thunks/Thunks";
import { Selectors } from "../redux/selectors";
import React from "react";

const FilterSlider: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const dispatch = useDispatch<any>();
    const {currentPage} = Selectors();

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

    const updateFilters = (category: string) => {
        searchParams.set("category", category);

        searchParams.delete("sortBy");
        searchParams.delete("sortOrder")

        dispatch(filteredByCategory({page: currentPage, limit: 8, category: (searchParams.get("category") as string)})) // Фильтр работает корректно
        setSearchParams(searchParams); // Устанавливается url надпись сверху
        navigate(`/pizzas-list/${currentPage}?category=${category}`)
    };

    useEffect(() => {
        updateFilters('all');
        navigate(`/pizzas-list/${currentPage}?category=${searchParams.get("category")}`)
    }, []);

      return (
        <div className="slider-container md:w-[35%] xs:w-5/6 md:my-4 xs:my-8">
            <Slider {...settings}>

            <button className={`py-2 font-nunito font-bold xl:text-md md:text-xs xs:text-xs text-black uppercase flex justify-center items-center h-full transition-all ${searchParams.get('category') === 'all' ? 'bg-orange-500' : 'bg-transparent'}`} onClick={() => updateFilters("all")}>
                Усі
            </button>

            <button className={`py-2 font-nunito font-bold xl:text-md md:text-xs xs:text-xs text-black uppercase flex justify-center items-center h-full transition-all ${searchParams.get('category') === 'mix' ? 'bg-orange-500' : 'bg-transparent'}`} onClick={() => updateFilters("mix")}>
                Мікси
            </button>

            <button className={`py-2 font-nunito font-bold xl:text-md md:text-xs xs:text-xs text-black uppercase flex justify-center items-center h-full transition-all ${searchParams.get('category') === 'salami' ? 'bg-orange-500' : 'bg-transparent'}`} onClick={() => updateFilters("salami")}>
                З салямі
            </button>

            <button className={`py-2 font-nunito font-bold xl:text-md md:text-xs xs:text-xs text-black uppercase flex justify-center items-center h-full transition-all ${searchParams.get('category') === 'cheese' ? 'bg-orange-500' : 'bg-transparent'}`} onClick={() => updateFilters("cheese")}>
                З сиром
            </button>

            <button className={`py-2 font-nunito font-bold xl:text-md md:text-xs xs:text-xs text-black uppercase flex justify-center items-center h-full transition-all ${searchParams.get('category') === 'mushroom' ? 'bg-orange-500' : 'bg-transparent'}`} onClick={() => updateFilters("mushroom")}>
                З грибами
            </button>

            <button className={`py-2 font-nunito font-bold xl:text-md md:text-xs xs:text-xs text-black uppercase flex justify-center items-center h-full transition-all ${searchParams.get('category') === 'cheeseSauce' ? 'bg-orange-500' : 'bg-transparent'}`} onClick={() => updateFilters("cheeseSauce")}>
                З сирним соусом
            </button>

            <button className={`py-2 font-nunito font-bold xl:text-md md:text-xs xs:text-xs text-black uppercase flex justify-center items-center h-full transition-all ${searchParams.get('category') === 'sousage' ? 'bg-orange-500' : 'bg-transparent'}`} onClick={() => updateFilters("sousage")}>
                З ковбасками
            </button>

            <button className={`py-2 font-nunito font-bold xl:text-md md:text-xs xs:text-xs text-black uppercase flex justify-center items-center h-full transition-all ${searchParams.get('category') === 'pineApple' ? 'bg-orange-500' : 'bg-transparent'}`} onClick={() => updateFilters("pineApple")}>
                З ананасами
            </button>

            <button className={`py-2 font-nunito font-bold xl:text-md md:text-xs xs:text-xs text-black uppercase flex justify-center items-center h-full transition-all ${searchParams.get('category') === 'tomato' ? 'bg-orange-500' : 'bg-transparent'}`} onClick={() => updateFilters("tomato")}>
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