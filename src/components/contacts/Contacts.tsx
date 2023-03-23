import './Contacts.scss';

export type ContactsPropsType = {
  callbackRef:string,
  mode: 'white' | 'dark'
}

const Contacts = (props: ContactsPropsType) => {
  const {callbackRef, mode} = props;
  return (
    <div className={`contacts contacts_${mode}`}>
      <address className="contacts__address">
        <a className="contacts__tel" href="tel:+77774900091">+7 (777) 490-00-91</a>
      </address>
      <div className="contacts__work-hours">
        время работы: <time dateTime='09:00'>9:00</time>-<time dateTime='20:00'>20:00</time>
      </div>
      <a className='contacts__callback' href={callbackRef}>Заказать звонок</a>
    </div>
  )
}

export default Contacts;