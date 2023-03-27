import { useState } from 'react';
import './Counter.scss';

const Counter = () => {
  const [counter,setCounter] = useState(0);
  const handleCounter = (event:React.PointerEvent<HTMLButtonElement>) => {
    const isButtonMinusClicked = event.currentTarget.classList.contains('counter__button_minus');
    if (isButtonMinusClicked) {
      if (counter > 0) setCounter(counter-1); 
    } else setCounter(counter+1);
  }


  return (
    <div className="counter">
      <button type='button' className='counter__button counter__button_minus' onPointerDown={handleCounter}>-</button>
      <span>{counter}</span>
      <button type='button' className='counter__button counter__button_plus' onPointerDown={handleCounter}>+</button>
    </div>
  )

}

export default Counter;