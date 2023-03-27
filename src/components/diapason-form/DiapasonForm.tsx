import { useState } from 'react';
import './DiapasonForm.scss';

export type DiapasonFormTypeProps = {
  diapasonTytle:string,
  diapasonUnits: string,
  placeholder1:string,
  placeholder2:string,
  handleSubmit:(event:React.FormEvent<HTMLFormElement>)=>void
}

const DiapasonForm = (props:DiapasonFormTypeProps) => {
  const {
    diapasonTytle,
    diapasonUnits,
    placeholder1,
    placeholder2,
    handleSubmit
  } = props;
  const [ input1, setInput1] = useState(0);
  const [ input2, setInput2] = useState(0);
  const [error,setError] = useState('');

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => { 
    const inputNumber = event.target.name;
    setError('');
    if (Number(event.target.value) < 0) {
      setError('Введите положительное значение');
    } else if ((inputNumber === 'first' && Number(event.target.value) > input2)||
    ((inputNumber === 'second' && Number(event.target.value) < input1))) {
      setError('Некорректное значение диапазона');
    } else {
      if (inputNumber === 'first') {
        setInput1(Number(event.target.value));
      } else setInput2(Number(event.target.value));
      setError('');
    }
  }

  return (
    <form 
      onSubmit={(event)=>{
        if (error.length === 0) handleSubmit(event);
      }} 
      className='diapason'
    >
      <h3 className='diapason__header'>{diapasonTytle +' '}<i>{diapasonUnits}</i></h3>
      <div className="diapason__input-wrapper">
        <input onChange={handleChange} value={input1} name='first' type="number" className='diapason__input diapason__input_first' placeholder={placeholder1} required/>
        <span>-</span>
        <input value={input2} onChange={handleChange} name='second' type="number" className='diapason__input diapason__input_second' placeholder={placeholder2} required/>
        <button type='submit'></button>
      </div>
      <span className='diapason__error'>{error}</span>
    </form>
  )
}

export default DiapasonForm;