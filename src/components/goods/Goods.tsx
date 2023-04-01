import './Goods.scss';
import SelectCardOrder from '../select-card-order/SelectCardOrder';
import Card, { CardTypeProps } from '../card/Card';
import { ChangeEvent, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Filter from '../filter/Filter';
import { useAppSelector } from '../../redux/hooks';
import {
  selectFilter,
} from '../../redux/filterSlice';
import Diapason from '../diapason-form/DiapasonForm';
import ls from '../../storage/LocalStorage';

export type GoodsPropsType = {
  title:string,
}

const Goods = (props:GoodsPropsType) => {
  const {title} = props;
  const dataInStorage = ls.getItems() ?? [];
  const [ cards, setCards ] = useState(dataInStorage.sort(
          (a, b) => a.title > b.title ? 1 : -1));
  const [itemOffset, setItemOffset] = useState(0);
  const [ sortBy, setSortBy ] = useState<
    'nameIncrease'  |
    'nameDecrease'  |
    'priceIncrease' |
    'priceDecrease'
  >('nameIncrease');

  const GOODS_PER_PAGE = 15;
  const endOffset = itemOffset + GOODS_PER_PAGE;
  const currentItems = cards.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cards.length / GOODS_PER_PAGE);

  const filtersState = useAppSelector(selectFilter);

  useEffect(()=>{
    if (filtersState.length === 0) {
      const sortedArray = sortByParams(sortBy,dataInStorage)
      setCards(sortedArray);
    } else {
      let filteredCards = [...dataInStorage];
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
    setSortBy(sortBy);
    const sortedArray = sortByParams(sortBy,arrayOfCardsToSort);
    setCards(sortedArray);
  }

  const sortByParams = (sortBy:'priceDecrease'|'priceIncrease'|'nameDecrease'|'nameIncrease', arrayToSort:Array<CardTypeProps>) => {
    const copyArray = [...arrayToSort];
    switch(sortBy) {
      case 'nameIncrease': 
        copyArray.sort(
          (a, b) => a.title > b.title ? 1 : -1);
        return copyArray;
      case 'nameDecrease': 
        copyArray.sort(
          (a, b) => a.title < b.title ? 1 : -1);
        return copyArray;
      case 'priceIncrease': 
        copyArray.sort(
          (a, b) => Number(a.price.replace(',','.')) > Number(b.price.replace(',','.')) ? 1 : -1);
        return copyArray;
      case 'priceDecrease': 
        copyArray.sort(
          (a, b) => Number(a.price.replace(',','.')) < Number(b.price.replace(',','.')) ? 1 : -1);
        return copyArray;
    }}

  const categories = new Set();

  dataInStorage.forEach((product) => {
    product.typeOfCare.split(',').forEach(productTypeOfCare=>categories.add(productTypeOfCare.toLowerCase()))
  })

  const filters = Array.from(categories).map(
    (category,index) => {
    return (
      <Filter key={index} description={category as string} />
    ) 
  })

  const handleDiapasonForm = (min:number,max:number)=>{
    const copyArray = [...cards];
    const filteredArray = copyArray.filter((product)=>{
      return Number(product.price.replace(',','.')) <= max && Number(product.price.replace(',','.')) >= min
    })
    setCards(filteredArray);
  }

  return (
    <main className="goods">
      <div className="goods__header-wrapper">
        <h1 className='goods__header'>{title}</h1>
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
      <div className='goods__main'>
        <aside className='goods__params'>
          <h3 className='goods__params-header'>Подбор по параметрам</h3>
          <Diapason 
            placeholder1='0' 
            placeholder2='10000' 
            diapasonTytle='Цена' 
            diapasonUnits='&#8376;'
            handleDiapasonForm={handleDiapasonForm}
            />
          {filters}
        </aside>
        <div className="goods__wrapper">
          <div className="goods__cards">
            {currentItems.map((product) => {
              return <Card {...product} key={product.barcode} />
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
          <p className='goods__description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis. Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.</p>
        </div>
      </div>
    </main>
  )
}


export default Goods;