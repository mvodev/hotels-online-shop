import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import './MainPage.scss';
import Goods from '../components/goods/Goods';

const MainPage = () => {
  return (
    <div className="wrapper">
      <Header callbackRef='mock-address-change-me' searchHandler={()=>{
        console.log('add search handler for header!!!')
      }}/> 
      <Goods title='Косметика и гигиена'/>
      <Footer callbackRef='mock-address-change-me' searchHandler={()=>{
        console.log('add footer search handler!!!')
      }}/>
    </div>
  )
}

export default MainPage;
