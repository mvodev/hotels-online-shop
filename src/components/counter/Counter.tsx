import { useState } from 'react';
import Button from '../button/Button';
import './Counter.scss';

export type CounterPropsType = {
  handleClick: (counter:number)=>void,
  initialCounter?: number,
  maxValue?:number,
  price?:string,
}

const Counter = (props:CounterPropsType) => {
  const { handleClick,initialCounter = 0,price } = props;
  const [counter,setCounter] = useState(initialCounter);

  const handleCounter = (event:React.PointerEvent<HTMLButtonElement>) => {
    const isButtonMinusClicked = event.currentTarget.classList.contains('counter__button_minus');
    let newCounterState = counter;
    if (isButtonMinusClicked) {
      if (counter > 0) newCounterState = counter-1; 
    } else newCounterState =  counter+1;
    setCounter(newCounterState);
  }

  return (
    <div className="counter">
      <div className="counter__wrapper">
        {price && <span className='counter__price'>{price} &#8376;</span>}
        <button type='button' className='counter__button counter__button_minus' onPointerDown={handleCounter}>-</button>
        <span>{counter}</span>
        <button type='button' className='counter__button counter__button_plus' onPointerDown={handleCounter}>+</button>
      </div>
      <Button buttonType='cart-wide' text=' В КОРЗИНУ' onPointerDown={()=>{
          setCounter(0);
          handleClick(counter);
        }}/>
    </div>
  )
}

export default Counter;