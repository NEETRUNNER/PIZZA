import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from "react";

import Header from "./ui/Header"
import Footer from './ui/Footer';
import PizzaCart from './components/PizzaCart';
import PizzaMenu from './components/PizzaMenu'
import Notifications from './other/Notifications';

import { useDispatch } from 'react-redux';
import { pizzaDataFetch, filteredDataFetch, tipsDataFetch } from './redux/thunks/Thunks';

import pizzaLoading from '../src/img/pizza_loading.gif'

const LazyPizzasList = lazy(() => import('./navigation/PizzaList'));
const LazyStart = lazy(() => import('./navigation/Start'));
const LazyPizzaItem = lazy(() => import('./navigation/PizzaItem'))
const LazyLogin = lazy(() => import('./navigation/LoginPage'))
const LazyRegistration = lazy(() => import('./navigation/RegistrationPage'))
const LazyOrder = lazy(() => import('./navigation/Order'))

const App: React.FC = () => {
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
        
        <Notifications/>
        
        <Routes>
          <Route path="/" element={<LazyStart/>} />
          <Route path="/pizzas-list/:pizzaPage" element={<LazyPizzasList/>} />
          <Route path="/pizza-list/:pizzaTitle" element={<LazyPizzaItem/>} />
          <Route path="/login" element={<LazyLogin/>} />
          <Route path="/registration" element={<LazyRegistration/>} />
          <Route path="/order" element={<LazyOrder/>} />
        </Routes>

      <Footer/>
      </Router>
    </div>
    </Suspense>
  )
}

export default App

// Нужно доделать пагинаацию
