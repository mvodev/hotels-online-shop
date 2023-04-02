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
import Form from '../form/Form';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

export type GoodsPropsType = {
  title:string,
}

const Goods = (props:GoodsPropsType) => {
  const {title} = props;
  const dataInStorage = ls.getItems() ?? [];
  const [ cards, setCards ] = useState(dataInStorage.sort(
    (a, b) => a.title > b.title ? 1 : -1));
  const [ itemOffset, setItemOffset ] = useState(0);
  const [ manufacturer, setManufacturer ] = useState('');
  const [ manufacturers, setManufacturers ] = useState<string[]>([]);
  const [ priceFilter, setPriceFilter ] = useState({
    min:'',
    max:'',
  });
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
    let copyOfGoods = [...dataInStorage];

    if (manufacturers.length > 0) {
      let temp:CardTypeProps[] = [];
      manufacturers.forEach(manufacturer=>{
        let copyOfGoodsFiltered = copyOfGoods.filter(product => product.manufacturer === manufacturer);
        temp.push(...copyOfGoodsFiltered);
      })
      copyOfGoods = [...temp];
    } else if ( manufacturer.length > 0 ) {
      copyOfGoods = copyOfGoods.filter(product => product.manufacturer === manufacturer);
    }

    if (priceFilter.min.length > 0 && priceFilter.max.length) {
      const min = Number(priceFilter.min);
      const max = Number(priceFilter.max);
      copyOfGoods = copyOfGoods.filter(product => 
        Number(product.price.replace(',','.')) > min && Number(product.price.replace(',','.')) < max);
    }

    if (filtersState.length !== 0) {
      filtersState.forEach(filterState=>{
        copyOfGoods = copyOfGoods.filter(card=>card.typeOfCare.includes(filterState));
      })
    }

    copyOfGoods = sortByParams(sortBy,copyOfGoods);
    setCards(copyOfGoods);
    
  },[filtersState,sortBy,manufacturer,priceFilter,manufacturers])

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

  const handleSearchManufacturerForm = (dataFromInput:string) => {
    setManufacturer(dataFromInput);
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

  const setOfManufacturers = new Set<string>();
  dataInStorage.forEach(product=>{
    setOfManufacturers.add(product.manufacturer);
  })
  const arrayOfManufacturers = Array.from(setOfManufacturers);

  const handleDiapasonForm = (min:number,max:number)=>{
    setPriceFilter({
      min:`${min}`, max: `${max}`
    })
  }

  const handleManufacturerChecked = (event: any) => {
    const label = event.currentTarget.labels[0].innerText;
    const checked = event.currentTarget.checked;
    const stateOfManufacturers = [...manufacturers];
    if (checked) {
      stateOfManufacturers.push(label);
    } else {
      const index = stateOfManufacturers.indexOf(label);
      if(index>-1) {
        stateOfManufacturers.splice(index,1);
      }
    }
    setManufacturers(stateOfManufacturers);
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
          <h3 className='goods__params-header'>Производитель</h3>
          <Form type='search' searchHandler={handleSearchManufacturerForm}/>
          <FormGroup>
            {arrayOfManufacturers.map(manufacturer=>{
              return <FormControlLabel 
              onChange={handleManufacturerChecked} 
              sx={{
                color: '#3F4E65',
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 21,
              }}
              key={manufacturer} control={<Checkbox />} label={manufacturer}/>
            })}
            
          </FormGroup>
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