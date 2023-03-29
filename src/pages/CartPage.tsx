import { useEffect, useState } from 'react';
import BreadCrumbs from '../components/bread-crumbs/BreadCrumbs';
import Button from '../components/button/Button';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import ShortCard from '../components/short-card/ShortCard';
import goodsData from '../model/goodsData';
import { selectCart } from '../redux/cartSlice';
import { useAppSelector } from '../redux/hooks';
import './CartPage.scss';

const CartPage = () => {
  const [products,setProducts] = useState<JSX.Element[]>();
  const cart = useAppSelector(selectCart);
  const productsMap:Map<string,number> = new Map();
  useEffect(()=>{
    cart.forEach(barcode => {
      if (productsMap.has(barcode)) {
        const oldNumberOfProduct = productsMap.get(barcode);
        if (oldNumberOfProduct !== undefined) productsMap.set(barcode, oldNumberOfProduct + 1);
      } else productsMap.set(barcode, 1);
    })
    let productsArray = [];
    for (let productNumber of productsMap){
      const barcode = productNumber[0];
      const quantity = productNumber[1];
      const fullDescription = goodsData.find(data=>data.barcode === barcode);
      if (fullDescription) productsArray.push(<ShortCard key={barcode} {...fullDescription} />)
    }
    setProducts(productsArray);
  },[cart])

  return (
    <div className="wrapper">
      <Header callbackRef='https://moch-address-change-me'/>
      <main className='cart-page'>
        <BreadCrumbs links={[
          {link:'/',name:'Главная'},
          {link: '/',name:'Корзина',actual:true}
        ]}/>
        <h2 className='cart-page__header'>Корзина</h2>
        <div className="cart-page__products">
          {products}
        </div>
        <Button buttonType='common' text='Оформить заказ'/>
      </main>
      <Footer callbackRef='https://moch-address-change-me'/>
    </div>
  )

}

export default CartPage;