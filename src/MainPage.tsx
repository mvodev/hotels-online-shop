import Card from './components/card/Card';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import './MainPage.scss';
import Goods from './components/goods/Goods';
import { Routes, Route } from 'react-router-dom';
import Cards from './pages/ProductPage';

const MainPage = () => {
  return (
    <div className="wrapper">
      <Header callbackRef='mock-address-change-me' /> 
      <Goods title='Косметика и гигиена'/>
      <Footer callbackRef='mock-address-change-me' />
    </div>
  )
}

export default MainPage;
