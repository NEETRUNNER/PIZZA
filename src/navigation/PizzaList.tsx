import FilterPizza from "../components/FilterPizza";
import Pizzas from "../components/Pizzas";

import { Pagination } from "@nextui-org/pagination";
import { useNavigate } from "react-router-dom";

import { selectors } from "../redux/selectors";

const Main = () => {

    const {pizzaData, currentPage} = selectors();

    const navigate = useNavigate();
    
    const changePage = (page: number) => {
        navigate(`/pizzas-list/${page}`)
    }

    const totalPages = Math.round(pizzaData.length / 9);

    return (
        <section className="main">
            <div className="main-container md:w-4/5 xs:w-11/12 mx-auto">
                <h1 className="text-3xl text-black font-semibold mt-8 uppercase font-nunito">Усі піцци</h1>

                <div className="pizza-wrap flex md:justify-between xs:justify-center py-4 md:flex-nowrap xs:flex-wrap">
                    
                <FilterPizza/>
                
                    <div className="pizza-block flex flex-wrap max-w gap-y-12 gap-x-12 justify-center">
                        
                   <Pizzas/>
                        
                    </div>
                </div>
                <Pagination className="flex justify-center py-12" initialPage={currentPage} total={totalPages} onChange={(page) => changePage(page)}/>
            </div>
        </section>
    )
}

export default Main;