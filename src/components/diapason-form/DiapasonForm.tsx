import { useState } from 'react';
import './DiapasonForm.scss';

export type DiapasonFormTypeProps = {
  diapasonTytle:string,
  diapasonUnits: string,
  placeholder1:string,
  placeholder2:string,
  handleDiapasonForm:(min:number,max:number)=>void
}

const DiapasonForm = (props:DiapasonFormTypeProps) => {
  const {
    diapasonTytle,
    diapasonUnits,
    placeholder1,
    placeholder2,
    handleDiapasonForm
  } = props;
  const [ min, setMin ] = useState(0);
  const [ max, setMax ] = useState(10000);
  const [ error, setError ] = useState('');

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => { 
    const inputNumber = event.target.name;
    setError('');
    let dataToHandle = Number(event.target.value);
    if (Number(dataToHandle) < 0) {
      setError('Введите положительное значение');
    } else if ((inputNumber === 'first' && Number(dataToHandle) > max)||
    ((inputNumber === 'second' && Number(dataToHandle) < min))) {
      setError('Некорректное значение диапазона');
    } else {
      if (inputNumber === 'first') {
        setMin(Number(dataToHandle));
      } else {
        setMax(Number(dataToHandle))
      };
      setError('');
    }
  }

  return (
    <form 
      onSubmit={(event)=>{
        event.preventDefault();
        if (error.length === 0) handleDiapasonForm(min,max);
      }} 
      className='diapason'
    >
      <h3 className='diapason__header'>{diapasonTytle +' '}<i>{diapasonUnits}</i></h3>
      <div className="diapason__input-wrapper">
        <input onChange={handleChange} value={min} name='first' type="number" className='diapason__input diapason__input_first' placeholder={placeholder1} required/>
        <span>-</span>
        <input value={max} onChange={handleChange} name='second' type="number" className='diapason__input diapason__input_second' placeholder={placeholder2} required/>
        <button type='submit'></button>
      </div>
      <span className='diapason__error'>{error}</span>
    </form>
  )
}

export default DiapasonForm;