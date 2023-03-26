import './Goods.scss';
import goodsData from '../../model/goodsData';
import SelectCardOrder from '../select-card-order/SelectCardOrder';
import Card from '../card/Card';
import { ChangeEvent, PointerEvent, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Filter from '../filter/Filter';
import { useAppSelector } from '../../redux/hooks';
import {
  selectFilter,
} from '../../redux/filterSlice';

export type GoodsPropsType = {
  title:string,
}

const Goods = (props:GoodsPropsType) => {
  const {title} = props;
  const [ cards, setCards ] = useState(goodsData.sort(
          (a, b) => a.title > b.title ? 1 : -1));
  const [itemOffset, setItemOffset] = useState(0);
  const GOODS_PER_PAGE = 15;
  const endOffset = itemOffset + GOODS_PER_PAGE;
  const currentItems = cards.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cards.length / GOODS_PER_PAGE);
  const filtersState = useAppSelector(selectFilter);
  useEffect(()=>{
    if (filtersState.length === 0) {
      setCards(goodsData.sort(
          (a, b) => a.title > b.title ? 1 : -1))
    } else {
      let filteredCards = [...cards];
      filtersState.forEach(filterState=>{
        filteredCards = filteredCards.filter(card=>card.typeOfCare.includes(filterState));
      })
      setCards(filteredCards);
    }

  },[filtersState])

  const handlePaginationClick = (event:{selected:number}) => {
    const newOffset = (event.selected * GOODS_PER_PAGE) % cards.length;
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
        setCards(arrayOfCardsToSort);
        break;
    }
  }

  const categories = new Set();

  goodsData.forEach((product) => {
    product.typeOfCare.split(',').forEach(productTypeOfCare=>categories.add(productTypeOfCare))
  })

  const filters = Array.from(categories).map(
    (category,index) => {
    return (
      <Filter key={index} description={category as string} />
    ) 
  })

  return (
    <div className="goods">
      <div className="goods__header-wrapper">
        <h2 className='goods__header'>{title}</h2>
        <div className="goods__select-order">
          <span>Сортировка:</span>
          <SelectCardOrder onChange={handleSort}/>
        </div>
      </div>
      <div className="goods__filters">
        {filters.map((filter,index) => {
          return <div key={index} className="goods__filter-wrapper">{filter}</div>
        })}
      </div>
      <main className='goods__main'>
        <aside className='goods__params'>
          <h3 className='goods__params-header'>Подбор по параметрам</h3>
          <h4>Цена &#8376;</h4>
          {filters}
        </aside>
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
      </main>
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