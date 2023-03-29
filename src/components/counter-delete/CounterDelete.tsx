import { useState } from 'react';
import Button from '../button/Button';
import './CounterDelete.scss';

export type CounterDeletePropsType = {
  handleClick: ()=>void,
  handleCounterChange:(counter:number,barcode:string)=>void
  initialCounter?: number,
  maxValue?:number,
  pricePerUnit:string,
  barcode:string,
}

const CounterDelete = (props:CounterDeletePropsType) => {
  const {initialCounter = 0,handleClick,handleCounterChange, pricePerUnit, barcode} = props;
  const [counter,setCounter] = useState(initialCounter);
  const correctedPricePerUnit = pricePerUnit.replace(',','.');
  const [price,setPrice] = useState(Number(correctedPricePerUnit)*initialCounter);

  const handleCounter = (event:React.PointerEvent<HTMLButtonElement>) => {
    const isButtonMinusClicked = event.currentTarget.classList.contains('counter-delete__button_minus');
    let newCounterState = counter;
    if (isButtonMinusClicked) {
      if (counter > 0) newCounterState = counter-1; 
    } else newCounterState =  counter+1;
    setCounter(newCounterState);
    setPrice(+(newCounterState*Number(correctedPricePerUnit)).toFixed(2));
    handleCounterChange(newCounterState, barcode);
  }

  return (
    <div className="counter-delete">
      <button type='button' className='counter-delete__button counter-delete__button_minus' onPointerDown={handleCounter}>-</button>
      <span>{counter}</span>
      <button type='button' className='counter-delete__button counter-delete__button_plus' onPointerDown={handleCounter}>+</button>
      <div className="counter-delete__price">{price}</div>
      <Button buttonType='delete' onPointerDown={()=>{
          setCounter(0);
          handleClick();
        }}/>
    </div>
  )
}

export default CounterDelete;