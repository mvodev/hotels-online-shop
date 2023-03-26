import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectFilter,
  addFilters,
} from '../../redux/filterSlice';
import './Filter.scss';

export type FilterPropsType = {
  description: string,
}

const Filter = (props: FilterPropsType & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { description,...rest } = props;
  const filters = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  return (
    <button 
      data-filter={description} 
      className={filters.includes(description) ? 'filter filter_selected' : 'filter'} 
      onPointerDown={(event)=>{
          dispatch(
            addFilters(
              event.currentTarget.dataset.filter!==undefined ? event.currentTarget.dataset.filter:''
            )
          );
        }
      }
      {...rest}
    >         
      <span>{description}</span>
    </button>
  )
}

export default Filter;