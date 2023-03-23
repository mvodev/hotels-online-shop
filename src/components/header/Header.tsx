import NavList from '../nav-list/NavList';
import './Header.scss';

export type HeaderPropsType = {
  mapUrl: string
}

const Header = (props: HeaderPropsType) => {
  const { mapUrl } = props;

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
            mode='dark' isVertical={false} 
              links={[
                {text:'О компании',href:'mock-address-change-me'},
                {text:'Доставка и оплата',href:'mock-address-change-me'},
                {text:'Возврат',href:'mock-address-change-me'},
                {text:'Контакты',href:'mock-address-change-me'},
              ]}
            />
      </div>
      <div className="header__second-row"></div>
    </header>
  )
}

export default Header;