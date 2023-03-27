import './Goods.scss';
import goodsData from '../../model/goodsData';
import SelectCardOrder from '../select-card-order/SelectCardOrder';
import Card, { CardTypeProps } from '../card/Card';
import { ChangeEvent, PointerEvent, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Filter from '../filter/Filter';
import { useAppSelector } from '../../redux/hooks';
import {
  selectFilter,
} from '../../redux/filterSlice';
import Diapason from '../diapason-form/DiapasonForm';

export type GoodsPropsType = {
  title:string,
}

const Goods = (props:GoodsPropsType) => {
  const {title} = props;
  const [ cards, setCards ] = useState(goodsData.sort(
          (a, b) => a.title > b.title ? 1 : -1));
  const [itemOffset, setItemOffset] = useState(0);
  const [ sortBy, setSortBy ] = useState<
    'nameIncrease'  |
    'nameDecrease'  |
    'priceIncrease' |
    'priceDecrease'
  >('nameIncrease')
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

  const handleSort = (event:ChangeEvent<HTMLSelectElement>) => {
    const arrayOfCardsToSort = [...cards];
    const sortBy = event.target.value as 'nameIncrease' | 'nameDecrease' | 'priceIncrease' | 'priceDecrease';
    sortByParams(sortBy,arrayOfCardsToSort);
  }

  const sortByParams = (sortBy:'priceDecrease'|'priceIncrease'|'nameDecrease'|'nameIncrease', arrayToSort:Array<CardTypeProps>) => {
    switch(sortBy) {
      case 'nameIncrease': 
        arrayToSort.sort(
          (a, b) => a.title > b.title ? 1 : -1);
        setCards(arrayToSort);
        break;
      case 'nameDecrease': 
        arrayToSort.sort(
          (a, b) => a.title < b.title ? 1 : -1);
        setCards(arrayToSort);
        break;
      case 'priceIncrease': 
        arrayToSort.sort(
          (a, b) => Number(a.price.replace(',','.')) > Number(b.price.replace(',','.')) ? 1 : -1);
        setCards(arrayToSort);
        break;
      case 'priceDecrease': 
        arrayToSort.sort(
          (a, b) => Number(a.price.replace(',','.')) < Number(b.price.replace(',','.')) ? 1 : -1);
        setCards(arrayToSort);
        break;
    }}

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

  const handleFormDiapason = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const input1 = formData.get('first');
    const input2 = formData.get('second');
    // if (Number(input1) === 0 && Number(input2) === 0) {

    // }
    console.log(input1);
    console.log(input2);
  }

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
          <Diapason 
            placeholder1='0' 
            placeholder2='10000' 
            diapasonTytle='Цена' 
            diapasonUnits='&#8376;'
            handleSubmit={handleFormDiapason}
            />
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