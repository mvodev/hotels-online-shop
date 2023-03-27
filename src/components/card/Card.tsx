import { useAppDispatch } from '../../redux/hooks';
import Button from '../button/Button';
import { addToCart } from '../../redux/cartSlice';
import './Card.scss';
import { Link } from "react-router-dom";

export type CardTypeProps = {
  imgUrl:string,
  title:string,
  description:string,
  quantity: string,
  quantityImg: string,
  barcode: string,
  manufacturer: string,
  brand: string,
  price: string,
  typeOfCare: string,
}

const Card = (props:CardTypeProps) => {
  const { 
    imgUrl, 
    title, 
    description, 
    quantity, 
    quantityImg, 
    barcode, 
    manufacturer, 
    brand,
    price,
    typeOfCare, } = props;

  const handlerCart = () => {
    dispatch(addToCart({barcode}));
  }
  const dispatch = useAppDispatch();

  return (
    
    <div className="card">
      <div className="card__img">
        <Link to={`/cards/${barcode}`}>
        <img src={ imgUrl } alt="image of good" />
        </Link>
      </div>
      <div className="card__quantity">
        <div className="card__quantity-img">
          <img src={quantityImg} alt="img" />
        </div>
        <div className="card__quantity-size">{quantity}</div>
      </div>
      <div className="card__description">
        <Link to={`/cards/${barcode}`}>
        <i>{title + ' '}</i>{description}
        </Link>
      </div>
      <div className="card__barcode">
        Штрихкод:<i>{barcode}</i>
      </div>
      <div className="card__manufacturer">
        Производитель:<i>{manufacturer}</i>
      </div>
      <div className="card__brand">
        Бренд:<i>{brand}</i>
      </div>
      <div className="card__care-type">
        Тип ухода:<i>{typeOfCare}</i>
      </div>
      <div className="card__price-wrapper">
        <div className="card__price">
          {price}&#8376;
        </div>
        <Button buttonType='cart' text=' В КОРЗИНУ' onPointerDown={handlerCart}/>
      </div>
    </div>
  )
}

export default Card;