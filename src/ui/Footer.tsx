import { FaTelegram, FaInstagramSquare  } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-orange-500">
      <div className="footer-container py-10">

      <div className="footer-wrap max-w-7xl mx-auto flex flex-wrap justify-around xs:gap-y-4 md:gap-y-10 gap-x-10 md:gap-x-40 px-4 md:px-8 md:flex-row xs:flex-col">

        <div className="footer-catalog">
          <h1 className="footer-catalog__title md:text-left xs:text-center text-xl text-white mb-6 uppercase font-semibold tracking-wide">Меню</h1>
          <ul className="space-y-4">
            <Link to="/pizzas-list/1">
              <li className="footer-catalog__li md:text-md xs:text-sm mb-6 md:text-left xs:text-center text-white transition duration-200 ease-in-out uppercase font-medium tracking-wide font-nunito">Піци</li>
            </Link>
          </ul>
        </div>

        <div className="footer-info">
          <h1 className="footer-info__title md:text-left xs:text-center text-xl text-white mb-6 uppercase font-semibold tracking-wide">Інформація</h1>
          <ul className="space-y-4">
            <Link to="#">
              <li className="footer-catalog__li md:text-md xs:text-sm mb-6 md:text-left xs:text-center text-white transition duration-200 ease-in-out uppercase font-medium tracking-wide font-nunito">Про нас</li>
            </Link>
            <Link to="#">
              <li className="footer-catalog__li md:text-md xs:text-sm mb-6 md:text-left xs:text-center text-white transition duration-200 ease-in-out uppercase font-medium tracking-wide font-nunito">Контакти</li>
            </Link>
          </ul>
        </div>

        <div className="footer-social md:block xs:flex flex-col items-center">
          <h1 className="footer-social__title md:text-left xs:text-center text-xl text-white mb-6 uppercase font-semibold tracking-wide font-nunito">Соціальні мережі</h1>
          <div className="footer-social__wrap flex space-x-6 md:space-x-8">
            <Link to='/' className="text-3xl text-white hover:text-slate-700 transition-transform transform hover:scale-125 duration-200 ease-in-out">
              <FaTelegram />
            </Link>
            <Link to='/' className="text-3xl text-white hover:text-slate-700 transition-transform transform hover:scale-125 duration-200 ease-in-out">
              <AiFillTikTok />
            </Link>
            <Link to='/' className="text-3xl text-white hover:text-slate-700 transition-transform transform hover:scale-125 duration-200 ease-in-out">
              <FaInstagramSquare />
            </Link>
            <Link to='/' className="text-3xl text-white hover:text-slate-700 transition-transform transform hover:scale-125 duration-200 ease-in-out">
              <FaSquareFacebook />
            </Link>
          </div>
        </div>

      </div>

        <span className="line block w-32 h-px bg-gray-300 mx-auto my-4"></span>
        <h1 className="text-center text-sm font-nunito font-bold">© 2025 NEXT PIZZA</h1>
    </div>
  </footer>
  );
};

export default Footer;