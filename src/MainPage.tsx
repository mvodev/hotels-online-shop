import Button from './components/button/Button';
import NavList from './components/nav-list/NavList';
import './MainPage.scss';

const MainPage = () => {
  return (
    <section className="main-page">
      <h1 className='main-page__header'>Тестовое задание HOTELS.RU интернет магазин</h1>
      <NavList isVertical={true} links={[
        {text:'bla',href:'mock-address-change-me'},
        {text:'blabla',href:'mock-address-change-me'},
        {text:'blablabla',href:'mock-address-change-me'}
      ]}/>
    </section>
  )
}

export default MainPage;
