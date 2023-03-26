import Card from './components/card/Card';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import image1Url from './assets/images/image1.png';
import './MainPage.scss';
import Goods from './components/goods/Goods';

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
