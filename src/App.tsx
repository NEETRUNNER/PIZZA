import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./ui/Header"
import PizzaCart from './components/PizzaCart';

import { lazy, Suspense, useEffect } from "react";
import { GetIngridients, GetPizza } from './other/GetService';

import { useDispatch } from 'react-redux';

import pizzaLoading from '../src/img/pizza_loading.gif'

import { pizzaSlice } from './redux/reducers/pizzaSlice';
import { ingridientSlice } from './redux/reducers/ingridientSlice';

const LazyPizzasList = lazy(() => import('./navigation/PizzaList'));
const LazyStart = lazy(() => import('./navigation/Start'));
const LazyPizzaItem = lazy(() => import('./navigation/PizzaItem'))

const App = () => {
  const dispatch = useDispatch();

  const {getPizzasData} = pizzaSlice.actions;
  const {getIngridientsData} = ingridientSlice.actions;

  useEffect(() => {
    GetPizza()
      .then(data => {
          dispatch(getPizzasData(data)) // С помощью экшенов получаем данные в наш стейт
      })
      .catch(error => {
          console.log(error)
      })
  }, [])

  useEffect(() => {
    GetIngridients()
      .then(data => {
          dispatch(getIngridientsData(data)) // Получили данные в стейт 
      })
      .catch(error => {
          console.log(error)
      })
  }, [])

  return (
    <Suspense fallback={<div className="overlay h-screen w-full flex justify-center items-center flex-col"><img src={pizzaLoading} alt="" className="w-32" /><span className='font-light text-xl'>Завантаження</span></div>}>
    <div className="app">
      <Router>
        <PizzaCart/>
        <Header/>

        <Routes>
          <Route path="/" element={<LazyStart/>} />
          <Route path="/pizzas-list/:pizzaPage" element={<LazyPizzasList/>} />
          <Route path="/pizza-product/:pizzaTitle" element={<LazyPizzaItem/>} />
        </Routes>

      </Router>
    </div>
    </Suspense>
  )
}

export default App

// Прийти подправить ошибки и выгрузить проект в репозиторий