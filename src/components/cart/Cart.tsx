import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectCart,
} from '../../redux/cartSlice';
import './Cart.scss';
import { useEffect, useState } from 'react';
import goodsData from '../../model/goodsData';

const Cart = () => {
  const [ goodsInCart, setGoodsInCart ] = useState(0);
  const [ total, setTotal ] = useState(0);
  const cartState = useAppSelector(selectCart);
  useEffect(()=>{
    let counterOfGoods = 0;
    let totalCounter = 0;
    cartState.forEach((barcode) => {
      goodsData.forEach((value)=>{
        if(value.barcode === barcode) {
          counterOfGoods+=1;
          totalCounter+=+Number(value.price.replace(',','.'));
        }
      })
    })
    setGoodsInCart(counterOfGoods);
    setTotal(+totalCounter.toFixed(2));

  },[cartState])
  return (
    <div className="cart">
      <div className="cart__img">
        <div className="cart__goods">
          {goodsInCart}
        </div>
      </div>

      <div className="cart__total">
        <span className='cart__header'>Корзина</span>
        <span className='cart__price'>{total+' '}&#8376;</span>
      </div>
    </div>
  )
}

export default Cart;