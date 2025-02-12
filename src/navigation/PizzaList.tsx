/* import FilterPizza from "../components/FilterPizza"; */
import Pizzas from "../components/Pizzas";

import { Pagination } from "@nextui-org/pagination";

import { useNavigate } from "react-router-dom";
import { Selectors } from "../redux/selectors";

import SelectPizza from "../components/SelectPizza";
import FilterSlider from "../components/FilterSlider";

import { useEffect, useState } from "react";

const Main: React.FC = () => {
    const {currentPage, filteredPizzas} = Selectors();
    const [total, setTotal] = useState<number>(0);
    const navigate = useNavigate();

    const changePage = (page: number) => {
        navigate(`/pizzas-list/${page}`)
    }

    const totalPages = Math.ceil(filteredPizzas.length / 8);

    useEffect(() => {
        setTotal(totalPages)
    }, [filteredPizzas])

    return (
        <section className="main">
            <div className="main-container xl:w-4/5 md:w-11/12 xs:w-11/12 mx-auto">

                <div className="flex items-center mt-8 gap-x-48 xs:justify-center md:flex-wrap xs:flex-wrap">
                    <h1 className="md:text-4xl xs:text-3xl text-black font-extrabold font-nunito">Усі піцци</h1>
                        <FilterSlider/>
                        <SelectPizza/>
                </div>

                <div className="pizza-wrap flex xs:justify-center py-4 flex-wrap gap-y-12 gap-x-32 mt-12 justify-center">
                    <Pizzas/>
                </div>
                <Pagination className="flex justify-center py-12" initialPage={currentPage} total={total} onChange={(page) => changePage(page)}/>
            </div>
        </section>
    )
}

export default Main;