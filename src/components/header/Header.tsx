import Button from '../button/Button';
import Form from '../form/Form';
import Logo from '../logo/Logo';
import NavList from '../nav-list/NavList';
import Contacts from '../contacts/Contacts';
import './Header.scss';
import Cart from '../cart/Cart';

export type HeaderPropsType = {
  callbackRef: string,
}

const Header = (props: HeaderPropsType) => {
  const { callbackRef } = props;

  return (
    <header className="header">
      <div className="header__first-row">
        <div className="header__address">
          <div className="header__address-wrapper">
            <div className="header__location"></div>
            <address className="header__street">
              <i>г. Кокчетав, ул. Ж. Ташенова 129Б</i><br/>
              (Рынок Восточный)
            </address>
          </div>
          <div className="header__address-wrapper">
            <div className="header__envelope"></div>
            <address className="header__tel">
              <a className="header__email" href="mailto:info@conquest.watch.ru">opt.sultan@mail.ru</a>
              <span>На связи в любое время</span>
            </address>
          </div>
        </div>
        <NavList 
          mode='dark'
          withBurger={true}
          isVertical={false} 
          links={[
            {text:'О компании', href:'mock-address-change-me'},
            {text:'Доставка и оплата', href:'mock-address-change-me'},
            {text:'Возврат', href:'mock-address-change-me'},
            {text:'Контакты', href:'mock-address-change-me'},
          ]}
        />
        <Logo mode='dark'/>
      <Cart cropped={true}/>
      </div>
      <div className="header__second-row">
        <Logo mode='dark'/>
        <Button buttonType='download' text='Каталог'/>
        <Form type='search' action='#'/>
        <Contacts callbackRef={callbackRef} mode='dark'/>
        <div className="header__image"></div>
        <Button buttonType='download-wide' text='Прайс-лист'/>
        <Cart />
      </div>
    </header>
  )
}

export default Header;