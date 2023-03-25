import './Cards.scss';
import goodsData from '../../model/goodsData';
import SelectCardOrder from '../select-card-order/SelectCardOrder';
import Card from '../card/Card';
import { ChangeEvent, useState } from 'react';

const Cards = () => {
  const [cards,setCards] = useState(goodsData);

  const handleSort = (event:ChangeEvent<HTMLSelectElement>) =>{
    const arrayOfCardsToSort = [...cards];
    switch(event.target.value) {
      case 'nameIncrease': 
        arrayOfCardsToSort.sort(
          (a, b) => a.title > b.title ? 1 : -1);
        setCards(arrayOfCardsToSort);
        break;
      case 'nameDecrease': 
        arrayOfCardsToSort.sort(
          (a, b) => a.title < b.title ? 1 : -1);
        setCards(arrayOfCardsToSort);
        break;
      case 'priceIncrease': 
        arrayOfCardsToSort.sort(
          (a, b) => Number(a.price.replace(',','.')) > Number(b.price.replace(',','.')) ? 1 : -1);
        setCards(arrayOfCardsToSort);
        break;
      case 'priceDecrease': 
        arrayOfCardsToSort.sort(
          (a, b) => Number(a.price.replace(',','.')) < Number(b.price.replace(',','.')) ? 1 : -1);
        console.log(arrayOfCardsToSort);
        setCards(arrayOfCardsToSort);
        break;
    }
  }

  return (
    <div className="cards">
      <div className="cards__select-order">
        <span>Сортировка:</span>
        <SelectCardOrder onChange={handleSort}/>
      </div>
      <div className="cards__wrapper">
        {cards.map((good) => {
          return <Card 
            key={good.barcode}
            imgUrl={good.imgUrl} 
            quantity={good.quantity} 
            quantityImg={good.quantityImg} 
            title={good.title} 
            description={good.description}
            barcode= {good.barcode}
            manufacturer={good.manufacturer}
            brand={good.brand}
            typeOfCare={good.typeOfCare}
            price={good.price}
          />
        })}
      </div>
    </div>
  )
}

export default Cards;