import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectCart,
} from '../../redux/cartSlice';
import './Cart.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ls from '../../storage/LocalStorage';

export type CartTypeProps = {
  cropped?: boolean
}

const Cart = (props:CartTypeProps) => {
  const {cropped = false} = props;
  const [ goodsInCart, setGoodsInCart ] = useState(0);
  const [ total, setTotal ] = useState(0);
  const cartState = useAppSelector(selectCart);

  useEffect(()=>{
    const dataInStorage = ls.getItems() ?? [];
    let counterOfGoods = 0;
    let totalCounter = 0;
    cartState.forEach((barcode) => {
      dataInStorage.forEach((value)=>{
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
    <div className={`cart ${cropped?'cart_cropped':''}`}>
      <Link to={'/cart'}>
        <div className={`cart__img ${cropped?'cart_cropped':''}`}>
          <div className={`cart__goods ${cropped?'cart_cropped':''}`}>
            {goodsInCart}
          </div>
        </div>
      </Link>
      {!cropped && <Link to={'/cart'}>
        <div className="cart__total">
          <span className='cart__header'>Корзина</span>
          <span className='cart__price'>{total+' '}&#8376;</span>
        </div>
      </Link>}
    </div>
  )
}

export default Cart;