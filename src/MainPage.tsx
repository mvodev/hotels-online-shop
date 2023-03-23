import Card from './components/card/Card';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import image1Url from './assets/images/image1.png';
import './MainPage.scss';

const MainPage = () => {
  return (
    <div className="wrapper">
      <Header callbackRef='mock-address-change-me' />
      <Card 
        imgUrl={image1Url} 
        quantity={'450 мл'} 
        quantityImg={''} 
        title={'AOS'} 
        description='средство для мытья посуды Crystal'
        barcode='4604049097548'
        manufacturer='Нэфис'
        brand='AOS'
        price='48,76'
      />
      <Footer callbackRef='mock-address-change-me' />
    </div>
  )
}

export default MainPage;
