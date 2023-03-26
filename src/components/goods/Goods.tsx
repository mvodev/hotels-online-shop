import './Goods.scss';
import goodsData from '../../model/goodsData';
import SelectCardOrder from '../select-card-order/SelectCardOrder';
import Card from '../card/Card';
import { ChangeEvent, PointerEvent, useState } from 'react';
import ReactPaginate from 'react-paginate';

const Goods = () => {
  const [ cards, setCards ] = useState(goodsData.sort(
          (a, b) => a.title > b.title ? 1 : -1));
  const [itemOffset, setItemOffset] = useState(0);
  const GOODS_PER_PAGE = 15;
  const endOffset = itemOffset + GOODS_PER_PAGE;
  const currentItems = cards.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cards.length / GOODS_PER_PAGE);

  const handlePaginationClick = (event:{selected:number}) => {
    const newOffset = (event.selected * GOODS_PER_PAGE) % cards.length;
        console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

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
    <div className="goods">
      <div className="goods__select-order">
        <span>Сортировка:</span>
        <SelectCardOrder onChange={handleSort}/>
      </div>
      <div className="goods__wrapper">
        {currentItems.map((good) => {
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
      <div className="goods__pagination">
        <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePaginationClick}
        pageRangeDisplayed={GOODS_PER_PAGE}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={() => null}
      />
      </div>
    </div>
  )
}

export default Goods;