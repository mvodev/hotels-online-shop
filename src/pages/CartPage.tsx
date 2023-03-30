import { useEffect, useState } from 'react';
import BreadCrumbs from '../components/bread-crumbs/BreadCrumbs';
import Button from '../components/button/Button';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import ShortCard from '../components/short-card/ShortCard';
import goodsData from '../model/goodsData';
import { addToCart, removeFromCart, selectCart } from '../redux/cartSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import './CartPage.scss';

const CartPage = () => {
  const [products,setProducts] = useState<JSX.Element[]>();
  const [total,setTotal] = useState(0);
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  let productsMap:Map<string,number> = new Map();

  const handleDeleteButtonClick = (counter: number,barcode:string) => {
    for (let i=0;i<counter;i++) {
      dispatch(removeFromCart({barcode}));
    }
  }

  const handleCounterChange = (counter: number,barcode:string) => {
    const oldPNumberProductsInCart = productsMap.get(barcode);
    console.log(oldPNumberProductsInCart)
    if (oldPNumberProductsInCart && oldPNumberProductsInCart < counter) {
      dispatch(addToCart({barcode}));
    } else if (oldPNumberProductsInCart && oldPNumberProductsInCart > counter) {
      dispatch(removeFromCart({barcode}));
    }
  }

  useEffect(()=>{
    let currentTotalPrice = 0;
    productsMap = new Map();
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
      const price = fullDescription?.price.replace(',','.') ? +fullDescription?.price.replace(',','.') : 0;
      currentTotalPrice += price * quantity;
      if (fullDescription) productsArray.push(
      <ShortCard 
        counterOfProduct={quantity} 
        key={barcode}
        handleCounterChange={handleCounterChange}
        handleDeleteButtonClick={handleDeleteButtonClick} 
        {...fullDescription} />)
    }
    setProducts(productsArray);
    setTotal(+currentTotalPrice.toFixed(2));
  },[cart])

  return (
    <div className="wrapper">
      <Header callbackRef='https://moch-address-change-me' searchHandler={()=>{
        console.log('add search handler for header component!!!')
      }}/>
      <main className='cart-page'>
        <BreadCrumbs links={[
          {link:'/',name:'Главная'},
          {link: '/',name:'Корзина',actual:true}
        ]}/>
        <h2 className='cart-page__header'>Корзина</h2>
        <div className="cart-page__products">
          {products}
        </div>
        <div className="cart-page__prepare">
          <Button buttonType='common' text='Оформить заказ'/>
          <span className='cart-page__total'>{total + ' '}&#8376;</span>
        </div>
      </main>
      <Footer callbackRef='https://moch-address-change-me' searchHandler={()=> {
        console.log('add search handler');
      }}/>
    </div>
  )

}

export default CartPage;