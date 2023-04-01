import './Form.scss';

export type EmailFormProps = {
  type: 'email' | 'search' | 'search-wide',
  searchHandler:(data:string)=>void,
}

const Form = (props: EmailFormProps) => {
  const { type,searchHandler } = props;

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    searchHandler(event.currentTarget.value)
  }

  const classNameFormModificators = type === 'email' ? 'form_email' : type === 'search' ? 'form_search' : 'form_search-wide';
  const placeholder = type === 'email' ? 'Введите ваш E-mail' : 'Поиск';
  const input = 
    type === 'email' 
    ? <input 
        name="email"
        className="form__input" 
        type="email" 
        onChange={handleInputChange}
        required 
        pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
        placeholder={placeholder}
      />
    : <input 
        name='search'
        className="form__input" 
        onChange={handleInputChange}
        type='text' 
        required 
        placeholder={placeholder}
      /> 
  return (
    <form className={`form ${classNameFormModificators}`}>
      {input}
      <button className="form__submit" type="submit">
      </button>
    </form>
  )
}

export default Form;