import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import BreadCrumbs from "../components/bread-crumbs/BreadCrumbs";
import Button from "../components/button/Button";
import Counter from "../components/counter/Counter";
import Header from "../components/header/Header";
import goodsData from "../model/goodsData";
import { addToCart } from "../redux/cartSlice";
import { useAppDispatch } from "../redux/hooks";
import './ProductPage.scss';

const ProductPage = () => {
  const params = useParams();
  const barcodeOfProduct = params.id ?? '';
  const productData = goodsData.find(data=>data.barcode === barcodeOfProduct);
  const dispatch = useAppDispatch();

  const handleCart = (counterOfProduct:number) => {
    for (let i=0;i<counterOfProduct;i++) {
      dispatch(addToCart({barcode: barcodeOfProduct}))
    }
  }

  return (
    <div className="wrapper">
      <Header callbackRef="https://mock-address-change-me"/>
      <main className="cards">
        <BreadCrumbs links={[
          {link:'/',name:'Главная'},
          {link:'/',name:'Каталог'},
          {link: '/',name:`${productData?.title}${productData?.description}${productData?.quantity}`,actual:true}
        ]}/>
        <div className="cards__wrapper">
          <div className="cards__left-side">
            <div className="cards__img">
              <img src={productData?.imgUrl} alt="goods image" />
            </div>
          </div>
          <div className="cards__right-side">
            <h2 className="cards__header"><i>{productData?.title}</i>{productData?.description}</h2>
            <div className="cards__quantity">
              <div className="cards__quantity-img">
                <img src={productData?.quantityImg} alt="img" />
              </div>
              <div className="cards__quantity-size">{productData?.quantity}</div>
            </div>
            <div className="cards__price">
              <span>{productData?.price+' '}&#8376;</span>
              <Counter handleClick={handleCart}/>
            </div>
          </div>
        </div>
      </main>
    </div>
    )
}

export default ProductPage;