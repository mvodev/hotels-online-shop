import BreadCrumbs from '../components/bread-crumbs/BreadCrumbs';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import './CartPage.scss';

const CartPage = () => {
  return (
    <div className="wrapper">
      <Header callbackRef='https://moch-address-change-me'/>
      <main className='cart'>
        <h2 className='cart__header'>Корзина</h2>
        <BreadCrumbs links={[
          {link:'/',name:'Главная'},
          {link: '/',name:'Корзина',actual:true}
        ]}/>
      </main>
      <Footer callbackRef='https://moch-address-change-me'/>
    </div>
  )

}

export default CartPage;