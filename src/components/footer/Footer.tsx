import Button from '../button/Button';
import Form from '../form/Form';
import Logo from '../logo/Logo';
import NavList from '../nav-list/NavList';
import whatsUpLink from '../../assets/images/whatsup.svg';
import telegramLink from '../../assets/images/telegram.svg';
import './Footer.scss';
import Contacts from '../contacts/Contacts';

export type FooterPropsType = {
  callbackRef:string,
  searchHandler:()=>void,
}

const Footer = (props:FooterPropsType) => {
  const { callbackRef, searchHandler } = props;

  return (
    <footer className='footer'>
      <div className="footer__left-side">
        <div className="footer__logo-wrapper">
          <Logo mode='white'/>
          <Logo mode='white' small={true}/>
          <Button buttonType='download-small' text='Прайс-лист'/>
        </div>
        <p className='footer__description'>
          Компания «Султан» — снабжаем розничные магазины товарами 
          "под ключ" в Кокчетаве и Акмолинской области
        </p>
        <h3 className='footer__sub-header'>Подпишись на скидки и акции</h3>
        <Form type='email' searchHandler={searchHandler}/>
      </div>
      <div className="footer__right-side">
        <div className="footer__nav">
          <div className="footer__nav-wrapper">
            <h3 className='footer__header'>Меню сайта:</h3>
              <NavList 
              mode='white' isVertical={true} 
              links={[
                {text:'О компании',href:'mock-address-change-me'},
                {text:'Доставка и оплата',href:'mock-address-change-me'},
                {text:'Возврат',href:'mock-address-change-me'},
                {text:'Контакты',href:'mock-address-change-me'}
              ]}
            />
          </div>
          <div className="footer__nav-wrapper">
            <h3 className='footer__header'>Категории:</h3>
              <NavList 
              mode='white' isVertical={true} 
              links={[
                {text:'О компании',href:'mock-address-change-me'},
                {text:'Доставка и оплата',href:'mock-address-change-me'},
                {text:'Возврат',href:'mock-address-change-me'},
                {text:'Контакты',href:'mock-address-change-me'},
              ]}
            />
          </div>
        </div>
        <div className="footer__wrapper">
          <div className="footer__price">
          <h3 className='footer__header'>Скачать прайс-лист:</h3>
          <Button buttonType='download-extra-wide' text='Прайс-лист'/>
          <span>Связь в мессенджерах:</span>
          <div className="footer__messengers">
            <a 
              className='footer__whatsup' 
              href="http://mock-address-change-me" target={'_blank'}
              rel={'noopener noreferrer'}
            >
              <img src={whatsUpLink} alt="whatsup image" />
            </a>
            <a 
              className='footer__telegram' 
              href="http://mock-address-change-me" 
              target={'_blank'}
              rel={'noopener noreferrer'}
            >
              <img src={telegramLink} alt="telegram image"/>
            </a>
          </div>
        </div>
        <div className="footer__contacts">
          <h3 className='footer__header'>Контакты:</h3>
          <Contacts callbackRef={callbackRef} mode='white'/>
          <address className="footer__address footer__address_email">
            <a className="footer__email" href="mailto:info@conquest.watch.ru">opt.sultan@mail.ru</a>
          </address>
          <span>На связи в любое время</span>
          <div className="footer__cards">
            <div className="footer__visa-img"></div>
            <div className="footer__mastercard-img"></div>
          </div>
        </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;