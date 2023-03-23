import './Form.scss';
import arrowUrl from '../../assets/images/arrow-right.svg';
import searchUrl from '../../assets/images/search.svg';

export type EmailFormProps = {
  action: string,
  type: 'email' | 'search' | 'search-wide',
}

const Form = (props: EmailFormProps) => {
  const { action, type } = props;
  const classNameFormModificators = type === 'email' ? 'form__input_email' : type === 'search' ? 'form__input_search' : 'form__input_search-wide';
  const placeholder = type === 'email' ? 'Введите ваш E-mail' : 'Поиск';
  const input = 
    type === 'email' 
    ? <input 
        name="email"
        className="form__input" 
        type="email" 
        required 
        pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
        placeholder={placeholder}
      />
    : <input 
        name='search'
        className="form__input" 
        type='text' 
        required 
        placeholder={placeholder}
      /> 
  return (
    <form className={`form ${classNameFormModificators}`} action={action}>
      {input}
      <button className="form__submit" type="submit">
        {/* <img className="form__img" src={ type==='email' ? arrowUrl : searchUrl } alt={type === 'email' ? 'arrow image' : 'search image'} /> */}
      </button>
    </form>
  )
}

export default Form;