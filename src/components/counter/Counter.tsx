import { useState } from 'react';
import Button from '../button/Button';
import './Counter.scss';

export type CounterPropsType = {
  handleClick: (counter:number)=>void,
}

const Counter = (props:CounterPropsType) => {
  const { handleClick } = props;
  const [counter,setCounter] = useState(0);

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
      <button type='button' className='counter__button counter__button_minus' onPointerDown={handleCounter}>-</button>
      <span>{counter}</span>
      <button type='button' className='counter__button counter__button_plus' onPointerDown={handleCounter}>+</button>
      <Button buttonType='cart-wide' text=' В КОРЗИНУ' onPointerDown={()=>{
          setCounter(0);
          handleClick(counter);
        }}/>
    </div>
  )
}

export default Counter;