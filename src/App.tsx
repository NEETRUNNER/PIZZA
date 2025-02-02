import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from "react";

import Header from "./ui/Header"
import Footer from './ui/Footer';
import PizzaCart from './components/PizzaCart';
import PizzaMenu from './components/PizzaMenu'
import { PizzaNotification, LoginNotification, BadLoginNotification, RegistrationNotification } from './other/Notifications';

import { useDispatch } from 'react-redux';
import { pizzaDataFetch, filteredDataFetch, tipsDataFetch } from './redux/thunks/Thunks';

import pizzaLoading from '../src/img/pizza_loading.gif'

const LazyPizzasList = lazy(() => import('./navigation/PizzaList'));
const LazyStart = lazy(() => import('./navigation/Start'));
const LazyPizzaItem = lazy(() => import('./navigation/PizzaItem'))
const LazyLogin = lazy(() => import('./navigation/LoginPage'))
const LazyRegistration = lazy(() => import('./navigation/RegistrationPage'))

// Функция сохранения состояния в localStorage
export const saveState = (state: string, localStorageName: string) => {
  try {
    const serializedState = (state);
    localStorage.setItem(localStorageName, serializedState);
  } catch (err) {
    console.error("Ошибка сохранения в localStorage", err);
  }
};

const App = () => {
  const dispatch = useDispatch<any>(); // Нужно добавлять any когда работаем с createAsyncThunk, чтобы он не вызывал ошибку

  useEffect(() => {
    dispatch(pizzaDataFetch());
    dispatch(filteredDataFetch());
    dispatch(tipsDataFetch());
  }, []);

  return (
    <Suspense fallback={<div className="overlay h-screen w-full flex justify-center items-center flex-col"><img src={pizzaLoading} alt="" className="w-32" /></div>}>
    <div className="app">
      <Router>
        <PizzaMenu/>
        <PizzaCart/>
        <Header/>
        
        <PizzaNotification/>
        <LoginNotification/>
        <BadLoginNotification/>
        <RegistrationNotification/>
        
        <Routes>
          <Route path="/" element={<LazyStart/>} />
          <Route path="/pizzas-list/:pizzaPage" element={<LazyPizzasList/>} />
          <Route path="/pizza-product/:pizzaTitle" element={<LazyPizzaItem/>} />
          <Route path="/login" element={<LazyLogin/>} />
          <Route path="/registration" element={<LazyRegistration/>} />
        </Routes>

      <Footer/>
      </Router>
    </div>
    </Suspense>
  )
}

export default App