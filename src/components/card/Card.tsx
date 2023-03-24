import Button from '../button/Button';
import './Card.scss';

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

  return (
    <div className="card">
      <div className="card__img">
        <img src={ imgUrl } alt="image of good" />
      </div>
      <div className="cards__quantity">
        <div className="cards__quantity-img">
          <img src={quantityImg} alt="img" />
        </div>
        <div className="cards__quantity-size">{quantity}</div>
      </div>
      <div className="card__description">
        <i>{title + ' '}</i>{description}
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
        <Button buttonType='cart' text=' В КОРЗИНУ'/>
      </div>
    </div>
  )
}

export default Card;