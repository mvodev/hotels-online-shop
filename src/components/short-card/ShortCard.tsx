import { CardTypeProps } from '../card/Card';
import CounterDelete from '../counter-delete/CounterDelete';
import './ShortCard.scss';

export type ShortCardPropsType = {
  handleDeleteButtonClick:(counter:number,barcode:string)=>void,
  handleCounterChange:(counter:number,barcode:string)=>void,
  counterOfProduct: number,
} & CardTypeProps;

const ShortCard = (props:ShortCardPropsType ) => {
  const { quantity, quantityImg, imgUrl, title, description, fullDescription, price,barcode,counterOfProduct,handleDeleteButtonClick,handleCounterChange } = props;

  return (
    <article className="short-card">
      <div className="short-card__img">
        <img src={imgUrl} alt="product image" />
      </div>
      <div className="short-card__description">
        <div className="short-card__quantity">
          <div className="short-card__quantity-img">
            <img src={quantityImg} alt="container image" />
          </div>
          <div className="short-card__quantity-size">{quantity}</div>
        </div>
        <div className="short-card__description-wrapper">
          <h3 className='short-card__header'>{title}{description}</h3>
          <p className='short-card__full-description'>{fullDescription}</p>
        </div>
        <div className="short-card__counter">
          <CounterDelete
            handleDeleteButtonClick={handleDeleteButtonClick} 
            handleCounterChange={handleCounterChange}
            pricePerUnit={price}
            barcode={barcode}
            initialCounter={counterOfProduct}
          />
        </div>
      </div>
    </article>
  )
}

export default ShortCard;